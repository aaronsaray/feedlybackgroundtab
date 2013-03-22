/**
 * This is inserted into the content to handle the letter push
 *
 * @author Aaron Saray (http://aaronsaray.com)
 */
(function(){

	/**
	 * The constant for the trigger letter
	 * @type {number}
	 */
	const TRIGGER_KEY = 66; // b

	/**
	 * The selector used to find the URL
	 * @type {string}
	 */
	const URL_SELECTOR = 'table.selectedEntry a.title';

	/**
	 * handler for key press - must be not in textarea or input and must be not altered
	 * Then it sends extension request
	 * @param e
	 */
	function keyPressHandler(e)
	{
		var tag = e.target.tagName.toLowerCase();
		if (tag != 'input' && tag != 'textarea') {
			if ((!e.shiftKey && !e.altKey && !e.ctrlKey) && e.keyCode == TRIGGER_KEY) {
				var url = document.querySelector(URL_SELECTOR);
				if (url) {
					chrome.extension.sendMessage({url: url.href});
				}
			}
		}
	}

	if (window == top) {
		window.addEventListener('keyup', keyPressHandler, false);
	}
})();