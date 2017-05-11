'use strict'

const fs = require('fs');
const inquirer = require('inquirer');
const prompt = inquirer.prompt;
const chalk = require('chalk');
const configure = require('../configure');

module.exports = async () => {
    let {
        templateName,
        branchName,
        gitUrl
    } = await prompt([
            {
                type: 'input',
                message: chalk.green('\n template name: '),
                name: 'templateName'
            },
            {
                type: 'input',
                message: chalk.green('\n branch(master): '),
                name: 'branchName'
            },
            {
                type: 'input',
                message: chalk.green('\n git: '),
                name: 'gitUrl'
            }
        ])

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
