async function fetchChartData() {
    const response = await fetch('./rsc/data.json'); // Fetch the JSON file
    const data = await response.json();
    return data;
}

async function renderChart() {
    const chartData = await fetchChartData();

    const ctx = document.getElementById('chart').getContext('2d');
    new Chart(ctx, {
        type: 'line', // Line chart
        data: {
            labels: chartData.labels, // Labels from the JSON file
            datasets: [
                {
                    label: 'Mustertrinker',
                    data: chartData.Mustertrinker, // First dataset values
                    backgroundColor: 'rgba(0, 0, 255, 0.1)', // Blue fill color
                    borderColor: 'rgb(0, 0, 255)', // Blue line color
                    borderWidth: 2,
                    tension: 0.4
                },
                {
                    label: 'Leo',
                    data: chartData.Leo, // Second dataset values
                    backgroundColor: 'rgba(255, 0, 0, 0.1)', // Red fill color
                    borderColor: 'rgb(255, 0, 0)', // Red line color
                    borderWidth: 2,
                    tension: 0.4
                },
                {
                    label: 'Luis',
                    data: chartData.Luis, // Third dataset values
                    backgroundColor: 'rgba(0, 255, 0, 0.1)', // Green fill color
                    borderColor: 'rgb(0, 255, 0)', // Green line color
                    borderWidth: 2,
                    tension: 0.4
                },
                {
                    label: 'Finn',
                    data: chartData.Finn, // Fourth dataset values
                    backgroundColor: 'rgba(255, 165, 0, 0.1)', // Orange fill color
                    borderColor: 'rgb(255, 165, 0)', // Orange line color
                    borderWidth: 2,
                    tension: 0.4
                },
                {
                    label: 'Timon',
                    data: chartData.Timon, // Fifth dataset values
                    backgroundColor: 'rgba(128, 0, 128, 0.1)', // Purple fill color
                    borderColor: 'rgb(128, 0, 128)', // Purple line color
                    borderWidth: 2,
                    tension: 0.4
                },
                {
                    label: 'Ben',
                    data: chartData.Ben, // Sixth dataset values
                    backgroundColor: 'rgba(0, 255, 255, 0.1)', // Cyan fill color
                    borderColor: 'rgb(0, 255, 255)', // Cyan line color
                    borderWidth: 2,
                    tension: 0.4
                },
                {
                    label: 'Lara',
                    data: chartData.Lara, // Seventh dataset values
                    backgroundColor: 'rgba(255, 192, 203, 0.1)', // Pink fill color
                    borderColor: 'rgb(255, 192, 203)', // Pink line color
                    borderWidth: 2,
                    tension: 0.4
                },
                {
                    label: 'Ilke',
                    data: chartData.Ilke, // Eighth dataset values
                    backgroundColor: 'rgba(128, 128, 128, 0.1)', // Gray fill color
                    borderColor: 'rgb(128, 128, 128)', // Gray line color
                    borderWidth: 2,
                    tension: 0.4
                },
                {
                    label: 'Adrian',
                    data: chartData.Adrian, // Ninth dataset values
                    backgroundColor: 'rgba(255, 255, 0, 0.1)', // Yellow fill color
                    borderColor: 'rgb(255, 255, 0)', // Yellow line color
                    borderWidth: 2,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            spanGaps: true,
            plugins: {
                legend: {
                    display: true, // Show the legend
                    position: 'bottom' // Position the legend at the bottom
                },
                title: {
                    display: true, // Enable the title
                    text: 'Promille Tracker', // Title text
                    font: {
                        size: 18, // Font size for the title
                    },
                    padding: {
                        top: 10,
                        bottom: 10
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true, // Show the x-axis title
                        text: 'Zeit' // Label for the x-axis
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true, // Show the y-axis title
                        text: 'Promille' // Label for the y-axis
                    }
                }
            }
        }
    });
}

renderChart();

const canvas = document.getElementById('chart');
canvas.height = 90; // Set the height to 100px