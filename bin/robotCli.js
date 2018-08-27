#!/usr/bin/env node

const program = require('commander');
const robot = require('../models/Robot');

program
    .version('0.0.1')
    .description('RC robot command line interface')

program
    .command('report')
    .description('Show robot report')
    .action(() => {
        const {location, facing} = robot.getReport()
        console.log(`Output: ${location} ${facing.toUpperCase()}`)
    })

program
    .command('place')
    .description('Place robot')
    .option('-x, --x <n>', 'Robot x coordinate', parseInt)
    .option('-y, --y <n>', 'Robot y coordinate', parseInt)
    .option('-f, --facing [value]', 'Robot direction', /^(north|south|west|east)$/i, 'south')
    .action((cmd) => {
        robot.place(cmd.x, cmd.y, cmd.facing)
    })

program
    .command('left')
    .description('Rotate robot left')
    .action(() => {
        robot.rotate('left')
    })

program
    .command('right')
    .description('Rotate robot right')
    .action(() => {
        robot.rotate('right')
    })

program
    .command('move')
    .description('Move robot forward')
    .action(() => {
        robot.move()
    })

program.parse(process.argv)