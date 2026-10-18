# portfolio-page-finja

# Mein Lauftagebuch – EWEB-Projekt
# Website: https://fwsh9.github.io/portfolio-page-finja/
## Projektbeschreibung

Im Rahmen des Moduls **EWEB** an der Berner Fachhochschule (BFH) entwickle ich eine persönliche Website zur Dokumentation und Visualisierung meiner Laufaktivitäten, Trainingsfortschritte und Wettkämpfe.

Die Website wird mit HTML, CSS und JavaScript umgesetzt und über GitHub verwaltet. Für die Darstellung meiner Laufdaten ist eine Anbindung an Strava geplant.

## Geplante Funktionen

- **Startseite:** Begrüssung, Countdown zum nächsten Wettkampf, letzte Läufe und Kontaktformular für gemeinsame Läufe
- **Fortschritt:** Visualisierung von Laufstatistiken und Trainingsfortschritten
- **Training:** Darstellung des Trainingsplans
- **Wettkämpfe:** Übersicht über vergangene und geplante Wettkämpfe
- **Datenintegration:** Einbindung tatsächlicher Laufdaten über Strava

---

## Entwicklungsprotokoll

### Vorarbeiten (Datum nicht vollständig dokumentiert)

**Projektplanung und Konzeption**

- Projektidee einer persönlichen Running-Website entwickelt
- Grundlegende Funktionen und Inhalte der Website definiert
- Vier Hauptseiten festgelegt: Home, Progress, Training und Races
- Strava als mögliche Datenquelle für die dynamische Darstellung der Laufaktivitäten ausgewählt
- GitHub-Repository `portfolio-page-finja` eingerichtet und lokal in Visual Studio Code geklont

**Vorbereitung der Laufdaten**

- Datenexport aus Adidas Running angefordert und heruntergeladen
- Passwortgeschütztes Exportarchiv mit 7-Zip entpackt
- Struktur der exportierten Sport-Sessions, GPS- und Herzfrequenzdaten untersucht
- JSON- und GPX-Dateien als relevante Datenformate identifiziert
- Eine Beispielaktivität analysiert und die enthaltenen Trainingsdaten überprüft
- GPX-Dateien aus Adidas Running für den Import in Strava verwendet
- Laufaktivitäten bis einschliesslich 22.01.2026 in Strava importiert
- Weiteren Import aufgrund des täglichen Upload-Limits vorübergehend pausiert

### 17.10.2026 – Projektstruktur und HTML-Grundgerüst

**Projektorganisation**

- Lokales Git-Repository in Visual Studio Code bearbeitet
- Grundlagen der Git-Befehle `status`, `add`, `commit`, `push` und `pull` kennengelernt
- Umgang mit dem PowerShell-Terminal geübt
- Erstellung, Umbenennung, Verschiebung und Löschung von Dateien und Ordnern über das Terminal erarbeitet
- Probleme mit nicht gespeicherten Änderungen vor dem Git-Push behoben

**Datei- und Ordnerstruktur**

- HTML-Dateien für die vier geplanten Seiten angelegt #Test
- Ordner `css`, `js` und `data` erstellt
- CSS-Datei in den Ordner `css` verschoben
- JavaScript-Datei in den Ordner `js` verschoben
- Verknüpfungen zwischen HTML, CSS und JavaScript vorbereitet
- `index.html` als Startseite beibehalten, um die spätere Veröffentlichung über GitHub Pages zu ermöglichen

**HTML-Entwicklung**

- Grundlegenden Aufbau eines HTML-Dokuments erarbeitet
- Bedeutung von `DOCTYPE`, `html`, `head`, `body` und Metadaten kennengelernt
- Hauptsprache der Website auf Deutsch festgelegt
- Navigationsstruktur für alle vier Seiten vorbereitet
- HTML-Grundstruktur der Startseite mit folgenden Bereichen erstellt:
  - Begrüssung und Projektvorstellung
  - Nächster Wettkampf mit Platzhalter für einen Countdown
  - Letzte Laufaktivitäten mit Platzhalter für die Datenintegration
  - Formular für gemeinsame Läufe
  - Footer mit Projektinformationen
- HTML-Elemente und Attribute wie `section`, `div`, `class`, `id`, `form`, `input`, `label` und `required` kennengelernt

**Aktueller Projektstand**

- Grundlegende Projektstruktur angelegt
- HTML-Code für die Startseite vorbereitet
- Dynamische Funktionen und endgültiges Design noch ausstehend
- Strava-Datenimport teilweise abgeschlossen

---

## Nächste Schritte

- [ ] CSS-Design und Layout der Startseite entwickeln
- [ ] Navigation und Darstellung auf verschiedenen Bildschirmgrössen optimieren
- [ ] Countdown zum nächsten Wettkampf mit JavaScript implementieren
- [ ] Restliche Laufaktivitäten in Strava importieren
- [ ] Möglichkeiten der Strava-API-Anbindung prüfen und testen
- [ ] Laufaktivitäten auf der Startseite dynamisch darstellen
- [ ] Fortschrittsseite mit Laufstatistiken und Diagrammen entwickeln
- [ ] Trainingsseite erstellen
- [ ] Wettkampfseite erstellen
- [ ] Kontaktformular technisch umsetzen oder geeignete Alternative wählen
- [ ] Website über GitHub Pages veröffentlichen

---

## Technologien

| Technologie        | Verwendung                                 |
| ------------------ | ------------------------------------------ |
| HTML5              | Struktur und Inhalte der Website           |
| CSS3               | Gestaltung und responsives Layout          |
| JavaScript         | Interaktive und dynamische Funktionen      |
| Git                | Versionsverwaltung                         |
| GitHub             | Repository und spätere Veröffentlichung    |
| Visual Studio Code | Entwicklungsumgebung                       |
| PowerShell         | Terminal und Dateiverwaltung               |
| Strava             | Geplante Datenquelle für Laufaktivitäten   |
| GPX / JSON         | Export- und Austauschformate der Laufdaten |

## Repository

[GitHub – portfolio-page-finja](https://github.com/fwsh9/portfolio-page-finja)
