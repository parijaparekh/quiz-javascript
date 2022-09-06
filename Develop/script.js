let numOfOptions = 4;
 
let questions = [
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

function renderOptions(parentEl, optionsList){
    //console.log(optionsList)
    var a = optionsList.map((option) => {
        return `<div><input type="radio" name="answer" value="${option.value}" id="${option.id}">
        <label for="${option.id}">${option.value}</label>
        </div>`});
    parentEl.innerHTML += a.join(' ');   
}

var submitButton = document.createElement("button");
let userQuestions = [];


/* get a random index and populate the question div */
function renderQuestion(documentPos){
    var repeated = true;
    var x;
    var i = 0;

    if (localStorage.hasOwnProperty("userQuestions")){
        userQuestions = JSON.parse(localStorage.getItem("userQuestions"));
    }
    if (userQuestions.length < questions.length){
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
        submitButton.textContent = "Submit";
        questionEl.appendChild(submitButton)
        documentPos.appendChild(questionEl);
        // The question needs to be stored on client side. 
        var len = userQuestions.unshift(x);
        localStorage.setItem("userQuestions", JSON.stringify(userQuestions));
    }
}


function getCheckedValue(){
    var options = document.getElementsByName('answer');
    for(i = 0; i < options.length; i++){
        if(options[i].checked){
            return options[i].value;
        }
    }
}

function startCounter(timeLeft){
    var timeInterval = setInterval(function(){
        if (timeLeft >= 0){
            timerEl.textContent  = timeLeft;    
            timeLeft-- ;
      }
      else {
        clearInterval(timeInterval);
        stopQuiz();
      }
    },1000);
 }

submitButton.addEventListener("click", function(event){
    if (event.target.matches("button")){
        let userAns = getCheckedValue();
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
            }
            questionEl.textContent=""; 
            renderQuestion(questionEl);
        }
        else{
            window.alert("Select your answer to proceed in the quiz");
        }
            //clearQuestionDiv();
        //updateLastAnsDiv();
        //if timer time left and all questions not done
            //renderQuestion();
    }
});

function clearUserQuestions(){
    userQuestions = [];
    localStorage.setItem("userQuestions", JSON.stringify(userQuestions));    
}

var startButtonEl = document.querySelector(".start-button");
var timerEl = document.querySelector("#timer")
var questionEl = document.querySelector("#question"); 
var feedbackEl = document.querySelector("#feedback");

startButtonEl.addEventListener("click", function(event){
    if (event.target.matches("button")){
        clearUserQuestions();
        startCounter(60);
        renderQuestion(questionEl);
    }    
})