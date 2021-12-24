const postNewTweet = function(e) {
    e.preventDefault(); 
    hideError();
    var form = $(this);
    var url = form.attr('action');
    const tweetText = $("#tweet-text").val();
    //console.log(tweetText);
    if (!tweetText) {
        showError("Please input a tweet text.")
        return;
    }
    if (tweetText.length > 140) {
        showError("Your tweet text must be less than 140 characters.")
        return;
    }
    $.ajax({
        type: "POST",
        url: url,
        data: form.serialize(), 
        success: function(data) {
            //alert(data); 
            loadTweets();
            clearNewForm()
        },
        error: function (xhr, status, errData) {
            showError(eval("(" + xhr.responseText + ")").error);
        }
    }); 
}

const loadTweets = function() {
    $.ajax({
        type: "GET",
        url: '/tweets', 
        success: function (resultJson) {
            //console.log('Success: ', resultJson);
            renderTweets(resultJson);
        },
        error: function (xhr, status, errData) {
            showError(eval("(" + xhr.responseText + ")").error);
        }
    });
}

const renderTweets = function(tweets) {
    $('#tweets').empty()
    for (const tweet of tweets) {
        $('#tweets').prepend(createTweetElement(tweet));
    }
  }
  
  const createTweetElement = function(tweet) {
      return  `<article class="tweet">
                  <section>
                      <div class="row">
                        <img src='${ tweet.user.avatars }'>
                        <h4>${ tweet.user.name }</h4>
                      </div>
                      <div class="row">
                        <h4>${ tweet.user.handle }</h4>
                      </div>
                  </section>
                  <section>
                      ${ tweet.content.text }
                  </section>
                  <footer>
                      <section>
                      <div>${ timeSince(new Date(tweet.created_at)) }</div>
                      <div>
                          <i class="fas fa-flag"></i>
                          <i class="fas fa-retweet"></i>
                          <i class="fas fa-heart"></i>
                      </div>
                      </section>
                  </footer>
                  </article>`
  }

const showError = function(error) {
    //alert(error);
    //console.log(error);
    $("#errorMsg").html(error);
    $(".error").show();
}

const hideError = function() {
    $(".error").hide();
}

const clearNewForm = function() {
    $("#tweet-text").val("");
    $("#counter").val(140);
    $("#counter").removeClass("counterError");
}

const counterOnChange = function() {
    const tweetText = $("#tweet-text").val();
    //console.log(tweetText.length);
    const remainLength = 140 - tweetText.length;
    $("#counter").val(remainLength);
    if (remainLength < 0) {
        $("#counter").addClass("counterError");
    } else {
        $("#counter").removeClass("counterError");
    }
}

const timeSince = function(timeStamp) {
    var now = new Date(),
      secondsPast = (now.getTime() - timeStamp) / 1000;
    if (secondsPast < 60) {
      return parseInt(secondsPast) + 's';
    }
    if (secondsPast < 3600) {
      return parseInt(secondsPast / 60) + 'm';
    }
    if (secondsPast <= 86400) {
      return parseInt(secondsPast / 3600) + 'h';
    }
    if (secondsPast > 86400) {
      day = timeStamp.getDate();
      month = timeStamp.toDateString().match(/ [a-zA-Z]*/)[0].replace(" ", "");
      year = timeStamp.getFullYear() == now.getFullYear() ? "" : " " + timeStamp.getFullYear();
      return day + " " + month + year;
    }
}

$(document).ready(function(){
    $("#newTweetForm").submit(postNewTweet);
    $("#tweet-text").on('input', counterOnChange);
    hideError();
    loadTweets();
});
