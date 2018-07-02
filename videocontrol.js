var videocontrol = function(videoID){
  // Non ES6 class fuctions
  function hasClass(ele,cls) {
    return !!ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
  }
  function addClass(ele,cls) {
    if (!hasClass(ele,cls)){
      ele.className += " "+cls;
    }
  }
  function removeClass(ele,cls) {
    if (hasClass(ele,cls)) {
      var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
      ele.className=ele.className.replace(reg,' ');
    }
  }

  // Define .playing as a custom property for all media elements
  Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
    get: function(){
      return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
    }
  });

  // loads video if video is present
  var video = document.getElementById(videoID);
  if(video !== null){
    // Keep Checking if Video is playing
    var video_play_checker = setInterval(function(){
      // if the video is finally playing, add Class and stop checking
      if(video.playing){
        addClass(video, 'this--visible');
        clearInterval(video_play_checker);
      }
      // else try to play the video
      // (most likely until user interacts with page)
      else{
        video.play();
      }
    }, 500);
  }
};

// execute
videocontrol('ID_ON_VIDEO_ELEMENT');