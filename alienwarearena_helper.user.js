// ==UserScript==
// @name         Alienware Arena Helper Reloaded
// @namespace    https://github.com/marcodallagatta
// @version      2.0.0
// @description  Earn daily ARP easily
// @author       Thomas Ashcraft, Marco Dalla Gatta
// @match        *://*.alienwarearena.com/*
// @match        *://*.alienwarearena.com//*
// @match        https://www.twitch.tv/*
// @license      GPL-2.0-or-later; http://www.gnu.org/licenses/gpl-2.0.txt
// @icon         https://www.alienwarearena.com/favicon.ico
// @require      file:///C:\Users\User\Documents\GitHub\alienware-arena-helper-reloaded\awahelper.js
// @require      file:///C:\Users\User\Documents\GitHub\alienware-arena-helper-reloaded\twitch.js
// @grant        none
// @noframes
// ==/UserScript==

// const { ResourceLoader } = require("jsdom");

// TODO
// 1. remove legacy code for functionalities that are not on AWA anymore
// 2. update broken functionalities that are still available
// 	2.1 automate as much as possible, give user choice on the matter
// 3. integrate:
//  3.1 twitch
//		if twitch points <- 16, run watchTwitch()
//	3.2 AWA quests with archisteamfarm?

// FIX
// Daily ARP reset timer
// make twitch point counter take into account boosters

// NOTES
// not possible to remove avatar and badges as they are loaded dynamically on pagination changes, best to just use adblock

if (window.location.hostname.split('.').slice(1).join('.') === 'alienwarearena.com') { awaHelper(window); }
if (window.location.hostname === 'www.twitch.tv') { twitchHelp(); }