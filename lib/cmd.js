'use strict';

// COMMAND //

/**
* FUNCTION: cmd( src, dest, opts )
*	Returns a command to convert a file from Markdown to reStructuredText using Pandoc.
*
* @param {String} src - source file
* @param {String} dest - destination file
* @param {Object} opts - function options
* @param {String} opts.flavor - Markdown flavor
* @returns {String} command 
*/
function cmd( src, dest, opts ) {
	var out;
	out = new Array( 5 );
	out[ 0 ] = 'pandoc';
	out[ 1 ] = '--from=markdown';
	if ( opts.flavor ) {
		out[ 1 ] += '_' + opts.flavor;
	}
	out[ 2 ] = '--to=rst';
	out[ 3 ] = '--output=' + dest;
	out[ 4 ] = src;
	return out.join( ' ' );
} // end FUNCTION cmd()


// EXPORTS //

module.exports = cmd;