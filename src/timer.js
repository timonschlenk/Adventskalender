async function fetchCountdownTime() {
    const response = await fetch('/api/countdownTime');
    const data = await response.json();
    return data.countdownTime;
}

// Save the countdownTime to the server
async function saveCountdownTime(countdownTime) {
    await fetch('/api/countdownTime', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ countdownTime })
    });
}

const events = [
    {text: "Kennenlernbierchen", time: 23},
    {text: "Baumarkt", time: 22},
    {text: "Trichter Bauen", time: 21},
    {text: "Trichter Bauen", time: 20},
    {text: "Einweihung mit Luis", time: 19},
    {text: "FlunkyBall", time: 18},
    {text: "Trink-Kopf", time: 17},
    {text: "Rage Cage", time: 16},
    {text: "Trink mal Kurz", time: 15},
    {text: "Cluuurb", time: 14},
    {text: "Cluuurb", time: 13},
    {text: "Tik Tok Challenge", time: 12},
    {text: "Deichscheissa Test", time: 11},	
    {text: "Flunkyball", time: 10},
    {text: "Trinkkopf", time: 9},
    {text: "Blutskat", time: 8},
    {text: "Deichscheissatest Teil 2", time: 7},
    {text: "Deichscheissatest Teil 3", time: 6},
    {text: "Deichscheissatest Teil 4", time: 5},
    {text: "Rage Cage", time: 4},
    {text: "Bierpong", time: 3},
    {text: "Mathe Abi Rechnen", time: 2},
    {text: "Trichter", time: 1},
    {text: "Gute Nacht Bierchen", time: 0},
    {text: "Taktische Schlafpause", time: -1}
];

const countdownTotal = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
let countdownTime = null;

async function initializeTimer() {
    countdownTime = await fetchCountdownTime();

    if (!countdownTime) {
        // If no countdownTime exists on the server, set a new one
        countdownTime = countdownTotal;
        await saveCountdownTime(Date.now() + countdownTime); // Save the end time as a timestamp
    } else {
        countdownTime = parseInt(countdownTime, 10) - Date.now(); // Calculate remaining time
    }
    console.log(countdownTime);

    function updateTimer() {
        if (countdownTime <= 0) {
            document.getElementById('timer').textContent = "00:00:00";
            clearInterval(timerInterval);
            return;
        }

        countdownTime -= 1000; // Decrement the countdown time
        const hours = Math.floor((countdownTime / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((countdownTime / (1000 * 60)) % 60);
        const seconds = Math.floor((countdownTime / 1000) % 60);

        updateEvent(hours);

        document.getElementById('timer').textContent =
            `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    function updateEvent(hours) {
        const event = document.getElementById('event');
        const nextEvent = document.getElementById('nextEvent');
        event.textContent = events.find(event => event.time === hours)?.text || '';
        nextEvent.textContent = "Nächstes Event: " + events.find(event => event.time === hours-1)?.text || '';
    }
    // Update the timer every second
    const timerInterval = setInterval(updateTimer, 1000);
    updateTimer(); // Initial call to display the timer immediately
}

initializeTimer();