'use strict';

// MODULES //

var tape = require( 'tape' );
var path = require( 'path' );
var mkdirp = require( 'mkdirp' );
var exists = require( 'utils-fs-exists' );
var noop = require( '@kgryte/noop' );
var proxyquire = require( 'proxyquire' );
var readFile = require( 'utils-fs-read-file' ).sync;
var rm = require( 'fs' ).unlinkSync;
var md2rst = require( './../lib/data/async.js' );


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

tape( 'the function converts Markdown data to a reStructuredText file', function test( t ) {
	var outFile;
	var outDir;

	outDir = path.resolve( __dirname, '..', 'build/'+(new Date()).getTime() );
	outFile = path.join( outDir, 'README.rst' );

	mkdirp.sync( outDir );
	md2rst( outFile, data, done );

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

tape( 'the function converts Markdown data to a reStructuredText file (buffer)', function test( t ) {
	var outFile;
	var outDir;

	outDir = path.resolve( __dirname, '..', 'build/'+(new Date()).getTime() );
	outFile = path.join( outDir, 'README.rst' );

	mkdirp.sync( outDir );
	md2rst( outFile, new Buffer( data ), done );

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

tape( 'the function converts Markdown data to a reStructuredText file (options)', function test( t ) {
	var outFile;
	var outDir;

	outDir = path.resolve( __dirname, '..', 'build/'+(new Date()).getTime() );
	outFile = path.join( outDir, 'README.rst' );

	mkdirp.sync( outDir );
	md2rst( outFile, data, {'flavor':'github'}, done );

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

tape( 'the function converts Markdown data to a reStructuredText string', function test( t ) {
	md2rst( data, done );

	function done( error, rst ) {
		if ( error ) {
			t.ok( false, error.message );
			return t.end();
		}
		t.equal( typeof rst, 'string', 'returns a string' );

		t.end();
	}
});

tape( 'the function converts Markdown data to a reStructuredText string (buffer)', function test( t ) {
	md2rst( new Buffer( data ), done );

	function done( error, rst ) {
		if ( error ) {
			t.ok( false, error.message );
			return t.end();
		}
		t.equal( typeof rst, 'string', 'returns a string' );

		t.end();
	}
});

tape( 'the function converts Markdown data to a reStructuredText string (options)', function test( t ) {
	md2rst( data, {'flavor':'github'}, done );

	function done( error, rst ) {
		if ( error ) {
			t.ok( false, error.message );
			return t.end();
		}
		t.equal( typeof rst, 'string', 'returns a string' );

		t.end();
	}
});

tape( 'the function returns any errors to the provided callback (writing input tmp file)', function test( t ) {
	var md2rst = proxyquire( './../lib/data/async.js', {
		'fs': {
			'writeFile': writeFile
		}
	});

	md2rst( data, done );

	function writeFile( file, data, clbk ) {
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
	md2rst( outFile, data, done );

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

	md2rst( data, done );

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

	md2rst( data, done );

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
	md2rst( data, done );

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
