Markdown to reStructuredText
===
[![NPM version][npm-image]][npm-url] [![Build Status][build-image]][build-url] [![Coverage Status][coverage-image]][coverage-url] [![Dependencies][dependencies-image]][dependencies-url]

> Convert [Markdown][markdown] to [reStructuredText][rst].


## Installation

``` bash
$ npm install markdown-to-restructuredtext
```

Installation prerequisites:
*	[Pandoc][pandoc]


## Usage

``` javascript
var md2rst = require( 'markdown-to-restructuredtext' );
```

<a name="async"></a>
#### md2rst( src, dest[, opts], clbk )

Asynchronously converts [Markdown][markdown] to [reStructuredText][rst].

``` javascript
md2rst( './README.md', './README.rst', done );

function done( error ) {
	if ( error ) {
		throw error;
	}
	console.log( 'converted' );
}
```

The `source` and `destination` file paths may be either absolute or relative. If relative, a file path is resolved relative to the [current working directory][utils-cwd].

``` javascript
var inFile = '/path/to/my/file.md';
var outFile = './../output.rst';

process.chdir( '/some/directory' );

md2rst( inFile, outFile, done );

function done( error ) {
	if ( error ) {
		throw error;
	}
	console.log( 'output file: /some/output.rst' );
}
```

The `function` accepts the following options:
*	__flavor__: [Markdown][markdown] flavor; e.g., `'github'`. Default: `''`.

By default, the `function` assumes standard [Markdown][markdown]. To convert from a different [Markdown][markdown] flavor, set the `flavor` option.

``` javascript
var opts = {
	'flavor': 'github' // GFM
};

md2rst( './README.md', './README.rst', opts, done );

function done( error ) {
	if ( error ) {
		throw error;
	}
	console.log( 'converted from Github Flavored Markdown' );
}
```

<a name="sync"></a>
#### md2rst.sync( src, dest[, opts] )

Synchronously converts [Markdown][markdown] to [reStructuredText][rst].

``` javascript
md2rst.sync( './README.md', './README.rst' );
```

The `function` accepts the same `options` as [`md2rst()`](#async).


---
## Examples

``` javascript
var path = require( 'path' );
var md2rst = require( 'markdown-to-restructuredtext' );

var inFile = path.resolve( __dirname, '../README.md' );
var outFile = path.join( __dirname, 'README.rst' );

var opts = {
	'flavor': 'github'
};
md2rst( inFile, outFile, opts, done );

function done( error ) {
	if ( error ) {
		throw error;
	}
	console.log( 'Input file: %s', inFile );
	console.log( 'Output file: %s', outFile );
}
```

To run the example code from the top-level application directory,

``` bash
$ DEBUG=* node ./examples/index.js
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

```


### Examples

``` bash
$
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
