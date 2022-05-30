function awaHelper() {
// You can configure options through the user interface. It is not recommended to edit the script for these purposes.
const version = '2.0.0';

let contentToCheck = [];
let saveOptionsTimer;

// Embed style
document.head.appendChild(document.createElement('style')).textContent = `
	/* script buttons */
	.awah-btn-cons,
	.awah-btn-cons:hover {color: gold;}
	.list-group-item > .awah-btn-cons {width: 50%;}
	.list-profile-actions > li > .awah-btn-cons {width: 50%;}
	.awah-btn-cons.disabled {position: relative;}
	.awah-btn-quest.disabled::before,
	.awah-btn-cons.disabled::before {content: ''; width: 100%; height: 100%; position: absolute; top: 0; left: 0; background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACAQMAAABIeJ9nAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAMSURBVAjXY2hgYAAAAYQAgSjdetcAAAAASUVORK5CYII=');}
	.awah-btn-quest {padding-left: 0.25rem; padding-right: 0.25rem;}
	.awah-btn-quest.disabled::before {filter: invert(60%)}
	.awah-panel {margin: 20px 0;}
	.awah-activate-steam-key-btn {text-decoration: none !important; padding: 1px 5px; background-color: rgba( 48, 95, 128, 0.9 ); vertical-align: inherit;}
	.awah-activate-steam-key-btn:hover {background: linear-gradient( -60deg, #417a9b 5%,#67c1f5 95%);}

	/* script tooltips */
	.awah-info-btn {cursor: pointer; opacity: 0.4; transition: opacity 0.25s ease-in-out;}
	.awah-info-btn:hover {opacity: 1;}
	[data-awah-tooltip] {position: relative;}
	[data-awah-tooltip]:after {content: attr(data-awah-tooltip); pointer-events: none; padding: 4px 8px; color: white; position: absolute; left: 0; bottom: 100%; opacity: 0; font-weight: normal; text-transform: none; font-size: 0.9rem; white-space: pre; box-shadow: 0px 0px 3px 0px #54bbdb; background-color: #0e0e0e; transition: opacity 0.25s ease-out, bottom 0.25s ease-out; z-index: 1000;}
	[data-awah-tooltip]:hover:after {bottom: -100%; opacity: 1;}

	/* script GUI */
	#awah-status-overlay {display: flex; flex-flow: column nowrap; align-items: flex-end; color: white; font-size: smaller !important; pointer-events: none; position: fixed; bottom: 0; right: 0; max-width: 40%; min-width: 20%; padding: 1rem 0.5rem 0 0; text-shadow: 2px 2px 2px rgb(0, 0, 0), -1px -1px 2px rgb(0, 0, 0), 2px 2px 5px rgb(0, 0, 0), -1px -1px 5px rgb(0, 0, 0), 0px 0px 10px rgb(0, 0, 0); text-align: right; background: rgba(0, 0, 0, 0) linear-gradient(to right bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.85) 85%, rgba(0, 0, 0, 0.85) 100%) no-repeat scroll 0 0; z-index: 9001;}
	#awah-status-overlay .fa-exclamation-triangle {color: red;}
	#awah-status-overlay a,
	#awah-status-overlay button {pointer-events: all;}
	#awah-status-overlay button {background-color: rgba(255, 255, 255, 0.6);}
	#awah-status-messages {display: flex; flex-flow: column nowrap; align-items: flex-end; white-space: nowrap; border-bottom: 1px solid #1c1e22;}
	#awah-status-messages > div {clear: both; position: relative; animation: awah-slide-from-bottom 0.3s ease-out 1 forwards;}
	.awah-arp-pts {clear: both; width: 100%}
	.awah-arp-pts > div {clear: both; width: 100%; background-position: 50% 50%; background-repeat: no-repeat; background-size: 100% 14px;}
	.awah-arp-pts > div::after {content: ""; display: block; height: 0; clear: both;}
	.awah-grey {color: #767676;}
	.awah-casper-out {overflow: hidden !important; animation: awah-casper-out 0.6s ease-in !important;}
	.awah-rotating {animation: awah-rotating 2s linear infinite;}

	li.awah-nav-panel {}
	li.awah-nav-panel > a.nav-link {width: 2.5rem; height: 2.5rem; float: left; cursor: pointer;}
	li.awah-nav-panel > a.nav-link > i {font-size: 26px;}

	.awah-daily-reset-timer {min-width: 22%;}
	.toast-body table tbody > :nth-child(2n) {background: #090909}

	/* script options */
	.awah-options-btn {float: left; padding-left: 16px; cursor: pointer; transition: text-shadow 0.25s ease-in-out;}
	.awah-options-btn:hover {text-shadow: 0px 0px 3px rgba(75, 201, 239, 1), 0px 0px 12px rgba(75, 201, 239, 1); /* animation: awah-breathing-text-neon 2s ease 0s infinite alternate; */}
	#awah-options {display: flex; flex-flow: column nowrap; overflow: auto; position: fixed; height: 100vh; width: 30vw; right: calc(-5px - 30vw); padding: 0 11px 2rem 11px; text-shadow: 2px 2px 2px rgb(0, 0, 0), -1px -1px 2px rgb(0, 0, 0); text-align: right; background: rgba(0, 0, 0, 0.85) repeat scroll 0 0; box-shadow: 0px 0px 3px 0px #54bbdb; transition: right 0.3s; z-index: 9000;}
	.awah-option {border-bottom: 1px solid #1c1e22; margin-bottom: 11px;}
	.awah-option label {display: flex; flex-flow: row nowrap; justify-content: space-between; align-items: baseline; color: whitesmoke;}
	#awah-options > :first-child {display: flex; flex-flow: row nowrap; justify-content: space-between; align-items: baseline;}
	.awah-opt-input {width: 24%; text-align: right; padding: 0 5px; height: auto; background: transparent; color: white; border-width: 0px 0px 1px 0px;}
	.awah-opt-desc {font-size: smaller;}
	.awah-option > .btn-danger {width: 100%;}
	#awah-options .dismiss-menu {font-size: 32px;}

	/* custom checkbox */
	input.awah-opt-input[type="checkbox"] {position: absolute; right: 0; opacity: 0;}
	input.awah-opt-input[type="checkbox"]:focus + div {border-color: #66afe9; outline: 0; -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6); box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6);}
	.awah-opt-input[type="checkbox"] + div {transition: 0.25s all ease; position: relative; overflow: hidden; cursor: pointer;}
	.awah-opt-input[type="checkbox"] + div > div {transition: 0.25s all ease; background-color: #428bca; width: 50%; height: 100%; position: absolute; left: 0;}
	input.awah-opt-input[type="checkbox"]:checked + div {background-color: rgb(66, 139, 202, 0.4);}
	input.awah-opt-input[type="checkbox"]:checked + div > div {left: calc(100% - 50%);}
	.awah-opt-input[type="checkbox"] + div > div::before {content: 'ON'; position: absolute; right: 120%;}
	.awah-opt-input[type="checkbox"] + div > div::after {content: 'OFF'; color: #767676; position: absolute; left: 120%;}

	/* Giveaways page */
	.awah-giveaway-taken::before {content: attr(awahlabel); display: block; position: absolute; padding: 4rem 2rem; font-family: inherit; font-weight: 700; white-space: pre; overflow: hidden; width: 100%; height: 100%; text-shadow: 2px 2px 2px rgb(0, 0, 0), -1px -1px 2px rgb(0, 0, 0), 2px 2px 5px rgb(0, 0, 0), -1px -1px 5px rgb(0, 0, 0), 0px 0px 10px rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACAQMAAABIeJ9nAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAMSURBVAjXY2hgYAAAAYQAgSjdetcAAAAASUVORK5CYII=');}
	.awah-giveaway-taken:not(:hover) > * {opacity: 0.1; transition: opacity 0.25s ease-in-out;}

	/* comments */
	.insignia-label::before {content: attr(data-arp-level); font-size: 10px; width: 35px; /* 30 for master */ line-height: 30px; /* 26 for master */ position: absolute; text-align: center; pointer-events: none;}

	/* user profile */
	.awah-sub-recent-activity {text-align: center; font-size: smaller; margin-bottom: 10px; margin-top: -10px;}
	section.um-profile__friends {flex-wrap: wrap;}

	@keyframes awah-slide-from-bottom {
		from {opacity: 0.5; bottom: -90px; max-height: 0px;}
		to {opacity: 1; bottom: 0px; max-height: 70px;}
	}
	@keyframes awah-casper-out {
		0%		{filter: blur(0px); max-height: 50px;}
		100%	{filter: blur(15px); max-height: 0px;}
	}
	@keyframes awah-breathing-text-neon {
		from {text-shadow: 0px 0px 3px rgba(75, 201, 239, 0.25), 0px 0px 12px rgba(75, 201, 239, 0.25);}
		to {text-shadow: 0px 0px 3px rgba(75, 201, 239, 1), 0px 0px 12px rgba(75, 201, 239, 1);}
	}
	@keyframes awah-rotating {
		from {transform: rotate(0deg);}
		to {transform: rotate(360deg);}
	}
	@keyframes awah-element-appears-hook {
		from {opacity: 0.99;}
		to {opacity: 1;}
	}
	.giveaways__listing .row > div {animation-duration: 0.001s; animation-name: awah-element-appears-hook;}
	#giveaway-flash-message {animation-duration: 0.001s; animation-name: awah-element-appears-hook;}

	/* Fix for Alienware Arena design bugs */
	.overlay {position: fixed !important;} /* without it .overlay sticks to top of the site and can be skipped by scrolling */
	.videos__listing .videos__listing-post img {max-height: 299px;} /* videos without thumbnail have bigger height and stretching out of the general row */
	`;

class Options {
	constructor() {
		this.load();
	}

	default() {
		return {
			statusMessageDelay: 10000,
			actionsDelayMin: 500,
			actionsDelayMax: 2000,
			twitchPlayerRemove: false,
			twitchWatchAutomate: true,
			showKeyOnMarkedGiveaways: true,
			version,
		};
	}

	load() {
		let defaultOptions = this.default();
		Object.keys(defaultOptions).forEach((key) => this[key] = defaultOptions[key]);

		let savedOptions = JSON.parse(localStorage.getItem('AlienwareArenaHelperOptions'));
		if (savedOptions !== null) {
			Object.keys(savedOptions).forEach((key) => this[key] = savedOptions[key]);
		}
	}

	save() {
		this.actionsDelayMin = parseInt($('#awah-actions-delay-min').val(), 10);
		this.actionsDelayMax = parseInt($('#awah-actions-delay-max').val(), 10);
		this.showKeyOnMarkedGiveaways = $('#awah-show-key-on-marked-giveaways').prop('checked');
		this.twitchPlayerRemove = $('#awah-twitchPlayerRemove').prop('checked');
		this.twitchWatchAutomate = $('#awah-twitchWatchAutomate').prop('checked');
		this.statusMessageDelay = parseInt($('#awah-status-message-delay').val(), 10);

		try {
			localStorage.setItem('AlienwareArenaHelperOptions', JSON.stringify(this));
			return true;
		} catch (e) {
			console.warn(e);
			return false;
		}
	}
}

let options = new Options();

class UI {
	constructor() {
		this.hideOverlayAdditionalFunctions = []; // array of functions triggered by clicking on overlay
		this.hideOverlayHook();
		this.initNavPanel();
		this.initStatusOverlay();
		this.initOptionsUI();

		document.addEventListener('animationend', function(event) {
			if (event.animationName === 'awah-casper-out') {
				event.target.remove();
			}
		}, false);
	}

	initNavPanel() {
		let anchor = document.querySelector('li#notification-dropdown');
		this.navPanel = document.createElement('li');
		this.navPanel.classList.add('nav-item', 'awah-nav-panel');
		anchor.insertAdjacentElement('beforebegin', this.navPanel);
	}

	initStatusOverlay() {
		let statusOverlayElement = document.createElement('div');
		statusOverlayElement.id = 'awah-status-overlay';
		statusOverlayElement.insertAdjacentHTML('afterbegin', '<div id="awah-status-messages"></div><div class="awah-arp-pts"></div>');
		this.messagesContainerElement = statusOverlayElement.querySelector('#awah-status-messages');
		this.messagesContainerElement.insertAdjacentHTML('beforeend', `<div class="awah-con-check-queue" style="display: none;">content to check: <span class="awah-con-check-queue-length">${contentToCheck.length}</span> <span class="fa fa-fw fa-search"></span></div>`);
		document.getElementById('content').appendChild(statusOverlayElement);
	}

	initOptionsUI()	{
		this.navPanel.insertAdjacentHTML('beforeend', '<a class="nav-link awah-options-btn" data-awah-tooltip="AWA Helper options"><i aria-hidden="true" class="fa fa-fw fa-cog"></i></a>');

		document.querySelector('div.wrapper').insertAdjacentHTML('beforebegin', `<div id="awah-options" style="visibility: hidden;">
			<div class="awah-option">
			<a class="dismiss-menu" data-awah-tooltip="Close options"><i aria-hidden="true" class="fas fa-times"></i></a>
			<span class="awah-opt-desc awah-grey">Alienware Arena Helper Realoaded v<b>${version}</b></span>
			</div>

			<div class="awah-option">
			<label><span class="awah-opt-title">actionsDelayMin</span><input id="awah-actions-delay-min" class="form-control awah-opt-input" type="text" value="${options.actionsDelayMin}"></label>
			<label><span class="awah-opt-title">actionsDelayMax</span><input id="awah-actions-delay-max" class="form-control awah-opt-input" type="text" value="${options.actionsDelayMax}"></label>
			<span class="awah-opt-desc awah-grey">Minimum and maximum random delay time between network actions. (milliseconds)<br>Default minimum: ${options.default().actionsDelayMin} || Default maximum: ${options.default().actionsDelayMax}</span>
			</div>

			<div class="awah-option">
			<label><span class="awah-opt-title">showKeyOnMarkedGiveaways</span><input id="awah-show-key-on-marked-giveaways" class="form-control awah-opt-input" type="checkbox" ${options.showKeyOnMarkedGiveaways ? 'checked' : ''}><div class="form-control awah-opt-input"><div>&nbsp;</div>&nbsp;</div></label>
			<span class="awah-opt-desc awah-grey">At Giveaways page. Default: ${options.default().showKeyOnMarkedGiveaways ? 'ON' : 'OFF'}</span>
			</div>

			<div class="awah-option">
			<label><span class="awah-opt-title">Remove Twitch Player from Homepage</span><input id="awah-twitchPlayerRemove" class="form-control awah-opt-input" type="checkbox" ${options.twitchPlayerRemove ? 'checked' : ''}><div class="form-control awah-opt-input"><div>&nbsp;</div>&nbsp;</div></label>
			<span class="awah-opt-desc awah-grey">Removes the player to save resources. Default: ${options.default().twitchPlayerRemove ? 'ON' : 'OFF'}</span>
			</div>

			<div class="awah-option">
			<label><span class="awah-opt-title">Automate Twitch Watching</span><input id="awah-twitchWatchAutomate" class="form-control awah-opt-input" type="checkbox" ${options.twitchWatchAutomate ? 'checked' : ''}><div class="form-control awah-opt-input"><div>&nbsp;</div>&nbsp;</div></label>
			<span class="awah-opt-desc awah-grey">A popup will appear to open the AWA Twitch page, that page will automatically refresh if no streamers are live and open a stream if they are. On Twitch itself, the usersript will remove the player to reduce resources in background. Default: ${options.default().twitchWatchAutomate ? 'ON' : 'OFF'}</span>
			</div>

			<div class="awah-option">
			<label><span class="awah-opt-title">statusMessageDelay</span><input id="awah-status-message-delay" class="form-control awah-opt-input" type="text" value="${options.statusMessageDelay}"></label>
			<span class="awah-opt-desc awah-grey">How long the status messages will be displayed before they disappear. This doesn't affect persistent notifications such as uncompleted quests. (milliseconds)<br>Default: ${options.default().statusMessageDelay}</span>
			</div>

			<div class="awah-option">
			<button id="awah_restore_default" class="btn btn-danger"><span class="fa fa-exclamation-triangle"></span> Restore default</button>
			<span class="awah-opt-desc awah-grey">Restore default settings.</span>
			</div>

			</div>`);

		$('input.awah-opt-input[type="text"]').on('input', function() {
			this.value = this.value.replace(/[^\d]/, '');
			this.value = this.value.slice(0, 5);
		});

		$('input.awah-opt-input').on('change', function() {
			clearTimeout(saveOptionsTimer);
			saveOptionsTimer = setTimeout(function() {
				if (options.save()) {
					ui.newStatusMessage('Settings saved! <span class="fa fa-fw fa-floppy-o"></span>');
				} else {
					ui.newStatusMessage('Error! See console for details. <span class="fa fa-fw fa-exclamation-triangle"></span>');
				}
			}, 400);
		});

		$('#awah_restore_default').on('click', function() {
			if (!confirm("Are you damn sure about this?!")) return;
			localStorage.removeItem('AlienwareArenaHelperOptions');
			ui.newStatusMessage('Default options settings restored! Realoding...');
			setTimeout(function() { window.location.reload(); }, 2500)
		});

		document.querySelector('.awah-options-btn').addEventListener('click', this.toggleOptionsDisplay, false);

		this.hideOverlayAdditionalFunctions.push(function() {
			let awahOptions = document.getElementById('awah-options');
			setTimeout(() => {awahOptions.style.visibility = 'hidden'}, 300);
			awahOptions.style.right = '';
		});
	}

	hideOverlayHook() {
		hideOverlay = new Proxy(hideOverlay, {
			apply(target, thisArg, args) {
				for (const additionalHideFunction of ui.hideOverlayAdditionalFunctions) {
					additionalHideFunction.apply(thisArg, args);
				}
				target.apply(thisArg, args);
			}
		});
	}

	toggleOptionsDisplay() {
		let overlayElement = document.querySelector('.overlay');
		let awahOptions = document.getElementById('awah-options');
		if(awahOptions.style.visibility === 'hidden') {
			overlayElement.classList.add('active');
			awahOptions.style.visibility = 'visible';
			awahOptions.style.right = '0';
		} else {
			hideOverlay();
		}
	}

	newStatusMessage(text, sticky = false) {
		let statusMessageElement = document.createElement('div');
		statusMessageElement.innerHTML = text;
		this.messagesContainerElement.appendChild(statusMessageElement);
		if (!sticky) {
			setTimeout(() => statusMessageElement.classList.add('awah-casper-out'), options.statusMessageDelay);
		}
		return statusMessageElement;
	}
}

let ui = new UI();

// Daily Quests
async function getBorderIdFromImgSrc(borderImgSrc) {
	const response = await fetch('/account/personalization', {credentials: 'same-origin'});
	const personalizationPageText = await response.text();
	let parser = new DOMParser();
	let doc = parser.parseFromString(personalizationPageText, 'text/html');
	let borderImgElement = doc.querySelector(`img.icon.border[src="${borderImgSrc}"]`);
	return borderImgElement.parentElement.dataset.borderId;
}

async function getSelectedBorderVar() {
	const response = await fetch('/account/personalization', {credentials: 'same-origin'});
	const personalizationPageText = await response.text();
	const found = personalizationPageText.match(/(?:let|var)\s*selectedBorder\s*=\s*(.*?);/);
	return  parseInt(found[1], 10) || null;
}

async function getCurrentBorderId() {
	if (user_border.img !== null) {
		return await getSelectedBorderVar();
	} else {
		return null;
	}
}

async function getSelectedBadgesVar() {
	const response = await fetch('/account/personalization', {credentials: 'same-origin'});
	const personalizationPageText = await response.text();
	const found = personalizationPageText.match(/(?:let|var)\s*selectedBadges\s*=\s*(.*?);/);
	return JSON.parse(found[1]);
}

async function getCurrentBadgesId() {
	if (user_badges.length === 0) {
		return user_badges;
	} else {
		return await getSelectedBadgesVar();
	}
}

function getURL(url) {
	return new Promise((resolve, reject) => {
		$.get(url)
			.done((response) => {
				resolve(response);
			})
			.fail((response) => {
				reject(response);
			});
	});
}

function postURL(url, content) {
	return new Promise((resolve, reject) => {
		$.post(url, content)
			.done((response) => {
				resolve(response);
			})
			.fail((response) => {
				reject(response);
			});
	});
}

async function dailyQuestDone() {
	await arpStatus.updateFromServer();
	return arpStatus.status.quests[0].completed === true;
}

async function alternateSwap(url, content1, content2 = null) {
	try {
		await postURL(url, content1);
		let questCompleted = await dailyQuestDone();
		if (questCompleted) {
			ui.newStatusMessage('Swapped successfully!');
		} else if (content2 !== null) {
			await postURL(url, content2);
			ui.newStatusMessage('Swapped successfully!');
		}
	} catch (e) {
		ui.newStatusMessage('Swapping failed!');
		throw e;
	}
}

async function visitNews() {
	try {
		let pagecount = 1;
		let completed = await dailyQuestDone();
		while (!completed) {
			let response = await getURL(`/esi/tile-data/News/${pagecount}`);
			let newscount = 0;
			while (newscount <= 14) {
				try {
					await getURL(response.data[newscount].url);
					await postURL(`/ucf/increment-views/${response.data[newscount].id}`);
					ui.newStatusMessage(`Visited news ${response.data[newscount].id}!`);
				} catch (e) {
					ui.newStatusMessage(`Visiting ${response.data[newscount].id} failed!`);
				}
				completed = await dailyQuestDone();
				if (completed) {
					break;
				}
				newscount++;
			}
			pagecount++;
		}
	} catch (e) {
		ui.newStatusMessage('Visiting news failed!');
		throw e;
	}
}

async function shareSocial() {
	try {
		let response = await getURL('/esi/tile-data/News/1');
		await postURL(`/arp/quests/share/${response.data[0].id}`);
		ui.newStatusMessage(`${response.data[0].id} shared successfully!`);
	} catch (e) {
		ui.newStatusMessage('Sharing failed!');
		throw e;
	}
}

async function getDailyThread() {
	try {
		let response = await fetch('/forums/board/113/awa-on-topic', {credentials: 'same-origin'});
		let text = await response.text();
		const dailyThreads = text.match(/data-topic-id="([0-9]+)" title="\[.*?DAILY QUEST.*?\]/i);
		dailyThreads.shift();

		let rightNow = new Date();

		let currentQuestDayStart = new Date();
		currentQuestDayStart.setUTCHours(4, 0, 0, 0); // Daily quest updated at 4 a.m. UTC
		// In some cases (after midnight in several timezones) the date of the quest may rewind into the future. We'll set the date a day earlier.
		if (rightNow < currentQuestDayStart) {
			currentQuestDayStart.setUTCDate(currentQuestDayStart.getUTCDate()-1);
		}

		for(let dailyThread of dailyThreads) {
			try {
				response = await fetch('/ucf/show/' + dailyThread, {credentials: 'same-origin'});
				text = await response.text();
				let postDate = text.match(/\$\('\.common__op-meta .*?\.timeago'\)\.attr\('title', '(.*?)'\)\.timeago\(\);/);
				let threadTimestamp = new Date(postDate[1]);

				// If thread created after current quest-day //(maybe we should target a little earlier for some hurrying guys who can create thread before new quest appear?)
				if (threadTimestamp > currentQuestDayStart) {
					return dailyThread;
				}
			} catch (err) {
				continue;
			}
		}

		throw 'Could not find daily thread!';
	} catch (e) {
		ui.newStatusMessage('Could not find daily thread!');
		throw e;
	}
}

async function postReplies() {
	try {
		let questDone = false;
		const parser = new DOMParser();
		const threadId = await getDailyThread();
		const formData = new FormData();
		formData.append('topic_post[content]', '<p>Hi</p>');

		do {
			let postingResponse = await fetch(`/comments/${threadId}/new`, {
				credentials: 'same-origin',
				method: 'POST',
				body: formData
			});
			let postingResult = await postingResponse.json();
			if (postingResult.success) {
				let deleteResponse = await fetch(`/forums/post/delete/${postingResult.postId}/${postingResult.whatPage}`, {credentials: 'same-origin'});
				let threadPage = await deleteResponse.text(); // forum post delete redirects to page where deleted post was
				// example: /ucf/show/2094593/boards/awa-on-topic/ForumPost/daily-quest-non-us-converse-and-be-merry-5-arp-19?replyPage=105
				let doc = parser.parseFromString(threadPage, 'text/html');
				let postElement = doc.querySelector(`article#post-${postingResult.postId}`);
				if (postElement) {
					ui.newStatusMessage('Deleting post failed! <span class="fa fa-exclamation-triangle"></span>');
					break;
				}
				ui.newStatusMessage(`Successfully posted and deleted ${postingResult.postId} to ${threadId}!`);
			} else {
				ui.newStatusMessage('Posting failed!');
				break;
			}
			questDone = await dailyQuestDone();
		} while (!questDone);
	} catch (e) {
		ui.newStatusMessage('Posting failed!');
		throw e;
	}
}

async function visitURL() {
	try {
		const parser = new DOMParser();
		let dailyThreadId = await getDailyThread();
		let result = await fetch(`/ucf/show/${dailyThreadId}`, {credentials: 'same-origin'});
		let text = await result.text();
		let doc = parser.parseFromString(text, 'text/html');
		let opText = doc.querySelector(`div.discussion__op-content.ucf__content`);
		let urls = opText.querySelectorAll(`a`);
		for (let url of urls) {
			try {
				let link = new URL(url.href);
				let ids = link.pathname.match(/([0-9]+)/);
				for (let id of ids) {
					await fetch(link.pathname, {credentials: 'same-origin'});
					await fetch(`/ucf/increment-views/${id}`, {
						credentials: 'same-origin',
						method: 'POST',
						headers: {
							'X-Requested-With': 'XMLHttpRequest'
						}
					});
					let questDone = await dailyQuestDone();
					if (questDone) {
						ui.newStatusMessage('Successfully visited page!');
						return;
					}
				}
			} catch (err) {
				continue;
			}
		}

		document.location.href = `/ucf/show/${dailyThreadId}`;
	} catch (err) {
		try {
			let dailyThreadId = await getDailyThread();
			document.location.href = `/ucf/show/${dailyThreadId}`;
		} catch (err) {
			document.location.href = '/forums/board/113/awa-on-topic';
		}
	}
}

function registerQuestButtons() {
	$('.awah-btn-quest').on('click', async function() {
		// Automatic stuff
		if ($(this).data('awah-quest') === 'border') {
			let currentBorderId = await getCurrentBorderId();
			let tempBorderId = currentBorderId === 1 ? 2 : 1;
			await alternateSwap('/border/select', JSON.stringify({id: tempBorderId}));
			await postURL('/border/select', JSON.stringify({id: currentBorderId})); // set previous border back
		} else if ($(this).data('awah-quest') === 'badge') {
			let currentBadgesId = await getCurrentBadgesId();
			let tempBadgesId = currentBadgesId === JSON.parse('[1]') ? '[2]' : '[1]';
			await alternateSwap(`/badges/update/${user_id}`, tempBadgesId);
			await postURL(`/badges/update/${user_id}`, JSON.stringify(currentBadgesId)); // set previous badge(s) back
		} else if ($(this).data('awah-quest') === 'news') {
			await visitNews();
		} else if ($(this).data('awah-quest') === 'social') {
			await shareSocial();
		} else if ($(this).data('awah-quest') === 'replies') {
			await postReplies();
		} else if ($(this).data('awah-quest') === 'visit') {
			await visitURL();

		// Non automatic stuff
		} else if ($(this).data('awah-quest') === 'avatar') {
			document.location.href = '/account/personalization';
		} else if ($(this).data('awah-quest') === 'video') {
			document.location.href = '/ucf/Video/new?boardId=464';
		} else if ($(this).data('awah-quest') === 'forum') {
			try {
				let dailyThreadId = await getDailyThread();
				document.location.href = '/ucf/show/' + dailyThreadId;
			} catch (err) {
				document.location.href = '/forums/board/113/awa-on-topic';
			}
		}

		let questCompleted = await dailyQuestDone();
		if (questCompleted) {
			$('.awah-btn-quest').addClass('disabled');
			// TODO: update site interface in part where it says 'Incomplete'
			// span.quest-item-progress
			// fetch new DOM elements through api and replace them
			ui.newStatusMessage('Daily Quest completed!');
		}
	});
}

async function showDailyQuestButton() {
	while(!document.querySelector('.quest-title')) {
		await new Promise((r) => setTimeout(r, 500));
	}

	const dailyQuest = document.querySelector('.quest-title').textContent.toLowerCase().trim();
	console.log(`👽 QUEST: ${dailyQuest}`);
	if(document.querySelector('.quest-item-progress').textContent === 'Complete') {
		$('.awah-btn-quest').addClass('disabled');
	} else {
		switch (dailyQuest) {
			case 'show some id':
			case 'new bling':
				$(`<a class="btn btn-default awah-btn-quest" href="https://www.alienwarearena.com/account/personalization#badges" data-awah-tooltip="Change badge">
					<span class="more-link right"></span></a>`).appendTo(".quest-item > .col-2");
				ui.newStatusMessage(`<a href="https://www.alienwarearena.com/account/personalization#badges">Daily Quest: change badge</a>`, true);
				break;
			case 'town crier':
			case 'spread the love':
			case 'sharing is caring!':
				$(`<a class="btn btn-default awah-btn-quest" href="https://www.alienwarearena.com/ucf/show/2082495/boards/awa-on-topic/ForumPost/rules-on-old-dead-topics" data-awah-tooltip="Click the FB/Twitter share button">
					<span class="more-link right"></span></a>`).appendTo(".quest-item > .col-2");
				ui.newStatusMessage(`<a href="https://www.alienwarearena.com/ucf/show/2082495/boards/awa-on-topic/ForumPost/rules-on-old-dead-topics">Daily Quest: share a post</a>`, true);
				break;
			case 'librarian approved':
			case 'feed the mind':
			case 'get smart!':
				$(`<a class="btn btn-default awah-btn-quest" href="https://www.alienwarearena.com/ucf/show/2163250/boards/awa-information/News/arp-6-0-updates-and-announcements" data-awah-tooltip="Open any news">
					<span class="more-link right"></span></a>`).appendTo(".quest-item > .col-2");
				ui.newStatusMessage(`<a href="https://www.alienwarearena.com/ucf/show/2163250/boards/awa-information/News/arp-6-0-updates-and-announcements">Daily Quest: open a news</a>`, true);
				break;
			case 'chatter box':
			case 'water cooler':
			case 'chit chat':
			case 'make some friends!':
				$(`<a class="btn btn-default awah-btn-quest" href="https://www.alienwarearena.com/forums/board/113/awa-on-topic?sort=topic" data-awah-tooltip="Write in any thread">
					<span class="more-link right"></span></a>`).appendTo(".quest-item > .col-2");
				ui.newStatusMessage(`<a href="https://www.alienwarearena.com/forums/board/113/awa-on-topic?sort=topic">Daily Quest: write in any thread</a>`, true);

				break;
			case 'rank':
			case 'who\'s #1?':
			case 'climb the ranks':
				$(`<a class="btn btn-default awah-btn-quest" href="https://www.alienwarearena.com/rewards/leaderboard" data-awah-tooltip="Check the leaderboard">
					<span class="more-link right"></span></a>`).appendTo(".quest-item > .col-2");
				ui.newStatusMessage(`<a href="https://www.alienwarearena.com/rewards/leaderboard">Daily Quest: check the Leaderboard</a>`, true);
				break;
			case 'frame it':
			case 'picture day!':
			case 'fresh siding!':
				$(`<a class="btn btn-default awah-btn-quest" href="https://www.alienwarearena.com/account/personalization#borders" data-awah-tooltip="Change border">
					<span class="more-link right"></span></a>`).appendTo(".quest-item > .col-2");
				ui.newStatusMessage(`<a href="https://www.alienwarearena.com/account/personalization#borders">Daily Quest: change your avatar's border</a>`, true);
				break;
			case 'go shopping':
				$(`<a class="btn btn-default awah-btn-quest" href="https://www.alienwarearena.com/account/personalization#borders" data-awah-tooltip="Go to the Market">
					<span class="more-link right"></span></a>`).appendTo(".quest-item > .col-2");
				ui.newStatusMessage(`<a href="https://www.alienwarearena.com/marketplace/">Daily Quest: go to the Market</a>`, true);
				break;
			default:
				$(`<a class="btn btn-default awah-btn-quest" href="https://www.alienwarearena.com/forums/board/113/awa-on-topic?sort=topic" data-awah-tooltip="Visit forum">
					<span class="more-link right"></span></a>`).appendTo(".quest-item > .col-2");
				ui.newStatusMessage(`<a href="https://www.alienwarearena.com/forums/board/113/awa-on-topic?sort=topic">Special Daily Quest, please check the forum</a>`, true);
				break;
		}
	}

	registerQuestButtons();
}
showDailyQuestButton();

// USER profile functions
function showUserSteamProfileLink() {
	if (profileData.profile.steamId) {
		$(`<a href="//steamcommunity.com/profiles/${profileData.profile.steamId}" target="_blank" data-steam-enabled="true" data-is-current-user="false" class="hexagon btn-social btn-steamfriend" data-toggle="tooltip" data-placement="top" title="" data-original-title="Open user\'s Steam profile in new tab"><i class="fab fa-steam" aria-hidden="true"></i></a>`)
			.appendTo('section.um-profile__friends');
	}
}

// GIVEAWAY functions
function showAvailableKeys() {
	//output prependTo('.content-container');
	//div#get-key-actions span.key-count
	if (typeof countryKeys !== 'undefined') {
		let keysLeft = 0;
		let keysOutput = '';
		let userCountryKeys = countryKeys[user_country];
		if (typeof userCountryKeys === 'number') {
			keysLeft = userCountryKeys;
		} else if (typeof userCountryKeys === 'object') {
			for (let level in userCountryKeys['normal']) {
				if (userCountryKeys['normal'][level] > 0) {
					keysLeft += userCountryKeys['normal'][level];
					keysOutput += `<b>${userCountryKeys['normal'][level]}</b> keys for <b>${level}</b>+ level<br>\n`;
				}
			}
			for (let level in userCountryKeys['prestige']) {
				if (userCountryKeys['prestige'][level] > 0) {
					keysOutput += `<b>${userCountryKeys['prestige'][level]}</b> keys for <b>master${(userCountryKeys['prestige'].length > 1  ? ` ${level}</b>+ level` : '</b> levels')} <span class="awah-info-btn" data-awah-tooltip="Prestige key pool"><span class="fa fa-fw fa-info-circle"></span></span><br>\n`;
				}
			}
		}
		$('#giveaway-flash-message').after(`<div class="well well-sm">
<span class="awah-grey" style="float: right;" data-awah-tooltip="by Alienware Arena Helper Realoded"><span class="fa fa-fw fa-key"></span> Available keys info</span>
User country: <b>${user_country}</b> <span class="awah-info-btn" data-awah-tooltip="Can affect the keys availability.
Site determines it automatically, based on your IP."><span class="fa fa-fw fa-info-circle"></span></span><br>
${(keysOutput ? `${keysOutput}` : `<b>${keysLeft}</b> keys left`)}</div>`);
	}
}

function showActivateSteamKeyButton() {
	function injectActivateSteamKeyButton() {
		// https://store.steampowered.com/account/registerkey?key=XXXXX-XXXXX-XXXXX
		// /([A-Z0-9]{5}-[A-Z0-9]{5}-[A-Z0-9]{5})/
		let message = $('#giveaway-flash-message').html();
		message = message.replace(/<p>Key: (.*)([\s]{1}<a[\s]{1}.*<\/a>)<\/p>/m, `<p>Key: $1</p>`);
		$('#giveaway-flash-message').html(message.replace(/<p>Key:[\s]{1}([A-Z0-9]{5}-[A-Z0-9]{5}-[A-Z0-9]{5})<\/p>/m, '<p>Key: $1 <a target="_blank" href="https://store.steampowered.com/account/registerkey?key=$1" class="btn btn-share awah-activate-steam-key-btn" data-awah-tooltip="Activate key on Steam site"><i class="fa fa-steam"></i> Activate</a></p>'));
	}
	injectActivateSteamKeyButton();
	document.addEventListener('animationstart', function(event) {
		if (event.animationName === 'awah-element-appears-hook') {
			setTimeout(() => injectActivateSteamKeyButton(), 1);
		}
	}, false);
}

function markTakenGiveaways(giveawayKeysByID) {
	$('.giveaways__listing .giveaways__listing-post').each(function() {
		let giveawayID = /\/ucf\/show\/([\d]+)/.exec($(this).data('url-link'));
		giveawayID = giveawayID[1];
		if (typeof giveawayKeysByID[giveawayID] === 'object') {
			$(this).addClass('awah-giveaway-taken');
			let awahLabel = `✔\nTAKEN AT: ${giveawayKeysByID[giveawayID].assigned_at}`;
			if (options.showKeyOnMarkedGiveaways) {
				awahLabel += `\n            KEY: ${giveawayKeysByID[giveawayID].value}`;
			}
			$(this).attr('awahlabel', awahLabel);
		}
	});
}

function getTakenGiveaways() {
	let statusMessage = ui.newStatusMessage('Getting your giveaways info <span class="fa fa-fw fa-circle-o-notch fa-spin"></span>', true);
	statusMessage.style.display = 'none';
	let statusMessageFAIcon = statusMessage.querySelector('span');
	let showStatusMessage = setTimeout(() => {statusMessage.style.display = ''}, 2000);

	// TODO: check for empty array response (returns when logged out)
	// TODO: remake to fetch()
	$.getJSON('/giveaways/keys', function(data) {
		clearTimeout(showStatusMessage);
		statusMessageFAIcon.className = 'fa fa-fw fa-check-circle';
		setTimeout(() => {
			statusMessage.classList.add('awah-casper-out');
			setTimeout(() => {if (statusMessage) statusMessage.remove()}, 700);
		}, options.statusMessageDelay);

		let awahGiveawayKeys = {};
		$.each(data, function(index, value) {
			awahGiveawayKeys[value.giveaway_id] = value;
		});
		console.log('👽 awahGiveawayKeys', awahGiveawayKeys);
		markTakenGiveaways(awahGiveawayKeys); // sometimes first giveaways page loaded before event registered
		document.addEventListener('animationstart', function(event) {
			if (event.animationName === 'awah-element-appears-hook') {
				markTakenGiveaways(awahGiveawayKeys);
			}
		}, false);
	}).fail(function() {
		statusMessageFAIcon.className = 'fa fa-fw fa-exclamation-triangle';
		setTimeout(() => statusMessage.classList.add('awah-casper-out'), options.statusMessageDelay);
	});
}

// remove elements that bog down AWA
// twitch player on home page
if (options.twitchPlayerRemove) {
	if (window.location.pathname === '/') {
		document.querySelector('.embed-responsive-item').remove();
	}
}

// twitch watching automatation
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
			ui.newStatusMessage(`The page will refresh in 5 minutes to check for online streamers`);
			setTimeout(function () {
					location.reload(true);
			}, 300000); // 5 minutes in milliseconds
	}
};

if (options.twitchWatchAutomate) {
	const twitchPoints = document.querySelector('div > div > section:nth-child(8) > div > div:nth-child(2) > center > b');
	// if on another page of awa that is not the twitch one, notify to open it, if points are less than maximum
	if ((window.location.pathname != '/twitch/live') && (twitchPoints.innerText < 15)) {
		ui.newStatusMessage(`<a href="https://www.alienwarearena.com/twitch/live">Open AWA Twitch page and automate watching</a>`, true);
	}
	// on the awa twitch page, execute actions
	if ((window.location.pathname === '/twitch/live') && (twitchPoints.innerText < 15)) {
		awaTwitchPageRedir();
	}
}

function closeRecentKeyPopup() {
	let popup = document.querySelector('div.alert-info button.close');
	if (popup) popup.click();
}

let path = window.location.pathname;
path = path.replace(/\/+/g, '/');

};