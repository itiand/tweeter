const updateCharacterCount = function(count) {
  $('.counter').text(count)
}

const changeTextColor = function(element, color) {
  element.css('color', color)
}

const resetCharacterCount = function() {
  updateCharacterCount(140);
  changeTextColor($('.counter'), '#757165')
}

//updates the counter value as user types
//changes color if numOfChars exceeds 140;
$(document).ready(function() {
  $('#tweet-text').on('input', function(e) {
    let charCounter = 140;

    const innerText = $(this).val();
    const innerNumOfChars = innerText.length;

    charCounter -= innerNumOfChars;
    
    updateCharacterCount(charCounter);
    if(charCounter < 0) {
      changeTextColor($('.counter'), '#943B3B');
    } else {
      changeTextColor($('.counter'), '#757165');
    }
  })
});

