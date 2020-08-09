// console.log('harsh')
// let myArray = ["mango","grapes","oranges","strawberry"];
// // console.log(myArray)
// for(let element in myArray){
//     console.log(myArray[element])
// }

// for (let index = 0; index < myArray.length; index++) {
//     const element = myArray[index];
//     console.log(element)
// }

// for(let fruit of myArray){
//     console.log(fruit)

var timeupdate = setInterval(updateclock, 1000);

let clickmebtn = document.getElementById("clickmebtn");
clickmebtn.addEventListener("click", playsound);
function playsound() {
  let audio = new Audio("alarm.mp3");
  audio.play();
}

function alarmring() {
  let audio = new Audio("alarm.mp3");
  audio.play();
}

let setalarmbtn = document.getElementById("setalarm");
setalarmbtn.addEventListener("click", setalarm);
function setalarm() {
  let alarmtime = document.getElementById("alarm").value;
  console.log(alarmtime);
  let newdate = new Date(alarmtime);
  console.log(newdate);
  let originaldate = new Date();
  console.log(originaldate);
  let sub = newdate - originaldate;
  console.log(sub);
  if (sub > 0) {
    setTimeout(() => {
      console.log("ringing alarm");
      alarmring();
    }, sub);
  }
}

// Clock function
function updateclock() {
  let currtime = new Date();
  let currhours = currtime.getHours();
  let currminutes = currtime.getMinutes();
  let currseconds = currtime.getSeconds();
  //   console.log(currhours, currminutes, currseconds);
  currminutes = (currminutes < 10 ? "0" : "") + currminutes;
  currseconds = (currseconds < 10 ? "0" : "") + currseconds;
  currhours = currhours > 12 ? currhours - 12 : currhours;
    currhours = currhours = 0 ? "12" : currhours;
    currhours = (currhours<10 ? "0" : "") +currhours;
  let daynight = currhours < 12 ? "AM" : "PM";
  let currtimestring =
    currhours + ":" + currminutes + ":" + currseconds + " " + daynight;
  document.getElementById("clock").innerHTML = currtimestring;
}
