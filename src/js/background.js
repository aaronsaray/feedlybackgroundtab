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

/**
 * Notify users of updates/installed versions
 */
chrome.runtime.onInstalled.addListener(function(details) {
	if (details.reason == 'update') {
		chrome.tabs.create({
            url: 'data:text/html,<h1>FeedlyBackgroundTab Updated!</h1><p>Feedly Background Tab has been updated.  Please check the <a href="https://chrome.google.com/webstore/detail/feedly-background-tab/gjlijkhcebalcchkhgaiflaooghmoegk">extension page</a> for more information.</p>'
        });
	}
});