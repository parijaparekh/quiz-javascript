const questions = [
{
    "question": "Which statement cannot be used to declare a variable in Javascript",
    "options": [
        {id: '1', value: 'let'}, 
        {id: '2', value: 'var'}, 
        {id :'3', value: 'int'}, 
        {id: '4', value: 'const'}],
    "ans": "int"
},
{
    "question": "Which of the following is an array method",
    "options": [
        {id: '1', value: 'map'}, 
        {id: '2', value: 'filter'}, 
        {id :'3', value: 'reduce'}, 
        {id: '4', value: 'all of these'}],
    "ans": "all of these"
},
{
    "question": "What is the full form of DOM",
    "options": [
        {id: '1', value: 'Data Object Model'}, 
        {id: '2', value: 'Document or Model'}, 
        {id :'3', value: 'Document Object Model'}, 
        {id: '4', value: 'Document Object Medium'}],
    "ans": "Document Object Model"
},
{
    "question": "Which of the following are the Object methods",
    "options": [
        {id: '1', value: 'Object.keys(obj)'}, 
        {id: '2', value: 'Object.values(obj)'}, 
        {id :'3', value: 'Object.entries(obj)'}, 
        {id: '4', value: 'All of these'}],
    "ans": "All of these"
},
{
    "question": "Which method is used to convert JSON string to a JSON object?",
    "options": [
        {id: '1', value: 'JSON.parse(string)'}, 
        {id: '2', value: 'JSON.convertToObject(string)'}, 
        {id :'3', value: 'JSON.object(string)'}, 
        {id: '4', value: 'None of these'}],
    "ans": "JSON.parse(string)"
},]
let userQuestions = [];
const incorrectPenalty = 10; // lose 10secs
const counter = 60;
const groupByStr = "answer";
const timerEl = document.querySelector("#timer")
const questionEl = document.querySelector("#question"); 
const feedbackEl = document.querySelector("#feedback");
const scoreCardEl = document.querySelector("#score-card");
const scoreListDivEl = document.querySelector("#score-list-div");
const scoreListOlEl = document.querySelector("#score-list");
const initialsEl = document.querySelector("#initials");
const scoreInitialsEl = document.querySelector("#score-initials");
//Button elements
const submitButtonEl = document.createElement("button");
const saveButtonEl = document.querySelector("#save");
const startButtonEl = document.querySelector("#start-button");
const clearButtonEl = document.querySelector("#clear-button");

let timerId = null;
let score = 0; 
let initials = "";
let userScore = [];
feedbackEl.setAttribute('style', 'white-space: pre;');

// functions
function renderOptions(parentEl, optionsList){
    var a = optionsList.map((option) => {
        return `<div><input type="radio" name="answer" value="${option.value}" id="${option.id}">
        <label for="${option.id}">${option.value}</label>
        </div>`});
    parentEl.innerHTML += a.join(' ');   
}

function getCheckedValue(groupBy){
    var options = document.getElementsByName(groupBy);
    for(i = 0; i < options.length; i++){
        if(options[i].checked){
            return options[i].value;
        }
    }
}

function resetLocalStorage()
{   userQuestions = [];
    localStorage.setItem("userQuestions", JSON.stringify(userQuestions));
    localStorage.setItem("timer", JSON.stringify(counter));   
}

function displayScoreForm(){
    if (scoreCardEl.style.display === "none"){
        scoreCardEl.style.display ="block";
        score = `${JSON.parse(localStorage.getItem("timer"))}`;
        //localStorage.setItem("score",score);
        document.querySelector('label[for="Final Score"]').textContent = ` Final Score: ${score}.`;
    }
}

//This function will stop the quiz and show the score card. 
function stopQuiz(){
    questionEl.style.display = "none";
    clearInterval(timerId);
    displayScoreForm();
}

/* get a random index and populate the question div */
function renderQuestion(documentPos){
    var repeated = true;
    var x;
    var i = 0;
    let timer = JSON.parse(localStorage.getItem("timer"));

    if (localStorage.hasOwnProperty("userQuestions")){
        userQuestions = JSON.parse(localStorage.getItem("userQuestions"));
    }
    //console.log(timer);
    if ((userQuestions.length < questions.length) && (timer > 0)){
        while (repeated){
            x = questions[Math.floor(Math.random()* questions.length)];
            if (userQuestions.length > 0){
                //check for uniqueness of the question
                for (i = 0; i < userQuestions.length; i++){
                    if (x.question === userQuestions[i].question){
                        repeated = true;
                        i = userQuestions.length;
                    }
                    else{
                        repeated =false;
                    }
                }
            }
            else {
                repeated = false;
            }
        }
        var questionEl = document.createElement("div");
        questionEl.textContent = x.question;  
        renderOptions(questionEl, x.options);
        // work on the placement of submit button along with its styling 
        submitButtonEl.textContent = "Submit";
        questionEl.appendChild(submitButtonEl)
        documentPos.appendChild(questionEl);
        // The question needs to be stored on client side. 
        var len = userQuestions.unshift(x);
        localStorage.setItem("userQuestions", JSON.stringify(userQuestions));
        
    }// end of if loop
    else{
        stopQuiz();
    } 

}

function updateTimerEls(timevalue){
    timerEl.textContent  = "Time Left: "+timevalue+" secs";    
    localStorage.setItem("timer", JSON.stringify(timevalue));
}

function startCounter(timeLeft){
    timerId = setInterval(function(){
        if (localStorage.hasOwnProperty("timer")){
            timeLeft = JSON.parse(localStorage.getItem("timer"));
        } 
        if (timeLeft > 0){
            timeLeft--; 
            updateTimerEls(timeLeft);     
        }
        else {
            updateTimerEls(0);
            stopQuiz();    
        }             
    },1000);
 }

function alterTimer(intervalSkip, operator){
    let timer = 0;
    if (localStorage.hasOwnProperty("timer")){
        timer = JSON.parse(localStorage.getItem("timer"));
    } 
    if (operator === "decrease"){
        if (timer - intervalSkip > 0){
            timer -= intervalSkip;
            updateTimerEls(timer);  
        }
        else { // timer -intervalSkip <= 0
            updateTimerEls(0);
            stopQuiz();
        }
     }
}

function atStart(){
    console.log("In function")
    questionEl.textContent = "";
    feedbackEl.textContent = "";
    timerEl.style.display = "block";
    questionEl.style.display = "block";
    scoreCardEl.style.display = "none";
    feedbackEl.style.display = "block";
    scoreListDivEl.style.display = "none";
    userQuestions = [];
    localStorage.setItem("userQuestions", JSON.stringify(userQuestions));
    localStorage.setItem("timer", JSON.stringify(counter));
    updateTimerEls(counter);
}

function showscoreslist(){
    scoreCardEl.style.display = "none";
    timerEl.style.display = "none";
    feedbackEl.style.display = "none";
    scoreListDivEl.style.display = "block";
    if (localStorage.hasOwnProperty("scoreList")){
        userScore = JSON.parse(localStorage.getItem("scoreList"));
        for (var i = 0; i < userScore.length; i++){
            var obj = userScore[i];
            liEl = document.createElement('li');
            liEl.textContent = `${obj.initials} --- ${obj.score}`;
            scoreListOlEl.appendChild(liEl); 
        } // end of for loop       
    }
}

submitButtonEl.addEventListener("click", function(event){
    if (event.target.matches("button")){
        let userAns = getCheckedValue(groupByStr);
        if (userAns){
            console.log("User Answer: " +userAns);
            console.log("Actual Answer: "+userQuestions[0].ans);
            /*if (!feedbackEl.textContent){
                feedbackEl.textContent = "Feedback for your answers: \r\n";
            }*/
            if (userAns === userQuestions[0].ans){
                feedbackEl.textContent += `Answer to ${userQuestions[0].question}:  Correct! \r\n`;
            }
            else{
                feedbackEl.textContent += `Answer to ${userQuestions[0].question}:  Incorrect! Answer is ${userQuestions[0].ans} \r\n`;
                alterTimer(incorrectPenalty, "decrease");
            }
            questionEl.textContent=""; 
            renderQuestion(questionEl);
        }
        else{
            window.alert("Select your answer to proceed in the quiz");
        }
    }
});

startButtonEl.addEventListener("click", function(event){
    if (event.target.matches("button")){
        /*questionEl.textContent = "";
        feedbackEl.textContent = "";
        timerEl.style.display = "block";
        questionEl.style.display = "block";
        scoreCardEl.style.display = "none";
        feedbackEl.style.display = "block";
        userQuestions = [];
        localStorage.setItem("userQuestions", JSON.stringify(userQuestions));
        localStorage.setItem("timer", JSON.stringify(counter));
        updateTimerEls(counter); */
        atStart();
        startCounter(counter); // we just skip the first interval 
        renderQuestion(questionEl);
        feedbackEl.textContent ="Feedback for your answers: \r\n";
        startButtonEl.disabled = true;
        console.log(startButtonEl);
    }    
})

scoreInitialsEl.addEventListener("submit", function(event){
    event.preventDefault();
    if (initialsEl.value == ""){
        window.alert("Enter initials in the text-box");
    }
    else{
        var currentUS = { 'initials' : `${initialsEl.value}`, 'score' : score};
        if (localStorage.hasOwnProperty("scoreList")){
            userScore = JSON.parse(localStorage.getItem("scoreList"));
        }
        userScore.unshift(currentUS);
        localStorage.setItem("scoreList", JSON.stringify(userScore));
        initialsEl.value = "AB";
        showscoreslist();
        startButtonEl.disabled = false;
    }
})

clearButtonEl.addEventListener("click", function(event){
    console.log("Finally reached");
    scoreListDivEl.style.display = "none";
})
