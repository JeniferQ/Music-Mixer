const musicTracks = document.querySelectorAll(".track-selector img"),
    playButton = document.querySelectorAll('.play'),
    pauseButton = document.querySelectorAll('.pause'),
    restartButton = document.querySelectorAll('.restart'),
    audioElement = document.querySelector('#audio'),
	playerDropZone = document.querySelector('.player-zone');

let draggedPiece;

function startThisAudio() {
    let currentSrc = `audio/${this.dataset.trackref}.mp3`;
            
    audioElement.src = currentSrc;    

    audioElement.load();
    playThisAudio();

    console.log('user is playing the', this.dataset.trackref);
}

function play() { 
    audioElement.play(); 
}

function pause() { 
    audioElement.pause(); 
}

function restart() { 
    audioElement.currentTime = 0; 
    playThisAudio(); 
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