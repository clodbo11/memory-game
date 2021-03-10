
const gameContainer = document.getElementById("game");
let timer = document.querySelector('#timer');
let start = document.querySelector('#start');
let reset = document.querySelector('#reset');
let flipped = document.querySelector('.flipped');


let cardFlipCounter = 0;
let clockCounter = 0;
let flipCounter = 0;
let card1 = null;
let card2 = null;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
document.getElementById('game').style.pointerEvents = 'none';
start.addEventListener('click', function(){
  document.getElementById('game').style.pointerEvents = 'auto';
  setInterval(function(){
    timer.innerHTML = "Timer : " + clockCounter ++;
  }, 1000); 
});

 
function handleCardClick(e) {  
  flipCounter ++;
  if(flipCounter === 1){  
    card1 = e.target;
    card1.style.backgroundColor = e.target.classList[0];
    card1.classList.add('flipped');
    card1.removeEventListener('click', handleCardClick);

  } else {
      document.getElementById('game').style.pointerEvents = 'none';  
      card2 = e.target;
      card2.style.backgroundColor = e.target.classList[0];
      card2.classList.add('flipped');
      card2.removeEventListener('click', handleCardClick);

    if (card1.className === card2.className){
      cardFlipCounter += 2;
      card1.classList.add('match');
      card2.classList.add('match');
      console.log(card1, card2);
      card1.addEventListener('click', handleCardClick);
      card2.addEventListener('click', handleCardClick);
      card1 = null;
      card2 = null;
      flipCounter = 0;
      document.getElementById('game').style.pointerEvents = 'auto';      
    
    } else {
        setTimeout(function(){
          card1.style.backgroundColor = "";
          card2.style.backgroundColor = "";
          card1.classList.remove("flipped");
          card2.classList.remove("flipped");
          card1 = null;
          card2 = null;
          document.getElementById('game').style.pointerEvents = 'auto';
          flipCounter = 0;
          
      }, 500);
      card1.addEventListener('click', handleCardClick);
      card2.addEventListener('click', handleCardClick);
    }
  }
  if(cardFlipCounter === 10){
    setTimeout(function(){
      alert('You Have Won. Congratulations!');
      timer = 0;
    }, 200); 
  }
}

createDivsForColors(shuffledColors);


