'use strict';

// MODULES //

var tape = require( 'tape' );
var path = require( 'path' );
var proxyquire = require( 'proxyquire' );
var readFile = require( 'utils-fs-read-file' ).sync;
var md2rst = require( './../lib/data/sync.js' );


// FIXTURES //

var data = readFile( path.resolve( __dirname, '../README.md' ), {'encoding':'utf8'} );
data = new Buffer( data );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof md2rst, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function throws if an error is encountered (conversion)', function test( t ) {
	var outFile;
	var outDir;
	var md2rst;

	outDir = path.resolve( __dirname, '..', 'build/'+(new Date()).getTime() );
	outFile = path.join( outDir, 'README.rst' );

	md2rst = proxyquire( './../lib/data/sync.js', {
		'fs': {
			'writeFileSync': writeFile
		}
	});

	t.throws( foo, Error, 'throws an error' );
	t.end();

	function writeFile( file, clbk ) {
		// Simulate a non-existent temporary file...
		clbk();
	}

	function foo() {
		md2rst( outFile, data, {} );
	}
});

tape( 'the function throws if an error is encountered (reading a tmp file)', function test( t ) {
	var md2rst = proxyquire( './../lib/data/sync.js', {
		'utils-fs-read-file': {
			'sync': read
		}
	});
	
	t.throws( foo, Error, 'throws an error' );
	t.end();

	function foo() {
		md2rst( undefined, data, {} );
	}

	function read() {
		return new Error( 'beep' );
	}
});