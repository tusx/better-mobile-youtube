
// show extension is loaded
console.log("[Better Mobile Youtube] Better Mobile Youtube has been Loaded!");

function autoplay_video() {



    // Select all elements with the specified class
    const elements = document.querySelectorAll('.ytp-button');

    // Iterate over the NodeList and trigger a click event on each element
    elements.forEach(element => {
        element.click();
    });



    const videoElement = document.querySelector('video');
    // videoElement.play();

    console.log('[Better Mobile Youtube] Auto Play Done');
}




function load_custom_playback_speed() {

    // Assuming 'videoElement' is a reference to the <video> element
    videoElement = document.querySelector('video');

    browser.storage.local.get('bmy_playback_speed').then(result => {
        console.log('[Better Mobile Youtube]: ');
        console.log(result.bmy_playback_speed);

        data = Number(result.bmy_playback_speed);

        console.log('[Better Mobile Youtube] Retrieved playback speed:', data);

        // Set the playback rate
        videoElement.playbackRate = data;

    }).catch(error => {
        console.error('[Better Mobile Youtube] Error retrieving playback speed:', error);
    });

}

function on_playback_speed_changed() {

    console.log('Detected playback speed changed');
    // Get a reference to the select element
    const selectElement = document.getElementById('player-speed-dropdown:3');

    // Add an event listener for the 'change' event
    selectElement.addEventListener('change', function (event) {
        // Your event handling logic here
        data = event.target.value;

        browser.storage.local.set({ "bmy_playback_speed": data }).then(() => {
            console.log('[Better Mobile Youtube] playback speed saved locally:', data);

        }).catch(error => {
            console.error('[Better Mobile Youtube] Error saving playback speed:', error);
        });

        console.log('[Better Mobile Youtube] Saved playback speed:', event.target.value);
    });

}


function on_player_settings_clicked() {

    console.log("[Better Mobile Youtube] Player settings Watcher, ON!");

    // Get all elements with the specified class
    const buttons = document.querySelectorAll('.player-settings-icon');

    // Iterate through each button and add an event listener
    buttons.forEach(button => {
        button.addEventListener('click', function (event) {
            // Your event handling logic here
            console.log('[Better Mobile Youtube] Player Settings Button clicked');
            // on_playback_speed_changed();
            setTimeout(on_playback_speed_changed, 500);
            setTimeout(change_youtube_logo, 500);
            setTimeout(change_youtube_logo, 10000);
        });
    });



}

function on_video_played() {
    videoElement = document.querySelector('video');
    load_custom_playback_speed();
    videoElement.addEventListener("play", (event) => {
        console.log("[Better Mobile Youtube] Player Started");

        load_custom_playback_speed();

    });

    setTimeout(on_player_settings_clicked, 1000);

}


function loop_to_check_player_visibility() {
    console.log("[Better Mobile Youtube] checking if player is visible");
    videoElement = document.querySelector('video');

    if (videoElement.checkVisibility()) {
        on_video_played();
    } else {
        setTimeout(loop_to_check_player_visibility, 1000);
    }

}


function on_yt_logo_clicked() {
    console.log("[Better Mobile Youtube] ytl-listner");
    youtube_logo = document.getElementsByClassName('mobile-topbar-header-endpoint');
    youtube_logo[0].addEventListener("click", function (event) {
        // Get the href attribute of the clicked link
        const yt_href = "https://m.youtube.com/";
        console.log("[Better Mobile Youtube] ytl clicked");

        // Navigate to the clicked link
        window.location.href = yt_href;
    });

}


function run_extension_functions() {
    console.log("[Better Mobile Youtube] Extension Functions now runing");

    setTimeout(on_yt_logo_clicked, 1000);
    setTimeout(loop_to_check_player_visibility, 1000);


}

setTimeout(run_extension_functions, 1000); // Delay of 1000 = 1 seconds

