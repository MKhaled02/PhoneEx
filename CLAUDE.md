# CLAUDE.md — PhoneCorpAI Multi-Agent Strategie

## Projekt-Kontext
Handy Ankauf & Verkauf Website — Berlin, Deutschland.
Tech-Stack: React/Next.js, Tailwind CSS, TypeScript.
Sprache: Deutsch (UI + Kommentare), Englisch (Variablennamen).

## Rollen-Perspektiven
Wende bei jeder Aufgabe automatisch diese Fachperspektiven an:

### 🎨 Frontend & Design
- Conversion-optimierte Komponentenstruktur
- Visuelle Hierarchie, Farbpalette, Typographie
- React + Tailwind Best Practices

### 📊 Business & Strategie
- Seitenstruktur basierend auf User Journey (Ankauf-Flow, Verkauf-Flow)
- USPs: Faire Preise, schnelle Abwicklung, lokale Präsenz Berlin
- Wettbewerb: rebuy, Momox, eBay Kleinanzeigen

### 🧠 Psychology & CRO
- Cialdini-Prinzipien (Social Proof, Scarcity, Authority)
- Loss Aversion bei Preisdarstellung
- FOMO-Elemente, Preis-Anchoring, Trust-Signale

### 📈 Marketing & SEO
- Local SEO Berlin Keywords (z.B. "Handy verkaufen Berlin", "gebrauchtes iPhone kaufen")
- Meta-Tags, strukturierte Daten, OpenGraph
- Core Web Vitals Optimierung

### ✍️ Copywriting
- Deutschsprachig, prägnant, verkaufsstark
- Hero-Headlines mit Emotion + Aktion
- CTAs die Dringlichkeit erzeugen

### ⚖️ Legal & Compliance
- DSGVO-konform (Cookie-Consent, Datenschutzerklärung)
- Impressum, Widerrufsrecht, AGB für Ankauf/Verkauf
- Jugendschutz bei Geräteankauf

### 📱 Mobile Experience
- Mobile-First Design (>70% Traffic)
- Touch-optimierte Interaktionen
- PWA-Features wo sinnvoll

## Code-Konventionen
- Komponenten: PascalCase, funktional mit Hooks
- Dateien: kebab-case.tsx
- Styling: Tailwind Utility Classes, keine inline styles
- State: React State + Context, kein Redux nötig
- API: Server Actions oder API Routes in Next.js App Router
- Typen: TypeScript strict mode, Interfaces > Types

## Qualitätskriterien (Critic-Perspektive)
Prüfe jeden Output auf:
- ✅ Conversion-Relevanz (führt es zu mehr Ankäufen/Verkäufen?)
- ✅ Mobile-Tauglichkeit
- ✅ SEO-Impact
- ✅ DSGVO-Konformität
- ✅ Performance (keine unnötigen Dependencies, Lazy Loading)
- ✅ Barrierefreiheit (aria-labels, Kontraste, Tastaturnavigation)

## Iterations-Workflow
1. Implementiere die Aufgabe
2. Reviewe aus allen Perspektiven oben
3. Verbessere basierend auf dem Review
4. Teste (lint, type-check, build)
