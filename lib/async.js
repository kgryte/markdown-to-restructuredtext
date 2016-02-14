'use strict';

// MODULES //

var exec = require( 'child_process' ).exec;


// ASYNC //

/**
* FUNCTION: async( src, dest,[ options,] clbk )
*	Asynchronously converts Markdown to reStructuredText.
*
* @param {String} src - Markdown file to convert
* @param {String} dest - output reStructuredText
* @param {Object} [options] - function options
* @param {String} [options.flavor="gfm"] - Markdown flavor
* @param {Function} clbk - callback to invoke after performing conversion
* @returns {Void}
*/
function async( src, dest, options, clbk ) {

} // end FUNCTION async()


// EXPORTS //

module.exports = async;