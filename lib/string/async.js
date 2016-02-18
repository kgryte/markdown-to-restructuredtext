'use strict';

// MODULES //

var copy = require( 'utils-copy' );
var typeName = require( 'type-name' );
var defaults = require( './../defaults.json' );
var validate = require( './../validate.js' );
var convert = require( './../data/async.js' );


// VARIABLES //

var interfaces = {
	'string,string,Object,function': [ 0, 1, 2, 3 ],
	'string,string,function': [ 0, 1, -1, 2 ],
	'string,Object,function': [ -1, 0, 1, 2 ],
	'string,function': [ -1, 0, -1, 1 ]
};


// ASYNC //

/**
* FUNCTION: async( [dest,] data,[ options,] clbk )
*	Asynchronously converts Markdown to reStructuredText.
*
* @param {String} [dest] - output reStructuredText file path
* @param {String} data - Markdown data to convert
* @param {Object} [options] - function options
* @param {String} [options.flavor="gfm"] - Markdown flavor
* @param {Function} clbk - callback to invoke after performing conversion
* @returns {Void}
*/
function async() {
	var options;
	var types;
	var dest;
	var opts;
	var clbk;
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
	clbk = arguments[ idx[3] ];

	opts = copy( defaults );
	if ( options ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	convert( dest, data, opts, clbk );
} // end FUNCTION async()


// EXPORTS //

module.exports = async;