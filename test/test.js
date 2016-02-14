'use strict';

// MODULES //

var tape = require( 'tape' );
var md2rst = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.equal( typeof md2rst, 'function', 'main export is a function' );
	t.end();
});

tape( 'exports a function for synchronous conversion', function test( t ) {
	t.equal( typeof md2rst.sync, 'function', 'export is a function' );
	t.end();
});
