'use strict';

// MODULES //

var tape = require( 'tape' );
var md2rst = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.equal( typeof md2rst, 'function', 'main export is a function' );
	t.end();
});

tape( 'exports a function for synchronous file conversion', function test( t ) {
	t.equal( typeof md2rst.sync, 'function', 'export is a function' );
	t.end();
});

tape( 'exports a function for asynchronous string (data) conversion', function test( t ) {
	t.equal( typeof md2rst.fromString, 'function', 'export is a function' );
	t.end();
});

tape( 'exports a function for synchronous string (data) conversion', function test( t ) {
	t.equal( typeof md2rst.fromStringSync, 'function', 'export is a function' );
	t.end();
});

tape( 'exports a function for asynchronous buffer (data) conversion', function test( t ) {
	t.equal( typeof md2rst.fromBuffer, 'function', 'export is a function' );
	t.end();
});

tape( 'exports a function for synchronous buffer (data) conversion', function test( t ) {
	t.equal( typeof md2rst.fromBufferSync, 'function', 'export is a function' );
	t.end();
});
