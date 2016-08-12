var numSess = 25;
var numBr = 5;
var timerId;
var functionRunning = false;
var minutes = numSess;
var seconds = 0;
var minutesBr = numBr;
var secondsBr = 0;
var isBreak = false;
var tick = function() {
  if (minutes === 0 && seconds === "00") {
    clearInterval(timerId);
    minutesBr=numBr;
    secondsBr=0;
    breakCountdown();
  } else if (minutes >= 0) {
    if (seconds === "00") {
      minutes--;
      seconds = 59;
      updateTarget();
    } else if (seconds > 0) {
      seconds--;
      updateTarget();
    }
  }
};
var updateTarget = function() {
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  $("#clock").text(minutes + ":" + seconds);
};
var reset = function() {
  minutes = numSess;
  seconds = 0;
  minutesBr = numBr;
  secondsBr = 0;
  functionRunning = false;
  isBreak=false;
  $("#time-label").text("SESSION TIME");
  $("#circleBtn").css({
    "border": "2px solid#3f3"
  });
};
var init = function() {
  updateTarget();
  timerId = setInterval(tick, 1000);
  tick();
};
var sessionCountdown = function() {
  $("#time-label").text("SESSION TIME");
  $("#circleBtn").css({
    "border": "2px solid#3f3"
  });
  isBreak = false;
  init();
};
var tickBr = function() {
  if (minutesBr === 0 && secondsBr === "00") {
    clearInterval(timerId);
    minutes = numSess;
    seconds = 0;
    sessionCountdown();
  } else if (minutesBr >= 0) {
    if (secondsBr === "00") {
      minutesBr--;
      secondsBr = 59;
      updateTargetBr();
    } else if (secondsBr > 0) {
      secondsBr--;
      updateTargetBr();
    }
  }
};
var updateTargetBr = function() {
  if (secondsBr < 10) {
    secondsBr = "0" + secondsBr;
  }
  $("#clock").text(minutesBr + ":" + secondsBr);
};
var initBr = function() {
  updateTargetBr();
  timerId = setInterval(tickBr, 1000);
  tickBr();
};
var breakCountdown = function() {
  $("#time-label").text("BREAK TIME");
  $("#circleBtn").css({
    "border": "2px solid#f33"
  });
  isBreak = true;
  initBr();
}
$("#numS").text(numSess);
$("#numB").text(numBr);
$("#clock").text(numSess + ":" + "00");
$("#sessionMinus").on("click", function() {
  if (!functionRunning) {
    if (numSess > 1) {
      numSess--;
      reset();
      $("#numS").text(numSess);
      $("#clock").text(numSess + ":" + "00");
    }
  }
});
$("#sessionPlus").on("click", function() {
  if (!functionRunning) {
    numSess++;
    reset();
    $("#numS").text(numSess);
    $("#clock").text(numSess + ":" + "00");
  }
});
$("#breakMinus").on("click", function() {
  if (!functionRunning) {
    if (numBr > 1) {
      numBr--;
      $("#clock").text(numSess + ":" + "00");
      reset();
      $("#numB").text(numBr);
    }
  }
});
$("#breakPlus").on("click", function() {
  if (!functionRunning) {
    numBr++;
    $("#clock").text(numSess + ":" + "00");
    reset();
    $("#numB").text(numBr);
  }
});

$("#circleBtn").on("click", function() {
  if (!isBreak) {
    if (!functionRunning) {
      functionRunning = true;
      sessionCountdown();
    } else {
      functionRunning = false;
      clearInterval(timerId);
    }
  } else {
    if (!functionRunning) {
      functionRunning = true;
      breakCountdown();
    } else {
      functionRunning = false;
      clearInterval(timerId);
    }
  }
});