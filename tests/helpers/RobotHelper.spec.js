const should = require('should');

const {isRobotMovable, rotateRobotLeft, rotateRobotRight} = require('../../helpers/RobotHelper');

describe( 'Robot Helper Test', () => {
    it('test move north', async ()=>{
        const {movable, nextLocation} = isRobotMovable(4, 4, 'north');

        should.equal(nextLocation, '4,3', "Should be able to move");
        should.equal(movable, true, "Should be able to move");
    })

    it('test move north when robot cannot move', async ()=>{
        const {movable, nextLocation} = isRobotMovable(0, 0, 'north');

        should.equal(nextLocation, '0,0', "Should be able to move");
        should.equal(movable, false, "Should be able to move");
    })

    it('test move south', async ()=>{
        const {movable, nextLocation} = isRobotMovable(0, 0, 'south');

        should.equal(nextLocation, '0,1', "Should be able to move");
        should.equal(movable, true, "Should be able to move");
    })

    it('test move south when robot cannot move', async ()=>{
        const {movable, nextLocation} = isRobotMovable(4, 4, 'south');

        should.equal(nextLocation, '4,4', "Should be able to move");
        should.equal(movable, false, "Should be able to move");
    })

    it('test move west', async ()=>{
        const {movable, nextLocation} = isRobotMovable(4, 4, 'west');

        should.equal(nextLocation, '3,4', "Should be able to move");
        should.equal(movable, true, "Should be able to move");
    })

    it('test move west when robot cannot move', async ()=>{
        const {movable, nextLocation} = isRobotMovable(0, 0, 'west');

        should.equal(nextLocation, '0,0', "Should be able to move");
        should.equal(movable, false, "Should be able to move");
    })

    it('test move east', async ()=>{
        const {movable, nextLocation} = isRobotMovable(0, 0, 'east');

        should.equal(nextLocation, '1,0', "Should be able to move");
        should.equal(movable, true, "Should be able to move");
    })

    it('test move east when robot cannot move', async ()=>{
        const {movable, nextLocation} = isRobotMovable(4, 4, 'east');

        should.equal(nextLocation, '4,4', "Should be able to move");
        should.equal(movable, false, "Should be able to move");
    })

    it('test rotate left east', async ()=>{
        const nextDirection = rotateRobotLeft('south');
        should.equal(nextDirection, 'east', "Should be facing west");
    })

    it('test rotate left', async ()=>{
        const nextDirection = rotateRobotLeft('north');
        should.equal(nextDirection, 'west', "Should be facing west");
    })

    it('test rotate right west', async ()=>{
        const nextDirection = rotateRobotRight('south');
        should.equal(nextDirection, 'west', "Should be facing east");
    })

    it('test rotate right', async ()=>{
        const nextDirection = rotateRobotRight('west');
        should.equal(nextDirection, 'north', "Should be facing east");
    })
});