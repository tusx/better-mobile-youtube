
// show extension is loaded
console.log("[Better Mobile Youtube] Better Mobile Youtube has been Loaded!");

let currentURL = window.location.href.replace(/\#.*/, '');


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
        console.log('[Better Mobile Youtube]: ', result.bmy_playback_speed);

        if (result.bmy_playback_speed == null || result.bmy_playback_speed == undefined) {
            return
        } else {
            data = Number(result.bmy_playback_speed);

            console.log('[Better Mobile Youtube] Retrieved playback speed:', data);

            // Set the playback rate
            videoElement.playbackRate = data;
        }

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
        data = event.target.value;

        browser.storage.local.set({ "bmy_playback_speed": data }).then(() => {
            console.log('[Better Mobile Youtube] playback speed saved locally:', data);

        }).catch(error => {
            console.error('[Better Mobile Youtube] Error saving playback speed:', error);
        });


    });

}


function on_player_settings_clicked() {

    console.log("[Better Mobile Youtube] Player settings Watcher, ON!");

    // Get the element with the specified class
    const button = document.querySelector('.player-settings-icon');


    // Add an event listener to the button
    button.addEventListener('click', function (event) {
        // Your event handling logic here
        console.log('[Better Mobile Youtube] Player Settings Button clicked');
        // on_playback_speed_changed();
        setTimeout(on_playback_speed_changed, 500);

    });


}

function on_video_played(videoElement) {
    videoElement.addEventListener("play", (event) => {
        console.log("[Better Mobile Youtube] Player Started");

        load_custom_playback_speed();

    });


}

function checkIfSettingsBtnExist() {
    if (document.querySelector('.player-settings-icon')) {
        on_player_settings_clicked()
    } else {
        setTimeout(checkIfSettingsBtnExist, 25);
    }
}


function loop_to_check_player_visibility() {
    console.log("[Better Mobile Youtube] checking if player is visible");
    videoElement = document.querySelector('.html5-main-video');

    if (videoElement) {
        if (videoElement.checkVisibility()) {
            console.log("[Better Mobile Youtube] Player is visible");
            on_video_played(videoElement);
        } else {
            setTimeout(loop_to_check_player_visibility, 150);
            console.log("[Better Mobile Youtube] Player is not visible");
        }
    } else {
        setTimeout(loop_to_check_player_visibility, 150);
    }

}


function noticeWhenWebpageChanged() {
    window.addEventListener('popstate', function (event) {
        if (window.location.href.replace(/\#.*/, '') == currentURL) {
            console.log("Url the same");
        } else {
            currentURL = window.location.href.replace(/\#.*/, '');
            loop_to_check_player_visibility();
        }
    });
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



function checkIfPageElementsLoaded() {
    if (document.getElementsByClassName('mobile-topbar-header-endpoint')) {
        run_extension_functions()
    } else {
        setTimeout(loadCheck, 15);
    }
}




// Runs all the extention functions
function run_extension_functions() {
    console.log("[Better Mobile Youtube] Extension Functions now running");


    setTimeout(on_yt_logo_clicked, 200);

    setTimeout(loop_to_check_player_visibility, 200);

    // Check whether the settings button exists since firefox prevents it from loading due to autoplay with sound prevention
    checkIfSettingsBtnExist()

    // Check when the url changes and insure that the actual webpage has changed, if yes run loop_to_check_player_visibility again
    noticeWhenWebpageChanged();



}



checkIfPageElementsLoaded()

/* Set time delay for activating extension functions
setTimeout(run_extension_functions, 1000); // Delay of 1000 = 1 seconds
*/