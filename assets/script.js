startBtn.onclick = () => {
    function countdown(){
        counter--;
            if (counter === 0){
                clearInterval(startCountdown)
                quizEnd()
            };
    let timeRem = document.querySelector("#time-rem");
    let timeTag = "<span>Time Left: "+ counter +"</span>"
    timeRem.innerHTML = timeTag;
    };
    var startCountdown = setInterval(countdown, 1000);
    startScreen.classList.add("hide");
    quizBox.classList.remove("hide");
    showQuestions(queCount)
};


function showQuestions(index){
    if (queCount>=10){
        return;
    }
    const queText = document.querySelector(".que-text");
    const optionList = document.querySelector("#choices");
    let queTag = "<span>"+ questions[index].numb + ". "+ questions[index].question +"</span>";
    let optionTag = '<div class="option">'+ questions[index].options[0] + '<span></span></div>'
                    + '<div class="option">'+ questions[index].options[1] + '<span></span></div>'
                    + '<div class="option">'+ questions[index].options[2] + '<span></span></div>'
                    + '<div class="option">'+ questions[index].options[3] + '<span></span></div>'
    queText.innerHTML = queTag;
    optionList.innerHTML = optionTag;
    const option = optionList.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}


function optionSelected(answer){
    if (queCount>=10){
        return;
    }
    let userAns = answer.textContent;
    let correctAns = questions[queCount].answer;
    if(userAns == correctAns){
        console.log("Answer is Correct");
        const response = document.querySelector("#response");
        response.innerHTML = '<div id="response"><span>Correct!</span></div>';
        setTimeout(nextQuestion, 500)
        score += 1

    }else{
        console.log("Answer is Wrong");
        const response = document.querySelector("#response");
        response.innerHTML = '<div id="response"><span>Wrong!</span></div>';
        setTimeout(nextQuestion, 500)
        counter -= 5
    }
}
function nextQuestion(){
    queCount++;
    if(queCount == 10){
        
        quizEnd()
    };
    showQuestions(queCount);
    const response = document.querySelector("#response");
    response.innerHTML = '<div id="response"><span></span></div>';
    }


function quizEnd(){
    quizBox.classList.add("hide");
    endBox.classList.remove("hide");
    const scoreText = document.querySelector(".score");
    let scoreTag = '<h3 class="score"> Your score was '+ score +' out of 10!</h3>';
    scoreText.innerHTML = scoreTag; 
}

submitBtn.onclick = () => {
    let initials = initialsText.value;
  
    var resultsDataObj = {
        initials: initials,
        score: score
    }
    localStorage.setItem((localStorage.length+1), JSON.stringify(resultsDataObj));
    initialsText.value = ""
    location.reload();
}