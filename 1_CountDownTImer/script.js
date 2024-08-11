const daysEl = document.getElementById("days")
const hoursEl = document.getElementById("hours")
const minutesEl = document.getElementById("minutes")
const secondsEl = document.getElementById("seconds")
    

const newYear = new Date("2 jan 2025")


    

function setTime(){

    const currentDate = new Date();

    const timeDifference  = newYear - currentDate

    const days=  Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours=  Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    daysEl.textContent = days
    hoursEl.textContent = formatTime(hours) 
    minutesEl.textContent =  formatTime(minutes)
    secondsEl.textContent = formatTime(seconds)

    
    
}

function formatTime(time){
    return time < 10 ? `0${time}`:time
}

setInterval(setTime,1000)