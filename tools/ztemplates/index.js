#!/usr/bin/env node
'use strict';

// const spawn = require('cross-spawn');
const yargs = require('yargs');
const hideBin = require('yargs/helpers').hideBin;
const path = require('path');
const fs = require('fs');

const TEMPLATES = {
  NEST_DDD: 'nest_ddd',
};

const config = yargs(hideBin(process.argv));

config.command(
  'init <template> <name>',
  'Initialize a new project',
  () => {},
  args => {
    const projectName = args.name;

    const currentDir = process.cwd();
    const projectDir = path.resolve(currentDir, projectName);

    if (!Object.values(TEMPLATES).find(t => t === args.template)) {
      throw new Error(`Template ${args.template} not found`);
    }

    const templatePath = path.resolve(__dirname, `./templates/${args.template}`);

    if (!fs.existsSync(templatePath)) {
      throw new Error(`Internal template not found at ${templatePath}`);
    }

    fs.mkdirSync(projectDir, { recursive: true });

    fs.cpSync(templatePath, projectDir, { recursive: true });

    const projectPackageJson = require(path.join(projectDir, 'package.json'));

    projectPackageJson.name = projectName;

    fs.writeFileSync(path.join(projectDir, 'package.json'), JSON.stringify(projectPackageJson, null, 2));

    console.log('Success! Your new project is ready.');
    console.log(`Created ${projectName} at ${projectDir}`);
  },
);

config.help();

const argv = config.argv;
