async function loadActivities() {
  const container = document.getElementById("recent-runs-list");

  if (!container) return;

  try {
    const response = await fetch("data/activities.json");

    if (!response.ok) {
      throw new Error("Laufdaten konnten nicht geladen werden");
    }

    const activities = await response.json();

    // Nur die drei neuesten Läufe auswählen
    const latestRuns = activities
      .filter((activity) => activity.type === "Run")
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 3);

    container.replaceChildren();

    if (latestRuns.length === 0) {
      container.textContent = "Noch keine Läufe vorhanden.";
      return;
    }

    latestRuns.forEach((activity) => {
      const card = document.createElement("article");
      card.classList.add("run-card");

      const title = document.createElement("h3");
      title.textContent = activity.name;

      const date = document.createElement("p");
      date.classList.add("run-date");
      date.textContent = new Date(
        activity.date + "T12:00:00",
      ).toLocaleDateString("de-CH");

      const distance = document.createElement("p");
      distance.classList.add("run-distance");
      distance.textContent = `${Number(activity.distance).toFixed(2)} km`;

      // Dauer in Sekunden in Stunden, Minuten, Sekunden umrechnen
      const duration = Number(activity.duration);
      const hours = Math.floor(duration / 3600);
      const minutes = Math.floor((duration % 3600) / 60);
      const seconds = Math.floor(duration % 60);

      const time =
        hours > 0
          ? `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
          : `${minutes}:${String(seconds).padStart(2, "0")}`;

      const durationText = document.createElement("p");
      durationText.textContent = `Dauer: ${time}`;

      // Pace in Minuten pro Kilometer berechnen
      const paceText = document.createElement("p");
      const km = Number(activity.distance);

      if (km > 0) {
        const paceSeconds = Math.round(duration / km);
        const paceMinutes = Math.floor(paceSeconds / 60);
        const remainingSeconds = paceSeconds % 60;

        paceText.textContent = `Pace: ${paceMinutes}:${String(remainingSeconds).padStart(2, "0")} min/km`;
      } else {
        paceText.textContent = "Pace: –";
      }

      card.append(title, date, distance, durationText, paceText);
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Fehler beim Laden:", error);
    container.textContent = "Die Laufdaten konnten nicht geladen werden.";
  }
}

loadActivities();
