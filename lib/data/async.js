'use strict';

// MODULES //

var debug = require( 'debug' )( 'markdown-to-restructuredtext:data:async' );
var exec = require( 'child_process' ).exec;
var resolve = require( 'path' ).resolve;
var join = require( 'path' ).join;
var uuid = require( 'node-uuid' ).v4;
var cwd = require( 'utils-cwd' );
var readFile = require( 'utils-fs-read-file' );
var unlink = require( 'fs' ).unlink;
var writeFile = require( 'fs' ).writeFile;
var tmp = require( 'utils-tmpdir' )();
var cmd = require( './../cmd.js' );


// ASYNC //

/**
* FUNCTION: async( dest, data, opts, clbk )
*	Asynchronously converts Markdown to reStructuredText.
*
* @param {String|Void} dest - output reStructuredText file path
* @param {String|Buffer} data - Markdown data to convert
* @param {Object} opts - function options
* @param {String} opts.flavor - Markdown flavor
* @param {Function} clbk - callback to invoke after performing conversion
* @returns {Void}
*/
function async( dest, data, opts, clbk ) {
	var outFile;
	var inFile;
	var dir;
	var str;

	dir = cwd();
	debug( 'Current working directory: %s', dir );

	inFile = join( tmp, uuid()+'.md' );
	debug( 'Input file: %s', inFile );

	if ( dest === void 0 ) {
		outFile = join( tmp, uuid()+'.rst' );
	} else {
		outFile = resolve( dir, dest );
	}
	debug( 'Output file: %s', outFile );

	str = cmd( inFile, outFile, opts );
	debug( 'Command: %s', str );

	debug( 'Writing input data to a temporary input file: %s', inFile );
	writeFile( inFile, data, onWrite );

	/**
	* FUNCTION: onWrite( [error] )
	*	Callback invoked upon writing a file.
	*
	* @private
	* @param {Error} [error] - error object
	* @returns {Void}
	*/
	function onWrite( error ) {
		if ( error ) {
			debug( 'Error encountered while attempting to write input data to a temporary file %s: %s', inFile, error.message );
			return done( error );
		}
		exec( str, {'cwd':dir}, onExec );
	} // end FUNCTION onWrite()

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
		unlink( inFile, onRemove );
	} // end FUNCTION onExec()

	/**
	* FUNCTION: onRemove( [error] )
	*	Callback invoked upon deleting a file.
	*
	* @private
	* @param {Error} [error] - error object
	* @returns {Void}
	*/
	function onRemove( error ) {
		if ( error ) {
			debug( 'Error encountered while attempting to delete a temporary input file %s: %s', inFile, error.message );
			return done( error );
		}
		debug( 'Successfully deleted temporary input file: %s', inFile );
		if ( dest === void 0 ) {
			debug( 'Reading temporary output file: %s', outFile );
			return readFile( outFile, {'encoding':'utf8'}, onFile );
		}
		done();
	} // end FUNCTION onRemove()

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
	*	Callback invoked upon converting input Markdown data.
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