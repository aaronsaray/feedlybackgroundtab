/**
 * Background Processing Script
 *
 * This handles receiving the messages and opening up the new tab
 *
 * @author Aaron Saray (http://aaronsaray.com)
 */

/**
 * Add message listener
 *
 * This will open up a new non-focused tab with the url it was sent
 */
chrome.extension.onMessage.addListener(
	function(messageObject) {
		chrome.tabs.create({
			url: messageObject.url,
			active: false
		});
	}
);
