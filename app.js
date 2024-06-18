
// show extension is loaded
console.log("[Better Mobile Youtube] Better Mobile Youtube has been Loaded!");



// function open_link_in_new_tab() {

//     // Select all anchor elements on the page
//     const links = document.querySelectorAll('a');

//     // Loop through each link
//     links.forEach(link => {
//         // Check if the link does not have a target attribute and its href contains the word "watch"
//         if (!link.hasAttribute('target') && link.href.toLowerCase().includes('watch?')) {
//             // Add target="_blank" attribute to the link
//             link.setAttribute('target', '_blank');
//         }
//     });

//     // Call modifyLinks again after 1 second
//     setTimeout(open_link_in_new, 1000);

// }


// function open_link_in_new() {
//     if (window.location.href.includes("watch?")) {
//         // Page URL contains the word "watch"
//         console.log("[Better Mobile Youtube] No need to make video open in new tab");
//         // Your additional logic here
//     } else {

//         console.log("[Better Mobile Youtube] Videos should be opned in new tab");
//         open_link_in_new_tab();
//     }

// }


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

    // Get the element with the specified class
    const button = document.querySelector('.player-settings-icon');

    console.log("[Better Mobile Youtube]:", button)
    // Add an event listener to the button
    button.addEventListener('click', function (event) {
        // Your event handling logic here
        console.log('[Better Mobile Youtube] Player Settings Button clicked');
        // on_playback_speed_changed();
        setTimeout(on_playback_speed_changed, 500);
        setTimeout(change_youtube_logo, 500);
        setTimeout(change_youtube_logo, 10000);
    });

/* Accounting for multiple buttons

    const buttons = document.querySelectorAll('.player-settings-icon');

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
*/


}

function on_video_played() {
    videoElement = document.querySelector('video');
    load_custom_playback_speed();
    videoElement.addEventListener("play", (event) => {
        console.log("[Better Mobile Youtube] Player Started");

        load_custom_playback_speed();

    });


    // Check whether the settings button exists since firefox prevents it from loading due to autoplay with sound prevention
    function loadCheckSettings() {
        if (document.querySelector('.player-settings-icon')) {
            on_player_settings_clicked()
        } else {
          setTimeout(loadCheckSettings, 25);
        }
    }
    
    loadCheckSettings()

    // if (videoElement.onplaying()) {
    //     console.log('[Better Mobile Youtube] The video is currently playing.');
    //     load_custom_playback_speed();
    // } else {
    //     autoplay_video();
    //     setTimeout(load_custom_playback_speed, 1000);
    // }
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



// function yotube_logo() {
//     return `

// <a href="http://m.youtube.com/" style="font-size:25px;" >  <img src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg" height="25px" style="margin-left:10px;" >  YouTube </a>

//     `;
// }

// function youtube_loading() {

//     return `<a href="http://m.youtube.com/" style="font-size:25px;" >  <img src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg" height="25px" style="margin-left:10px;" >  Loading... </a>`;

// }




// function change_youtube_logo_2_loading() {
//     youtube_logo = document.getElementsByTagName('ytm-home-logo');
//     youtube_logo[0].innerHTML = youtube_loading();

//     // custmon_logo_element = document.createElement('div');
//     // custmon_logo_element.setAttribute("id", "bmy-yt-logo");

//     // youtube_logo[0].after(custmon_logo_element);
//     // youtube_logo[0].style.display = "none";

//     // bmy_logo_ele = document.getElementById("bmy-yt-logo");
//     // bmy_logo_ele.innerHTML = 

//     // youtube_logo[0].innerHTML = youtube_loading();
// }


// function change_youtube_logo() {
//     // youtube_logo = document.getElementById('bmy-yt-logo');
//     // youtube_logo.innerHTML = yotube_logo();

//     youtube_logo = document.getElementsByTagName('ytm-home-logo');
//     youtube_logo[0].innerHTML = yotube_logo();


//     // youtube_logo[0].innerHTML = yotube_logo();
//     // console.log("[Better Mobile Youtube] Youtube Logo Changed.");
// }

// function on_youtube_header_update() {

//     var observer = new MutationObserver(function (mutations) {
//         mutations.forEach(function (mutation) {
//             console.log("[Better Mobile Youtube]:")
//             console.log(mutation);
//         });
//     });

//     var config = { characterData: true, subtree: true };
//     observer.observe(observables, config);

// }

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
    // youtube_logo.forEach(youtube_log => {
    //     youtube_log.addEventListener('click', function (event) {
    //         // Your event handling logic here
    //         const yt_href = "https://m.youtube.com/";

    //         // Navigate to the clicked link
    //         window.location.href = yt_href;
    //     });
    // });
}


// function on_video_page() {
//     document.querySelectorAll('a').forEach(link => {
//         link.addEventListener('click', function (event) {
//             // Get the href attribute of the clicked link
//             const href = this.getAttribute('href');

//             // Navigate to the clicked link
//             window.location.href = href;
//         });
//     });
// }





function run_extension_functions() {
    console.log("[Better Mobile Youtube] Extension Functions now running");

    // setTimeout(on_video_page, 1500);

    // setTimeout(autoplay_video, 500);

    /* setTimeout(on_player_settings_clicked, 3000); 
    Function is called in on_video_played() */

    // setTimeout(load_custom_playback_speed, 2000);

    // setTimeout(change_youtube_logo, 1000);

    setTimeout(on_yt_logo_clicked, 1000);

    // setTimeout(on_video_played, 1000);

    // setTimeout(open_link_in_new, 1500);

    setTimeout(loop_to_check_player_visibility, 1000);



    // just incase for very slow connections
    // setTimeout(change_youtube_logo, 5000);
    // setTimeout(change_youtube_logo, 10000);
    // setTimeout(change_youtube_logo, 20000);


}


// setTimeout(change_youtube_logo_2_loading, 1000);

function loadCheck() {
    if (document.getElementsByClassName('mobile-topbar-header-endpoint')) {
        run_extension_functions()
    } else {
      setTimeout(loadCheck, 15);
    }
}

loadCheck()

/* Set time delay for activating extension functions
setTimeout(run_extension_functions, 1000); // Delay of 1000 = 1 seconds
*/