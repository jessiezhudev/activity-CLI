'use strict'

const chalk = require('chalk');
const exec = require('child_process').exec;
const configure = require('../configure');
const params = process.argv.slice(2);

module.exports = () => {
    let templateName = params[1],
        projectName = params[2],
        gitCommand = ``,
        gitUrl = ``,
        branch = ``;

    if (!templateName) {
        console.log(chalk.red('\n × Please enter template name.'));
        console.log(chalk.green('√ activity init <template-name> <activity-name> \n '));
        process.exit();
    }

    if (!projectName) {
        console.log(chalk.red('\n × Please enter resume name.'));
        console.log(chalk.green('√ activity init <template-name> <activity-name> \n '));
        process.exit();
    }

    if (!configure.templates[templateName]) {
        console.log(chalk.red('\n × This template is not in the configuration file! \n '));
        process.exit();
    }

    gitUrl = configure.templates[templateName].git;
    branch = configure.templates[templateName].branch;

    gitCommand = `git clone -b ${branch} ${gitUrl} ${projectName}`;

    console.log(chalk.white('\n Waiting... \n'))

    exec(gitCommand, error => {
        if (error) {
            console.log(chalk.red(error));
            process.exit();
        }
        console.log(chalk.green('✨  Generation completed! \n'));
        console.log(`cd ${projectName} && npm i \n`);
        process.exit();
    });
};
