var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/
$(document).ready(function(){
  var $game = $('#game');
  var values = MatchGame.generateCardValues();
  MatchGame.renderCards(values, $game);
});
/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function () {
  var sortedNumbers = [];

  for (var i=1; i<9; i++){
    sortedNumbers.push(i);
    sortedNumbers.push(i);
  }

  var cardValues = [];

  while (sortedNumbers.length > 0){
    var randomIndex = Math.floor(Math.random() * sortedNumbers.length);
    var randomValue = sortedNumbers[randomIndex];
    sortedNumbers.splice(randomIndex, 1);
    cardValues.push(randomValue);
  }
  return cardValues;

};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {

  $game.data('flippedCards', []);

  $game.empty();


  var cardColors = [
    'hsl(24,85%,65%)',
    'hsl(55,85%,65%)',
    'hsl(90,85%,65%)',
    'hsl(160,85%,65%)',
    'hsl(220,85%,65%)',
    'hsl(265,85%,65%)',
    'hsl(310,85%,65%)',
    'hsl(360,85%,65%)'];

  for (var i=0; i<cardValues.length; i++){
    var $card = $('<div class="card col-xs-3"></div>');
    var value = cardValues[i];
    var color = cardColors[value -1];
    var data = {
      value: value,
      color: color,
      flipped: false
    };

    $card.data(data);
    $game.append($card);
  };

  $('.card').click(function() {
    MatchGame.flipCard($(this), $('#game'));
  });

};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {

  if ($card.data('flipped')){
    console.log("Card already clicked");
    return;
  }

  $card.css("background-color", $card.data('color'))
    .text($card.data('value'))
    .data('flipped', true);

  var flipData = $game.data('flippedCards');
  flipData.push($card);

  if (flipData.length > 1){
    var card1 = flipData[0];
    var card2 = flipData[1];
    var card1Val = parseInt(card1.data('value'));
    var card2Val = parseInt(card2.data('value'));

    if (card1Val === card2Val){
      console.log("match");
      card1.css("background-color", "rgb(153, 153, 153)");
      card1.css("color", "rgb(204, 204, 204)");
      card2.css("background-color", "rgb(153, 153, 153)");
      card2.css("color", "rgb(204, 204, 204)");
    }else{
      console.log("no match");
      $card.css("background-color", "rgb(32, 64, 86)")
        .text("")
        .data('flipped', false);
    }
  }

  $game.data('flippedCards', []);

};
