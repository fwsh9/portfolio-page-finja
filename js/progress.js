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

    //Kilomterdiagramm erstellen
    createDistanceChart(runs);
    
  } catch (error) {
    console.error("Fehler beim Laedn der Laufstatistiken:", error);
  }
}


function createDistanceChart(runs) {
  // Kilometer pro Monat zusammenzählen
  const monthlyDistances = {};

  runs.forEach((run) => {
    const month = run.date.slice(0, 7);

    if (!monthlyDistances[month]) {
      monthlyDistances[month] = 0;
    }

    monthlyDistances[month] += Number(run.distance);
  });

  //Monate chronologisch sortieren
  const months = Object.keys(monthlyDistances).sort();

  //Monatsnamen für die X-Achse formatieren
  const labels = months.map((month) => {
    const [year, monthNumber] = month.split("-");

    return new Date(
      Number(year),
      Number(monthNumber) -1,
      1
    ).toLocaleDateString("de-CH", {
      month: "short",
      year: "numeric"
    });
  });

  //Kilometer in derselben Reihenfolge
  const distances = months.map(
    (month) => Number(monthlyDistances[month].toFixed(2))
  );

  //Diagramm erstellen
  const canvas = document.getElementById("distance-chart");

  new Chart(canvas, {
    type: "bar",
    data: {
      labels: labels, 
      datasets: [{
        label: "Gelaufene Kilometer",
        data: distances,
        backgroundColor: "#245b61",
        borderRadius: 6
      }]
    },
    options: {
      responsive: true, 
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true, 
            text: "Kilometer"
          }
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });
}

// Funktion beim Laden der Seite ausführen
loadProgress();
