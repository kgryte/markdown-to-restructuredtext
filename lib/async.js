'use strict';

// MODULES //

var exec = require( 'child_process' ).exec;
var resolve = require( 'path' ).resolve;
var copy = require( 'utils-copy' );
var cwd = require( 'utils-cwd' );
var isString = require( 'validate.io-string-primitive' );
var defaults = require( './defaults.json' );
var validate = require( './validate.js' );
var cmd = require( './cmd.js' );


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
	var outFile;
	var inFile;
	var opts;
	var err;
	var dir;
	var str;
	var cb;
	if ( !isString( src ) ) {
		throw new TypeError( 'invalid input argument. First argument must be a string primitive. Value: `' + src + '`.' );
	}
	if ( !isString( dest ) ) {
		throw new TypeError( 'invalid input argument. Second argument must be a string primitive. Value: `' + dest + '`.' );
	}
	opts = copy( defaults );
	if ( arguments.length === 3 ) {
		cb = options;
	} else {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
		cb = clbk;
	}
	dir = cwd();
	inFile = resolve( dir, src );
	outFile = resolve( dir, dest );

	str = cmd( inFile, outFile, opts );
	exec( str, {'cwd':dir}, done );

	/**
	* FUNCTION: done( error, stdout, stderr )
	*	Callback invoked when the child process terminates.
	*
	* @private
	* @param {Error|Null} error - error object
	* @param {Buffer} stdout - standard output
	* @param {Buffer} stderr - standard error
	* @returns {Void}
	*/
	function done( error ) {
		if ( error ) {
			return cb( error );
		}
		cb();
	} // end FUNCTION done()
} // end FUNCTION async()


// EXPORTS //

module.exports = async;