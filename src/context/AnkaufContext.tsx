import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { AnkaufRequest, AnkaufStatus } from "@/types/business";
import { MOCK_ANKAUF_REQUESTS } from "@/data/mockBusiness";

interface AnkaufContextType {
  requests: AnkaufRequest[];
  addRequest: (request: Omit<AnkaufRequest, "id" | "createdAt" | "updatedAt" | "status">) => AnkaufRequest;
  updateStatus: (id: string, status: AnkaufStatus, notes?: string) => void;
  getRequestById: (id: string) => AnkaufRequest | undefined;
  pendingCount: number;
}

const AnkaufContext = createContext<AnkaufContextType | null>(null);

export function useAnkauf() {
  const ctx = useContext(AnkaufContext);
  if (!ctx) throw new Error("useAnkauf must be used within AnkaufProvider");
  return ctx;
}

export function AnkaufProvider({ children }: { children: ReactNode }) {
  const [requests, setRequests] = useState<AnkaufRequest[]>(MOCK_ANKAUF_REQUESTS);

  const addRequest = useCallback(
    (data: Omit<AnkaufRequest, "id" | "createdAt" | "updatedAt" | "status">): AnkaufRequest => {
      const now = new Date();
      const id = `ANK-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${String(requests.length + 1).padStart(3, "0")}`;
      const newRequest: AnkaufRequest = {
        ...data,
        id,
        status: "pending",
        createdAt: now,
        updatedAt: now,
      };
      setRequests((prev) => [newRequest, ...prev]);
      return newRequest;
    },
    [requests.length]
  );

  const updateStatus = useCallback((id: string, status: AnkaufStatus, notes?: string) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status,
              updatedAt: new Date(),
              adminNotes: notes ?? r.adminNotes,
              ...(status === "label_sent" ? { labelSentAt: new Date() } : {}),
              ...(status === "received" ? { receivedAt: new Date() } : {}),
              ...(status === "completed" ? { completedAt: new Date() } : {}),
            }
          : r
      )
    );
  }, []);

  const getRequestById = useCallback(
    (id: string) => requests.find((r) => r.id === id),
    [requests]
  );

  const pendingCount = requests.filter((r) =>
    ["pending", "label_sent", "received", "in_inspection", "offer_made"].includes(r.status)
  ).length;

  return (
    <AnkaufContext.Provider value={{ requests, addRequest, updateStatus, getRequestById, pendingCount }}>
      {children}
    </AnkaufContext.Provider>
  );
}
