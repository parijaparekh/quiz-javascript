# Code Quiz (coded in Javascript)

## Task

 A timed coding quiz is build wherein the user has to answer multiple-choice questions. The quiz app will run in the browser and will feature dynamically updated HTML and CSS powered by JavaScript code.  


## User Story

```
AS A coding boot camp student
I WANT to take a timed quiz on JavaScript fundamentals that stores scores
SO THAT I can gauge my progress compared to my peers
```

## Requirements

```
GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and my score
```

## Implementation

The quiz questions are based on Javascript. The question array has 5 multiple choice questions(MCQ) along with their answers stored. 
When the user starts the quiz:

The timer starts. The timer value can be changed via the counter constant.
He is prompted with a MCQ selected randomly from the question array.
User submits his answer. He is provided a feedback whether his answer is right or wrong. 
Incase he is wrong, the right answer is prompted. (This happens in the feedback box). 
A wrong answer also costs penalty in terms of time lost. The incorrectPenalty value is set to 10.  
This questioning session continues till all questions are answered or the timer expires.   
The quiz then prompts the user with his score and asks his initials for saving the score. 
Currently the score is set to the timer; value remaining at the end of quiz.
After the score is stored, the user is displayed the score card. 
The score card includes the scores list; the scores and initials saved against all the tests taken on this client system.   
The user can again click the start button to retake the quiz. 



## Error Handling

No MCQ can go unanswered. 
Start button disbales once the quiz starts. It then gets enabled only after the user score is saved.
User has to enter the initials or name to store the score. 
Quiz questions are prompted till the counter hits 0 or the system runs out of questions. 


## Additions

The scores list is now sorted on scores. 
This feature along with some styling and highlighting the current user has been implemented on 10/9/2022.  


## Improvements

Quiz question list is just set to 5. This should be expanded. 
A system that allows the questions to be populated from an external source can be built in extension to this.  


© 2022 Trilogy Education Services, LLC, a 2U, Inc. brand. Confidential and Proprietary. All Rights Reserved.
