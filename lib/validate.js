'use strict';

// MODULES //

var isObject = require( 'validate.io-object' );
var isString = require( 'validate.io-string-primitive' );


// VALIDATE //

/**
* FUNCTION: validate( opts, options )
*	Validates function options.
*
* @param {Object} opts - destination object 
* @param {Object} options - options to validate
* @param {String} [options.flavor] - Markdown flavor 
* @returns {Error|Null} error or null 
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( 'invalid input argument. Options argument must be an object. Option: `' + options + '`.' );
	}
	if ( options.hasOwnProperty( 'flavor' ) ) {
		opts.flavor = options.flavor;
		if ( !isString( opts.flavor ) ) {
			return new TypeError( 'invalid option. Markdown flavor option must be a string primitive. Option: `' + opts.flavor + '`.' );
		}
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;