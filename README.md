# Routen Berechnung Server

Automatisch deployt auf diesem Server [http://78.47.81.216/](http://78.47.81.216/). *Nur über HTTP erreichnar*

## Getting started

1. Install dependencies
    ```
    npm install
    ```
2. Start server
    ```
    npm start
    ```

// ?waypoints=46.9546447,7.3537365&waypoints=47.3774735,8.4587986

## New Version TRSI

1. Bei einem Git Push wird nun automatisch die Applikation auf dem Linux Server von Livio deployed und im Docker laufen gelassen.
2. Alle Deploy Konfiguration befinden sich unter .github/workflows/deploy.yml
3. Geändert wurde noch das Layout unter styles --> Habe überall ein bak file gemacht. Ebenfalls habe ich das Routing gefixt mit den Bulletpoints, sollte nun funktionieren.
4. Routing mit Namen

4. ToDo:
- Adressfelder Vorschläge --> Browserseitig
- Häufigste Suchanfragen
- SQL Injection Angriffe verhindern.
- Tests müssen funktionieren
- API Endpoint zum speichern von persönlichen Routen. --> Dokumentation mit Swagger
