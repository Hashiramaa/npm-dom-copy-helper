/**
 * Fallback for old browsers.
 *
 * @param {string} text - Text to copy.
 * @returns {void}
 */
export function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    //
    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    //
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    //
    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }
    //
    document.body.removeChild(textArea);
}

/**
 * Copy text to clipboard. The copied text will be printed to the console.
 *
 * @param {string} text - Text to copy.
 * @returns {void}
 */
export function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
    }
    navigator.clipboard.writeText(text).then(function() {
        console.log('Async: Copying to clipboard was successful!');
    }, function(err) {
        console.error('Async: Could not copy text: ', err);
    });
}

/*
// Still being developed
export function copyOnClick(el, text_to_copy){
    copyTextToClipboard(text_to_copy);
    //
    el.find('.copied_alert').removeClass('hidden');
    setTimeout(() => {
        el.find('.copied_alert').addClass('hidden');
    }, 2000);
}
*/