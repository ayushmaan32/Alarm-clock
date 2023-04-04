const currentTimeDisplay = document.getElementById("currentTimeDisplay");

console.log("javascript is running");

function display() {
  let currentTime = new Date();
  let hours = currentTime.getHours();
  let mins = currentTime.getMinutes();
  let secs = currentTime.getSeconds();

  let zone = "AM";

  if (hours > 12) {
    hours = hours - 12;
    zone = "PM";
  }
  if (hours === 0) {
    hours = 12;
  }

  if (mins < 10) {
    mins = "0" + mins;
  }
  if (secs < 10) {
    secs = "0" + secs;
  }

  let clockTime = hours + ":" + mins + ":" + secs + " " + zone;

  currentTimeDisplay.innerText = clockTime;

  let timeId = setInterval(function () {
    display();
  }, 1000);
}

display();
