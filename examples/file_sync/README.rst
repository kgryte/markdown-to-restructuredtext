Markdown to reStructuredText
============================

|NPM version| |Build Status| |Coverage Status| |Dependencies|

    Convert `Markdown <https://daringfireball.net/projects/markdown/>`__
    to `reStructuredText <http://docutils.sourceforge.net/rst.html>`__.

Installation
------------

.. code:: bash

    $ npm install markdown-to-restructuredtext

Installation prerequisites:

-  `pandoc <http://pandoc.org/>`__

Usage
-----

.. code:: javascript

    var md2rst = require( 'markdown-to-restructuredtext' );

md2rst( [dest,] src[, opts], clbk )
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Asynchronously converts a
`Markdown <https://daringfireball.net/projects/markdown/>`__ file to
`reStructuredText <http://docutils.sourceforge.net/rst.html>`__.

.. code:: javascript

    md2rst( './README.rst', './README.md', done );

    function done( error ) {
        if ( error ) {
            throw error;
        }
        console.log( 'converted' );
    }

The ``destination`` and ``source`` file paths may be either absolute or
relative. If relative, a file path is resolved relative to the `current
working directory <https://github.com/kgryte/utils-cwd>`__.

.. code:: javascript

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

If not provided a ``destination`` file path, the ``function`` returns a
`reStructuredText <http://docutils.sourceforge.net/rst.html>`__
``string``.

.. code:: javascript

    md2rst( './README.md', done );

    function done( error, rst ) {
        if ( error ) {
            throw error;
        }
        console.log( rst );
    }

The ``function`` accepts the following options:

-  **flavor**:
   `Markdown <https://daringfireball.net/projects/markdown/>`__ flavor;
   e.g., ``'github'``. For supported flavors, see
   `pandoc <http://pandoc.org/>`__. Default: ``''``.

By default, the ``function`` assumes standard
`Markdown <https://daringfireball.net/projects/markdown/>`__. To convert
from a different
`Markdown <https://daringfireball.net/projects/markdown/>`__ flavor, set
the ``flavor`` option.

.. code:: javascript

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

md2rst.sync( [dest,] src[, opts] )
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Synchronously converts
`Markdown <https://daringfireball.net/projects/markdown/>`__ to
`reStructuredText <http://docutils.sourceforge.net/rst.html>`__.

.. code:: javascript

    // Write to an output file:
    md2rst.sync( './README.rst', './README.md' );

    // Return a reStructuredText string:
    var rst = md2rst( './README.md' );
    // returns <string>

The ``function`` accepts the same ``options`` as
```md2rst()`` <#async>`__.

--------------

Examples
--------

.. code:: javascript

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

To run the example code from the top-level application directory,

.. code:: bash

    $ DEBUG=* node ./examples/file_async/index.js

--------------

CLI
---

Installation
~~~~~~~~~~~~

To use the module as a general utility, install the module globally

.. code:: bash

    $ npm install -g markdown-to-restructuredtext

Usage
~~~~~

.. code:: bash

    Usage: md2rst [options] inFile

    Options:

      -h,  --help               Print this message.
      -V,  --version            Print the package version.
           --flavor flavor      Markdown flavor. Default: (none).
      -o,  --output file        Output file path.

Notes
~~~~~

-  If not provided an ``output`` file path, the generated
   `reStructuredText <http://docutils.sourceforge.net/rst.html>`__ is
   written to ``stdout``.

Examples
~~~~~~~~

.. code:: bash

    $ DEBUG=* md2rst --flavor=github -o ./README.rst ./README.md

For local installations, modify the command to point to the local
installation directory; e.g.,

.. code:: bash

    $ DEBUG=* ./node_modules/.bin/md2rst --flavor=github -o ./README.rst ./README.md

Or, if you have cloned this repository and run ``npm install``, modify
the command to point to the executable; e.g.,

.. code:: bash

    $ DEBUG=* node ./bin/cli --flavor=github -o ./README.rst ./README.md

--------------

Tests
-----

Unit
~~~~

This repository uses `tape <https://github.com/substack/tape>`__ for
unit tests. To run the tests, execute the following command in the
top-level application directory:

.. code:: bash

    $ make test

All new feature development should have corresponding unit tests to
validate correct functionality.

Test Coverage
~~~~~~~~~~~~~

This repository uses
`Istanbul <https://github.com/gotwarlost/istanbul>`__ as its code
coverage tool. To generate a test coverage report, execute the following
command in the top-level application directory:

.. code:: bash

    $ make test-cov

Istanbul creates a ``./reports/coverage`` directory. To access an HTML
version of the report,

.. code:: bash

    $ make view-cov

--------------

License
-------

`MIT license <http://opensource.org/licenses/MIT>`__.

Copyright
---------

Copyright © 2016. Athan Reines.

.. |NPM version| image:: http://img.shields.io/npm/v/markdown-to-restructuredtext.svg
   :target: https://npmjs.org/package/markdown-to-restructuredtext
.. |Build Status| image:: http://img.shields.io/travis/kgryte/markdown-to-restructuredtext/master.svg
   :target: https://travis-ci.org/kgryte/markdown-to-restructuredtext
.. |Coverage Status| image:: https://img.shields.io/codecov/c/github/kgryte/markdown-to-restructuredtext/master.svg
   :target: https://codecov.io/github/kgryte/markdown-to-restructuredtext?branch=master
.. |Dependencies| image:: http://img.shields.io/david/kgryte/markdown-to-restructuredtext.svg
   :target: https://david-dm.org/kgryte/markdown-to-restructuredtext
