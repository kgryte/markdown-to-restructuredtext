'use strict';

// MODULES //

var tape = require( 'tape' );
var cmd = require( './../lib/cmd.js' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.equal( typeof cmd, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a string', function test( t ) {
	var out = cmd( './beep.md', './boop.rst', {'flavor':''} );
	t.equal( typeof out, 'string', 'returns a string' );
	t.end();
});

tape( 'the function returns a pandoc command to convert Markdown to reStructuredText', function test( t ) {
	var expected;
	var actual;

	expected = 'pandoc --from=markdown --to=rst --output=./boop.rst ./beep.md';
	actual = cmd( './beep.md', './boop.rst', {'flavor':''} );

	t.equal( actual, expected, 'returns a pandoc command' );
	t.end();
});

tape( 'the function supports specifying Markdown flavors', function test( t ) {
	var expected;
	var actual;

	expected = 'pandoc --from=markdown_github --to=rst --output=./boop.rst ./beep.md';
	actual = cmd( './beep.md', './boop.rst', {'flavor':'github'} );

	t.equal( actual, expected, 'returns a pandoc command for GFM' );
	t.end();
});
