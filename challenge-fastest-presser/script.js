let playerOneScoreText = document.getElementById('playerOneScore');
let playerTwoScoreText = document.getElementById('playerTwoScore');
let wonText = document.getElementById('wonText');
let input = document.getElementById('timerInput');
let timeDisplay = document.getElementById('timeRemaining');
let startButton = document.getElementById('startButton');
startButton.addEventListener('click', startGame);
let resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', restartGame);

let playerOneScore = 0;
let playerTwoScore = 0;
let gameRunning = false;

function startGame() {
	if (!input.value) {
		return alert('Please enter the game time');
	}
	restartGame();
	let time = input.value * 1000;
	let countDownTime = time / 1000 - 1;
	let interval = setInterval(() => {
		let minutes = Math.floor(countDownTime / 60000);
		let seconds = countDownTime % 60000;
		minutes = minutes >= 10 ? minutes : '0' + minutes;
		seconds = seconds >= 10 ? seconds : '0' + seconds;
		timeDisplay.innerText = `Time Remaining: ${minutes}:${seconds}`;
		countDownTime--;
		if (countDownTime < 0) {
			clearInterval(interval);
			timeDisplay.innerText = 'Game Ended';
			timeDisplay.classList.add('red');
		}
	}, 1000);
	setTimer(time);
	gameRunning = true;
}

function restartGame() {
	wonText.innerText = '';
	playerOneScore = 0;
	playerTwoScore = 0;
	playerOneScoreText.innerText = 'Score: ' + playerOneScore;
	playerTwoScoreText.innerText = 'Score: ' + playerTwoScore;
	timeDisplay.innerText = '';
	timeDisplay.classList.remove('red');
}

function setTimer(time) {
	setTimeout(function () {
		gameRunning = false;
		if (playerOneScore > playerTwoScore) {
			wonText.innerText = 'Player One Won!!';
		} else if (playerOneScore < playerTwoScore) {
			wonText.innerText = 'Player Two Won!!';
		} else if (playerOneScore === 0 && playerTwoScore === 0) {
			wonText.innerText = "Both the Player haven't pressed any keys";
		} else if (playerOneScore === playerTwoScore) {
			wonText.innerText = 'Players Tied!';
		}
	}, time);
}

function keyBoardEvents(e) {
	if (gameRunning) {
		if (e.keyCode === 115) {
			playerOneScore++;
		} else if (e.keyCode === 108) {
			playerTwoScore++;
		}
		playerOneScoreText.innerText = 'Score: ' + playerOneScore;
		playerTwoScoreText.innerText = 'Score: ' + playerTwoScore;
	}
}

document.addEventListener('keypress', keyBoardEvents);