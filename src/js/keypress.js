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
		'div.content a.entry__title',     // MCE 2020-01-14 Modified for Feedly content changes
		'div.selectedEntry a.title',			// title bar for active entry, collapsed or expanded
		'.selectedEntry a.visitWebsiteButton',	// the button square button on list view
		'.list-entries .selected a.visitWebsiteButton',	// the button square button on list view
		'a.visitWebsiteButton',					// the floating one for card view
		'.entry.selected a.title'				// title bar for active entry in React-based collapsed list view
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
			if (tag != 'input' && tag != 'textarea') {
				if ((!e.altKey && !e.ctrlKey) && e.keyCode == _triggerKeyCode) {
                    var url;
                    for (var x in selectors) {
                        url = document.querySelector(selectors[x]);
                        if (url) {
                            break;
                        }
                    }
					if (url) {
						chrome.extension.sendMessage({url: url.href});
					}
                    else {
                        console.log("Could not find any selectors from: " + selectors.join());
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
