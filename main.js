// select elements
let countSpan = document.querySelector(".count span");
let quizApp = document.querySelector(".quiz-app");
let bulletSpan= document.querySelector(".bullets .spans");
let bullets= document.querySelector(".bullets")
let quizArea = document.querySelector(".quiz-area");
let answersArea = document.querySelector(".answers-area");
let button = document.querySelector(".submit-button");
let resultDiv = document.querySelector(".results");
let coundounElem = document.querySelector(".countdown");
let category = document.querySelector(".category span");
let list = document.querySelector(".list");


let counter = 0 ;
let rightAnswers=0;
let countDounVar;
quizApp.style.display= "none";
function getQuestion() {

    document.addEventListener("click", (e) => {
        let myRequest = new XMLHttpRequest();
        
        if (e.target.innerHTML === 'html') {


            myRequest.open("GET" , "html_ques.json" , true);
            myRequest.send();
            category.innerHTML=e.target.innerHTML;


        } else if (e.target.innerHTML === 'css') {

            myRequest.open("GET" , "css.json" , true);
            myRequest.send();
            category.innerHTML=e.target.innerHTML;
    

        } else if(e.target.innerHTML === 'java script') {


            myRequest.open("GET" , "java_script.json" , true);
            myRequest.send();
            category.innerHTML=e.target.innerHTML;
        }

        myRequest.onreadystatechange = function() {
            if (myRequest.readyState == 4 && myRequest.status == 200) {

                quizApp.style.display= "block";
                list.style.display= "none";
                
                let quesObject = JSON.parse(this.responseText);
                let quesCount = quesObject.length;
                createBullets(quesCount);
    
                addData(quesObject[counter],quesCount);
    
    
                countDown(10,quesCount);
    
                button.onclick = () => {
                    let theRightAns = quesObject[counter].right_answer ; 
                    counter++;
    
                    checkAnswer(theRightAns , quesCount);
                    quizArea.innerHTML="";
                    answersArea.innerHTML=""
                    addData(quesObject[counter],quesCount);
    
                    handleBullets ();
    
                    clearInterval(countDounVar);
                    countDown(10,quesCount);
    
                    showResults(quesCount);
    
                };
            }
        };
        
    });
    
}
getQuestion();


function createBullets(num) {
    countSpan.innerHTML = num;

    for (let i=0; i<num; i++) {
        let bullet = document.createElement("span");

        if (i===0) {
            bullet.className = "on";
        }
        bulletSpan.appendChild(bullet);

    }
}


function addData (obj , count) {


    if (counter< count) {
            let qTitle = document.createElement("h2");

    let qText = document.createTextNode(obj['title']);

    qTitle.appendChild(qText);

    quizArea.appendChild(qTitle);

    for (let i=1 ; i<=4; i++) {

        let mainDiv = document.createElement("div");
        
        mainDiv.className="answer";
        let radioInput=document.createElement("input");
        radioInput.type="radio";
        radioInput.name="question";
        radioInput.id=`answer_${i}`;
        radioInput.dataset.answer = obj[`answer_${i}`];

        let theLabel = document.createElement("label");
        theLabel.htmlFor = `answer_${i}`;

        let theLabelText = document.createTextNode(obj[`answer_${i}`]);
        theLabel.appendChild(theLabelText);

        mainDiv.appendChild(radioInput);
        mainDiv.appendChild(theLabel);
        answersArea.appendChild(mainDiv);
        
    }
    }
}

function showResults(count) {
    let theRes
    if (counter===count) {
        quizArea.remove();
        answersArea.remove();
        bullets.remove();
        button.remove();


        if(rightAnswers> (count / 2) && rightAnswers < count ) {
            theRes = `<span class="good"> Good </span> , ${rightAnswers} From ${count} Is Correct `;
        } else if (rightAnswers=== count) {
            theRes = `<span class="perfect"> Perfect </span> , All Answers Is Correct `;
        } else {
            theRes = `<span class="bad"> Bad </span> , ${rightAnswers} From ${count} Is Correct `;
        }
        resultDiv.innerHTML= theRes;
    }
}



function checkAnswer (ans,count) {
    let questions = document.getElementsByName("question");
    let theChosenAns;
    for (let i=0; i < questions.length; i++) {
        if (questions[i].checked === true) {
            theChosenAns = questions[i].dataset.answer;
        }

    }

    if (theChosenAns === ans) {
        rightAnswers++;
        console.log("good")
    }
} 

function handleBullets () {
    let bulletSpans = document.querySelectorAll(".bullets .spans span");
    let arraySpan = Array.from(bulletSpans);
    arraySpan.forEach((span , index)=> {
        if (counter=== index) {
            span.className= "on";
        }
    })
}


function countDown(duration, count ){
    if (counter< count) {
        let minutes, seconds;
        countDounVar = setInterval(function () {

            minutes = parseInt(duration / 60);
            seconds = parseInt(duration % 60);

            minutes = minutes < 10 ? `0${minutes}`:minutes;
            seconds = seconds < 10 ? `0${seconds}`:seconds;

            coundounElem.innerHTML= `${minutes}:${seconds}`;

            if(--duration < 0) {
                clearInterval(countDounVar); 
                button.click();
                console.log("finished")
            }
        },1000)
    }
}