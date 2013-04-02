/**
 * Options Processing Script
 *
 * This handles processing the options
 *
 * @author Aaron Saray (http://aaronsaray.com)
 */
(function(){

	/**
	 * The main class for options
	 *
	 * @todo figure out how to not refer to the querySelector so many times in the code
	 */
	function FBT_Options() {

		/**
		 * Validation messages
		 */
		var _messages = {
			success: 'Options saved successfully.',
			validateFailure: 'Please choose a shortcut key.'
		};

		/**
		 * Message types
		 */
		var _messageTypes = {
			success: 'success',
			failure: 'failure'
		};

		/**
		 * The default shortcut key
		 * @todo maybe this should be a shared constant
		 * @type {string}
		 * @private
		 */
		var _defaultShortcutKey = ';';

		/**
		 * Initializer function: sets hotkeys, etc
		 */
		this.init = function() {
			document.addEventListener('DOMContentLoaded', _restoreOptions);
			document.querySelector('#fbt_submitbutton').addEventListener('click', _validateAndSave);
		};

		/**
		 * Used to put the retrieved options back on the screen
		 * @private
		 */
		var _restoreOptions = function() {
			chrome.storage.sync.get('shortcutKey', function(settings) {
				if (!settings.shortcutKey) {
					settings.shortcutKey = _defaultShortcutKey;
				}
				document.querySelector('#fbt_shortcutkey').value = settings.shortcutKey;
			});
		};

		/**
		 * Validates the fields are filled and if so, saves the options
		 * @private
		 */
		var _validateAndSave = function() {
			var key = document.querySelector('#fbt_shortcutkey');
			if (key.value == '') {
				_updateStatus(_messages.validateFailure, _messageTypes.failure);
				return false;
			}

			_save();
		};

		/**
		 * Used to save options to local storage
		 * A little dupe code here... :(
		 * @private
		 */
		var _save = function() {
			var shortcutKey = document.querySelector('#fbt_shortcutkey').value;
			chrome.storage.sync.set({'shortcutKey': shortcutKey}, function () {
				_updateStatus(_messages.success, _messageTypes.success);
			});
		};

		/**
		 * Used to update message / status
		 * @param message
		 * @param type
		 * @private
		 */
		var _updateStatus = function(message, type) {
			var status = document.querySelector('#fbt_status');
			status.innerText = message;
			status.className = 'showstatus ' + type;
		};
	};

	/**
	 * initialize
	 */
	var options = new FBT_Options();
	options.init();
})();
