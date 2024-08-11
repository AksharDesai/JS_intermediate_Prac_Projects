const quizData = [{
    question : 'Most popular programming language in 2024 ?' ,
    a:'javascript',
    b:'python',
    c:'java',
    d:'C',
    correct : 'a'


},
    {

        question:'Which command is used to create a new database',
        a:'Doland Trump',
        b:'Obama bin laden',
        c:'CREATE DATABASE database_name',
        d:'Elon Musk',

        correct : 'c'
        
    },
    {
        question : ' select all columns from a table named "users"?',
        a:'SELECT * FROM users',
        b:'rahul gandhi',
        c:'sonia gandhi',
        d:'priyanka gandhi',

        correct:'a'


    },{
        question : ' find the maximum value in a column?',
        a:'MAX()',
        b:'discipline',
        c:'Hard Work',
        d:'Talent',
        
        correct:'a'

    },{
        question : 'Which clause is used to filter records?',
        a:'Millionaire',
        b:'Trillionaire',
        c:'Zillionaire',
        d:'WHERE',

        correct: 'd'

    }
    ]

//************* GETTING ALL THE ELEMENTS*************/

const quizContainer = document.querySelector(".quiz-container")
const resultContainer = document.querySelector(".quiz-complete-container")
const timerContainer = document.querySelector(".timer-container")
const alert = document.querySelector(".alert")
const cuurentQuestionNumber = document.getElementById("number")
const question = document.getElementById("question")
const optionA = document.getElementById("a_text")
const optionB = document.getElementById("b_text")
const optionC = document.getElementById("c_text")
const optionD = document.getElementById("d_text")
const nextBtn = document.getElementById("nextBtn")
const prevBtn = document.getElementById("prevBtn")
const restart = document.getElementById("restart")
const finalScore = document.getElementById("score")
const answers = document.getElementsByName("answer")



//******* SETTING VALUES ********/
let currentNumber = 0;
let score = 0;

let timeInterval;
let quizCompleted = false;

let allAnswers=[]


//************* All functions *************/
function displayQuiz (){

    cuurentQuestionNumber.textContent = `${currentNumber+1})`
    question.textContent = quizData[currentNumber].question
    optionA.textContent = quizData[currentNumber].a
    optionB.textContent = quizData[currentNumber].b
    optionC.textContent = quizData[currentNumber].c
    optionD.textContent = quizData[currentNumber].d
}

function optionSelected(){
    let selectedAnswer;
    answers.forEach(answer => {
        if (answer.checked) {
            selectedAnswer = answer.value
        }
    });
    return selectedAnswer
}

function uncheckValue(){
    answers.forEach(answer => {
        answer.checked = false
    });
}

function showAlert(text,type){
    alert.textContent = text
    alert.classList.add(`alert-${type}`)

    setTimeout(function(){
        alert.classList.remove(`alert-${type}`)

    },1000)
}

function endquiz(){
    calcScore()
    quizContainer.classList.add("hide-container")
    finalScore.textContent = `Score = ${score}`
    
    resultContainer.classList.add("show-results")

    clearInterval(timeInterval)

    if (quizCompleted) {
        timerContainer.textContent = 'Completed On Time'
    }else{
        
        timerContainer.textContent = 'Time Out'
    }
}

function setTimer(){

    
        const quizTime  = 120 //in seconds
        let remainingTime = quizTime
    
         timeInterval = setInterval(function(){
            if (remainingTime <=0 ) {
                timerContainer.textContent = 'Time Out'
                clearInterval(timeInterval)
               
                endquiz()
            }else{
                remainingTime--;
                updateTime(remainingTime)
            }
        },1000)
    }


function updateTime(remainingTime){
    const minutes = Math.floor(remainingTime / 60)
    const seconds = Math.floor(remainingTime % 60)
    timerContainer.textContent = `${minutes} minute and ${seconds} seconds left`
    

}

function calcScore(){
    
    for (let i = 0; i < quizData.length; i++) {
        
        if (allAnswers[i]==quizData[i].correct) {
            score = score +100
        }
        
    }
    
   
}




//************* ONclick Event and all the function are called below  *************/

nextBtn.addEventListener("click",function(){
    const checkSelected = optionSelected()
    console.log(checkSelected);
    if (checkSelected) {
        
         
        
        
        allAnswers[currentNumber] = checkSelected
        console.log("user answer > ",allAnswers[currentNumber]);
        console.log("quiz answer > ",quizData[currentNumber].correct);
        
       

            
            currentNumber++;
            if (currentNumber < quizData.length ) {

                displayQuiz()
                uncheckValue()
                
                
            }else{
                quizCompleted = true
                endquiz()
            }
        }
        
        else{
            showAlert("Select An Option First!","danger")
        }
    })
    
    // prev button clicked
    
    prevBtn.addEventListener('click',function(){
        currentNumber--;
        displayQuiz()
    })
    
    //************* End of the quiz restart button option ONCLICK EVENT *************/
    
    restart.addEventListener("click",function(){
        uncheckValue()
        location.reload()
    })
    
    //************* CALLING THE MAIN FUNCTION AT THE END *************/
    
    
    displayQuiz()
    
    setTimer()
    
    
    
    
    
    
    
    
    
    


