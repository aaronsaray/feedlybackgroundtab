/**
 * This is inserted into the content to handle the letter push
 *
 * @author Aaron Saray (http://aaronsaray.com)
 */
(function(){
	/**
	 * The selector used to find the URL
	 * @type {string}
	 */
	const URL_SELECTOR = '.selectedEntry a.title';

	/**
	 * Main feedlybackgroundtab constructor
	 */
	var FBT = function() {

		/**
		 * The default key code which is ;
		 * @type {number}
		 * @private
		 */
		var _triggerKeyCode = 59;

		/**
		 * Used to create the default key code from local storage
		 * Also modifies the help popup
		 */
		this.init = function() {
			chrome.storage.sync.get('shortcutKey', function(settings) {
				if (settings.shortcutKey) {
					_triggerKeyCode = settings.shortcutKey.charCodeAt(0);
				}
			});
		};

		/**
		 * handler for key press - must be not in textarea or input and must be not altered
		 * Then it sends extension request
		 * @param e
		 */
		this.keyPressHandler = function(e) {
			var tag = e.target.tagName.toLowerCase();
			console.log('Tag: ' + tag);
			if (tag != 'input' && tag != 'textarea') {
				if ((!e.altKey && !e.ctrlKey) && e.keyCode == _triggerKeyCode) {
					var url = document.querySelector(URL_SELECTOR);
					if (url) {
						console.log("before send message...");
						chrome.extension.sendMessage({url: url.href});
						console.log("and it was sent right then and there");
					}
					else {
						console.log("Could not find " + URL_SELECTOR);
					}
				}
				else {
					if (e.altKey) {
						console.log("Didn't do it cuz alt key");
					}
					if (e.ctrlKey) {
						console.log("Didn't do it cuz ctrl key");
					}
				}
			}
		}
	};

	if (window == top) {
		var fbt = new FBT();
		fbt.init();
		window.addEventListener('keypress', fbt.keyPressHandler, false);
	}
})();