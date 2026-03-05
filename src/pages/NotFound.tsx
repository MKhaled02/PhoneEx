import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <h1 className="mb-2 text-6xl font-bold font-heading text-foreground">404</h1>
        <p className="mb-6 text-lg text-muted-foreground">Seite nicht gefunden</p>
        <Button asChild>
          <Link to="/">Zurück zur Startseite</Link>
        </Button>
      </div>
      <SiteFooter />
    </div>
  );
};

export default NotFound;
