const fs = require('fs');
const util = require('util');
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown.js');

const promptQuestions = () => {

    return inquirer.prompt([
        {
            type: 'input',
            name: 'projectName',
            message: 'Enter project title? (Required)',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter project title...');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'projectDesc',
            message: 'Provide a description of the project (Required)',
            validate: descriptionInput => {
                if (descriptionInput) {
                    return true;
                } else {
                    console.log('Please enter a project description...')
                    return false;
                }
            }
        },
        {
            type: 'checkbox',
            name: 'tableCheck',
            message: 'What sections would you like to add?',
            choices: ['Installation', 'Usage', 'License', 'Contributing', 'Test', 'Questions'],
        },
        {
            type: 'input',
            name: 'installDesc',
            message: 'Provide installation instructions :',
            validate: installationInput => {
                if (installationInput){
                    return true;
                } else {
                    console.log('Please provide installation instructions...');
                    return false;
                }
            },
            when: ({ tableCheck }) => tableCheck.includes('Installation') === true
        },
        {
            type: 'input',
            name: 'usage',
            message: 'Describe how do you use your app :',
            validate: input => {
                if (input) {
                    return true;
                } else {
                    console.log('Please provide usage explanation...');
                    return false;
                }
            },
            when: ({ tableCheck }) => tableCheck.includes('Usage') === true
        },
        {
            type: 'input',
            name: 'contribute',
            message: 'Enter repository contribution guidelines :',
            validate: input => {
                if (input){
                    return true;
                } else {
                    console.log('Please provide contribution guidelines...');
                    return false;
                }
            },
            when: ({ tableCheck }) => tableCheck.includes('Contributing') === true
        },
        {
            type: 'input',
            name: 'tests',
            message: 'Provide test running instructions :',
            validate: input => {
                if (input){
                    return true;
                } else {
                    console.log('Please provide testing instructions...');
                    return false;
                }
            },
            when: ({ tableCheck }) => tableCheck.includes('Test') === true
        }
    ])
    .then (data => {
        if (data.tableCheck.includes('License')) {
            return getLicense(data);
        } else {
            return data;
        }
    })
    .then (data => {
        if (data.tableCheck.includes('Questions')) {
            return getContactInfo(data);
        } else {
            return data;
        }
    });
};

const getLicense = readmeData => {
    if(!readmeData.licenses) {
        readmeData.licenses = [];
    }

    return inquirer.prompt([
        {
            type: 'checkbox',
            name: 'licenses',
            message: 'Select appropriate license(s)',
            choices: ['MIT', 'GPL 2.0', 'Apache 2.0', 'GPL 3.0', 'BSD 2.0'],
            validate: input => {
                if(input){
                     return true;
                }else{
                    console.log('Please select a license...');
                    return false;
                }
            }
        }
    ])
    .then( data => {
        readmeData.licenses = data.licenses;
        return readmeData;
    });
 };

const getContactInfo = readmeData => {
    if(!readmeData.contactInfo) {
        readmeData.contactInfo = {
            name: '',
            email: ''
        };
    }

    return inquirer.prompt([
        {
            type: 'input',
            name: 'ownerName',
            message: 'Enter your GitHub username :',
            validate: input => {
                if (input) {
                    return true;
                } else {
                    console.log('Please enter GitHub username...');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'ownerEmail',
            message: 'Enter contact email address :',
            validate: input => {
                if (input) {
                    return true;
                } else {
                    console.log('Please enter email address...')
                }
            },
        }
    ])
    .then (data => {
        readmeData.contactInfo.name = data.ownerName;
        readmeData.contactInfo.email = data.ownerEmail;
        return readmeData;
    });
};

function writeToFile(fileName, data) {
    fs.writeFile('./dist/' + fileName, data, err => {
        if (err) {
            throw (err);
        }
    });
};

promptQuestions()
    .then(readmeData => {
        const markdown = generateMarkdown(readmeData);
        //writeToFile('README.md', markdown);
        //console.log(util.inspect(readmeData, false, null, true));
        //writeFile(readmeData);
    });