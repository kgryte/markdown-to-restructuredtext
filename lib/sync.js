'use strict';

// MODULES //

var exec = require( 'child_process' ).execSync;


// SYNC //

/**
* FUNCTION: Sync( src, dest,[ options] )
*	Synchronously converts Markdown to reStructuredText.
*
* @param {String} src - Markdown file to convert
* @param {String} dest - output reStructuredText
* @param {Object} [options] - function options
* @param {String} [options.flavor="gfm"] - Markdown flavor
* @returns {Void}
*/
function sync( src, dest, options ) {

} // end FUNCTION sync()


// EXPORTS //

module.exports = sync;