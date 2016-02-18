'use strict';

// MODULES //

var debug = require( 'debug' )( 'markdown-to-restructuredtext:data:sync' );
var exec = require( 'child_process' ).execSync;
var resolve = require( 'path' ).resolve;
var join = require( 'path' ).join;
var uuid = require( 'node-uuid' ).v4;
var cwd = require( 'utils-cwd' );
var readFile = require( 'utils-fs-read-file' ).sync;
var unlink = require( 'fs' ).unlinkSync;
var writeFile = require( 'fs' ).writeFileSync;
var tmp = require( 'utils-tmpdir' )();
var cmd = require( './../cmd.js' );


// SYNC //

/**
* FUNCTION: sync( dest, data, opts )
*	Synchronously converts Markdown to reStructuredText.
*
* @param {String|Void} dest - output reStructuredText file path
* @param {String|Buffer} data - Markdown data path to convert
* @param {Object} opts - function options
* @param {String} opts.flavor - Markdown flavor
* @returns {String|Void} generated reStructuredText or undefined
*/
function sync( dest, data, opts ) {
	var outFile;
	var inFile;
	var dir;
	var str;
	var out;

	dir = cwd();
	debug( 'Current working directory: %s', dir );

	inFile = resolve( tmp, uuid()+'.md' );
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
	writeFile( inFile, data );

	exec( str, {'cwd': dir} );

	debug( 'Deleting temporary input file: %s', inFile );
	unlink( inFile );
	
	if ( dest ) {
		return;
	}
	debug( 'Reading temporary output file: %s', outFile );
	out = readFile( outFile, {'encoding':'utf8'} );

	if ( out instanceof Error ) {
		debug( 'Error encountered while reading temporary output file %s: %s', outFile, out.message );
		throw out;
	}
	debug( 'Deleting temporary output file: %s', outFile );
	unlink( outFile );

	return out;
} // end FUNCTION sync()


// EXPORTS //

module.exports = sync;