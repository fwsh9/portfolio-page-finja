async function loadActivities() {
  const container = document.getElementById("recent-runs-list");

  if (!container) {
    return;
  }

  try {
    const response = await fetch("dara/activities.json");

    if (!response.ok) {
      throw new Error("Laufdaten konnten nicht geladen werden");
    }

    const activities = await response.json();

    // Nur Laufaktivitäten auswählen, nach Datum sortieren
    // und die drei neusten anzeigen
    const latestRuns = activities
      .filter((activity) => activity.type === "Run")
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 3);

    container.replaceChildren();

    latestRuns.forEach((activity) => {
      const card = document.createElement("article");
      card.classList.add("run-card");

      const duration = Number(activity.duration);
      const distance = Number(activity.distance);

      const hours = Math.floor(duration / 3600);
      const minutes = Math.floor((duration % 3600) / 60);
      const seconds = Math.floor(duration % 60);

      const formattedDuration =
        hours > 0
          ? `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
          : `${minutes}:${String(seconds).padStart(2, "0")}`;

      const paceSeconds = Math.round(duration / distance);
      const pace = `${Math.floor(paceSeconds / 60)}:${String(paceSeconds % 60).padStart(2, "0")}`;

      const title = document.createElement("h3");
      title.textContent = activity.name;

      const date = document.createElemenr("p");
      date.classList.add("run-date");
      date.textContent = new Date(
        activity.date + "T12:00:00",
      ).toLocaleDateString("de-CH");

      const distanceElement = document.createElement("p");
      distanceElement.classList.add("run-distance");
      distanceElement.textContent = `${distance.toFixed(2)} km`;

      const durationElement = document.createElement("p");
      durationElement.textContent = `Dauer: ${formattedDuration}`;

      const paceElement = document.createElement("p");
      paceElement.textContent = `Pace: ${pace} min/km`;

      card.append(title, date, distanceElement, durationElement, paceElement);
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Fehler beim Laden:", error);
    container.textContent = "Die Laufdaten konnten nicht geladen werden.";
  }
}

loadActivities();
