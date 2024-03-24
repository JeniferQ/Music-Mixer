const musicTracks = document.querySelectorAll(".track-selector img"),
    playButton = document.querySelectorAll('.play'),
    pauseButton = document.querySelectorAll('.pause'),
    restartButton = document.querySelectorAll('.restart'),
    audioElement = document.querySelector('#audio'),
    cd = document.querySelectorAll('.cd'),
	playerDropZone = document.querySelector('.player-zone');

let draggedPiece;

function startThisAudio() {
    let currentSrc = `audio/${this.dataset.trackref}.mp3`;
            
    audioElement.src = currentSrc;    

    audioElement.load();
    play();

    console.log('user is playing the', this.dataset.trackref);
}

function play() { 
    audioElement.play();
    playerDropZone.style.animation = "beat 1s infinite ease-in-out";
    cd.forEach(cd => cd.style.animation = "spin 1s infinite linear");
}

function pause() { 
    audioElement.pause();
    
    playerDropZone.style.animation = "";
    cd.forEach(cd => cd.style.animation = "");
}

function restart() { 
    audioElement.currentTime = 0; 
    play();

    playerDropZone.style.animation = "beat 1s infinite ease-in-out";
    cd.forEach(cd => cd.style.animation = "spin 1s infinite linear");
}

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
}


musicTracks.forEach(track => track.addEventListener('click', startThisAudio));
musicTracks.forEach(track => track.addEventListener("dragstart", startDrag));
document.getElementById("audio").loop = true;

playButton.forEach(button => button.addEventListener('click', play));
pauseButton.forEach(button => button.addEventListener('click', pause));
restartButton.forEach(button => button.addEventListener('click', restart));

playerDropZone.addEventListener("dragover", dragOver);
playerDropZone.addEventListener("drop", endDrag);