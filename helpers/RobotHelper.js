/*
 * The robot helper provides the basic robot commands
 *
 * The robot helper is used on the server side and on the client side
 */

/*
 * The grid configuration
 */
const tableGridConfig = {
    "size": "5x5"
}

const directionMap = {
    'south': 0,
    'west': 1,
    'north': 2,
    'east': 3
}

/*
 * Checks if the robot can be moved; and returns the next robot position if it can move
 */
const isRobotMovable = (x, y, facing) => {
    let movable = false, nextLocation = `${x},${y}`

    const gridWidth = parseInt(tableGridConfig.size.split('x')[0]),
          gridHeight = parseInt(tableGridConfig.size.split('x')[1])

    if(x < 0 || x > (gridWidth - 1)|| y < 0 || y > (gridWidth - 1)) {
        return {
            movable: movable,
            nextLocation: nextLocation
        }
    }

    switch(facing.toLowerCase()) {
        case 'north':
            if (y !== 0) {
                nextLocation = `${x},${y - 1}`
                movable = true
            }
            break
        case 'south':
            if (y !== (gridHeight - 1)) {
                nextLocation = `${x},${y + 1}`
                movable = true
            }
            break
        case 'west':
            if (x !== 0) {
                nextLocation = `${x - 1},${y}`
                movable = true
            }
            break
        case 'east':
            if (x !== (gridWidth - 1)) {
                nextLocation = `${x + 1},${y}`
                movable = true
            }
            break
    }

    return {
        movable: movable,
        nextLocation: nextLocation
    }
}

/*
 * Rotates the robot left
 */
const rotateRobotLeft = (facing) => {
    const directions = Object.keys(directionMap),
        directionIndex = directionMap[facing]

    let nextDirection
    if (directionIndex === 0) {
        nextDirection = directions[directions.length - 1]
    } else {
        nextDirection = directions[directionIndex - 1]
    }

    return nextDirection
}

/*
 * Rotates the robot Right
 */
const rotateRobotRight = (facing) => {
    const directions = Object.keys(directionMap),
        directionIndex = directionMap[facing]

    let nextDirection
    if (directionIndex === directions.length - 1) {
        nextDirection = directions[0]
    } else {
        nextDirection = directions[directionIndex + 1]
    }

    return nextDirection
}

/*
 * Parses the robot location and return its coordinates
 */
const parseRobotLocation = (robotLocation) => {
    return {
        x: parseInt(robotLocation.split(',')[0]),
        y: parseInt(robotLocation.split(',')[1])
    }
}

/*
 * Parses the robot direction and returns its robot angle of rotation
 */
const parseRobotDirection = (robotDirection) => {
    const robotAngleOfRotation = directionMap[robotDirection] * 90
    return robotAngleOfRotation
}

module.exports = {
    isRobotMovable,
    rotateRobotLeft,
    rotateRobotRight,
    parseRobotLocation,
    parseRobotDirection,
    directionMap
}