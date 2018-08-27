import React from 'react';
import { Header } from 'semantic-ui-react';

import TableGrid from './TableGrid.jsx';
import ControlPanel from './ControlPanel.jsx';

import { isRobotMovable, rotateRobotLeft, rotateRobotRight, parseRobotLocation, parseRobotDirection } from '../../helpers/RobotHelper'
import { getRobotReport, placeRobot, moveRobot, rotateRobot, subscribeToReports } from '../../helpers/ClientHelper'

/*
 * The main application component
 */
class Dashboard extends React.Component {
    constructor() {
        super();

        this.state = {
            robotLocation: '0,0',
            robotDirection: 'south',
            robotAngleOfRotation: 0,
            isRobotMovable: true,
            reportModalOpen: false,
            placeModalOpen: false
        };
    }

    /*
     * Component event hooks
     */
    componentDidMount() {
        this.loadRobotReportFromServer()
    }

    loadRobotReportFromServer() {
        this.getRobotReport()
        subscribeToReports((reportResponse) => {

            const report = JSON.parse(reportResponse)

            if((report.location && this.state.robotLocation !== report.location) || (report.facing && this.state.robotDirection != report.facing)) {
                console.log('Subscription event');
                this.setState({
                    robotLocation: report.location,
                    robotDirection: report.facing,
                    robotAngleOfRotation:  parseRobotDirection(report.facing)
                })
            }

        })
    }

    /*
     * The main application actions
     */

    getRobotReport() {
        getRobotReport((report) => {
            this.setState({
                robotLocation: report.location,
                robotDirection: report.facing,
                robotAngleOfRotation: parseRobotDirection(report.facing)
            })
        })
    }

    placeRobot(x, y, facing) {
        placeRobot({
            x: x,
            y: y,
            facing: facing
        })

        const {movable} = isRobotMovable(x, y, facing)
        this.setState({
            robotLocation: `${x},${y}`,
            robotDirection: facing,
            isRobotMovable: movable,
            robotAngleOfRotation:  parseRobotDirection(facing)
        })
    }

    moveRobot() {
        const {x,y} = parseRobotLocation(this.state.robotLocation)
        const {movable, nextLocation} = isRobotMovable(x, y, this.state.robotDirection)

        if(movable) {
            moveRobot({})
        }

        this.setState({
            robotLocation: nextLocation,
            isRobotMovable: movable
        })
    }

    rotateRobotLeft() {
        rotateRobot({rotation: 'left'})

        const nextDirection = rotateRobotLeft(this.state.robotDirection)
        const {x,y} = parseRobotLocation(this.state.robotLocation)

        const { movable } = isRobotMovable(x, y, nextDirection)

        this.setState({
            robotDirection: nextDirection,
            robotAngleOfRotation: this.state.robotAngleOfRotation - 90,
            isRobotMovable: movable
        })
    }

    rotateRobotRight() {
        rotateRobot({rotation: 'right'})

        const nextDirection = rotateRobotRight(this.state.robotDirection)
        const {x,y} = parseRobotLocation(this.state.robotLocation)

        const { movable } = isRobotMovable(x, y, nextDirection)

        this.setState({
            robotDirection: nextDirection,
            robotAngleOfRotation: this.state.robotAngleOfRotation + 90,
            isRobotMovable: movable
        })
    }

    /*
     * Place Robot handlers
     */
    handlePlaceModalOpen (){
        this.setState({ placeModalOpen: true })
    }

    handlePlaceModalClose (){
        this.setState({ placeModalOpen: false })
    }

    handlePlaceRobotClick(x, y, facing) {
        this.placeRobot(x, y, facing)
        this.setState({ placeModalOpen: false })
    }

    /*
     * Move and Rotate robot Handlers
     */
    handleRotateRobotLeftClick() {
        this.rotateRobotLeft()
    }

    handleMoveRobotClick() {
        this.moveRobot()
    }

    handleRotateRobotRightClick() {
        this.rotateRobotRight()
    }

    /*
     * Reports handlers
     */
    handleReportModalOpen() {
        this.getRobotReport()
        this.setState({ reportModalOpen: true })
    }

    handleReportModalClose (){
        this.setState({ reportModalOpen: false })
    }

    /*
     * Render component
     */
    render() {
        return (
            <div className='dashboard'>
                <Header className='app-header' as='h1'>RC Dashboard</Header>
                <TableGrid
                    rows='5'
                    columns='5'
                    robotLocation={this.state.robotLocation}
                    robotAngleOfRotation={this.state.robotAngleOfRotation}
                    robotDirection={this.state.robotDirection} />
                <ControlPanel onPlaceClick={this.handlePlaceRobotClick.bind(this)}
                              onPlaceModalOpenClick={this.handlePlaceModalOpen.bind(this)}
                              onPlaceModalCloseClick={this.handlePlaceModalClose.bind(this)}
                              onLeftClick={this.handleRotateRobotLeftClick.bind(this)}
                              onMoveClick={this.handleMoveRobotClick.bind(this)}
                              onRightClick={this.handleRotateRobotRightClick.bind(this)}
                              onReportModalOpenClick={this.handleReportModalOpen.bind(this)}
                              onReportModalCloseClick={this.handleReportModalClose.bind(this)}
                              placeModalOpen={this.state.placeModalOpen}
                              reportModalOpen={this.state.reportModalOpen}
                              isRobotMovable={this.state.isRobotMovable}
                              robotLocation={this.state.robotLocation}
                              robotDirection={this.state.robotDirection}
                              rows='5'
                              columns='5'/>
            </div>
        )
    }
}

export default Dashboard;