function twitchHelp() {
	// from https://www.twitch.tv/team/alienwarehive
	const alienStreamers = [
			'Ambussshking',
			'MatthewSantoro',
			'runJDrun',
			'nicovald',
			'Sigils',
			'Kelsi',
			'Lovinurstyle',
			'PirateGray',
			'Elly_VT',
			'REDinFamy',
			'Dikymo',
			'rxysurfchic'
	];

	alienStreamers.some(name => {
			if (window.location.pathname.includes(name)) {
					document.querySelector('.persistent-player').remove();
					document.querySelector('.channel-root__player').remove();
					document.querySelector('.channel-root__info').style = '';
					// mute stream
					let isInit = false;
					$(document).ajaxComplete(() => {
							if(isInit) return;
							let $player = $('#player');
							if (!$player.length) return;
							let clicks = 0;
							let $muteButton = $player.find('.player-button--volume');
							let $overlay = $player.find('.player-overlay.player-fullscreen-overlay');
							$overlay.click(function () {
									clicks++;
									setTimeout(() => {
											if (clicks === 1) { $muteButton.click(); }
											clicks = 0;
									}, 250);
							});

							isInit = true;
					});
			 }
	 })
};

function awaTwitchPageRedir() {
    // removes links with broken streamers
    // $(".media:contains('runJDrun')").remove();
    // $(".media:contains('GeekBomb')").remove();

    const targetLink = document.querySelectorAll('a.btn-primary');

    if (targetLink.length) {
        setTimeout(function () {
            window.location.href = targetLink[targetLink.length - 1].href;
        }, 3000);
    } else {
        setTimeout(function () {
            location.reload(true);
        }, 300000); // 5 minutes in milliseconds
    }
};