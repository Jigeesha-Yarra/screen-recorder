let video = document.querySelector("video");
let timer = document.querySelector(".timer");
let recordBtnCont = document.querySelector(".recorder-btn-count");
let recordBtn = document.querySelector(".record-btn");
let captureBtnCont = document.querySelector(".capture-btn-cont");
let captureBtn = document.querySelector(".capture-btn");
let filter = document.querySelector(".filter-layer");
let allFilter = document.querySelectorAll(".filter");
let transparentColor = "transparent";

let recordFlag = false;

let recorder; // store undefined
let chunks = []; // media data is stored in chunks

let constraints = {
    audio: true,
    video: true,
}


//navigator is a global obj where this gives info about browser
navigator.mediaDevices.getUserMedia(constraints)
.then((stream) => {
    video.srcObject = stream;

    recorder = new MediaRecorder(stream);
    recorder.addEventListener("start", (e) => {
        chunks = [];
    });
    recorder.addEventListener("dataavailable", (e) => {
        chunks.push(e.data);
    });
    recorder.addEventListener("stop", (e) => {
        // convert the media chunks data to video
        let blob = new Blob(chunks, {type: "video/mp4"});
        let videoURL = URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = videoURL;
        a.download = "stream.mp4";
        a.click();
    });

    recordBtnCont.addEventListener("click", (e) => {
        if(!recordBtn) return;
        recordFlag = !recordFlag;
        if(recordFlag){ // for start
            recorder.start();
            recordBtn.classList.add("scale-rec");
            startTimer();
        }else{ // for stop
            recorder.stop();
            recordBtn.classList.remove("scale-rec");
            stopTimer();
        }
    });
});


// video is actually captured as chunks, but what these chunks will have?
// each chunk will be having a frame, image is actually a frame

captureBtnCont.addEventListener("click", (e) => {
    captureBtnCont.classList.add("scale-cap"); // for adding animations

    let canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    let imageURL = canvas.toDataURL("image/jpeg");

    let tool = canvas.getContext("2d");
    tool.drawImage(video,0,0,canvas.width,canvas.height);
    //filtering
    tool.fillStyle = transparentColor;
    tool.fillRect(0,0,canvas.width,canvas.height);

    let a = document.createElement("a");
    a.href = imageURL;
    a.download = "Image.jpeg";
    a.click();

    //remove animations
    setTimeout(() => {
        captureBtn.classList.remove("scale-cap");
    },500);
});

//filtering logic
allFilter.forEach((filterEle) => {
    filterEle.addEventListener("click", (e) => {
        //get style
        transparentColor = getComputedStyle(filterEle).getPropertyValue("background-color");
        filter.style.backgroundColor =  transparentColor;
    });
});


let counter = 0; // total seconds
let timerId;
function startTimer(){
    timer.style.display = "block";
    function displayTimer(){
        let totalSeconds = counter;
        let hours = Number.parseInt(totalSeconds/3600);
        totalSeconds = totalSeconds % 3600;
        let minutes = Number.parseInt(totalSeconds/60);
        totalSeconds = totalSeconds % 60;
        let seconds = totalSeconds;

        hours = (hours < 10) ? ` 0${hours}` : hours;
        minutes = (minutes < 10) ? `0${minutes}` : minutes;
        seconds = (seconds < 10) ? `0${seconds}` : seconds;
        
        timer.innerText = `${hours}:${minutes}:${seconds}`;
        counter ++;
    }
    timerId = setInterval(displayTimer,1000);
    // for every 1sec displayTimer() function will call
}

/*
    How to calculate the timer?
    1. Initialize a variable that actually stores no. of seconds
    2. Whenever this function displayTimer is called then we need to increment 
    the counter variable, as each call of this function is considered as 1sec 
    in regular time. It's because we need to get the actual time when this needs counted.
    How to count Hours, Minutes & Seconds?
    counter = 3725
    as we know 1hr = 3600 sec,
    to count 1hr using counter value, we use '/(div operator)' btw counter and 3600sec.
    division operator is used to perform floor division 3725/3600 >= 1 
    remainder 3725%3600 are no. of minutes in seconds, so we need to convert back to minutes,
    1min = 60secs
*/

function stopTimer(){
    clearInterval(timerId);
    timer.innerText = "00:00:00";
    timer.style.display = "none";
}
