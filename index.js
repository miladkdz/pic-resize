#!/usr/bin/env node

const chalk = require('chalk');
const program = require('commander');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const version = require('./package.json').version;

program
    .version(version)
    .arguments('<file>')
    .option('-w, --width <width>', 'Width of the result image', 800)
    .action((file) => {
        const extension = path.extname(file);
        const fileName = path.basename(file, extension);
        if (fs.existsSync(file)) {
            const image = sharp(file);
            image.metadata()
                .then((metadata) => {
                    image.resize(parseInt(program.width))
                        .toFile(`${fileName}-resized${extension}`)
                        .then(() => {
                            console.log(chalk.bold.blue('Image resized successfuly.'));
                        });
                })
                .catch((ex) => {
                    console.log(chalk.bold.red(ex));
                });                
        } else {
            console.log(chalk.bold.red('No such file.'));
        }
    })
    .parse(process.argv);