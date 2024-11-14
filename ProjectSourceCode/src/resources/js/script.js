function setTheme(theme) {
    const body = document.body;
    if (theme === 'Light') {
      body.setAttribute('data-bs-theme', 'light');
    } else if (theme === 'Dark') {
      body.setAttribute('data-bs-theme', 'dark');
    }
}

function setDifficulty(level){
    if (level == 'Easy'){

    }

    else if (level == 'Medium'){

    }

    else if (level == 'Hard'){
        
    }
}

function toggleMute() {
    isMuted = !isMuted;
    // audioElements is just a temp variable for now 
    const audioElements = document.querySelectorAll("audio");

    // loop to mute all the aduios we're going to set up
    audioElements.forEach(audio => {
      audio.muted = isMuted;
    });

    // this updates the toggle button to say unmute/mute depending on what its on right now
    document.getElementById("muteButton").innerText = isMuted ? "Unmute" : "Mute";
}