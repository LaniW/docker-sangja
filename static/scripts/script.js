// Data for prompts and translations
let prompts = [];
let translations = [];

async function fetchData() {
    const response = await fetch('/data');
    const data = await response.json();
    prompts = data.map(item => item.english);
    //translations = data;
    updateUI();
}

async function translateWithLLM(sentence) {
    const response = await fetch('/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({sentence})
    });
    const result = await response.json();
    return result.translation;
}

let currentIndex = 0;

// Update the UI with the current prompt and translations
function updateUI() {
    const englishPromptLeft = document.getElementById('english-prompt-left');
    const englishPromptRight = document.getElementById('english-prompt-right');
    const koreanFormal = document.getElementById('adaptive-korean');
    const scoreFormal = document.getElementById('adaptive-score');
    const koreanPlain = document.getElementById('basic-korean');
    const scorePlain = document.getElementById('basic-score');

    // Update text and scores
    englishPromptLeft.textContent = prompts[currentIndex];
    englishPromptRight.textContent = prompts[currentIndex];
    koreanFormal.textContent = "";
    scoreFormal.textContent = "";
    koreanPlain.textContent = "";
    scorePlain.textContent = "";
}

// Handle left arrow button click
function handleLeftArrow() {
    currentIndex = (currentIndex - 1 + prompts.length) % prompts.length;
    updateUI();
}

// Handle right arrow button click
function handleRightArrow() {
    currentIndex = (currentIndex + 1) % prompts.length;
    updateUI();
}

// Attach event listeners
document.getElementById('prompt-input').addEventListener('keydown', async (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        const userPrompt = event.target.value.trim();
        if (userPrompt) {
            const defaultPrompt = prompts[currentIndex];
            //const userTranslation = await translateWithLLM(userPrompt, defaultPrompt);
            //const defaultTranslation = await translateWithLLM("Translate the following from English to Korean:", defaultPrompt);
            //document.getElementById('adaptive-korean').textContent = userTranslation;
            document.getElementById('basic-korean').textContent = await translateWithLLM(userPrompt);
            //const bleuScore = calculateBLEU(userTranslation, defaultTranslation);
            //document.getElementById('adaptive-score').textContent = bleuScore.toFixed(2);
        }
    }
});


document.addEventListener('DOMContentLoaded', async () => {
    await fetchData();
    const leftArrow = document.querySelector(".left-arrow");
    const rightArrow = document.querySelector(".right-arrow");
    if (leftArrow) {
        leftArrow.addEventListener("click", handleLeftArrow);
    } else {
        console.error('Left arrow button not found');
    }
    if (rightArrow) {
        rightArrow.addEventListener("click", handleRightArrow);
    } else {
        console.error('Right arrow button not found');
    }

    updateUI();
});