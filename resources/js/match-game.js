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
  var flippedCards = [];
  $game.data(flippedCards);
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
  $game.empty();
  for (i=0; i<16; i++){
    var color = cardColors[cardValues[(i-1)]];
    var value = cardValues[i];
    var data = {
      value: value,
      color: color,
      isFlipped: false
    };
    var $newCard = $("<div class='card col-xs-3'></div>");
    $newCard.data(data);
    $game.append($newCard);
  };
  $('.card').click(function(){
    MatchGame.flipCard($(this), $game);
  });
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {

  if ($card.data('isFlipped')){
    return;
  };
  $('.card').css("background-color", $card[color]);
  $('.card').text($card.data('value'));
  $card.data('isFlipped = true');
  flippedCards.append($card);
  if (flippedCards.length === 2){
    if (flippedCards[0]===flippedCards[1]){
      $('.card').css("background-color", "rgb(153, 153, 153)");
      $('.card').css("color", "rgb(204, 204, 204)");
    }else{
      $card.isFlipped = false;
      $('.card').css("background-color", "rgb(32, 64, 86)");
      $('.card').text("");
    };
  };
  $game.flippedCards = [];
}
