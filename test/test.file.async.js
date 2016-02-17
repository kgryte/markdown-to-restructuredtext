'use strict';

// MODULES //

var tape = require( 'tape' );
var path = require( 'path' );
var mkdirp = require( 'mkdirp' );
var exists = require( 'utils-fs-exists' );
var noop = require( '@kgryte/noop' );
var proxyquire = require( 'proxyquire' );
var md2rst = require( './../lib/file/async.js' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.equal( typeof md2rst, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function throws an error if provided arguments of the wrong type', function test( t ) {
	var values;
	var i;

	values = [
		[5,'boop.md',{},noop],
		['beep.rst',NaN,{},noop],
		['beep.rst','boop.md',null,noop],
		['beep.rst','boop.md',{},true],
		[undefined,'boop.md',noop],
		['beep.rst',-2,noop],
		['beep.rst','boop.md',[]],
		[{},{},noop],
		['boop.md',noop,noop],
		['boop.md',{},'woot'],
		[[],noop],
		['boop.md',{}]
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), Error, 'throws an error when provided ' + values[i].join(',') );
	}
	t.end();
	function badValue( args ) {
		return function badValue() {
			md2rst.apply( null, args );
		};
	}
});

tape( 'the function throws an error if provided an invalid option', function test( t ) {
	t.throws( badValue, TypeError, 'throws a type error' );
	t.end();
	function badValue() {
		md2rst( 'beep.rst', 'beep.md', {
			'flavor': null
		}, noop );
	}
});

tape( 'the function converts a Markdown file to a reStructuredText file', function test( t ) {
	var outFile;
	var outDir;
	var inFile;

	outDir = path.resolve( __dirname, '..', 'build/'+(new Date()).getTime() );
	outFile = path.join( outDir, 'README.rst' );
	inFile = path.resolve( __dirname, '../README.md' );

	mkdirp.sync( outDir );
	md2rst( outFile, inFile, done );

	function done( error ) {
		var bool;
		if ( error ) {
			t.ok( false, error.message );
			return t.end();
		}
		bool = exists.sync( outFile );
		t.ok( bool, 'converted file exists' );

		t.end();
	}
});

tape( 'the function converts a Markdown file to a reStructuredText file (options)', function test( t ) {
	var outFile;
	var outDir;
	var inFile;

	outDir = path.resolve( __dirname, '..', 'build/'+(new Date()).getTime() );
	outFile = path.join( outDir, 'README.rst' );
	inFile = path.resolve( __dirname, '../README.md' );

	mkdirp.sync( outDir );
	md2rst( outFile, inFile, {'flavor':'github'}, done );

	function done( error ) {
		var bool;
		if ( error ) {
			t.ok( false, error.message );
			return t.end();
		}
		bool = exists.sync( outFile );
		t.ok( bool, 'converted file exists' );

		t.end();
	}
});

tape( 'the function converts a Markdown file to a reStructuredText string', function test( t ) {
	var inFile = path.resolve( __dirname, '../README.md' );

	md2rst( inFile, done );

	function done( error, rst ) {
		if ( error ) {
			t.ok( false, error.message );
			return t.end();
		}
		t.equal( typeof rst, 'string', 'returns a string' );

		t.end();
	}
});

tape( 'the function converts a Markdown file to a reStructuredText string (options)', function test( t ) {
	var inFile = path.resolve( __dirname, '../README.md' );

	md2rst( inFile, {'flavor':'github'}, done );

	function done( error, rst ) {
		if ( error ) {
			t.ok( false, error.message );
			return t.end();
		}
		t.equal( typeof rst, 'string', 'returns a string' );

		t.end();
	}
});

tape( 'the function returns any errors to the provided callback (conversion)', function test( t ) {
	var outFile;
	var outDir;
	var inFile;

	outDir = path.resolve( __dirname, '..', 'build/'+(new Date()).getTime() );
	outFile = path.join( outDir, 'README.rst' );

	// Non-existent file:
	inFile = path.resolve( __dirname, '../dfadlkfdjaflkdjflsdj.md' );

	mkdirp.sync( outDir );
	md2rst( outFile, inFile, done );

	function done( error ) {
		t.ok( error, 'returns an error' );
		t.end();
	}
});

tape( 'the function returns any errors to the provided callback (reading tmp file)', function test( t ) {
	var md2rst;
	var inFile;

	inFile = path.resolve( __dirname, '../README.md' );

	md2rst = proxyquire( './../lib/file/async.js', {
		'utils-fs-read-file': read
	});

	md2rst( inFile, done );

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

tape( 'the function returns any errors to the provided callback (deleting tmp file)', function test( t ) {
	var md2rst;
	var inFile;

	inFile = path.resolve( __dirname, '../README.md' );

	md2rst = proxyquire( './../lib/file/async.js', {
		'fs': {
			'unlink': unlink
		}
	});

	md2rst( inFile, done );

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
