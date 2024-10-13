chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: repeatYouTubeVideo
    });
});

function repeatYouTubeVideo() {
    const videoPlayer = document.querySelector('video');
    if (videoPlayer) {
        videoPlayer.loop = !videoPlayer.loop;  // Toggle repeat
        alert(videoPlayer.loop ? "Repeat is ON" : "Repeat is OFF");
    }
}
