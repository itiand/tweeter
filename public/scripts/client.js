const createTweetElement = function(tweetData) {
  const { user, content, created_at } = tweetData;

  //create header section
  const $article = $("<article>", {
    class: "tweet-container"
  });

  const $header = $("<header>", {
    class: "flex"
  });

  const $profile = $("<div>", {
    class: "profile flex"
  });

  const $icon = $("<div>", {
    class: "icon"
  });

  const $iconImg = $("<img>", {
    class: "icon-img",
    src: user.avatars
  });

  const $name = $("<p>").text(user.name);

  const $handle = $("<p>", {
    class: "handle"
  }).text(user.handle);


  //create tweet section
  const $tweet = $("<p>", {
    class: "tweet"
  }).text(content.text);


  //create footer section
  const $footer = $("<footer>", {
    class: "tweet-footer flex"
  });

  const $daysAgo = $("<p>").text(timeago.format(created_at));

  const $rtLike = $("<div>", {
    class: "rtLike"
  });

  const $flagIcon = $("<i>", {
    class: "fa-solid fa-flag"
  });

  const $retweetIcon = $("<i>", {
    class: "fa-solid fa-retweet"
  });

  const $heartIcon = $("<i>", {
    class: "fa-solid fa-heart"
  });

  //append
  $icon.append($iconImg);
  $profile.append($icon, $name);
  $header.append($profile, $handle);

  $rtLike.append($flagIcon, $retweetIcon, $heartIcon);
  $footer.append($daysAgo, $rtLike);

  $article.append($header, $tweet, $footer);

  return $article;
};


const renderTweets = function(collectionTweet) {
  const tweetSContainer = $('#tweetS-container');

  tweetSContainer.empty();
  for (const tweet of collectionTweet) {
    const tweetHTML = createTweetElement(tweet);

    //for reverse order - most recent tweet at top
    tweetSContainer.prepend(tweetHTML);
  }
};


const showErrorBanner = function(message) {
  $('.error-banner').text(message);
  $('.error-banner').slideDown();
  setTimeout(() => {
    $('.error-banner').slideUp();
  }, 5000);
};

const loadTweets = function() {
  console.log('Fetching tweets');
  $.get('/tweets')
    .then((tweets) => {
      console.log('Fetch Successful!');
      renderTweets(tweets);
    })
    .catch((error) => {
      console.log('Error: ', error);
    });
};

function textAreaAdjust(element) {
  element.style.height = "1px";
  element.style.height = (25+element.scrollHeight)+"px";
}

$(document).ready(() => {

  //post tweet form submit
  $('#post-tweet').on('submit', function(e) {
    e.preventDefault();

    //check if text area is empty
    if (!$('#tweet-text').val()) {
      showErrorBanner('Your tweet is empty.');
      return;
    }

    //check if exceeds 140 chars
    if ($('#tweet-text').val().length > 140) {
      showErrorBanner('Your tweet is too long.');
      return;
    }

    console.log('Tweet submitted, performing AJAX call');
    const serializedForm = $(this).serialize();
    $.post('/tweets', serializedForm)
      .then(function() {
        console.log('Call successful!');
        $('#tweet-text').val('');
        resetCharacterCount();
        loadTweets();
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  });

  // hitting enter key to submit form inside the textarea
  $('#tweet-text').on('keydown', function(e) {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      $('#post-tweet').submit();
    }
  });

  //new tweet arrow down toggle
  $('.down-icon').on('click', function(e) {
    const $newTweetSection = $('.new-tweets');

    if ($newTweetSection.css('display') === 'none') {
      $newTweetSection.slideDown();
      $('#tweet-text').focus();
    } else if ($newTweetSection.css('display') === 'block') {
      $newTweetSection.slideUp();
    }
  });

  //scroll down event
  $(window).scroll(function() {
    if ($(this).scrollTop() > 0) {
      $('#scroll-top-button').fadeIn();
      $('.new-tweet').fadeOut();
    } else {
      $('#scroll-top-button').fadeOut();
      $('.new-tweet').fadeIn();
    }
  });


  //scroll to top on click
  $('#scroll-top-button').click(function() {
    $('html, body').animate({ scrollTop: 0 }, 'slow');
    $('#tweet-text').focus();
  });


  loadTweets();
});
