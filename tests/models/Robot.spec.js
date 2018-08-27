const should = require('should');
const sinon = require('sinon');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const path = require('path');

const robot = require('../../models/Robot');

const resetRobot = () => {
    robot.place(0,0,'south')
}

resetRobot()

describe( 'Robot Model Test', () => {
    it('test place robot', () => {
        let stub = sinon.stub(robot, "setState");

        robot.place(0,1,'north')

        const expectedArg = {
            location: '0,1',
            facing: 'north'
        }

        should.equal(stub.withArgs(expectedArg).calledOnce, true, "Should be able to move");

        robot.setState.restore()
    })

    it('test place robot outside of grid with negative y', () => {
        let stub = sinon.stub(robot, "setState");

        robot.place(0,-1,'north')

        const expectedArg = {
            location: '0,-1',
            facing: 'north'
        }

        should.equal(stub.withArgs(expectedArg).notCalled, true, "Should not be able to move");

        robot.setState.restore()
    })

    it('test place robot outside of grid with positive y', () => {
        let stub = sinon.stub(robot, "setState");

        robot.place(0,5,'north')

        const expectedArg = {
            location: '0,5',
            facing: 'north'
        }

        should.equal(stub.withArgs(expectedArg).notCalled, true, "Should not be able to move");

        robot.setState.restore()
    })

    it('test move robot', () => {
        let stub = sinon.stub(robot, "setState");

        robot.move()

        const expectedArg = {
            location: '0,1'
        }

        should.equal(stub.withArgs(expectedArg).calledOnce, true, "Should be able to move");

        robot.setState.restore()
        resetRobot()
    })

    it('test rotate robot left', () => {
        let stub = sinon.stub(robot, "setState");

        robot.rotate('left')

        const expectedArg = {
            facing: 'east'
        }

        should.equal(stub.withArgs(expectedArg).calledOnce, true, "Should be able to move");

        robot.setState.restore()
    })

    it('test rotate robot right', () => {
        let stub = sinon.stub(robot, "setState");

        robot.rotate('right')

        const expectedArg = {
            facing: 'west'
        }

        should.equal(stub.withArgs(expectedArg).calledOnce, true, "Should be able to move");

        robot.setState.restore()
    })
});