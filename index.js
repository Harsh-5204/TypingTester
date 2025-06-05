let que=[{ques:"What is the difference between compiled and interpreted programming languages, and how does it affect performance and debugging?"},
    {ques:"How does recursion work in programming, and what are its advantages and potential pitfalls (e.g., stack overflow)? "},
    {ques:"Explain the concept of Big O notation and how it is used to analyze the efficiency of algorithms."},
    {ques:"What are design patterns in programming, and how do they help in creating maintainable and scalable code?"},
    {ques:"What are the pros and cons of static typing versus dynamic typing in programming languages?"},
    
];      
let load=document.getElementById("load");
let submit=document.getElementById("submit");
let textarea=document.getElementById("textarea");
let wpmcount=document.getElementById("wpm");

let stime=0;
let timer;
let timerDisplay = document.createElement("div");
timerDisplay.style.marginTop = "10px";
timerDisplay.style.fontWeight = "bold";
timerDisplay.style.color = "#ff4444";
submit.parentNode.insertBefore(timerDisplay, wpmcount);

let currentQuestion = "";

submit.addEventListener("click", ()=>{
    
    let randomindex = Math.floor(Math.random()*que.length);
    load.textContent = que[randomindex].ques;

    textarea.value = "";
    textarea.style.backgroundColor = "white";
    wpmcount.textContent = "";
    textarea.focus();
    stime=new Date();
    submit.textContent = "Your Test is Starting...";
    submit.disabled = true;
    startTimer(120);
});

function startTimer(seconds) {
    clearInterval(timer);
    let remaining = seconds;

    timerDisplay.textContent = `⏱️ Time Left: ${remaining}s`;

    timer = setInterval(() => {
        remaining--;
        timerDisplay.textContent = `⏱️ Time Left: ${remaining}s`;

        if (remaining <= 0) {
            clearInterval(timer);
            endTest(true); // call auto-end test
        }
    }, 1000);
}

function endTest(auto = false) {
    clearInterval(timer);
    let endtime = new Date();
    let takentime = (endtime - stime) / 1000;

    let typedText = textarea.value.trim();
    let wordcount = typedText.split(/\s+/).filter(word => word.length > 0).length;
    let wpm = Math.round((wordcount / takentime) * 60);

    wpmcount.textContent = auto
        ? `⏱️ Time's up! Your typing speed is ${wpm} WPM`
        : `✅ Your Typing Speed is ${wpm} WPM`;

    submit.textContent = "Start Test";
    submit.disabled = false;
}


textarea.addEventListener("input", () => {
    let loadtext = load.textContent.trim();
    let usertext = textarea.value;
    const originalText = que.find(q => q.ques === load.textContent)?.ques || "";
    const userInput = textarea.value;
    let coloredText = "";

    for (let i = 0; i < originalText.length; i++) {
        if (i < userInput.length) {
            if (userInput[i] === originalText[i]) {
                coloredText += `<span style="color: black;">${originalText[i]}</span>`;
            } else {
                coloredText += `<span style="color: red;">${originalText[i]}</span>`;
            }
        } else {
            coloredText += `<span style="color: gray;">${originalText[i]}</span>`;
        }
    }

    load.innerHTML = coloredText;

    if (usertext === loadtext) {
        endTest(); // ✅ this will show WPM and reset button
    }

    // Change background based on match
    // if (originalText.startsWith(userInput)) {
    //     textarea.style.backgroundColor = "lightgreen";

    //     if (userInput === originalText) {
    //         let endtime = new Date();
    //         let takentime = (endtime - stime) / 1000;
    //         let wordcount = originalText.split(" ").length;
    //         let wpm = Math.round((wordcount / takentime) * 60);
    //         wpmcount.textContent = `Your Typing Speed is ${wpm} Words per minute`;
    //     }
    // } else {
    //     textarea.style.backgroundColor = "lightcoral";
    // }
});
// Prevent copying from question area
load.addEventListener("copy", (e) => {
    e.preventDefault();
    alert("Oops! Sorry, you can't copy the text.");
});

// Prevent pasting into textarea
textarea.addEventListener("paste", (e) => {
    e.preventDefault();
    alert("Oops! Sorry, you can't paste text here.");
});