const fs = require('fs');
const util = require('util');
const inquirer = require('inquirer');

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
            type: 'confirm',
            name: 'tableConfirm',
            message: 'Would you like to add a Table of Contents',
            default: false
        },
        {
            type: 'checkbox',
            name: 'tableCheck',
            message: 'What sections would you like to add?',
            choices: ['Installation', 'Usage', 'License', 'Contributing', 'Test', 'Questions'],
            when: ({ tableConfirm }) => tableConfirm 
        },
        {
            type: 'confirm',
            name: 'installConfirm',
            message: 'Does your project require an installation?',
            default: false
        },
        {
            type: 'input',
            name: 'installDesc',
            message: 'Provide installation instructions (Required)',
            validate: installationInput => {
                if (installationInput){
                    return true;
                } else {
                    console.log('Please provide installation instructions...');
                    return false;
                }
            },
            when: ({ installConfirm }) => installConfirm
        },
        {
            type: 'input',
            name: 'usage',
            message: 'Describe how do you use your app (Required)',
            validate: usageInput => {
                if (usageInput) {
                    return true;
                } else {
                    console.log('Please provide usage explanation...');
                    return false;
                }
            }
        }
    ]);
};

const getCollaborators = readmeData => {
    if(!readmeData.projectData) {
        readmeData.projectData = {};
        readmeData.projectData.collaborators = [];
    }

    return inquirer.prompt([
        {
            type: 'confirm',
            name: 'confirmCollab',
            message: 'Do you have a collaborator to add?',
            default: false
        },
        {
            type: 'input',
            name: 'collabName',
            message: 'Enter name of collaborator :',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter collaborator name...');
                    return false;
                }
            },
            when: ({ confirmCollab }) => confirmCollab
        },
        {
            type: 'input',
            name: 'collabURL',
            message: 'Enter the collaborators GitHub URL :',
            validate: urlInput => {
                if (urlInput) {
                    return true;
                } else {
                    console.log('Please enter collaborator GitHub URL...')
                }
            },
            when: ({ confirmCollab }) => confirmCollab
        }
    ])
    .then (data => {
        readmeData.projectData.collaborators.push(data);
        if (data.confirmCollab) {
            return getCollaborators(readmeData);
        } else {
            return readmeData;
        }
    });
};

const getAssets = readmeData => {
    if(!readmeData.projectData.assetData) {
        readmeData.projectData.assetData = [];
    }

    return inquirer.prompt([
        {
            type: 'confirm',
            name: 'confirmAsset',
            message: 'Did you use a third party asset?',
            default: false
        },
        {
            type: 'input',
            name: 'assetName',
            message: 'Enter the third party asset name :',
            validate: inputName => {
                if(inputName){
                    return true;
                }else{
                    console.log('Please enter the name of the asset...');
                    return false;
                }
            },
            when: ({confirmAsset}) => confirmAsset
        },
        {
            type: 'confirm',
            name: 'assetCreator',
            message: 'Would you like to add a creator for this asset?',
            default: false,
            when: ({confirmAsset}) => confirmAsset
        }
     ]) 
    .then (data => {
        readmeData.projectData.assetData.push(data);
        if(data.confirmAsset){
            if(data.assetCreator && data.confirmAsset){
               return getCreators(readmeData);
            }else{
                return getAssets(readmeData);
            }
        } else {
            return readmeData;
        }
    });
};

const getCreators = readmeData => {

    return inquirer.prompt([
        {
            type: 'input',
            name: 'creator',
            message: 'Enter creator name :',
            validate: creatorInput => {
                if(creatorInput){
                     return true;
                }else{
                    console.log('Please enter name of creator...');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'creatorLink',
            message: 'Enter the link of the creator webpage :',
            validate: creatorInput => {
                if(creatorInput){
                     return true;
                }else{
                    console.log('Please enter creator webpage link...');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAdditional',
            message: 'Is there antoher creator for the asset?',
            default: false            
        }
    ])
    .then (data => {
        readmeData.projectData.assetData.push(data);
        if(data.confirmAdditional){
            return getCreators(projectData);
        } else {
            return getAssets(projectData);
        }
    });
};

const getTutorial = readmeData => {
    if(!readmeData.projectData.tutorials ){
        readmeData.projectData.tutorials = [];
    }
    return inquirer.prompt([
        {
            type: 'confirm',
            name: 'tutorials',
            message: 'Do you have a tutorial link?',
            default: false
        },
        {
            type: 'input',
            name: 'link',
            message: 'Please enter tutorial link :',
            validate: linkInput => {
                if(linkInput){
                     return true;
                }else{
                    console.log('Please enter link of tutorial...');
                    return false;
                }
            },
            when: ({tutorials}) => tutorials
        }
        
    ])
    .then (data => {
        readmeData.projectData.tutorials.push(data);
        if(data.tutorials){
            return tutorials(readmeData);
        }else{
            return readmeData;
        }
    });
};  
 
const getLicense = readmeData => {
    if(!readmeData.projectData.license) {
        readmeData.projectData.license = [];
    }

    return inquirer.prompt([
        {
            type: 'confirm',
            name: 'license',
            message: 'Do you have a license?',
            default: false
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter license link :',
            validate: linkInput => {
                if(linkInput){
                     return true;
                }else{
                    console.log('Please enter a link for the license...');
                    return false;
                }
            },
            when: ({license}) => license
        }
    ])
    .then( data => {
        readmeData.projectData.license.push(data);
        return readmeData;
    });

 };

promptQuestions()
.then(getCollaborators)
.then(getAssets)
.then(getTutorial)
.then(getLicense)
.then(projectData => {
    console.log(util.inspect(projectData, false, null, true));
});