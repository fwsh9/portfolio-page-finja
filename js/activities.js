async function loadActivities() {
    try {
        // JSON-Datei laden
        const response = await fetch("data/activities.json");

        if (!response.ok)
            throw new Error("Laufdaten konnten nicht geladen werden");
    }

    const activities = await response.json();

    // Container auf der Website suchen
    const container = document.getElementById("recent-runs");

    if (!container) {
        return;
    }

    // Die letzten Läufe anzeigen
    activities.forEach(activity => {
        const run = document.createElement("div");
        run.classList.add("run-card");

        const minutes = Math.floor(activity.duration / 60);

        run.textContent = 
            `${activity.name} | ${activity.date} | ` +
            `${activity.distance) km | ${minutes} Minuten`;
            
        container.appendChild(run);
    });

    } catch (error) {
     console.error("Fehler beim Laden:", error);
    }
}

loadActivities ():