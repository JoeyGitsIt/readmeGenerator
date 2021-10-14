const inquirer = require('inquirer');
const fs = require('fs');

// Make video explaining how code works or the application works???

inquirer
  .prompt([
    {
      // Title
      type: 'input',
      message: 'What is the title for your project?',
      name: 'title',
    },
    {
      // Description
      type: 'input',
      message: 'Add a description for your project:',
      name: 'description',
    },
    {
      // How to install
      type: 'input',
      message: 'Provide your installation instructions:',
      name: 'install',
    },
    {
      // Usage
      type: 'input',
      message: 'Provide instructions and examples for use, if you want to add a screen shot, hit enter and selct from prompt below:',
      name: 'usage',
    },
    {
      // License
      type: 'list',
      message: 'Select your license:',
      choices: ["Apache 2.0","MIT","GNU GPLv3"],
      name: 'license',
    },
    {
      // Contribution 
      type: 'input',
      message: 'Add your contribution guidelines:',
      name: "contribution",
    },
    {
      // Tests 
      type: 'input',
      message: 'Add your test instructions:',
      name: "test",
    },
    {
      // Asks for github profile 
      type: 'input',
      message: 'Enter Github username:',
      name: "github",
    },
    {
      // Asks for email address 
      type: 'input',
      message: 'Enter email address:',
      name: "email",
    },
  ])
  .then((response) => {

    let licenseLogo = '';

    switch(response.license) {
      case 'Apache 2.0':
        licenseLogo = '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)';
        break;
      case 'MIT':
        licenseLogo = '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)';
        break;
      case 'GNU GPLv3':
        licenseLogo = '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)';
        break;
    }

    fs.writeFile(`${response.title}.md`, 
`
# ${response.title}
${licenseLogo}

## Description

${response.description}

## Table of Contents

[Install Instructions](#install-instructions)

[Usage](#usage)

[License](#license)

[Contribution Guidelines](#contribution-guidelines)

[Test Guidelines](#test-guidelines)

[Questions](#questions)


## Install Instructions

    ${response.install}

## Usage

    ${response.usage}

## License

    This project is covered under the following license: ${response.license}
    For more information please click on the badge above.

## Contribution Guidelines

    ${response.contribution}

## Test Guidelines

    ${response.test}

## Questions

[github.com/${response.github}](https://github.com/${response.github})

${response.email}

`, (err) => {
      err ? console.error(err) : console.log('Success!')
    })
  });