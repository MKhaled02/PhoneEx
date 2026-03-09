# PhoneEx — Vollständiges Business- & Plattform-Konzept
> Erstellt: März 2026 | Status: Lebendiges Dokument | Tech-Stack: React + Vite + Supabase + Stripe

---

## 1. BEWERTUNG DES AKTUELLEN PROJEKTSTANDS

### Was vorhanden ist
Das Projekt ist ein **vollständiger, professioneller Frontend-Prototyp** mit:
- 17 Seiten (Homepage, Kollektion, Produktdetail, Warenkorb, Checkout, Bestellbestätigung, Ankauf, Suche, Konto, Admin + 6 Legal-Seiten)
- 52 Produkte (Apple, Samsung, Google, Xiaomi, OnePlus) vollständig mit Specs
- Vollständiger Ankauf-Wizard mit Preiskalkulator
- Solides TypeScript-Typsystem (`src/types/business.ts`) für alle Business-Entitäten
- Shadcn UI + Tailwind: professionelles, mobile-fähiges Design
- CartContext, AnkaufContext: State-Management-Grundlage vorhanden

### Was fehlt für echten Betrieb
| Kategorie | Status | Priorität |
|-----------|--------|-----------|
| Backend / Datenbank | ❌ Fehlt komplett | P0 — Launch-Blocker |
| Authentifizierung | ❌ Fehlt | P0 — Launch-Blocker |
| Zahlungsabwicklung | ❌ Kein Stripe/PayPal | P0 — Launch-Blocker |
| E-Mail-Benachrichtigungen | ❌ Fehlt | P0 — Launch-Blocker |
| Admin-Schutz | ❌ Öffentlich zugänglich | P0 — Sicherheitslücke |
| Ankauf-Admin-Seiten | ⚠️ Verlinkt, fehlten | ✅ Jetzt implementiert |
| Produkt-Admin-Seiten | ⚠️ Verlinkt, fehlten | ✅ Jetzt implementiert |
| AnkaufContext-Anbindung | ⚠️ Context vorhanden, nicht genutzt | ✅ Jetzt verbunden |
| Ankauf-Status-Tracking | ❌ Fehlt | P1 |
| SEO-Landingpages | ❌ Fehlen | P1 |
| Über-uns, Garantie-Seite | ❌ Fehlen | P1 |

---

## 2. GESAMTES BUSINESS-KONZEPT

### Positionierung
**PhoneEx** ist der **lokale Berliner Smartphone-Händler** der die Lücke zwischen unpersönlichen Großplattformen (rebuy, Momox, Back Market) und unseriösen Privatverkäufen (eBay Kleinanzeigen) schließt.

**Kern-USPs in Prioritätsreihenfolge:**
1. **Sofortpreis in 60 Sekunden** — kein Warten, kein Verhandeln
2. **Preisgarantie** — Online-Preis = finaler Preis. Kein rebuy-Trick (nachträgliche Kürzung nach Eingang)
3. **Auszahlung in 24–48h** — nicht 7–14 Tage wie Wettbewerber
4. **Lokale Präsenz Berlin** — Walk-in möglich, persönlicher Ansprechpartner
5. **Datenlöschzertifikat** — DSGVO-konform, kostenlos inklusive

### Markt & Zahlen
- Refurbished Smartphone-Markt Deutschland: ~3,37 Mrd. USD (2025), Wachstum +14,5% p.a.
- Berlin: 3,7 Mio. Einwohner, 54% unter 35 Jahre, höchste Tech-Affinität aller deutschen Städte
- EU Right to Repair (2025) + Digital Product Passport (2026): Rückenwind für professionelle Refurbisher
- Break-Even: ca. 22 Geräte/Monat bei ~3.500 EUR Fixkosten

### Revenue Streams
| Stream | Marge | Phase |
|--------|-------|-------|
| Handelsmarge Verkauf (Ankauf-Arbitrage) | 25–40% | MVP |
| Zubehör (Cases, Schutzglas, Ladekabel) | 60–80% | Phase 2 |
| Reparatur-Service (Display, Akku) | variabel | Phase 2 |
| B2B Bulk-Ankauf (Firmenhandys) | verhandelbar | Phase 3 |
| Subscription-Modell (Handy-Abo) | monatlich | Phase 3 |

### Steuerliches
- **Differenzbesteuerung (§25a UStG)** für gebrauchte Waren nutzen — spart Mehrwertsteuer auf die volle Handelsspanne
- IMEI-Check bei jedem Ankauf (CheckMEND, ~0,50 EUR/Stück)

---

## 3. VOLLSTÄNDIGE WEBSITE-STRUKTUR

### Öffentlicher Bereich
```
/ ................................ Homepage
  ├── /smartphones .............. → Redirect zu /smartphones/alle
  ├── /smartphones/:brand ....... Kollektion (apple, samsung, google, xiaomi, oneplus, alle)
  ├── /produkt/:slug ............ Produktdetail
  ├── /warenkorb ................ Warenkorb
  ├── /kasse .................... Checkout (3-Schritt: Adresse → Zahlung → Bestätigung)
  ├── /bestellung-bestaetigt .... Bestellbestätigung
  ├── /ankauf ................... Ankauf-Wizard (Preiskalkulator + Kontaktformular)
  ├── /ankauf/status ............ Ankauf-Status-Tracking (ID + E-Mail, kein Login nötig) [P1]
  ├── /suche .................... Suche
  ├── /garantie ................. Garantie-Informationsseite [P1]
  ├── /ueber-uns ................ Über uns / Team [P1]
  ├── /handy-verkaufen-berlin ... SEO-Landingpage [P1]
  ├── /iphone-kaufen-berlin ..... SEO-Landingpage [P2]
  └── Info & Legal:
      /faq, /kontakt, /impressum, /datenschutz, /agb, /widerruf

### Kunden-Account (Login erforderlich)
/konto .......................... Account-Übersicht
  ├── /konto (tab: overview) .... Dashboard
  ├── /konto (tab: orders) ...... Bestellhistorie
  ├── /konto (tab: ankauf) ...... Ankauf-Anfragen-Verlauf
  ├── /konto (tab: wishlist) .... Merkliste
  └── /konto (tab: settings) .... Profil & Adressen

### Admin-Bereich (Nur Betreiber, Login + Admin-Rolle)
/admin .......................... Dashboard (KPIs, Schnellübersicht)
  ├── /admin/produkte ........... Produktliste mit Filter ✅ implementiert
  ├── /admin/produkt/neu ........ Neues Gerät anlegen ✅ implementiert
  ├── /admin/produkt/:id ........ Gerät bearbeiten [P2]
  ├── /admin/ankauf ............. Ankauf-Anfragen-Verwaltung ✅ implementiert
  ├── /admin/ankauf/:id ......... Einzelne Anfrage Detail [P2]
  ├── /admin/bestellungen ....... Bestellverwaltung ✅ implementiert
  ├── /admin/bestellung/:id ..... Einzelne Bestellung Detail [P2]
  └── /admin/statistiken ........ Analytics & Reports [P2]
```

---

## 4. KERN-GESCHÄFTSPROZESSE

### Prozess A: ANKAUF (Kunde verkauft an PhoneEx)

```
ONLINE-EINSENDUNG:
1. Kunde öffnet /ankauf
2. Wählt Modell → Speicher → Zustand → Mängel
3. Sofortpreis wird angezeigt (bereits implementiert)
4. Kunde füllt Kontaktdaten + Auszahlungsmethode aus
5. Anfrage wird in DB gespeichert (Supabase) [fehlt]
6. Bestätigungs-E-Mail mit Versandlabel wird automatisch gesendet [fehlt]
7. Gerät kommt an → Admin setzt Status auf "received"
8. Admin prüft Gerät (Inspektion), aktualisiert ggf. Preis
9. Bei Preisanpassung: Kunde erhält E-Mail mit neuem Angebot [fehlt]
10. Kunde akzeptiert → Admin setzt auf "payout_pending" → Überweisung/PayPal
11. Auszahlung erfolgt, Datenlöschzertifikat per E-Mail [fehlt]
12. Status: completed

WALK-IN BERLIN:
1. Kunde kommt in Laden
2. Admin bewertet Gerät vor Ort (manuell in /admin/ankauf anlegen)
3. Sofortauszahlung Bar oder PayPal
4. IMEI-Check vor Ort zwingend
5. Quittung ausstellen

STATUSÜBERGÄNGE:
pending → label_sent → received → in_inspection → offer_made → offer_accepted → payout_pending → completed
                                                               → offer_rejected → returned
```

### Prozess B: VERKAUF (Kunde kauft bei PhoneEx)

```
1. Kunde browst Kollektion oder sucht über /suche
2. Produktdetail: Specs, Zustand, Garantieinfo, Akkugesundheit
3. In Warenkorb → Warenkorb-Drawer
4. Checkout (3 Schritte):
   a. Lieferadresse eingeben
   b. Zahlungsmethode (Stripe: Karte, SEPA; Klarna; PayPal)
   c. Übersicht bestätigen
5. Stripe verarbeitet Zahlung → Webhook bestätigt
6. Order in DB erstellt, Status: payment_received
7. Bestätigungs-E-Mail automatisch [fehlt]
8. Admin sieht Bestellung in /admin/bestellungen
9. Admin packt & sendet → Tracking-Code eingeben
10. Status: shipped → E-Mail mit Tracking-Link [fehlt]
11. Lieferung → delivered
12. 7 Tage später: Bewertungsanfrage per E-Mail [fehlt]

STATUSÜBERGÄNGE:
pending_payment → payment_received → processing → shipped → delivered
                                               → cancelled → refunded
                                                         → return_requested → returned
```

### Prozess C: PRODUKTANLAGE (Intern)

```
1. Gerät eingekauft (Ankauf von Kunde ODER Großhändler)
2. IMEI prüfen (nicht gestohlen, nicht gesperrt)
3. Technische Prüfung: Display, Akku, Kamera, Lautsprecher, Tasten, Sensoren
4. Akku-Kapazität messen (iOS: Einstellungen → Akku / Android: AccuBattery)
5. Gerät reinigen, ggf. reparieren
6. Zustand klassifizieren: Wie Neu / Exzellent / Sehr Gut / Gut / Akzeptabel
7. Fotos machen (min. 4: Front, Rück, Seite, ggf. Defekt-Foto)
8. In /admin/produkt/neu anlegen:
   - Alle Specs, Zustand, Akku%, Farbe, Speicher
   - Einkaufspreis (intern) → Marge-Kalkulation sichtbar
   - IMEI/Seriennummer hinterlegen
   - Bilder hochladen
   - Status: "draft" → prüfen → "active" (veröffentlichen)
9. Produkt erscheint im Shop

FELDER FÜR JEDES GERÄT:
Pflicht: Modell, Marke, Speicher, Zustand, Farbe, Preis, Einkaufspreis, Akku%, Lagerbestand, IMEI
Optional: Streichpreis, Badge, Interne Notizen, Lieferant, Beschreibung
```

---

## 5. ROLLEN & ZUGÄNGE

### Rolle: Admin / Betreiber
- **Zugang:** /admin (Login mit E-Mail + Passwort, Admin-Rolle in DB)
- **Kann:** Alle Produkte anlegen/bearbeiten/löschen, Ankauf-Anfragen verwalten, Bestellungen bearbeiten, Preise setzen, Status updaten
- **Dashboard-Aufgaben täglich:**
  - Neue Ankauf-Anfragen bearbeiten (Versandlabels senden)
  - Eingegangene Geräte prüfen & Angebote bestätigen
  - Neue Bestellungen verpacken & Tracking-Codes eingeben
  - Stornos/Rücksendungen bearbeiten

### Rolle: Staff / Mitarbeiter (Phase 2)
- **Zugang:** /admin (Login, eingeschränkte Rechte)
- **Kann:** Ankauf-Anfragen und Bestellungen einsehen & Status updaten. Produkte NICHT löschen, Preise NICHT ändern ohne Admin-Freigabe
- Implementierung: `role: "staff"` bereits im Typsystem definiert

### Rolle: Kunde (Registriert)
- **Zugang:** /konto (Login mit E-Mail + Passwort oder Magic Link)
- **Kann:** Bestellhistorie einsehen, Ankauf-Anfragen verfolgen, Merkliste pflegen, Adressen verwalten
- **Kann nicht:** Admin-Bereich, andere Kundendaten

### Rolle: Gast
- **Kann:** Kaufen (Checkout ohne Account), Ankauf-Anfrage stellen, Status per ID+E-Mail prüfen
- **Kann nicht:** Konto-Features

### Zugangsprinzip
```
Öffentlich:      /  /smartphones/* /produkt/* /suche /ankauf /faq /kontakt /legal/*
Gast-Checkout:   /kasse /bestellung-bestaetigt
Kunden-Login:    /konto/*
Admin-Login:     /admin/* (Route Guard + Supabase Auth + Admin-Rolle)
```

---

## 6. ADMIN-OBERFLÄCHE — KONZEPT

### Aktuell implementiert (Demo-Stand → Phase 1 ready)
- ✅ **Dashboard** (`/admin`): KPIs, Ankauf-Anfragen-Vorschau, Bestellungen-Vorschau, Produktbestand
- ✅ **Ankauf-Verwaltung** (`/admin/ankauf`): Vollständige Anfragenliste, Filter, Status-Workflow, Notizen
- ✅ **Bestellverwaltung** (`/admin/bestellungen`): Bestellliste, Filter, Status-Workflow, Tracking-Code-Eingabe
- ✅ **Produktliste** (`/admin/produkte`): Alle Produkte, Filter nach Marke/Zustand, Lagerbestand-Anzeige
- ✅ **Neues Gerät** (`/admin/produkt/neu`): Vollständiges Formular mit Marge-Kalkulation

### Nächste Admin-Features (Phase 2)
- **Produkt bearbeiten** (`/admin/produkt/:id`): Bestehendes Gerät editieren
- **Bild-Upload**: Direkt im Admin Fotos hochladen (Supabase Storage)
- **Ankauf-Preise pflegen**: Ankauf-Preistabelle (ANKAUF_MODELS) im Admin editierbar, nicht hardcoded
- **Statistiken** (`/admin/statistiken`): Recharts-basierte Ansicht, Umsatz/Marge/Ankauf-Volumen über Zeit
- **E-Mail-Vorlagen**: Texte für automatische Benachrichtigungen im Admin anpassen

### Admin-Workflow täglich (Empfehlung)
```
Morgens (10 min):
  1. /admin → Dashboard: Offene Ankäufe + neue Bestellungen prüfen
  2. Neue Ankauf-Anfragen: Versandlabel versenden, Status auf "label_sent"
  3. Neue Bestellungen: Verpacken, Tracking eingeben, Status auf "shipped"

Bei Geräteeingang:
  1. IMEI prüfen
  2. Gerät technisch prüfen (Protokoll)
  3. Status in /admin/ankauf auf "in_inspection"
  4. Zustand bestätigen oder Preis anpassen
  5. Status auf "offer_made" → Kunde erhält E-Mail

Wöchentlich:
  1. Lagerbestand prüfen (Produkte mit stock: 0 → inaktiv setzen)
  2. Preise bei langlaufenden Geräten (>30 Tage) prüfen und ggf. senken
  3. Google-Bewertungen beantworten
```

---

## 7. KUNDENFUNKTIONEN — KONZEPT

### Konto-Seite (`/konto`) — bereits implementiert als Demo
- **Übersicht**: Letzte Bestellungen, offene Ankauf-Anfragen, Merkliste-Vorschau
- **Bestellungen**: Status-Timeline, Tracking-Link, Rechnung downloadbar (Phase 2)
- **Ankäufe**: Anfrage-ID, Status-Timeline, Preisdetails, Kommunikation
- **Merkliste**: Gespeicherte Produkte, direkt in Warenkorb legen
- **Einstellungen**: Name, E-Mail, Telefon, Adressen verwalten

### Ankauf-Status ohne Login (`/ankauf/status`) [P1]
Kritisch für Nutzer die als Gast eine Anfrage stellen:
- Eingabefeld: Anfrage-ID + E-Mail-Adresse
- Zeigt: aktueller Status, Zeitstempel, nächste Schritte
- Kein Login nötig — senkt Hürde massiv

### Merkliste / Wishlist
- Aktuell: im localStorage als Array von Produkt-IDs
- Phase 2: DB-synchronisiert (Login erforderlich für Persistenz)

---

## 8. PRODUKTVERWALTUNG & GERÄT-WORKFLOW

### Produkt-Datenmodell (vollständig)
```typescript
// Öffentlich (im Shop sichtbar)
slug, title, brand, model, storage, condition, conditionColor,
price, oldPrice, badge, battery, stock, year, description, specs, images

// Intern (nur Admin)
purchaseCost, refurbishCost, margin,
serialNumber (IMEI), supplier, testedBy, testedAt,
internalNotes, status (draft/active/reserved/sold/in_repair/inactive),
listedAt, createdAt, updatedAt
```

### Produkt-Statusübergänge
```
draft → in_repair → active → reserved → sold
                 ↓
              inactive
```

### Grading-Standard (5 Stufen)
| Zustand | Beschreibung | Beispiel-Akku | Einsatz |
|---------|-------------|---------------|---------|
| Wie Neu | Keine Gebrauchsspuren, Originalzubehör | 95%+ | Direkt aus OVP |
| Exzellent | Kaum sichtbare Spuren | 90%+ | Sehr pfleglich genutzt |
| Sehr Gut | Minimale Kratzer, nur mit Lupe erkennbar | 85%+ | Normal genutzt |
| Gut | Leichte Kratzer sichtbar, keine Displayschäden | 80%+ | Täglich intensiv genutzt |
| Akzeptabel | Deutliche Kratzer, Display OK | 75%+ | Stark beansprucht |

### Ankauf-Preiskalkulationslogik (aktuell: Client-Side)
```
Ankaufpreis = Basis (Modell × Speicher) × Zustands-Multiplikator − Mängel-Abzüge
```
In Produktion: Server-seitig validieren (Stripe-Checkout-Analogie: keine clientseitigen Preise vertrauen)

---

## 9. TECHNISCHE ARCHITEKTUR

### Empfohlener Stack (Phase 1 → MVP)

```
FRONTEND (vorhanden):
├── Vite + React 18 + TypeScript
├── React Router v6
├── Tailwind CSS + Shadcn UI
├── TanStack Query (für API-Calls zu Supabase)
├── React Hook Form + Zod (Formulare)
└── Framer Motion, Recharts, Embla

BACKEND (hinzuzufügen):
├── Supabase (BaaS)
│   ├── PostgreSQL (Datenbank)
│   ├── Supabase Auth (E-Mail/Passwort + Magic Link)
│   ├── Row Level Security (Datenschutz)
│   ├── Supabase Storage (Produkt-Bilder)
│   └── Edge Functions (Stripe Webhooks, E-Mail-Trigger)
├── Stripe (Payments: Karte, SEPA, Klarna)
├── Resend (E-Mail: 3.000/Monat kostenlos)
└── Vercel (Hosting Frontend, kostenlos)
```

### Datenbank-Tabellen (PostgreSQL)

```sql
-- Produkte
products (
  id uuid PK, slug text UNIQUE, brand text, model text,
  storage text, condition text, price numeric, original_price numeric,
  purchase_cost numeric, battery_health int, stock int,
  is_active bool, images text[], specs jsonb, serial_number text,
  supplier text, internal_notes text, tested_by text, tested_at timestamptz,
  created_at timestamptz, updated_at timestamptz
)

-- Ankauf-Anfragen
ankauf_requests (
  id text PK, -- ANK-YYYYMMDD-NNN
  status text, device_model text, device_storage text, device_condition text,
  device_defects text[], quoted_price numeric, final_price numeric,
  seller_name text, seller_email text, seller_phone text,
  payout_method text, iban text, paypal_email text,
  tracking_code text, admin_notes text,
  label_sent_at timestamptz, received_at timestamptz, completed_at timestamptz,
  created_at timestamptz, updated_at timestamptz
)

-- Bestellungen
orders (
  id text PK, -- PHX-YYYYMMDD-NNN
  customer_id uuid FK users, status text,
  email text, phone text, shipping_address jsonb,
  items jsonb, subtotal numeric, shipping_cost numeric, total numeric,
  payment_method text, payment_intent_id text,
  shipping_method text, tracking_code text, carrier text,
  shipped_at timestamptz, delivered_at timestamptz,
  created_at timestamptz, updated_at timestamptz
)

-- Nutzerprofile
user_profiles (
  id uuid FK auth.users PK, email text, first_name text, last_name text,
  phone text, role text DEFAULT 'customer', -- 'customer' | 'admin' | 'staff'
  addresses jsonb[], wishlist uuid[],
  created_at timestamptz, last_login_at timestamptz
)
```

### API-Struktur (Supabase Client direkt + Edge Functions)

```
SUPABASE DIRECT (über TanStack Query):
  products.select() → Produktliste
  products.select().eq('slug', slug) → Produktdetail
  ankauf_requests.insert() → Ankauf-Anfrage speichern
  orders.select().eq('customer_id', userId) → Meine Bestellungen

SUPABASE EDGE FUNCTIONS (für sensible Operationen):
  POST /functions/create-checkout-session → Stripe Payment Intent
  POST /functions/stripe-webhook → Bestellung bestätigen nach Zahlung
  POST /functions/send-label-email → Versandlabel per E-Mail
  POST /functions/send-status-update → Ankauf-Status-Benachrichtigung
```

### Sicherheit
- RLS auf allen Tabellen: Kunden sehen nur eigene Daten
- Admin-Route-Guard: Check auf `user_profiles.role === 'admin'`
- Preisvalidierung server-seitig in Edge Function (nicht Client-Trust)
- IMEI-Check bei Ankauf-Eingang (CheckMEND API, ~0,50 EUR/Check)
- Stripe Webhook-Signatur-Verifizierung zwingend

### Kosten (Phase 1)
| Service | Kosten |
|---------|--------|
| Supabase Free Tier | 0 EUR/Monat |
| Vercel Hobby | 0 EUR/Monat |
| Resend Free | 0 EUR/Monat |
| Domain | ~1 EUR/Monat |
| Stripe | 1,5% + 0,25 EUR/Transaktion |
| **Gesamt fix** | ~1 EUR/Monat |

---

## 10. MVP-PRIORISIERUNG

### Phase 0 — Strukturelle Grundlage (✅ DONE — heute implementiert)
- ✅ AnkaufProvider in App.tsx eingebunden
- ✅ Ankauf-Formular mit AnkaufContext verbunden (speichert Anfragen in State)
- ✅ Auszahlungsmethode-Auswahl im Ankauf-Formular
- ✅ AdminLayout-Komponente mit Sidebar-Navigation
- ✅ `/admin/ankauf` — vollständige Ankauf-Verwaltung mit Status-Workflow
- ✅ `/admin/bestellungen` — vollständige Bestellverwaltung
- ✅ `/admin/produkte` — Produktliste mit Filter
- ✅ `/admin/produkt/neu` — vollständiges Produktanlage-Formular mit Marge-Kalkulation
- ✅ Alle fehlenden Admin-Routen in App.tsx registriert

### Phase 1 — MVP Backend (Wochen 1–3)
**Ziel: Erste echte Transaktion ist möglich**

```
WOCHE 1:
□ Supabase-Projekt erstellen
□ Schema deployen (products, ankauf_requests, orders, user_profiles)
□ Supabase Auth: Login/Register Modal (kein neues Page-Routing nötig)
□ Admin-Route-Guard implementieren

WOCHE 2:
□ Produkte: Mock-Daten durch echte DB-Calls ersetzen (TanStack Query)
□ Ankauf-Formular: Supabase insert() statt Context-State
□ Stripe: Payment Intent erstellen, Checkout abschließen
□ Stripe Webhook: Order in DB bestätigen

WOCHE 3:
□ Resend: Bestätigungs-E-Mails (Bestellung + Ankauf)
□ Resend: Versandlabel-E-Mail (manueller Trigger aus Admin)
□ Bild-Upload für Admin (Supabase Storage)
```

### Phase 2 — Betrieb & Conversion (Monate 2–3)
```
□ /ankauf/status — Status-Tracking ohne Login
□ /garantie — Separate Garantie-Seite
□ /ueber-uns — Über-uns-Seite
□ /handy-verkaufen-berlin — SEO-Landingpage
□ Admin: Produkt bearbeiten (/admin/produkt/:id)
□ Admin: Ankauf-Preistabelle im Admin editierbar
□ E-Mail-Sequenzen: Status-Updates für Ankauf, Tracking für Kauf
□ PayPal zu Stripe hinzufügen
□ Checkout: 3-Schritt statt Single-Page
□ Produktdetail: Echte Produktbilder (keine Unsplash-Platzhalter)
□ Trustpilot-Widget auf Homepage
□ Google Analytics + Search Console
```

### Phase 3 — Skalierung (ab Monat 4)
```
□ Admin/statistiken — Analytics-Dashboard
□ Kundenbewertungen auf Produktebene
□ Upsell-Logik im Checkout (Zubehör)
□ Preiskalkulator: Automatischer Marktpreisabgleich
□ B2B-Kontaktformular (Bulk-Ankauf)
□ Sitemap automatisch generieren
□ Zweiter Standort / nationaler Versand
```

---

## 11. ROADMAP — WIE DARAUS EIN ECHTES BUSINESS WIRD

```
JETZT (Phase 0) ──────────────────────────────────── DONE
  Strukturelle Frontend-Grundlage vollständig
  Admin-Unterseiten implementiert
  Context-Anbindung repariert

MONAT 1 (Phase 1) ────────────────────────────────── IN PROGRESS
  Supabase + Stripe anbinden
  Erste echte Transaktion
  Admin geschützt

MONAT 2–3 (Phase 2) ──────────────────────────────── PLANNED
  Vollständiger Betrieb möglich
  E-Mail-Benachrichtigungen automatisch
  SEO-Landingpages live
  Google Business Profile komplett

MONAT 4–6 (Phase 3) ──────────────────────────────── FUTURE
  30–50 Geräte/Monat aktiv
  Trustpilot-Profil mit 20+ Bewertungen
  Zweiter Standort oder nationaler Versand
  B2B-Geschäft beginnt

MONAT 7–12 (Scale) ───────────────────────────────── VISION
  80+ Geräte/Monat
  Eigene Reparaturwerkstatt
  Subscription-Modell getestet
  Bekannter Berliner Anbieter
```

---

## 12. WICHTIGSTE CONVERSION-ERKENNTNISSE

### Ankauf-Seite
1. **Preis VOR Kontaktdaten zeigen** — aktuell korrekt, beibehalten
2. **Prozessschritte visualisieren** (5-Schritte-Grafik vor dem Wizard)
3. **"Kein Nachverhandeln"-Garantie** prominent auf der Seite
4. **Social Proof**: "X Geräte bereits angekauft", letzte Auszahlungen
5. **"Preis 48h gültig"** — FOMO-Element, bereits im Footer des Preis-Cards

### Kaufseite
1. **Akku-Gesundheit prominent** — Käufer fragen das immer zuerst
2. **Grading-Tabelle** — Was bedeutet "Sehr Gut" konkret?
3. **Garantie-Badge unter dem Preis** — nicht nur im Header versteckt
4. **Preisanker**: Originalpreis (z.B. 1.199 €) → PhoneEx-Preis (449 €) → "Du sparst 750 €"
5. **PayPal fehlt** — 30% der deutschen Online-Käufer kaufen ausschließlich per PayPal

### Allgemein
- **Über-uns-Seite fehlt** — kritisch für Ankauf-Vertrauen ("Wem schicke ich mein Handy?")
- **Google Business Profile** — wichtigster SEO-Hebel für lokale Suchen
- **Trustpilot** — Jede Transaktion = Bewertungsanfrage (automatisieren)

---

*Dieses Dokument wird mit dem Projekt weiterentwickelt. Nächste Überarbeitung nach Phase-1-Launch.*
