$(document).ready{
  MatchGame.renderCards(generateCardValues(), $game);
}

var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function () {
  var initialArray = [];
  for (i=1; i<9; i++){
    initialArray.push(i);
    initialArray.push(i);
  };

  var randomCards = [];
  while (initialArray.length > 0){
    var index = Math.floor(Math.random() * initialArray.length);
    randomCards.push(initialArray[index]);
    initialArray.splice(index, 1);
  };
  return randomCards;
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {
  var cardColors = [
    "hsl(25, 85%, 65%)",
    "hsl(55, 85%, 65%)",
    "hsl(90, 85%, 65%)",
    "hsl(160, 85%, 65%)",
    "hsl(220, 85%, 65%)",
    "hsl(265, 85%, 65%)",
    "hsl(310, 85%, 65%)",
    "hsl(360, 85%, 65%)",
  ];
  $('card').empty();
  for(i=0; i<cardValues.length; i++){
    $('<div class="card col-xs-3"></div>');
    $('card').data(cardValues[i]);
    $('card').data("false");
    $('card').data(cardColors[cardValues(i - 1)]);
    $game.append('card');
  };

};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {

};
