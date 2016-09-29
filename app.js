var colors = ['red', 'blue', 'yellow', 'green', 'purple', 'tomato'];
var correctColor;
var previousIndex;
var SUCCESS_COLOR = 'blanchedalmond';
var TIMEOUT = 2000;

// when the document is ready, call this function
$(function(){
  createBoxes();
  registerListeners();
  chooseRandomBlock();
});

function createBoxes() {
  colors.forEach(function(color) {
    var $box = $('<div></div>');
    $box.addClass('box');
    $box.data('color', color);
    $box.css('background-color', color);
    $('#app').append($box);
  });
}

function chooseRandomBlock() {
  var index = randomNumber(0, colors.length - 1);

  while (index === previousIndex) {
    console.log('OH NO, got a duplicate!');
    index = randomNumber(0, colors.length - 1);
  }

  previousIndex = index;
  correctColor = colors[index];
  $('#correct-color').text(correctColor);
}

function randomNumber(min, max){
  return Math.floor(Math.random() * (1 + max - min) + min);
}

function registerListeners() {
  $('#app').on('click', '.box', handleClick);
}

function handleClick() {
  var $clickedBox = $(this);
  var color = $clickedBox.data('color');

  if (color === correctColor) {
    // success
    $('#message').text('Yep!');
    $clickedBox.css('background-color', SUCCESS_COLOR);
    $('#correct-color').text('');
    setTimeout(function() {
      $clickedBox.css('background-color', color);
      chooseRandomBlock();
      $('#message').text('');
    }, TIMEOUT);
  } else {
    // try again
    $('#message').text('Nope.');
  }
}
