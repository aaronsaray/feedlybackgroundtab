/**
 * This is inserted into the content to handle the letter push
 *
 * @author Aaron Saray (http://aaronsaray.com)
 */

(function(){
	/**
	 * The selectors used to find the URL
	 * @type {array}
	 */
	var selectors = [
		'div.selectedEntry a.title',			// title bar for active entry, collapsed or expanded
		'.selectedEntry a.visitWebsiteButton',	// the button square button on list view
		'.list-entries .selected a.visitWebsiteButton',	// the button square button on list view
		'a.visitWebsiteButton',					// the floating one for card view
		'.entry.selected a.title',				// title bar for active entry in React-based collapsed list view
		'.entry--selected .entry__title', // 2021 Block-Element-Modifier class syntax update
	];
	
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
		var selectorSet = ''

		/**
		 * Used to create the default key code from local storage
		 * Also modifies the help popup
		 */
		this.init = function() {
			selectorSet = selectors.join();

			chrome.storage.sync.get(
				['shortcutKey', 'selector'],
				function(settings) {
					if (settings.shortcutKey) {
						_triggerKeyCode = settings.shortcutKey.charCodeAt(0);
					}
					if (settings.selector) {
						selectorSet += `,${settings.selector}`;
					}
				}
			);
		};

		/**
		 * handler for key press - must be not in textarea or input and must be not altered
		 * Then it sends extension request
		 * @param e
		 */
		this.keyPressHandler = function(e) {
			if ( e.keyCode != _triggerKeyCode) {
				return
			}

			var tag = e.target.tagName.toLowerCase();
			if (tag == 'input' || tag == 'textarea') {
				return;
			}

			if (e.altKey || e.ctrlKey ) {
				return
			}

			const found = document.querySelector(selectorSet);

			if( !found ) {
				console.log("Could not find any selectors from: " + selectorSet);
				return;
			}

			chrome.extension.sendMessage({url: found.href});
		}
	};

	if (window == top) {
		var fbt = new FBT();
		fbt.init();
		window.addEventListener('keypress', fbt.keyPressHandler, false);
	}
})();
