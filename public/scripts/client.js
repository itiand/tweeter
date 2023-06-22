/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function(tweetData) {
  const { user, content, created_at } = tweetData;

  //BEGIN CREATE HEADER
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
  //END HEADER

  //TWEET CREATE ELEMENT
  const $tweet = $("<p>", {
    class: "tweet"
  }).text(content.text);
  //END TWEET SECTION

  //FOOTER ELEMENT CREATION
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

  //APPEND STAGE
  $icon.append($iconImg);
  $profile.append($icon, $name);
  $header.append($profile, $handle);

  $rtLike.append($flagIcon, $retweetIcon, $heartIcon);
  $footer.append($daysAgo, $rtLike);

  $article.append($header, $tweet, $footer)

  return $article;
};


const renderTweets = function(collectionTweet) {
  for(const tweet of collectionTweet) {
    const tweetHTML = createTweetElement(tweet);
    $('#tweetS-container').append(tweetHTML);
  }
}



// Test / driver code (temporary)
$(document).ready(() => {

  $('#post-tweet').on('submit', function(e) {
    e.preventDefault()

    if(!$('#tweet-text').val()) {
      alert('Your tweet is empty.')
    } else if ($('#tweet-text').val().length > 140) {
      alert('Your tweet is too long.')
    } else {
      console.log('submitted, performing AJAX call');
      const serializedForm = $(this).serialize();
      $.ajax('/tweets', { method: 'POST', data: serializedForm})
        .then( (res) => {
          console.log('RES is ', res);
        })
    }
  })

  const loadTweets = function() {
    console.log('Fetching tweets');
    $.ajax('http://localhost:8080/tweets', { method: 'GET' })
      .then((tweets) => {
        renderTweets(tweets);
      })
      .catch((error) => {
        console.log('Error: ', error);
      })
  };

  loadTweets();
})
