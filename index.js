const currentTimeDisplay = document.getElementById("currentTimeDisplay");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const timeZone = document.getElementById("zone-time");

const setAlarm = document.getElementById("set-alarm");
const stopAlarm = document.getElementById("stop");

const alarmContainer = document.getElementsByClassName("alarms-list-container");

// audio to ring alarm
const audio = new Audio("./assets/sound1.mp3");

//Add loop to continue alarm
audio.loop = true;

audio.load();
// creating empty array of alarm
let alarmList = [];

console.log("javascript is running");

//function to display current time
function display() {
  let currentTime = new Date();
  let hours = currentTime.getHours();
  let mins = currentTime.getMinutes();
  let secs = currentTime.getSeconds();

  let zone = "am";

  if (hours > 12) {
    hours = hours - 12;
    zone = "pm";
  }
  if (hours === 0) {
    hours = 12;
  }
  if (hours < 10) {
    hours = "0" + hours;
  }

  if (mins < 10) {
    mins = "0" + mins;
  }
  if (secs < 10) {
    secs = "0" + secs;
  }

  let clockTime = hours + ":" + mins + ":" + secs + " " + zone;

  currentTimeDisplay.innerText = clockTime;

  alarmList.forEach((alarm) => {
    if (alarm.time === clockTime) {
      ringAlarm(alarm);
    }
  });

  let timeId = setInterval(function () {
    display();
  }, 1000);
}

display();

//function to create new Alarm
function createAlarm() {
  let hrs = hours.value;
  let mins = minutes.value;
  let secs = seconds.value;
  let zone = timeZone.value;

  if (parseInt(hrs) > 12 || parseInt(mins) > 59 || parseInt(secs) > 59) {
    alert(
      "Please enter a valid time to set up an alarm,Hours must not be greater than 12 and minutes and seconds must not be greater than 59 !!!!"
    );
    return;
  }

  if (parseInt(hrs) == 0) {
    alert("Please enter the valid time !!");
    return;
  }
  if (parseInt(hrs) < 10) {
    hrs = "0" + parseInt(hrs);
  } else {
    hrs = "" + parseInt(hrs);
  }
  if (parseInt(mins) < 10) {
    mins = "0" + parseInt(mins);
  } else {
    mins = "" + parseInt(mins);
  }
  if (parseInt(secs) < 10) {
    secs = "0" + parseInt(secs);
  } else {
    secs = "" + parseInt(secs);
  }

  const newAlarmTime = `${hrs}:${mins}:${secs} ${zone}`;

  const alarmExists = alarmList.some((alarm) => alarm.time === newAlarmTime);

  if (alarmExists) {
    alert("alarm already exist");
    return;
  } else {
    alarmList.push({
      time: newAlarmTime,
      id: Math.floor(Math.random() * 1000),
    });

    hours.value = "00";
    minutes.value = "00";
    seconds.value = "00";
    renderAlarmList();
  }
}

// Function to Render the Alarm list
function renderAlarmList() {
  // Clear the current list of alarms
  alarmContainer[0].innerHTML = "";

  // Render each alarm as a list item
  alarmList.forEach((alarm) => {
    const listItem = document.createElement("li");
    listItem.classList.add("alarm-list");

    listItem.innerHTML = ` <div class ="info"><ion-icon name="alarm-outline"></ion-icon> <p>${alarm.time}</p></div>    <button class="delete-btn" onClick= remove(this.value) value= ${alarm.id}>Delete</button> `;

    console.log(listItem);
    alarmContainer[0].appendChild(listItem);
  });
}
//function to ring current Alarm
function ringAlarm(alarm) {
  // alert(`hey it is ${alarm.time}`);
  audio.play();
}
// function to stop current alarm
function stopCurrentAlarm() {
  audio.pause();
  // clearInterval(timeId);
  alert("Alarm has stopped");
}

// Remove alarm from arryList when "Delete" button is clicked
const remove = (value) => {
  console.log(value);
  alarmList = alarmList.filter((item) => item.id != value);
  console.log(alarmList);
  renderAlarmList();
};

//add ane EventListner to an setAlarm button
setAlarm.addEventListener("click", (e) => {
  e.preventDefault();
  createAlarm();
});

//add ane EventListner to an stopAlarm button
stopAlarm.addEventListener("click", (e) => {
  e.preventDefault();
  stopCurrentAlarm();
});
