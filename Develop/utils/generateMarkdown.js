function generateTitle(title) {
  return `
  # ${title}
  
  `
};

function generateDescription(description) {
  return `
  ## Description
  ${description}
  
  `
};

function generateTableOfContents(content) {

  let temp = '';

  for (let i = 0; i < content.length; i++) {
    temp += '* [' + content[i] + '](#' + content[i] + ')  \n ';
  }
  
  return `
    ## Table of Contents
    ${temp}
  `   
};

function generateInstallDesc(installDesc) {
  return `
  ## Installation
  ${installDesc}
  
  `
};

function generateUsage(usage) {
  return `
  ## Usage
  ${usage}
  
  `
};

function generateContactinfo(contact) {
  let temp = '';

  for (let i = 0; i < collaborators.length; i++) {
    temp += 'Name : ' + collaborators[i].collabName + 'URL : ' + collaborators[i] + '\n';
  }
  
  return `
    ## Credits
    ${temp}
  `
};

function generateLicense(license) {
  
  let temp = '';

  for (let i = 0; i < license.length; i++) {
    temp += '* ' + license[i] + ')  \n ';
  }
  
  return `
    ## License
    ${temp}
  `
}

/*
function generateMarkdown(readmeData) {
  if (readmeData.projectName) {
    generateTitle(readmeData.projectName);
  }

  if (readmeData.projectDesc) {
    generateDescription(readmeData.projectDesc);
  }

  if (readmeData.tableCheck) {
    generateTableOfContents(readmeData.tableCheck);
  }

  if (readmeData.installDesc) {
    generateInstallDesc(readmeData.installDesc);
  }

  if (readmeData.usage) {
    generateUsage(readmeData.usage);
  }

  if (readmeData.collaborators) {
    generateCredits(readmeData.collaborators);
  }

  if (readmeData.license) {
    generateLicense(readmeData.license);
  }
  if (readmeData.) {

  }*/

/*
  return ` 
  # ${readmeData.projectName}

  ## Description
  ${readmeData.projectDesc}

  ${generateTableOfContents(readmeData.tableCheck)}

  ## Installation
  ${readmeData.installDesc}

  ## Usage
  ${readmeData.usage}

  ## Credits
  ${readmeData.projectData.collaborators[0].collabName}

  ## License
  ${readmeData.projectData.license[0].link}
`;
}*/

function generateMarkdown(readmeData) {
  console.log(readmeData);
}

module.exports = generateMarkdown;
