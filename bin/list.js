'use strict'

const chalk = require('chalk');
const configure = require('../configure');

module.exports = () => {
    console.log(chalk.green('\ntemplates: \n'));
    console.log(JSON.stringify(configure.templates, null, '    '));
    console.log('\n');
};
