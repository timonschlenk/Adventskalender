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
    {text: "Kennenlernbierchen 12:00 Uhr", time: 23},
    {text: "Trichter Bauen 13:00 - 16:00 Uhr", time: 22},
    {text: "Luis vom Banhof abholen 17:00 Uhr", time: 19},
    {text: "Fußballturnier 18:00 Uhr", time: 18},
    {text: "Flunkyball 19:00 Uhr", time: 17},
    {text: "Döner Essen gehen 20:00 Uhr", time: 16},
    {text: "Film schauen 21:00 -23:00 Uhr", time: 15},
    {text: "Mitternachtsbierchen 00:00 Uhr", time: 12},
    {text: "Flunkyball 01:00", time: 11},	
    {text: "Brot backen 02:22 Uhr", time: 10},
    {text: "Deichscheissatest 03:00 - 07:00 Uhr", time: 9},
    {text: "Mathe Abi rechnen 08:00 Uhr", time: 4},
    {text: "Frühstück holen gehen mit Wegbier 09:00 Uhr", time: 3},
    {text: "Frühstücksbier 10:00 Uhr", time: 2},
    {text: "Brot backen 11:11", time: 1},
    {text: "Gute Nacht Bierchen 12:00 Uhr", time: 0},
    {text: "Taktische Schlafpause", time: -1},
    {text: "", time: -2}
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
            document.getElementById('event').textContent = events.find(event => event.time === -1)?.text || '';
            document.getElementById('nextEvent').textContent = "";
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