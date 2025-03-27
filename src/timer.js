timer();

async function timer() {
    const events = await fetchEventData(); // Fetch the events from the JSON file

    let CurrentEvent = findCurrentEvent(events.events); // Find the current event
    let countdownTime = extractDate(CurrentEvent) - new Date(); // Calculate the countdown time
    
    let timerInterval = setInterval(updateTimer, 1000); // Start the timer
    let eventInterval = setInterval(updateEvent, 1000); // Start the timer
    updateTimer();
    updateEvent();


    function findCurrentEvent(events) {
        for (let i = 0; i < events.length; i++) {
            const event = events[i];
            if (extractDate(event) > new Date()) {
                return event;
            }
        }
        return null;
    }
    function extractDate(event) {
        const date = new Date();
        date.setFullYear(event.date.slice(6));
        date.setMonth(parseInt(event.date.slice(3,5))-1);
        date.setDate(event.date.slice(0,2));
        date.setHours(event.time.slice(0,2), event.time.slice(3,5), event.time.slice(6), 0);
        return date;
    }
    async function fetchEventData() {
        const response = await fetch('./rsc/events.json'); // Fetch the JSON file
        const events = await response.json();
        return events;
    }
    function updateTimer() {
        if (countdownTime <= 0) {
            CurrentEvent = findCurrentEvent(events.events);
            clearInterval(timerInterval); // Stop the timer
            return;
        }

        countdownTime -= 1000; // Decrement the countdown time
        const hours = Math.floor((countdownTime / (1000 * 60 * 60)));
        const minutes = Math.floor((countdownTime / (1000 * 60)) % 60);
        const seconds = Math.floor((countdownTime / 1000) % 60);

        document.getElementById('timer').textContent =
            `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
    function updateEvent() {
        const event = document.getElementById('event');
        const nextEvent = document.getElementById('nextEvent');
        if(CurrentEvent.text != "subevents"){
            event.textContent = CurrentEvent.text;
            nextEvent.textContent = "";
        } else {
            let nextSubEvent = findCurrentEvent(CurrentEvent.subevents);
            let subEvent = CurrentEvent.subevents[indexOf(nextSubEvent)-1];   
            event.textContent = subEvent.text || '';
            nextEvent.textContent = "Nächstes Event: " + nextSubEvent.text || '';
        }
    }
}