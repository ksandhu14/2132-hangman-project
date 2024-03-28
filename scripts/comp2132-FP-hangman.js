// Keyboard letters
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const keyboardContainer = document.getElementById('keyboard-container');

for (let letter of alphabet) {
    const button = document.createElement('button');
    button.textContent = letter;
    button.addEventListener('click', function() {
        guessLetter(letter.toLowerCase()); // Pass the lowercase letter to guessLetter function
        button.disabled = true; // Disable the button once clicked
    });
    keyboardContainer.appendChild(button);
}

// Hangman game - object

const wordsAndHints = [
    { word: "javascript", hint: "A programming language used for web development" },
    { word: "hangman", hint: "A classic word-guessing game" },
    { word: "computer", hint: "An electronic device that processes data" },
    { word: "keyboard", hint: "An input device used to type characters into a computer" },
    { word: "algorithm", hint: "A set of rules or steps used to solve a problem" },
    { word: "database", hint: "A structured set of data held in a computer, typically organized in a table format" },
    { word: "network", hint: "A group of interconnected computers or devices that can communicate with each other" },
    { word: "function", hint: "A block of organized, reusable code that performs a specific task" },
    { word: "variable", hint: "A symbolic name associated with a value and whose associated value may be changed" },
    { word: "array", hint: "A data structure consisting of a collection of elements, each identified by an index" },
    { word: "programming", hint: "The process of designing and building an executable computer program for accomplishing a specific task" },
    { word: "interface", hint: "A point where two systems, subjects, organizations, etc. meet and interact" },
    { word: "application", hint: "A program or piece of software designed to fulfill a particular purpose" }
   
];


let selectedWord, wordDisplay, remainingGuesses, guessedLetters;
let flowers = 0;
let cracks = 0;

function initializeGame() {
    selectedWord = getRandomWord();
    wordDisplay = Array(selectedWord.length).fill('_');
    remainingGuesses = 7; 
    guessedLetters = [];
    cracks = 0; 
    flowers = 0; 

    document.getElementById('word').textContent = wordDisplay.join(' ');
    document.getElementById('hint').textContent = `Hint: ${getHint(selectedWord)}`;
    document.getElementById('guessInput').value = '';
    document.getElementById('message').textContent = '';
    document.getElementById('potImage').src = "/images/vase-with-cracks0.png"; // Reset pot image to initial state
    updateHangman(); // Update remaining guesses when game starts
}


function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * wordsAndHints.length);
    return wordsAndHints[randomIndex].word;
}

function getHint(word) {
    return wordsAndHints.find(item => item.word === word).hint;
}

function guessLetter(letter) {
    if (guessedLetters.includes(letter)) {
        document.getElementById('message').textContent = 'You already guessed that letter.';
        return;
    }

    guessedLetters.push(letter);

    if (selectedWord.includes(letter)) {
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === letter) {
                wordDisplay[i] = letter;
            }
        }
        document.getElementById('word').textContent = ''; 
        // Add each letter with animation
        wordDisplay.forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char;
            if (char === letter) {
                span.classList.add('animate-in'); // Add the animation class
            }
            document.getElementById('word').appendChild(span);
        });

        if (!wordDisplay.includes('_')) {
            document.getElementById('message').textContent = 'Congratulations! You won!';
            document.getElementById('message').classList.add('bounce-in-left', 'red-text'); 
            disableInput();
            addFlower();
        }
    } else {
        remainingGuesses--;
        updateHangman();
        if (remainingGuesses === 0) {
            document.getElementById('message').textContent = `Sorry, you lost. The word was "${selectedWord}".`;
            document.getElementById('message').classList.add('bounce-in-left','red-text');
          
            disableInput();
        }
    }
}


function updateHangman() {
    document.getElementById('hangman').textContent = `Hangman ( Remaining guesses: ${remainingGuesses} )`;
    if (remainingGuesses < 7) {
        cracks++;
        if (cracks <= 5) {
            addCrack(cracks); 
        }
    } 
    
    if (remainingGuesses === 0) {
        document.getElementById('potImage').src = "/images/vase-broken.png"; 
        disableInput(); 
        document.getElementById('message').textContent = `Sorry, you lost. The word was "${selectedWord}".`; 
    }
}



function disableInput() {
    document.getElementById('guessInput').disabled = true;
    document.querySelectorAll('#keyboard-container button').forEach(button => {
        button.disabled = true; // Disable all alphabet buttons
    });
}

function playAgain() {
    document.getElementById('guessInput').disabled = false;
    document.querySelectorAll('#keyboard-container button').forEach(button => {
        button.disabled = false; // Enable all alphabet buttons
    });
    initializeGame();
}

function addFlower() {
    const potImage = document.getElementById('potImage');
    potImage.src = "/images/flowers-pot.png"; 
}
addFlower();
function addCrack(crackCount) {
    const potImage = document.getElementById('potImage');
    potImage.src = `/images/vase-with-cracks${crackCount}.png`; 
}

// Initialize the game when the page loads
window.onload = initializeGame;


