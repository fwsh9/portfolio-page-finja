
import os
import json
import urllib.parse
import urllib.request

# Zugangsdaten aus GitHub Secrets lesen
client_id = os.environ["STRAVA_CLIENT_ID"]
client_secret = os.environ["STRAVA_CLIENT_SECRET"]
refresh_token = os.environ["STRAVA_REFRESH_TOKEN"]

# Einen gültigen Access Token anfordern
token_data = urllib.parse.urlencode({
    "client_id": client_id,
    "client_secret": client_secret,
    "refresh_token": refresh_token,
    "grant_type": "refresh_token"
}).encode("utf-8")

token_request = urllib.request.Request(
    "https://www.strava.com/oauth/token",
    data=token_data,
    method="POST"
)

with urllib.request.urlopen(token_request) as response:
    tokens = json.load(response)

access_token = tokens["access_token"]

print("Authentifizierung bei Strava erfolgreich.")

# Die letzten drei Aktivitäten abrufen
activities_request = urllib.request.Request(
    "https://www.strava.com/api/v3/athlete/activities?per_page=3",
    headers={"Authorization": f"Bearer {access_token}"}
)

with urllib.request.urlopen(activities_request) as response:
    activities = json.load(response)

print(f"API-Verbindung erfolgreich. {len(activities)} Aktivitäten abgerufen.")

# Nur allgemeine Informationen ausgeben
for activity in activities:
    print(
        "Aktivität:",
        activity.get("type"),
        "| Distanz (km):",
        round(activity.get("distance", 0) / 1000, 2)
    )

# Prüfen, ob Strava einen anderen Refresh Token geliefert hat
if tokens.get("refresh_token") != refresh_token:
    print("Hinweis: Strava hat einen neuen Refresh Token geliefert.")
    print("Dieser muss für die nächste Synchronisation sicher gespeichert werden.")
