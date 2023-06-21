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

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1687182493484
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1687268893484
  }
]

const formatTimestamp = function(timestamp) {
  const now = Date.now();
  const diff = now - timestamp;

  // Convert the difference to days
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) {
    // Less than a day, format as hours
    const hours = Math.floor(diff / (1000 * 60 * 60));
    return hours + " hours ago";
  } else {
    // Format as days
    return days + " days ago";
  }
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

  const $daysAgo = $("<p>").text(formatTimestamp(created_at));

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
  renderTweets(data); 
})
