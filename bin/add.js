'use strict'

const fs = require('fs');
const inquirer = require('inquirer');
const prompt = inquirer.prompt;
const chalk = require('chalk');
const configure = require('../configure');

module.exports = () => {
    return async function () {
        let templateName = await prompt(chalk.green('\n template name: ')),
            branchName = await prompt(chalk.green('\n branch(master): ')),
            gitUrl = await prompt(chalk.green('\n git: '));

        if (!templateName) {
            console.log(chalk.red('\n × Please enter template name.\n'));
            process.exit();
        }

        if (!gitUrl) {
            console.log(chalk.red('\n × Please enter git url.\n'));
            process.exit();
        }

        if (!configure.templates[templateName]) {
            configure.templates[templateName] = {};
            configure.templates[templateName]['branch'] = branchName ? branchName : 'master';
            configure.templates[templateName]['git'] = gitUrl;

            fs.writeFile(`${__dirname}/../configure.json`, JSON.stringify(configure, null, '  '), 'utf-8', error => {
                if (error) {
                    console.log(chalk.red(error));
                    process.exit();
                }
                console.log(chalk.green('\n Template added:\n'));
                console.log(JSON.stringify(configure.templates, null, '    '));
                console.log('\n');
                process.exit();
            });
        } else {
            console.log(chalk.red('\n Template has already existed!\n'));
            console.log(JSON.stringify(configure.templates, null, '    '));
            process.exit();
        }
    }
};
