const musicTracks = document.querySelectorAll(".track-selector img"),
    playButton = document.querySelectorAll('.play'),
    pauseButton = document.querySelectorAll('.pause'),
    restartButton = document.querySelectorAll('.restart'),
    audioElement = document.querySelector('#audio'),
    cdDropZone = document.querySelector('.cd-zone'),
	playerDropZone = document.querySelector('.player-zone');

let draggedTrack, draggedCD;

function startThisAudio() {
    let currentSrc = `audio/${this.dataset.trackref}.mp3`;
            
    audioElement.src = currentSrc;    

    audioElement.load();
    playThisAudio();

    console.log('user is playing the', this.dataset.trackref);
}

function playThisAudio() { 
    audioElement.play(); 
}

function pauseThisAudio() { 
    audioElement.pause(); 
}

function restartThisAudio() { 
    audioElement.currentTime = 0; 
    playThisAudio(); 
}

function startDrag() { 
	console.log('user is dragging this audio');
	draggedTrack = this;
}

function dragOver(e) { 
	e.preventDefault(); 
	console.log('this music is being dragged over the player'); 
}

function endDrag(e) { 
	e.preventDefault();
	console.log('the music was dropped on the player');

    var audio = document.createElement("audio");
    audio.src = `audio/${this.dataset.trackref}.mp3`;

	this.appendChild(audio);
}

musicTracks.forEach(track => track.addEventListener('click', startThisAudio));
musicTracks.forEach(track => track.addEventListener("dragstart", startDrag));
document.getElementById("audio").loop = true;

playButton.forEach(button => button.addEventListener('click', playThisAudio));
pauseButton.forEach(button => button.addEventListener('click', pauseThisAudio));
restartButton.forEach(button => button.addEventListener('click', restartThisAudio));

cdDropZone.addEventListener("dragover", dragOver);
cdDropZone.addEventListener("drop", endDrag);

playerDropZone.addEventListener("dragover", dragOver);
playerDropZone.addEventListener("drop", endDrag);