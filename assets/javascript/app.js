// Create global variables

// Create an array of questions with each being an object, containing the questions, the answer options and the answer
var questionsArray = [{
	question: "Q: What's the name of the bar the group usually goes to?",
	answerOptions: ["McGee's", "McLaren's", "McGregor's", "McGraw's"],
	answer: 1
},
{
	question: "Q: What's the name of the unusual creature Marshall and Lily find in the apartment?",
	answerOptions: ["Cockamouse", "Tugboat", "Brover", "Sir Scratchewan"],
	answer: 0
},
{
	question: "Q: What is Robin's teenage pop star name?",
	answerOptions: ["Robin Beaver", "Robin Rainbows", "Robin Glitters", "Robin Sparkles"],
	answer: 3
},
{
	question: "Q: What are the nicknames Marshall and Lily give each other?",
	answerOptions: ["Mr. and Mrs. Awesome", "Marshmallow and Lilypad", "Fay Wrap and King Kong", "Big Fudge and Lori"],
	answer: 1
},
{
	question: "Q: What clothing item does the group tell Ted he cannot pull off?",
	answerOptions: ["Scuba suit", "Crocs", "Red cowboy boots", "Fedora"],
	answer: 2
},
{
	question: "Q: What movie do Marshall and Lily traditionally watch on Valentine's Day?",
	answerOptions: ["Predators", "Star Wars", "Love, Actually", "The Notebook"],
	answer: 0
},
{
	question: "Q: The hotel room in which Barney keeps his suits is under what name?",
	answerOptions: ["Barnabus Stinson", "N.P. Harris", "Broseph Lieberman", "Susan Tupp"],
	answer: 3
},
{
	question: "Q: What middle name do Marshall and Lily give their son?",
	answerOptions: ["Marvin", "Theodore", "Wait-For-It", "Mickey"],
	answer: 2
},
{
	question: "Q: What does the barista confuse Barney's name with?",
	answerOptions: ["Bernie", "Swarley", "Bundy", "Beanie"],
	answer: 1
},
{
	question: "Q: What is the name of the energy drink that Ted and Marshall often consume?",
	answerOptions: ["Tantrum", "Four Loko", "Red Bull", "Kickstart"],
	answer: 0
},
{
	question: "Q: What is the name of the bartender who keeps handing Lily drinks at Barney and Robin's wedding?",
	answerOptions: ["Carl", "Wendy", "Scooter", "Linus"],
	answer: 3
},
{
	question: "Q: What word does Robin use in so many sentences her friends can't stand it?",
	answerOptions: ["Eh", "Sorry", "Literally", "Moist"],
	answer: 2
},
{
	question: "Q: What is the name of the website that Marshall sends to Barney?",
	answerOptions: ["slapcountdown.com", "tedmosbyisajerk.com", "notafathersday.com", "brobibs.com"],
	answer: 0
},
{
	question: "Q: What is the name of the bar that Ted and Barney open?",
	answerOptions: ["Hopeless", "Puzzles", "Okay", "Focus"],
	answer: 1
},
{
	question: "Q: What position does Lily's ex-boyfriend, Scooter, hold at her school?",
	answerOptions: ["Gym teacher", "History teacher", "Lunch lady", "Janitor"],
	answer: 2
}];

// Create variables for the timer
var time;
var seconds;

// Create empty variables for the current question, the correct answer, the incorrect answer, the unanswered
var currentQuestion;
var correctAnswer;
var incorrectAnswer;
var noAnswer;

// Create variable that will take the user's choice
var userChoice;

// Create variables for the messages that will display on the result page
var results = {
	correct: "Self five! You're correct!",
	incorrect: "Nope. What are you, Canadian?",
	timeUp: "Time's up!",
	completion: "All done. Here's how you did."
}

// Create an array of gifs for the corresponding correct answers
var gifArray = ['gif1', 'gif2', 'gif3', 'gif4', 'gif5', 'gif6', 'gif7', 'gif8', 'gif9', 'gif10', 'gif11', 'gif12', 'gif13','gif14','gif15'];

// Create a boolean variable to check to see if a question has been answered
var answered;

// Create a jQuery reference to the start button
    // Start the game upon click
$('#startButton').on('click', function(){
    $(this).hide(); // hides the button from view
    startGame();
});

// When the game starts, reset everything to zero or empty
function startGame(){
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	noAnswer = 0;
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#noAnswers').empty();
	$('#finalResults').empty();
	// Calls the function that displays the question
	newQuestion();
}

// Create a function that display the question
function newQuestion(){
	// Empties the page
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	// Prints the question
	// Informs the user on the progress of the game
	$('#currentQuestion').html('Question '+(currentQuestion+1)+' of '+questionsArray.length);
	// Prints the question to the page
	$('.question').html('<h2>' + questionsArray[currentQuestion].question + '</h2>');
    // Create a for loop through the answer options and add attributes to each
	for(var i = 0; i < 4; i++){
		var options = $('<div>');
		options.text(questionsArray[currentQuestion].answerOptions[i]);
		options.attr({'data-index': i });
		options.addClass('userChoice');
        // Prints the answer options to the page
        $('.answerOptions').append(options);
	}
    // Start the timer
	timer();

    // Pauses the time if an answer is registered, have to go inside the newQuestion function
	$('.userChoice').on('click',function(){
		userChoice = $(this).data('index');
		clearInterval(time);
		resultsPage();
	});
}

// Create a function for the timer
function timer(){
    // Set timer to 15 seconds
	seconds = 15;
    // Print the timer to the page
	$('#timer').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
    // Prompt the timer to tick down
	time = setInterval(runTimer, 1000);
}

// Create a function for the running timer
function runTimer(){
    // Tick down the clock
	seconds--;
    // Print the timer according to the changing time
	$('#timer').html('<h3>Time Remaining: ' + seconds + '</h3>');
    // If times runs out, end the current question, reset the timer
	if(seconds < 1){
		clearInterval(time);
		// Set answered to false because question wasn't answered
		answered = false;
		// Send user to the results page by calling that function
		resultsPage();
	}
}

// Create a function that displays the results page
function resultsPage(){
	// Clear the questions page
	$('#currentQuestion').empty();
	$('.userChoice').empty();
	$('.question').empty();

    // Display the correct answer
	var correctAnswerText = questionsArray[currentQuestion].answerOptions[questionsArray[currentQuestion].answer];
	var correctAnswerIndex = questionsArray[currentQuestion].answer;
	// Display the gif according to the question
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width="100%" height="100%">');
	// Compare the user's choice to see if it's correct, incorrect, or did not answer
	if((userChoice == correctAnswerIndex) && (answered == true)){
		// Tally the score
		correctAnswer++;
		// Tell user the answer is correct
		$('#message').html(results.correct);
	} else if((userChoice != correctAnswerIndex) && (answered == true)){
		// Tally the score
		incorrectAnswer++;
		// Tell user the answer is incorrect
		$('#message').html(results.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + correctAnswerText);
	} else{
		// Tally the score
		noAnswer++;
		// Tell user the answer was not entered
		$('#message').html(results.timeUp);
		$('#correctedAnswer').html('The correct answer was: ' + correctAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (questionsArray.length-1)){
		setTimeout(finalTally, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

// Create a function that counts the final tally
function finalTally(){
    // Empty all the content
    $('#timer').empty();
    $('#message').empty();
    $('#correctedAnswer').empty();
    $('#gif').empty();
    // Display the final scores
    $('#finalResults').html(results.completion);
    $('#correctAnswers').html("Correct Answers: " + correctAnswer);
    $('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
    $('#noAnswers').html("Unanswered: " + noAnswer);
}

// Create a restart button
    // Calls back to the start game function upon click