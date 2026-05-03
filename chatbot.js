const questions = [
    {
        question: "Welcome! I'm your Campus Assistant. Are you looking for (a) Events, (b) Club Info, or (c) Support?",
        options: {
            a: "Events",
            b: "Club Info",
            c: "Support"
        },
        correctAnswer: "a",
        correctResponse: "Great choice! Check out our Events page for the full list.",
        incorrectResponse: "I can help with that too! But our Events are the highlight right now."
    },
    {
        question: "Which building is the new Tech Lab in? (a) Main Hall, (b) Lab 104, (c) Gymnasium?",
        options: {
            a: "Main Hall",
            b: "Lab 104",
            c: "Gymnasium"
        },
        correctAnswer: "b",
        correctResponse: "Exactly! Lab 104 is the heart of innovation.",
        incorrectResponse: "Actually, it's in Lab 104. Drop by soon!"
    },
    {
        question: "Have you seen our campus mascot? (a) Yes, the cat!, (b) Not yet.",
        options: {
            a: "Yes, the cat!",
            b: "Not yet."
        },
        correctAnswer: "a",
        correctResponse: "Everyone loves the campus cat! Meow!",
        incorrectResponse: "You're missing out! Check the Overview page to see a photo of him."
    }
];

let currentQuestionIndex = 0;
const chatContainer = document.getElementById("chat-container");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");

// Initialize chat
window.onload = () => {
    displayQuestion();
};

function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    let optionsText = "";
    for (const [key, value] of Object.entries(currentQuestion.options)) {
        optionsText += `<br><strong>${key.toUpperCase()}</strong>: ${value}`;
    }

    appendMessage('bot', `${currentQuestion.question}${optionsText}`);
}

function appendMessage(sender, text) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender === 'bot' ? "bot-message" : "user-message");
    
    const nameSpan = document.createElement("span");
    nameSpan.classList.add(sender === 'bot' ? "bot-name" : "user-name");
    nameSpan.textContent = sender === 'bot' ? "Campus Bot" : "You";
    
    messageDiv.appendChild(nameSpan);
    
    const textDiv = document.createElement("div");
    textDiv.innerHTML = text;
    messageDiv.appendChild(textDiv);
    
    chatContainer.appendChild(messageDiv);
    scrollChat();
}

function scrollChat() {
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

chatForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const response = userInput.value.trim().toLowerCase();
    if (!response) return;

    // Show user message
    appendMessage('user', response);

    const currentQuestion = questions[currentQuestionIndex];
    
    // Bot logic
    setTimeout(() => {
        if (response === currentQuestion.correctAnswer) {
            appendMessage('bot', currentQuestion.correctResponse);
        } else {
            appendMessage('bot', currentQuestion.incorrectResponse);
        }

        currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
        
        // Show next question after a short delay
        setTimeout(() => {
            displayQuestion();
        }, 1000);
        
    }, 500);

    userInput.value = "";
});
