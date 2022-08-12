#!/usr/bin/env node
'use strict';
const React = require('react');
const importJsx = require('import-jsx');
const {render} = require('ink');
const meow = require('meow');

const ui = importJsx('./ui');

const cli = meow(`
	Usage
	  $ poe-guide

	Options
		--name  Your name
                --log, -l  The log file to parse

	Examples
	  $ poe-guide --name=Jane
	  Hello, Jane
`, {
	flags: {
		log: {
			type: 'string',
			alias: 'l'
		}
	}
});

if (cli.flags.log) {
  const config = require('./config');
	config.set('log', cli.flags.log);
}

render(React.createElement(ui, {}));
