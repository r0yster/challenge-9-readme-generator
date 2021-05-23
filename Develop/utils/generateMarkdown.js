function generateTitle(title) {
  return `# ${title}`
};

function generateDescription(description, license) {
  if (license) {
    return `sample license badge here
## Description
${description}`
  } else {
    return `## Description
${description}`
  }
};

function generateTableOfContents(content) {
  let temp = '';

  for (let i = 0; i < content.length; i++) {
    temp += '* [' + content[i] + '](#' + content[i] + ')\n';
  }

  return `## Table of Contents
${temp}`
};

function generateInstallDesc(installDesc) {
  return `## Installation  
${installDesc}`
};

function generateUsage(usage) {
  return `## Usage  
${usage}`
};

function generateContribute(contribute) {
  return `## Contributing
${contribute}`
}

function generateTest(test) {
  return `## Tests
${test}`
}

function generateLicense(license) {
  let temp = '';

  for (let i = 0; i < license.length; i++) {
    temp += '* ' + license[i] + '\n';
  }
  
  return `## License
${temp}`
}

function generateContactinfo(contact) {
  return `## Questions
For any questions please reach out to:  
GitHub Username: [${contact.name}](https://github.com/${contact.name})  
Email: ${contact.email}`
};

function generateMarkdown(readmeData) {
  console.log(readmeData.projectName);
  console.log(readmeData.projectDesc);
  console.log(readmeData.tableCheck);
  console.log(readmeData.installDesc);
  console.log(readmeData.usage);
  console.log(readmeData.contribute);
  console.log(readmeData.tests);
  console.log(readmeData.licenses);
  console.log(readmeData.contactInfo);


  return `
${generateTitle(readmeData.projectName)}
${generateDescription(readmeData.projectDesc, readmeData.licenses)}
${generateTableOfContents(readmeData.tableCheck)}
${generateInstallDesc(readmeData.installDesc)}
${generateUsage(readmeData.usage)}
${generateContribute(readmeData.contribute)}
${generateTest(readmeData.tests)}
${generateLicense(readmeData.licenses)}
${generateContactinfo(readmeData.contactInfo)}
  `
}

module.exports = generateMarkdown;
