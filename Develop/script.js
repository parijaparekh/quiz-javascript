const questions = [
{
    "question": "What is coding",
    "options": [
        {id: '1', value: 'a'}, 
        {id: '2', value: 'b'}, 
        {id :'3', value: 'cscs'}, 
        {id: '4', value: 'dasdas'}],
    "ans": "a"
},
{
    "question": "dbakdkadbkad",
    "options": [
        {id: '1', value: 'a'}, 
        {id: '2', value: 'b'}, 
        {id :'3', value: 'cscs'}, 
        {id: '4', value: 'dasdas'}],
    "ans": "b"
},
{
    "question": "eqweqwewewq",
    "options": [
        {id: '1', value: 'a'}, 
        {id: '2', value: 'b'}, 
        {id :'3', value: 'cscs'}, 
        {id: '4', value: 'dasdas'}],
    "ans": "cscs"
},
{
    "question": "mjmjymy",
    "options": [
        {id: '1', value: 'a'}, 
        {id: '2', value: 'b'}, 
        {id :'3', value: 'cscs'}, 
        {id: '4', value: 'dasdas'}],
    "ans": "dasdas"
},
{
    "question": "dadaddad adda",
    "options": [
        {id: '1', value: 'a'}, 
        {id: '2', value: 'b'}, 
        {id :'3', value: 'cscs'}, 
        {id: '4', value: 'dasdas'}],
    "ans": "a"
},]
let userQuestions = [];
const incorrectPenalty = 10; // lose 10secs
const counter = 60;
const groupByStr = "answer";
const startButtonEl = document.querySelector(".start-button");
const timerEl = document.querySelector("#timer")
const questionEl = document.querySelector("#question"); 
const feedbackEl = document.querySelector("#feedback");
const submitButtonEl = document.createElement("button");


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

function resetLocalStorage(counter){
    userQuestions = [];
    localStorage.setItem("userQuestions", JSON.stringify(userQuestions));
    localStorage.setItem("timer", JSON.stringify(counter));   
}

function stopQuiz(){
    questionEl.textContent = "";
    feedbackEl.textContent = "";
    timerEl.style.display = "none";
    questionEl.style.display = "none";
    feedbackEl.style.display = "none";
    //displayScoreForm();
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
    console.log(timer);
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

function startCounter(timeLeft){
    var timeInterval = setInterval(function(){
        if (localStorage.hasOwnProperty("timer")){
            timeLeft = JSON.parse(localStorage.getItem("timer"));
        }
        console.log(timeLeft);
        if (timeLeft >= 0){
            timerEl.textContent  = timeLeft;    
            timeLeft-- ;
        }
        else {
            clearInterval(timeInterval);
            stopQuiz();
        }
        localStorage.setItem("timer", JSON.stringify(timeLeft));
    },1000);
 }

function alterTimer(intervalSkip, operator){
    let timer = 0;
    if (localStorage.hasOwnProperty("timer")){
        timer = JSON.parse(localStorage.getItem("timer"));
    } 
    if (operator === "decrease"){
        if (timer - intervalSkip >= 0){
            timer -= intervalSkip;
            localStorage.setItem("timer", JSON.stringify(timer));
        }
        else {
            stopQuiz();
        }
     }
}

submitButtonEl.addEventListener("click", function(event){
    if (event.target.matches("button")){
        let userAns = getCheckedValue(groupByStr);
        if (userAns){
            console.log("User Answer: " +userAns);
            console.log("Actual Answer: "+userQuestions[0].ans);
            if (!feedbackEl.textContent){
                feedbackEl.textContent = "\r\n";
                console.log("Hello");
            }
            if (userAns === userQuestions[0].ans){
                feedbackEl.textContent += `Answer to ${userQuestions[0].question}:  Correct! \r\n`;
            }
            else{
                feedbackEl.textContent += `Answer to ${userQuestions[0].question}:  Incorrect! \r\n`;
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
        timerEl.style.display = "block";
        questionEl.style.display = "block";
        feedbackEl.style.display = "block";
        resetLocalStorage(counter);
        startCounter(counter);
        renderQuestion(questionEl);
    }    
})