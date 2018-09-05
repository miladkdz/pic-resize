#!/usr/bin/env node

const chalk = require('chalk');
const program = require('commander');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

program.arguments('<file>')
    .option('-w, --width <width>', 'Width of the result image', 800)
    .action((file) => {      
        const extension = path.extname(file);
        const fileName = path.basename(file, extension);
        if (fs.existsSync(file)) {
            sharp(file)
                .resize(program.width)
                .toFile(`${fileName}-resized${extension}`);
        } else {
            console.log(chalk.bold.red('No such file.'));
        }
    })
    .parse(process.argv);