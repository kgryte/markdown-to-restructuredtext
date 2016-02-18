'use strict';

// EXPORTS //

module.exports = require( './file/async.js' );
module.exports.sync = require( './file/sync.js' );
module.exports.fromString = require( './string/async.js' );
module.exports.fromStringSync = require( './string/sync.js' );
module.exports.fromBuffer = require( './buffer/async.js' );
module.exports.fromBufferSync = require( './buffer/sync.js' );
