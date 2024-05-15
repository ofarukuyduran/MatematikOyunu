let num1 = Math.floor(Math.random() * 10);
let num2 = Math.floor(Math.random() * 10);
let answer = num1 + num2;
let score = 0;
let questionsAnswered = 0;

document.getElementById('num1').textContent = num1;
document.getElementById('num2').textContent = num2;

let answerOptions = document.querySelectorAll('.answer-option');

answerOptions.forEach((option) => {
    option.addEventListener('click', checkAnswer);
});


// Doğru ve yanlış ses dosyalarını yükle
const correctSound = new Audio('sound/correct.mp3');
const incorrectSound = new Audio('sound/incorrect.mp3');
function checkAnswer(event) {
    questionsAnswered++;
    let selectedAnswer = parseInt(event.target.textContent);
    if (selectedAnswer === answer) {
        event.target.classList.add('correct-bg');
        setTimeout(() => {
            event.target.classList.remove('correct-bg');
        }, 500);
        //showFeedback('Doğru!', 'correct');
        score++;
        document.getElementById('score').textContent = score;
		correctSound.play(); // Doğru sesi çal
    } else {
        event.target.classList.add('incorrect-bg');
        setTimeout(() => {
            event.target.classList.remove('incorrect-bg');
        }, 500);
        showFeedback('Yanlış! Doğru cevap ' + answer, 'incorrect');
		 incorrectSound.play(); // Yanlış sesi çal
    }
   
    if (questionsAnswered === 10) {
        gameOver();
    } else {
        nextQuestion();
    }
}

function clearFeedback() {
    document.getElementById('feedback-text').textContent = '';
    document.getElementById('feedback').classList.remove('correct', 'incorrect');
}

function nextQuestion() {
    generateQuestion();
    //clearFeedback();
}

function generateQuestion() {
    num1 = Math.floor(Math.random() * 10) + 1;
    num2 = Math.floor(Math.random() * 10) + 1;
    answer = num1 + num2;

    document.getElementById('num1').textContent = num1;
    document.getElementById('num2').textContent = num2;

    let answerOptionsText = [answer, answer - 1, answer + 1];
    
    // Cevap seçeneklerini karıştır
    shuffleArray(answerOptionsText);
    
    answerOptions.forEach((option, index) => {
        option.textContent = answerOptionsText[index];
        option.id = 'option' + (index + 1);
    });
}

// Cevap seçeneklerini karıştıran fonksiyon
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function showFeedback(text, className) {
    document.getElementById('feedback-text').textContent = text;
    document.getElementById('feedback').classList.add(className);
    setTimeout(() => {
        document.getElementById('feedback').classList.remove(className);
		clearFeedback(); // cevap yanlış olduğunda cevabı gösterdikten sonra siler. 
    }, 1000);
}

function gameOver() {
    alert('Oyun bitti! Puanınız: ' + score);
    // Oyunu sıfırla
    score = 0;
    questionsAnswered = 0;
    document.getElementById('score').textContent = score;
setInterval(function(){
window.location.reload(false);
},100)
    nextQuestion(); // Yeni oyun için bir sonraki soruyu göster
}

generateQuestion(); // İlk soruyu oluşturmak için
