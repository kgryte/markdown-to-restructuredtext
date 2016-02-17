'use strict';

// MODULES //

var tape = require( 'tape' );
var path = require( 'path' );
var mkdirp = require( 'mkdirp' );
var exists = require( 'utils-fs-exists' );
var noop = require( '@kgryte/noop' );
var md2rst = require( './../lib/async.js' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.equal( typeof md2rst, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function throws an error if provided a destination argument which is not a string primitive', function test( t ) {
	var values;
	var i;

	values = [
		5,
		NaN,
		null,
		undefined,
		true,
		[],
		{},
		function(){}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws a type error when provided ' + values[i] );
	}
	t.end();
	function badValue( value ) {
		return function badValue() {
			md2rst( value, 'beep.md', noop );
		};
	}
});

tape( 'the function throws an error if provided a source argument which is not a string primitive', function test( t ) {
	var values;
	var i;

	values = [
		5,
		NaN,
		null,
		undefined,
		true,
		[],
		{},
		function(){}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws a type error when provided ' + values[i] );
	}
	t.end();
	function badValue( value ) {
		return function badValue() {
			md2rst( 'beep.rst', value, noop );
		};
	}
});

tape( 'the function throws an error if provided an options argument which is not an object', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		5,
		NaN,
		null,
		undefined,
		true,
		[],
		function(){}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws a type error when provided ' + values[i] );
	}
	t.end();
	function badValue( value ) {
		return function badValue() {
			md2rst( 'beep.rst', 'beep.md', value, noop );
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

tape( 'the function throws an error if provided a callback argument which is not a function', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		5,
		NaN,
		null,
		undefined,
		true,
		[],
		{}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws a type error when provided ' + values[i] );
	}
	t.end();
	function badValue( value ) {
		return function badValue() {
			md2rst( 'beep.rst', 'beep.md', value );
		};
	}
});

tape( 'the function throws an error if provided a callback argument which is not a function (options)', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		5,
		NaN,
		null,
		undefined,
		true,
		[],
		{}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws a type error when provided ' + values[i] );
	}
	t.end();
	function badValue( value ) {
		return function badValue() {
			md2rst( 'beep.rst', 'beep.md', {}, value );
		};
	}
});

tape( 'the function converts a Markdown file to reStructuredText', function test( t ) {
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

tape( 'the function converts a Markdown file to reStructuredText (options)', function test( t ) {
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

tape( 'the function returns any errors to the provided callback', function test( t ) {
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
