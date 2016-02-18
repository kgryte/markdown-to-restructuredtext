Markdown to reStructuredText
===
[![NPM version][npm-image]][npm-url] [![Build Status][build-image]][build-url] [![Coverage Status][coverage-image]][coverage-url] [![Dependencies][dependencies-image]][dependencies-url]

> Convert [Markdown][markdown] to [reStructuredText][rst].


## Installation

``` bash
$ npm install markdown-to-restructuredtext
```

Installation prerequisites:
*	[pandoc][pandoc]


## Usage

``` javascript
var md2rst = require( 'markdown-to-restructuredtext' );
```

<a name="async"></a>
#### md2rst( [dest,] src[, opts], clbk )

Asynchronously converts a [Markdown][markdown] file to [reStructuredText][rst].

``` javascript
md2rst( './README.rst', './README.md', done );

function done( error ) {
	if ( error ) {
		throw error;
	}
	console.log( 'converted' );
}
```

The `destination` and `source` file paths may be either absolute or relative. If relative, a file path is resolved relative to the [current working directory][utils-cwd].

``` javascript
var inFile = '/path/to/my/file.md';
var outFile = './../output.rst';

process.chdir( '/some/directory' );

md2rst( outFile, inFile, done );

function done( error ) {
	if ( error ) {
		throw error;
	}
	console.log( 'output file: /some/output.rst' );
}
```

If not provided a `destination` file path, the `function` returns a [reStructuredText][rst] `string`.

``` javascript
md2rst( './README.md', done );

function done( error, rst ) {
	if ( error ) {
		throw error;
	}
	console.log( rst );
}
```

The `function` accepts the following options:
*	__flavor__: [Markdown][markdown] flavor; e.g., `'github'`. For supported flavors, see [pandoc][pandoc]. Default: `''`.

By default, the `function` assumes standard [Markdown][markdown]. To convert from a different [Markdown][markdown] flavor, set the `flavor` option.

``` javascript
var opts = {
	'flavor': 'github' // GFM
};

md2rst( './README.rst', './README.md', opts, done );

function done( error ) {
	if ( error ) {
		throw error;
	}
	console.log( 'converted from Github Flavored Markdown' );
}
```

<a name="sync"></a>
#### md2rst.sync( [dest,] src[, opts] )

Synchronously converts [Markdown][markdown] to [reStructuredText][rst].

``` javascript
// Write to an output file:
md2rst.sync( './README.rst', './README.md' );

// Return a reStructuredText string:
var rst = md2rst.sync( './README.md' );
// returns <string>
```

The `function` accepts the same `options` as [`md2rst()`](#async).


<a name="async-string"></a>
#### md2rst.fromString( [dest,] str[, opts], clbk )

Asynchronously converts a [Markdown][markdown] `string` to [reStructuredText][rst].

``` javascript
var readFile = require( 'utils-fs-read-file' ).sync;
var data = readFile( './README.md', {'encoding':'utf8'} );

md2rst.fromString( './README.rst', data, done );

function done( error ) {
	if ( error ) {
		throw error;
	}
	console.log( 'converted' );
}
```

If not provided a `destination` file path, the `function` returns a [reStructuredText][rst] `string`.

``` javascript
md2rst.fromString( data, done );

function done( error, rst ) {
	if ( error ) {
		throw error;
	}
	console.log( rst );
}
```

The `function` accepts the same `options` as [`md2rst()`](#async).


<a name="sync-string"></a>
#### md2rst.fromStringSync( [dest,] str[, opts] )

Synchronously converts a [Markdown][markdown] `string` to [reStructuredText][rst].

``` javascript
var readFile = require( 'utils-fs-read-file' ).sync;
var data = readFile( './README.md', {'encoding':'utf8'} );

// Write to an output file:
md2rst.fromStringSync( './README.rst', data );

// Return a reStructuredText string:
var rst = md2rst.fromStringSync( data );
// returns <string>
```

The `function` accepts the same `options` as [`md2rst()`](#async).


<a name="async-buffer"></a>
#### md2rst.fromString( [dest,] buffer[, opts], clbk )

Asynchronously converts a [Markdown][markdown] `buffer` to [reStructuredText][rst].

``` javascript
var readFile = require( 'utils-fs-read-file' ).sync;
var data = readFile( './README.md' );

md2rst.fromBuffer( './README.rst', data, done );

function done( error ) {
	if ( error ) {
		throw error;
	}
	console.log( 'converted' );
}
```

If not provided a `destination` file path, the `function` returns a [reStructuredText][rst] `string`.

``` javascript
md2rst.fromBuffer( data, done );

function done( error, rst ) {
	if ( error ) {
		throw error;
	}
	console.log( rst );
}
```

The `function` accepts the same `options` as [`md2rst()`](#async).


<a name="sync-buffer"></a>
#### md2rst.fromBufferSync( [dest,] buffer[, opts] )

Synchronously converts a [Markdown][markdown] `buffer` to [reStructuredText][rst].

``` javascript
var readFile = require( 'utils-fs-read-file' ).sync;
var data = readFile( './README.md' );

// Write to an output file:
md2rst.fromBufferSync( './README.rst', data );

// Return a reStructuredText string:
var rst = md2rst.fromBufferSync( data );
// returns <string>
```

The `function` accepts the same `options` as [`md2rst()`](#async).


---
## Examples

``` javascript
var path = require( 'path' );
var md2rst = require( 'markdown-to-restructuredtext' );

var inFile = path.resolve( __dirname, '../../README.md' );
var outFile = path.join( __dirname, './README.rst' );

var opts = {
	'flavor': 'github'
};

md2rst( inFile, opts, onResults );

function onResults( error, rst ) {
	if ( error ) {
		throw error;
	}
	console.log( rst );
}

md2rst( outFile, inFile, opts, onFile );

function onFile( error ) {
	if ( error ) {
		throw error;
	}
	console.log( 'Input file: %s', inFile );
	console.log( 'Output file: %s', outFile );
}
```

To run the example code from the top-level application directory,

``` bash
$ DEBUG=* node ./examples/file_async/index.js
```


---
## CLI

### Installation

To use the module as a general utility, install the module globally

``` bash
$ npm install -g markdown-to-restructuredtext
```


### Usage

``` bash
Usage: md2rst [options] inFile

Options:

  -h,  --help               Print this message.
  -V,  --version            Print the package version.
       --flavor flavor      Markdown flavor. Default: (none).
  -o,  --output file        Output file path.
```


### Notes

*	If not provided an `output` file path, the generated [reStructuredText][rst] is written to `stdout`.


### Examples

``` bash
$ DEBUG=* md2rst --flavor=github -o ./README.rst ./README.md
```

For local installations, modify the command to point to the local installation directory; e.g., 

``` bash
$ DEBUG=* ./node_modules/.bin/md2rst --flavor=github -o ./README.rst ./README.md
```

Or, if you have cloned this repository and run `npm install`, modify the command to point to the executable; e.g., 

``` bash
$ DEBUG=* node ./bin/cli --flavor=github -o ./README.rst ./README.md
```


---
## Tests

### Unit

This repository uses [tape][tape] for unit tests. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul][istanbul] as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2016. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/markdown-to-restructuredtext.svg
[npm-url]: https://npmjs.org/package/markdown-to-restructuredtext

[build-image]: http://img.shields.io/travis/kgryte/markdown-to-restructuredtext/master.svg
[build-url]: https://travis-ci.org/kgryte/markdown-to-restructuredtext

[coverage-image]: https://img.shields.io/codecov/c/github/kgryte/markdown-to-restructuredtext/master.svg
[coverage-url]: https://codecov.io/github/kgryte/markdown-to-restructuredtext?branch=master

[dependencies-image]: http://img.shields.io/david/kgryte/markdown-to-restructuredtext.svg
[dependencies-url]: https://david-dm.org/kgryte/markdown-to-restructuredtext

[dev-dependencies-image]: http://img.shields.io/david/dev/kgryte/markdown-to-restructuredtext.svg
[dev-dependencies-url]: https://david-dm.org/dev/kgryte/markdown-to-restructuredtext

[github-issues-image]: http://img.shields.io/github/issues/kgryte/markdown-to-restructuredtext.svg
[github-issues-url]: https://github.com/kgryte/markdown-to-restructuredtext/issues

[tape]: https://github.com/substack/tape
[istanbul]: https://github.com/gotwarlost/istanbul

[pandoc]: http://pandoc.org/
[markdown]: https://daringfireball.net/projects/markdown/
[rst]: http://docutils.sourceforge.net/rst.html

[utils-cwd]: https://github.com/kgryte/utils-cwd
