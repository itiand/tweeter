/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
};





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
    class: "icon",
    src: user.avatars
  });

  const $name = $("<p>").text(user.name);

  const $handle = $("<p>", {
    class: "handle"
  });
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

  const $daysAgo = $("<p>").text(formatTimestamp(created_at));

  const $rtLike = $("<div>", {
    class: "rtLike"
  })

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









};


const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.