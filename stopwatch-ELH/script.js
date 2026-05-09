// =========================
// State Definitions
// =========================

const STATES = {
    INIT: 'Init',
    RUNNING: 'Running',
    PAUSE: 'Pause'
};

// =========================
// DOM Elements
// =========================

const counter = document.getElementById('counter');
const startBtn = document.getElementById('startBtn');
const clearBtn = document.getElementById('clearBtn');

// =========================
// Stopwatch Variables
// =========================

let state = STATES.INIT;

// Elapsed time in milliseconds
let count = 0;

// High precision timestamp when running starts
let startTime = 0;

// Animation frame id
let animationFrameId = null;

// =========================
// Time Formatting
// =========================

function formatTime(milliseconds) {
    const hours = Math.floor(milliseconds / 3600000);

    const minutes = Math.floor((milliseconds % 3600000) / 60000);

    const seconds = Math.floor((milliseconds % 60000) / 1000);

    const ms = milliseconds % 1000;

    const hh = String(hours).padStart(2, '0');
    const mm = String(minutes).padStart(2, '0');
    const ss = String(seconds).padStart(2, '0');
    const sss = String(ms).padStart(3, '0');

    return `${hh}:${mm}:${ss}.${sss}`;
}


// =========================
// UI Rendering
// =========================

function updateCounter() {
    counter.value = formatTime(count);
}

function renderState() {
    switch (state) {
        case STATES.INIT:
            startBtn.textContent = 'Start';
            startBtn.classList.remove('green');
            startBtn.classList.add('blue');

            clearBtn.disabled = true;

            break;

        case STATES.RUNNING:
            startBtn.textContent = 'Pause';
            startBtn.classList.remove('blue');
            startBtn.classList.add('green');

            clearBtn.disabled = false;

            break;

        case STATES.PAUSE:
            startBtn.textContent = 'Continue';
            startBtn.classList.remove('green');
            startBtn.classList.add('blue');

            clearBtn.disabled = false;

            break;
    }

    updateCounter();
}

// =========================
// Timer Logic
// =========================

function timerLoop() {
    count = Math.floor(performance.now() - startTime);

    updateCounter();

    animationFrameId = requestAnimationFrame(timerLoop);
}

function startTimer() {
    // Keep previous elapsed time when resuming
    startTime = performance.now() - count;

    animationFrameId = requestAnimationFrame(timerLoop);
}

function stopTimer() {
    if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
}

// =========================
// State Transitions
// =========================

function setState(newState) {
    state = newState;
    renderState();
}

// =========================
// Event Handlers
// =========================

function handleStartButton() {
    switch (state) {
        case STATES.INIT:
            startTimer();
            setState(STATES.RUNNING);
            break;

        case STATES.RUNNING:
            stopTimer();
            setState(STATES.PAUSE);
            break;

        case STATES.PAUSE:
            startTimer();
            setState(STATES.RUNNING);
            break;
    }
}

function handleClearButton() {
    stopTimer();

    count = 0;

    updateCounter();

    setState(STATES.INIT);
}

// =========================
// Event Listeners
// =========================

startBtn.addEventListener('click', handleStartButton);
clearBtn.addEventListener('click', handleClearButton);

// =========================
// Initial Application State
// =========================

setState(STATES.INIT);


