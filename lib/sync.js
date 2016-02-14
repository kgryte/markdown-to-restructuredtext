'use strict';

// MODULES //

var debug = require( 'debug' )( 'markdown-to-restructuredtext:sync' );
var exec = require( 'child_process' ).execSync;
var resolve = require( 'path' ).resolve;
var copy = require( 'utils-copy' );
var cwd = require( 'utils-cwd' );
var isString = require( 'validate.io-string-primitive' );
var defaults = require( './defaults.json' );
var validate = require( './validate.js' );
var cmd = require( './cmd.js' );


// SYNC //

/**
* FUNCTION: sync( src, dest,[ options] )
*	Synchronously converts Markdown to reStructuredText.
*
* @param {String} src - Markdown file to convert
* @param {String} dest - output reStructuredText
* @param {Object} [options] - function options
* @param {String} [options.flavor="gfm"] - Markdown flavor
* @returns {Void}
*/
function sync( src, dest, options ) {
	var outFile;
	var inFile;
	var opts;
	var err;
	var dir;
	var str;
	if ( !isString( src ) ) {
		throw new TypeError( 'invalid input argument. First argument must be a string primitive. Value: `' + src + '`.' );
	}
	if ( !isString( dest ) ) {
		throw new TypeError( 'invalid input argument. Second argument must be a string primitive. Value: `' + dest + '`.' );
	}
	opts = copy( defaults );
	if ( arguments.length > 2 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	dir = cwd();
	debug( 'Current working directory: %s', dir );

	inFile = resolve( dir, src );
	debug( 'Input file: %s', inFile );

	outFile = resolve( dir, dest );
	debug( 'Output file: %s', outFile );

	str = cmd( inFile, outFile, opts );
	debug( 'Command: %s', str );

	exec( str, {'cwd': dir} );
} // end FUNCTION sync()


// EXPORTS //

module.exports = sync;