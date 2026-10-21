import os
import json
import urllib.parse
import urllib.request
from datetime import datetime

# 1. Zugangsdaten zu GitHub Secrets lesen
client_id = os.environ["STRAVA_CLIENT_ID"]
client_secret = os.environ["STRAVA_CLIENT_SECRET"]
refresh_token = os.environ["STRAVA_REFRESH_TOKEN"]

# 2. Access Token bei Strava anfordern
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
new_refresh_token = tokens["refresh_token"]

with open("/tmp/strava_refresh_token", "w") as file:
    file.write(new_refresh_token)

# 3. Alle Aktivitäten seitenweise abrufen 
activities = []
page = 1

while True:
    url = (
        "https://www.strava.com/api/v3/athlete/activities"
        f"?page={page}&per_page=200"
    )

    request = urllib.request.Request(
        url, 
        headers={"Authorization": f"Bearer {access_token}"}
    )

    with urllib.request.urlopen(request) as response:
        batch = json.load(response)

    if not batch:
        break

    activities.extend(batch)
    page += 1

# 4. Nur Laufaktivitäten übernehmen
runs = []

for activity in activities:
    if activity.get("sport_type", activity.get("type")) != "Run":
    continue

    distance_km = activity["distance"] / 1000
    moving_seconds = activity["moving_time"]

    if distance_km <= 0 or moving_seconds <= 0:
        continue

    runs.append({
    "id": activity["id"],
    "name": activity["name"],
    "date": activity["start_date_local"][:10],
    "distance": round(distance_km, 2),
    "duration": moving_seconds,
    "type": "Run"
    })

# 5. Neuste Läufe zuerst sortieren
runs.sort(key=lambda run: run["date"], reverse=True)

# 6. Daten für die Website speichern
with open("data/activities.json", "w", encoding="utf-8") as file:
    json.dump(runs, file, ensure_ascii=False, indent=2)

print(f"{len(runs)} Läufe erfolgreich aufbereitet.")
print("data/activities.json wurde aktualisiert.")

# 7. Neuen Refresh Token sicher für den Workflow bereitstellen
with open("/tmp/strava_refresh_token", "w") as file:
    file.write(new_refresh_token)
