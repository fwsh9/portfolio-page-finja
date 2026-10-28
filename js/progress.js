async function loadProgress() {
  try {
    //Laufdaten aus der JSON-Datei laden
    const response = await fetch("data/activities.json");

    if (!response.ok) {
      throw new Error("Laufdaten konnten nicht geladen werden.");
    }

    const activities = await response.json();

    // Nur Laufeinheiten berücksichtigen
    const runs = activities.filter((activity) => activity.type === "Run");

    // Anzahl der Läufe
    const totalRuns = runs.length;

    //Gesamtdistanz in Kilometern
    const totalDistance = runs.reduce(
      (sum, run) => sum + Number(run.distance),
      0,
    );

    // Durchschnittliche Distanz pro Lauf
    const averageDistance = totalRuns > 0 ? totalDistance / totalRuns : 0;

    // Zahlen im Schweizer Format darstellen
    const formatDistance = (value) =>
      `${value.toLocaleString("de-CH", {
        minimumFractionDigits: 2,
        minimumFractionDigits: 2,
      })} km`;

    // Berechnete Werte in die HTML-Karten einfügen
    document.getElementById("total-distance").textContent =
      formatDistance(totalDistance);

    document.getElementById("total-runs").textContent =
      totalRuns.toLocaleString("de-CH");

    document.getElementById("average-distance").textContent =
      formatDistance(averageDistance);
  } catch (error) {
    console.error("Fehler beim Laedn der Laufstatistiken:", error);
  }
}

// Funktion beim Laden der Seite ausführen
loadProgress();
