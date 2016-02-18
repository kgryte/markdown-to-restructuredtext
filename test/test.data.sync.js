'use strict';

// MODULES //

var tape = require( 'tape' );
var path = require( 'path' );
var mkdirp = require( 'mkdirp' );
var exists = require( 'utils-fs-exists' );
var proxyquire = require( 'proxyquire' );
var readFile = require( 'utils-fs-read-file' ).sync;
var md2rst = require( './../lib/data/sync.js' );


// FIXTURES //

var data = readFile( path.resolve( __dirname, '../README.md' ), {'encoding':'utf8'} );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.equal( typeof md2rst, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function throws an error if provided arguments of the wrong type', function test( t ) {
	var values;
	var i;

	values = [
		[5,'boop.md',{}],
		['beep.rst',NaN,{}],
		['beep.rst','boop.md',null],
		[undefined,'boop.md'],
		['beep.rst',-2],
		[{},{}],
		['boop.md',function(){}],
		[[]],
		[null],
		[5],
		[true]
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
	t.throws( badValue, 'TypeError', 'throws a type error' );
	t.end();
	function badValue() {
		md2rst( 'beep.rst', 'beep.md', {
			'flavor': null
		});
	}
});

tape( 'the function converts Markdown data to a reStructuredText file', function test( t ) {
	var outFile;
	var outDir;
	var bool;

	outDir = path.resolve( __dirname, '..', 'build/'+(new Date()).getTime() );
	outFile = path.join( outDir, 'README.rst' );

	mkdirp.sync( outDir );
	md2rst( outFile, data );

	bool = exists.sync( outFile );
	t.ok( bool, 'converted file exists' );

	t.end();
});

tape( 'the function converts Markdown data to a reStructuredText file (buffer)', function test( t ) {
	var outFile;
	var outDir;
	var bool;

	outDir = path.resolve( __dirname, '..', 'build/'+(new Date()).getTime() );
	outFile = path.join( outDir, 'README.rst' );

	mkdirp.sync( outDir );
	md2rst( outFile, new Buffer( data ) );

	bool = exists.sync( outFile );
	t.ok( bool, 'converted file exists' );

	t.end();
});

tape( 'the function converts Markdown data to a reStructuredText file (options)', function test( t ) {
	var outFile;
	var outDir;
	var bool;

	outDir = path.resolve( __dirname, '..', 'build/'+(new Date()).getTime() );
	outFile = path.join( outDir, 'README.rst' );

	mkdirp.sync( outDir );
	md2rst( outFile, data, {'flavor':'github'} );

	bool = exists.sync( outFile );
	t.ok( bool, 'converted file exists' );

	t.end();
});

tape( 'the function converts Markdown data to a reStructuredText string', function test( t ) {
	var rst = md2rst( data );

	t.equal( typeof rst, 'string', 'returns a string' );

	t.end();
});

tape( 'the function converts Markdown data to a reStructuredText string (buffer)', function test( t ) {
	var rst = md2rst( new Buffer( data ) );

	t.equal( typeof rst, 'string', 'returns a string' );

	t.end();
});

tape( 'the function converts Markdown data to a reStructuredText string (options)', function test( t ) {
	var rst = md2rst( data, {'flavor':'github'} );

	t.equal( typeof rst, 'string', 'returns a string' );

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
		md2rst( outFile, data );
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
		md2rst( data );
	}

	function read() {
		return new Error( 'beep' );
	}
});
