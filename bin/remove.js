'use strict'

const fs = require('fs');
const inquirer = require('inquirer');
const prompt = inquirer.prompt;
const chalk = require('chalk');
const configure = require('../configure');
const params = process.argv.slice(2);

module.exports = async() => {
        let templateName = params[1],
         { confirm } = await prompt([
             {
                 type: 'input',
                 message: chalk.red(`\n remove template ${templateName}?[y/n]: `),
                 name: 'confirm'
             }
        ]);
        if (!(confirm == 'y' || confirm == 'yes')) {
            console.log(chalk.green('\n × Cancelled.\n'));
            process.exit();
        }

        if (!templateName) {
            console.log(chalk.red('\n × Please enter template name.\n'));
            process.exit();
        }

        if (!!configure.templates[templateName]) {
            delete configure.templates[templateName];

            fs.writeFile(`${__dirname}/../configure.json`, JSON.stringify(configure, null, '  '), 'utf-8', error => {
                if (error) {
                    console.log(chalk.red(error));
                    process.exit();
                }
                console.log(chalk.green('\n Template removed.\n'));
                console.log(chalk.green(' Latest templates:\n'));
                console.log(JSON.stringify(configure.templates, null, '    '));
                console.log('\n');
                process.exit();
            });
        } else {
            console.log(chalk.red('\n Template not found!\n'));
            console.log(JSON.stringify(configure.templates, null, '    '));
            process.exit();
        }
    }
