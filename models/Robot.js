const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const path = require('path');

const {isRobotMovable, rotateRobotLeft, rotateRobotRight} = require('../helpers/RobotHelper');

/*
 * The robot store that keeps track of the robots current state
 */
class Robot {
    constructor() {
        this.initStore()
    }

    /*
     * Initiate robot store
     */
    initStore() {
        const adapter = new FileSync(path.join(__dirname, '../database/db.json'))
        this.db = low(adapter)
        this.db.defaults({
                robot: {
                    location: '0,0',
                    facing: 'south'
                }
        }).write()
    }

    /*
     * Retrieve report from store
     */
    getReport() {
        const {location, facing} = this.getState();
        return {
            location: location,
            facing: facing
        }
    };

    /*
     * Update robot location and direction in store
     */
    place(x, y, facing) {
        const {movable} = isRobotMovable(x, y, facing)

        if(movable) {
            this.setState({
                location: `${x},${y}`,
                facing: facing
            })
        }
    };

    /*
     * Update robot location in store
     */
    move() {
        const robotState = this.getState(),
            x = parseInt(robotState.location.split(',')[0]),
            y = parseInt(robotState.location.split(',')[1])

        const {movable, nextLocation} = isRobotMovable(x, y, robotState.facing)
        if(movable) {
            this.setState({
                location: nextLocation
            })
        }
    }

    /*
     * Update robot direction in store
     */
    rotate(rotation) {
        const robotState = this.getState();

        let nextDirection
        if(rotation === 'left') {
            nextDirection = rotateRobotLeft(robotState.facing);
        } else if(rotation === 'right') {
            nextDirection = rotateRobotRight(robotState.facing);
        }

        this.setState({
            facing: nextDirection
        })
    }

    /*
     * Retrieve robot state from store
     */
    getState() {
        return this.db.get('robot').value()
    }

    /*
     * Update robot state in store
     */
    setState(state) {
        Object.keys(state).forEach((field) => {
            this.db.set(`robot.${field}`, state[field]).write()
        })
    }
}

module.exports = new Robot()