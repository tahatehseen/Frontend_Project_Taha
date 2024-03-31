$(document).ready(function () {
  var audio = $("#audio")[0];
  var playpausebtn = $("#playpausebtn");
  var playpauseicon = $("#playpauseicon");
  var time = $("#time");
  var seekslider = $("#seekslider");
  var repeatToggle = $("#repeat-toggle");
  var skipBackward = $("#skip-backward");
  var skipForward = $("#skip-forward");

  playpausebtn.on("click", function () {
    if (audio.paused) {
      audio.play();
      playpauseicon.removeClass("bx-play").addClass("bx-pause");
    } else {
      audio.pause();
      playpauseicon.removeClass("bx-pause").addClass("bx-play");
    }
  });

  audio.addEventListener("timeupdate", updateTime);

  function updateTime() {
    var curmins = Math.floor(audio.currentTime / 60);
    var cursecs = Math.floor(audio.currentTime - curmins * 60);
    var durmins = Math.floor(audio.duration / 60);
    var dursecs = Math.floor(audio.duration - durmins * 60);
    if (cursecs < 10) { cursecs = "0" + cursecs; }
    if (dursecs < 10) { dursecs = "0" + dursecs; }
    if (curmins < 10) { curmins = "0" + curmins; }
    if (durmins < 10) { durmins = "0" + durmins; }
    time.text(curmins + ":" + cursecs + " / " + durmins + ":" + dursecs);
    if (!isNaN(audio.duration) && isFinite(audio.duration)) {
      seekslider.val((audio.currentTime / audio.duration) * 100);
    }
  }

  var audio = document.getElementById('audio');
  var timeDisplay = document.getElementById('time-display');

  audio.addEventListener('timeupdate', function () {
    var currentTime = formatTime(audio.currentTime);
    var duration = formatTime(audio.duration);
    timeDisplay.textContent = currentTime + ' / ' + duration;
  });

  function formatTime(seconds) {
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = Math.floor(seconds % 60);
    return minutes + ':' + (remainingSeconds < 10 ? '0' : '') + remainingSeconds;
  }

  seekslider.on("input", function () {
    var seekto = audio.duration * ($(this).val() / 100);
    audio.currentTime = seekto;
  });

  repeatToggle.on("click", function () {
    if (audio.loop) {
      audio.loop = false; // Disable repeat
      $(this).removeClass("active");
    } else {
      audio.loop = true; // Enable repeat
      $(this).addClass("active");
    }
  });

  skipBackward.on("click", function () {
    audio.currentTime -= 10; // Skip backward 10 seconds
  });

  skipForward.on("click", function () {
    audio.currentTime += 10; // Skip forward 10 seconds
  });
});

document.addEventListener('DOMContentLoaded', function() {
  var repeatButton = document.getElementById('repeat-toggle');
  var repeatIcon = document.getElementById('repeat-icon');

  repeatButton.addEventListener('click', function() {
      if (repeatButton.classList.contains('active')) {
          // Deactivate repeat mode
          repeatButton.classList.remove('active');
          setTimeout(function() {
              repeatIcon.classList.remove('rotate');
          }, 50); // Adjust delay as needed
      } else {
          // Activate repeat mode
          repeatButton.classList.add('active');
          setTimeout(function() {
              repeatIcon.classList.add('rotate');
          }, 50); // Adjust delay as needed
      }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  var bookmarkButton = document.getElementById('bookmark-toggle');
  var bookmarkIcon = document.getElementById('bookmark-icon');
  var notification = document.getElementById('notification');

  bookmarkButton.addEventListener('click', function() {
      var bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

      // Check if the current page is already bookmarked
      var currentPage = window.location.href;
      var isBookmarked = bookmarks.includes(currentPage);

      if (isBookmarked) {
          // Remove bookmark
          var index = bookmarks.indexOf(currentPage);
          bookmarks.splice(index, 1);
          bookmarkIcon.classList.remove('mdi-cards-heart');
          bookmarkIcon.classList.add('mdi-cards-heart-outline');
          showNotification('Bookmark removed');
      } else {
          // Add bookmark
          bookmarks.push(currentPage);
          bookmarkIcon.classList.remove('mdi-cards-heart-outline');
          bookmarkIcon.classList.add('mdi-cards-heart');
          showNotification('Bookmark added');
      }

      // Save updated bookmarks to local storage
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  });

  // Check if the current page is bookmarked and update button text
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
  var currentPage = window.location.href;
  var isBookmarked = bookmarks.includes(currentPage);
  if (isBookmarked) {
      bookmarkIcon.classList.remove('mdi-cards-heart-outline');
      bookmarkIcon.classList.add('mdi-cards-heart');
  }

  // Function to show notification
  function showNotification(message) {
      notification.textContent = message;
      notification.classList.add('show');

      setTimeout(function() {
          notification.classList.remove('show');
      }, 2000);
  }
});

