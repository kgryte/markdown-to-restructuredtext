'use strict';

// MODULES //

var debug = require( 'debug' )( 'markdown-to-restructuredtext:file:async' );
var exec = require( 'child_process' ).exec;
var resolve = require( 'path' ).resolve;
var join = require( 'path' ).join;
var uuid = require( 'uuid' ).v4;
var copy = require( 'utils-copy' );
var cwd = require( 'utils-cwd' );
var typeName = require( 'type-name' );
var readFile = require( 'utils-fs-read-file' );
var unlink = require( 'fs' ).unlink;
var tmp = require( 'utils-tmpdir' )();
var defaults = require( './../defaults.json' );
var validate = require( './../validate.js' );
var cmd = require( './../cmd.js' );


// VARIABLES //

var interfaces = {
	'string,string,Object,function': [ 0, 1, 2, 3 ],
	'string,string,function': [ 0, 1, -1, 2 ],
	'string,Object,function': [ -1, 0, 1, 2 ],
	'string,function': [ -1, 0, -1, 1 ]
};


// ASYNC //

/**
* FUNCTION: async( [dest,] src,[ options,] clbk )
*	Asynchronously converts Markdown to reStructuredText.
*
* @param {String} [dest] - output reStructuredText file path
* @param {String} src - Markdown file path to convert
* @param {Object} [options] - function options
* @param {String} [options.flavor="gfm"] - Markdown flavor
* @param {Function} clbk - callback to invoke after performing conversion
* @returns {Void}
*/
function async() {
	var outFile;
	var options;
	var inFile;
	var types;
	var dest;
	var opts;
	var clbk;
	var src;
	var err;
	var dir;
	var str;
	var idx;
	var len;
	var i;

	len = arguments.length;
	types = new Array( len );
	for ( i = 0; i < len; i++ ) {
		types[ i ] = typeName( arguments[ i ] );
	}
	types = types.join( ',' );
	idx = interfaces[ types ];
	if ( idx === void 0 ) {
		throw new Error( 'invalid input argument(s). No implementation matching `f('+types+')`.' );
	}
	if ( idx[ 0 ] >= 0 ) {
		dest = arguments[ idx[0] ];
	}
	src = arguments[ idx[1] ];
	if ( idx[ 2 ] >= 0 ) {
		options = arguments[ idx[2] ];
	}
	clbk = arguments[ idx[3] ];

	opts = copy( defaults );
	if ( options ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	dir = cwd();
	debug( 'Current working directory: %s', dir );

	inFile = resolve( dir, src );
	debug( 'Input file: %s', inFile );

	if ( dest === void 0 ) {
		outFile = join( tmp, uuid() );
	} else {
		outFile = resolve( dir, dest );
	}
	debug( 'Output file: %s', outFile );

	str = cmd( inFile, outFile, opts );
	debug( 'Command: %s', str );

	exec( str, {'cwd':dir}, onExec );

	/**
	* FUNCTION: onExec( error, stdout, stderr )
	*	Callback invoked when the child process performing conversion terminates.
	*
	* @private
	* @param {Error|Null} error - error object
	* @param {Buffer} stdout - standard output
	* @param {Buffer} stderr - standard error
	* @returns {Void}
	*/
	function onExec( error ) {
		if ( error ) {
			debug( 'Error encountered while attempting to convert %s: %s', inFile, error.message );
			return done( error );
		}
		debug( 'Successfully converted input file: %s', inFile );
		if ( dest === void 0 ) {
			debug( 'Reading temporary output file: %s', outFile );
			return readFile( outFile, {'encoding':'utf8'}, onFile );
		}
		done();
	} // end FUNCTION onExec()

	/**
	* FUNCTION: onFile( error, file )
	*	Callback invoked upon reading a file.
	*
	* @private
	* @param {Error|Null} error - error object
	* @param {String} file - file contents
	* @returns {Void}
	*/
	function onFile( error, file ) {
		if ( error ) {
			debug( 'Error encountered while attempting to read a temporary output file %s: %s', outFile, error.message );
			return done( error );
		}
		debug( 'Successfully read temporary output file: %s', outFile );
		unlink( outFile, onDelete );

		/**
		* FUNCTION: onDelete( [error] )
		*	Callback invoked upon deleting a file.
		*
		* @private
		* @param {Error} [error] - error object
		* @returns {Void}
		*/
		function onDelete( error ) {
			if ( error ) {
				debug( 'Error encountered while attempting to delete a temporary output file %s: %s', outFile, error.message );
				return done( error );
			}
			debug( 'Successfully deleted temporary output file: %s', outFile );
			done( null, file );
		} // end FUNCTION onDelete()
	} // end FUNCTION onFile()

	/**
	* FUNCTION: done( error[, results] )
	*	Callback invoked upon converting an input file.
	*
	* @private
	* @param {Error|Null} error - error object
	* @param {String} [results] - conversion results
	* @returns {Void}
	*/
	function done( error, results ) {
		if ( error ) {
			return clbk( error );
		}
		if ( results ) {
			return clbk( null, results );
		}
		clbk();
	} // end FUNCTION done()
} // end FUNCTION async()


// EXPORTS //

module.exports = async;
