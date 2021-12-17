// Fake data taken from initial-tweets.json
const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    $('#tweets').append(createTweetElement(tweet));
  }
}

const createTweetElement = function(tweet) {
    return  `<article class="tweet">
                <section>
                    <div class="row">
                    <img src='${ tweet.user.avatars }'>
                    <h4>${ tweet.user.name }</h4>
                    </div>
                    <h4>${ tweet.user.handle }</h4>
                </section>
                <section>
                    ${ tweet.content.text }
                </section>
                <footer>
                    <section>
                    <div>${ tweet.created_at }</div>
                    <div><img><img><img></div>
                    </section>
                </footer>
                </article>`
}

$(document).ready(function(){
    renderTweets(data);
});
