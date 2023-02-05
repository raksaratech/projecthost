// set our variables
var time, alarm, currentH, currentM,
    activeAlarm = false,
    sound = new Audio("sound/alarm.mp3");


// loop alarm
sound.loop = true;


function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  seconds = seconds < 10 ? '0'+seconds : seconds;
  var strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
  return strTime;
}

console.log(formatAMPM(new Date));

// define a function to display the current time
function displayTime() {
  time = formatAMPM(new Date);
  clock.textContent = time;
  // time = "1:00:00 AM";
  // watch for alarm
  if (time === alarm) {
    sound.play();
    
    // show snooze button
    // snooze.className = "";    if want snooze 5min
    captchadiv.className = "";
    createCaptcha();
  }
  setTimeout(displayTime, 1000);
}
displayTime();







// add option values relative towards time
function addMinSecVals(id) {
  var select = id;
  var min = 59;
  
  for (i = 0; i <= min; i++) {
    // defined as new Option(text, value)
    select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i < 10 ? "0" + i : i);
  }
}
function addHours(id) {
  var select = id;
  var hour = 12;
  
  for (i = 1; i <= hour; i++) {
    // defined as new Option(text, value)
    select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i);
  }
}
addMinSecVals(minutes);
addMinSecVals(seconds);
addHours(hours);

// set and clear alarm
startstop.onclick = function() {
  // set the alarm
  if (activeAlarm === false) {
    hours.disabled = true;
    minutes.disabled = true;
    seconds.disabled = true;
    ampm.disabled = true;
    
    alarm = hours.value + ":" + minutes.value + ":" + seconds.value + " " + ampm.value;
    // this.textContent = "Clear Alarm";
    this.className="hide";
    activeAlarm = true;
  }
};

// snooze for 5 minutes
snooze.onclick = function() {
  if (activeAlarm === true) {
    // grab the current hour and minute
    currentH = time.substr(0, time.length - 9);
    currentM = time.substr(currentH.length + 1, time.length - 8);
    
    if (currentM >= "55") {
      minutes.value = "00";
      hours.value = parseInt(currentH) + 1;
    } else {
      if (parseInt(currentM) + 5 <= 9) {
        minutes.value = "0" + parseInt(currentM + 5);
      } else {
        minutes.value = parseInt(currentM) + 5;
      }
    }
    
    // hide snooze button
    snooze.className = "hide";
    
    // now reset alarm
    startstop.click();
    startstop.click();
  } else {
    return false;
  }
};



var code;
function createCaptcha() {
  //clear the contents of captcha div first 
  document.getElementById('captcha').innerHTML = "";
  var charsArray =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*";
  var lengthOtp = 6;
  var captcha = [];
  for (var i = 0; i < lengthOtp; i++) {
    //below code will not allow Repetition of Characters
    var index = Math.floor(Math.random() * charsArray.length + 1); //get the next character from the array
    if (captcha.indexOf(charsArray[index]) == -1)
      captcha.push(charsArray[index]);
    else i--;
  }
  var canv = document.createElement("canvas");
  canv.id = "captcha";
  canv.width = 100;
  canv.height = 50;
  var ctx = canv.getContext("2d");
  ctx.font = "25px Georgia";
  ctx.strokeText(captcha.join(""), 0, 30);
  //storing captcha so that can validate you can save it somewhere else according to your specific requirements
  code = captcha.join("");
  document.getElementById("captcha").appendChild(canv); // adds the canvas to the body element
}
function validateCaptcha() {
  if (document.getElementById("cpatchaTextBox").value == code) {
    captchadiv.className = "hide";
  document.getElementById('captchaalert').innerHTML = "";



 // clear the alarm
 hours.disabled = false;
 minutes.disabled = false;
 seconds.disabled = false;
 ampm.disabled = false;
 
 hours.value = "12";
 minutes.value = "00";
 seconds.value = "00";

 sound.pause();
 alarm = "12:00:00 AM";
 startstop.textContent = "Set Alarm";
 startstop.className = "";
 // hide snooze button
 snooze.className = "hide";
 activeAlarm = false;

  }else{
    document.getElementById('captchaalert').innerHTML = "WROND....................!";
  }
}
