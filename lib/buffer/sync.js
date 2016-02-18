'use strict';

// MODULES //

var copy = require( 'utils-copy' );
var typeName = require( 'type-name' );
var defaults = require( './../defaults.json' );
var validate = require( './../validate.js' );
var convert = require( './../data/sync.js' );


// VARIABLES //

var interfaces = {
	'string,Buffer,Object': [ 0, 1, 2 ],
	'string,Uint8Array,Object': [ 0, 1, 2 ],
	'string,Buffer': [ 0, 1, -1 ],
	'string,Uint8Array': [ 0, 1, -1 ],
	'Buffer,Object': [ -1, 0, 1 ],
	'Uint8Array,Object': [ -1, 0, 1 ],
	'Buffer': [ -1, 0, -1 ],
	'Uint8Array': [ -1, 0, -1 ]
};


// SYNC //

/**
* FUNCTION: sync( [dest,] data,[ options] )
*	Synchronously converts Markdown to reStructuredText.
*
* @param {String} [dest] - output reStructuredText file path
* @param {Buffer} data - Markdown data path to convert
* @param {Object} [options] - function options
* @param {String} [options.flavor="gfm"] - Markdown flavor
* @returns {String|Void} generated reStructuredText or undefined
*/
function sync() {
	var options;
	var types;
	var dest;
	var opts;
	var data;
	var err;
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
	data = arguments[ idx[1] ];
	if ( idx[ 2 ] >= 0 ) {
		options = arguments[ idx[2] ];
	}
	opts = copy( defaults );
	if ( options ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	return convert( dest, data, opts );
} // end FUNCTION sync()


// EXPORTS //

module.exports = sync;