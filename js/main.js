const musicTracks = document.querySelectorAll(".track-selector img"),
    playButton = document.querySelectorAll('.play'),
    pauseButton = document.querySelectorAll('.pause'),
    restartButton = document.querySelectorAll('.restart'),
    clearButton = document.querySelectorAll('.clear'),
    cd = document.querySelectorAll('.cd'),
    trackElement = document.createElement("audio"),
    playerDropZone = document.querySelector('.player-zone');

let draggedPiece,
    audioElementList = [],
    audioCheckList = []; 

function startDrag() {
    console.log('user started dragging an audio');
    draggedPiece = this;
}
    
function dragOver(e) {
    e.preventDefault();
    console.log('user is dragging an audio over the zone');
}
    
function endDrag(e) {
    e.preventDefault();
    console.log('user has dropped the audio');
    
    const dropped = draggedPiece.dataset.trackref;
    if (!audioCheckList.includes(dropped)) {
        playAudio(dropped);
        audioCheckList.push(dropped);
        trackElement.pause();
    }
    else {
        console.log('This audio is already in the player.');
    }
}

function playAudio(dropped) {
    const audioElement = document.createElement("audio");

    audioElement.src = `audio/${dropped}.mp3`;
    audioElement.loop = true;
    audioElement.play();
    audioElementList.push(audioElement);
    playerDropZone.appendChild(audioElement);   

    playerDropZone.style.animation = "beat 1s infinite ease-in-out";
    cd.forEach(cd => cd.style.animation = "spin 1s infinite linear");
    console.log('now playing:', dropped);
}

function trackPlay() {
    clear();
    trackElement.src = `audio/${this.dataset.trackref}.mp3`;
    trackElement.loop = true;
    trackElement.play();

    playerDropZone.style.animation = "";
    cd.forEach(cd => cd.style.animation = "spin 1s infinite linear");
    console.log ('user is playing the', this.dataset.trackref);
}

function play() { 
    audioElementList.forEach(audio => audio.play());
    trackElement.play();

    playerDropZone.style.animation = "beat 1s infinite ease-in-out";
    cd.forEach(cd => cd.style.animation = "spin 1s infinite linear");
}

function pause() { 
    audioElementList.forEach(audio => audio.pause());
    trackElement.pause();

    playerDropZone.style.animation = "";
    cd.forEach(cd => cd.style.animation = "");
}

function restart() { 
    audioElementList.forEach(audio => audio.currentTime = 0);
    trackElement.currentTime = 0;
    play(); 

    playerDropZone.style.animation = "beat 1s infinite ease-in-out";
    cd.forEach(cd => cd.style.animation = "spin 1s infinite linear");
}

function clear() {
    pause();
    trackElement.src = "";
    audioElementList.splice(0, audioElementList.length);
    audioCheckList = [];
    audioElementList = [];

    playerDropZone.style.animation = "";
    cd.forEach(cd => cd.style.animation = "");
}

musicTracks.forEach(track => track.addEventListener('click', trackPlay));
musicTracks.forEach(track => track.addEventListener("dragstart", startDrag));

playButton.forEach(button => button.addEventListener('click', play));
pauseButton.forEach(button => button.addEventListener('click', pause));
restartButton.forEach(button => button.addEventListener('click', restart));
clearButton.forEach(button => button.addEventListener('click', clear));

playerDropZone.addEventListener("dragover", dragOver);
playerDropZone.addEventListener("drop", endDrag);