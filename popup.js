document.addEventListener("DOMContentLoaded", () => {
    // Check the current state of the video repeat when the popup opens
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: getLoopState,
        }, (results) => {
            const isLooping = results[0].result;
            updateUI(isLooping);  // Update button and status based on the current loop state
        });
    });

    // Add click listener to toggle repeat
    document.getElementById("repeatButton").addEventListener("click", () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: toggleRepeat,
            }, (results) => {
                const isLooping = results[0].result;
                updateUI(isLooping);  // Update button and status after toggling
            });
        });
    });
});

// Function to toggle repeat on/off
function toggleRepeat() {
    const videoPlayer = document.querySelector('video');
    if (videoPlayer) {
        videoPlayer.loop = !videoPlayer.loop;
        return videoPlayer.loop;  // Return the new loop state (true/false)
    }
    return false;
}

// Function to check the current loop state
function getLoopState() {
    const videoPlayer = document.querySelector('video');
    if (videoPlayer) {
        return videoPlayer.loop;
    }
    return false;
}

// Update UI based on the loop state
function updateUI(isLooping) {
    const repeatButton = document.getElementById("repeatButton");
    const statusText = document.getElementById("status");

    if (isLooping) {
        repeatButton.textContent = "Turn OFF Repeat";
        statusText.textContent = "Repeat is ON";
    } else {
        repeatButton.textContent = "Turn ON Repeat";
        statusText.textContent = "Repeat is OFF";
    }
}
