'use strict';

// MODULES //

var tape = require( 'tape' );
var path = require( 'path' );
var mkdirp = require( 'mkdirp' );
var proxyquire = require( 'proxyquire' );
var readFile = require( 'utils-fs-read-file' ).sync;
var rm = require( 'fs' ).unlinkSync;
var md2rst = require( './../lib/buffer/async.js' );


// FIXTURES //

var data = readFile( path.resolve( __dirname, '../README.md' ), {'encoding':'utf8'} );
data = new Buffer( data );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof md2rst, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns any errors to the provided callback (writing input tmp file)', function test( t ) {
	var md2rst = proxyquire( './../lib/data/async.js', {
		'fs': {
			'writeFile': writeFile
		}
	});

	md2rst( undefined, data, {}, done );

	function writeFile( file, opts, clbk ) {
		setTimeout( onTimeout, 0 );
		function onTimeout() {
			clbk( new Error( 'beep' ) );
		}
	}

	function done( error ) {
		t.ok( error, 'returns an error' );
		t.end();
	}
});

tape( 'the function returns any errors to the provided callback (conversion)', function test( t ) {
	var outFile;
	var outDir;
	var md2rst;

	outDir = path.resolve( __dirname, '..', 'build/'+(new Date()).getTime() );
	outFile = path.join( outDir, 'README.rst' );

	mkdirp.sync( outDir );

	md2rst = proxyquire( './../lib/data/async.js', {
		'fs': {
			'writeFile': writeFile
		}
	});

	// Non-existent input file...
	md2rst( outFile, data, {}, done );

	function writeFile( file, data, clbk ) {
		setTimeout( onTimeout, 0 );
		function onTimeout() {
			clbk();
		}
	}

	function done( error ) {
		t.ok( error, 'returns an error' );
		t.end();
	}
});

tape( 'the function returns any errors to the provided callback (reading output tmp file)', function test( t ) {
	var md2rst;

	md2rst = proxyquire( './../lib/data/async.js', {
		'utils-fs-read-file': read
	});

	md2rst( undefined, data, {}, done );

	function read( file, opts, clbk ) {
		setTimeout( onTimeout, 0 );
		function onTimeout() {
			clbk( new Error( 'beep' ) );
		}
	}

	function done( error ) {
		t.ok( error, 'returns an error' );
		t.end();
	}
});

tape( 'the function returns any errors to the provided callback (deleting input tmp file)', function test( t ) {
	var md2rst;

	md2rst = proxyquire( './../lib/data/async.js', {
		'fs': {
			'unlink': unlink
		}
	});

	md2rst( undefined, data, {}, done );

	function unlink( file, clbk ) {
		setTimeout( onTimeout, 0 );
		function onTimeout() {
			clbk( new Error( 'beep' ) );
		}
	}

	function done( error ) {
		t.ok( error, 'returns an error' );
		t.end();
	}
});

tape( 'the function returns any errors to the provided callback (deleting output tmp file)', function test( t ) {
	var md2rst;
	var count;

	md2rst = proxyquire( './../lib/data/async.js', {
		'fs': {
			'unlink': unlink
		}
	});

	count = 0;
	md2rst( undefined, data, {}, done );

	function unlink( file, clbk ) {
		setTimeout( onTimeout, 0 );
		function onTimeout() {
			count += 1;
			if ( count === 1 ) {
				rm( file );
				return clbk();
			}
			clbk( new Error( 'beep' ) );
		}
	}

	function done( error ) {
		t.ok( error, 'returns an error' );
		t.end();
	}
});