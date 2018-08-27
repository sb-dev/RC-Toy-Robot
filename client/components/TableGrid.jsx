import React from 'react';
import { Container, Grid } from 'semantic-ui-react';

import Robot from "./Robot.jsx";

/*
 * The Table Grid where the robot is placed
 */
class TableGrid extends React.Component {
    constructor() {
        super();

        this.state = {
            robot: {
                x: 0,
                y: 0
            }
        }
    }

    /*
     * Component event hooks
     */
    componentDidMount() {
        window.addEventListener('resize', this.updateGrid.bind(this))
        setTimeout(() => { this.updateGrid() }, 500);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.robotLocation != this.props.robotLocation && this.props.robotLocation) {
            this.updateGrid()
        }
    }

    /*
     * Update the table grid state
     */
    updateGrid() {
        const robotLocation = this.props.robotLocation.split(',')
        const gridSquareInfo = document
            .querySelector(`.column[data-location="${robotLocation[0]},${robotLocation[1]}"]`)
            .getBoundingClientRect()

        const robotInfo = document.querySelector('.robot').getBoundingClientRect()

        let xOffset, yOffset
        if(this.props.robotDirection === 'west' || this.props.robotDirection === 'east') {
            xOffset = robotInfo.height / 2
            yOffset = robotInfo.width / 2
        } else {
            xOffset = robotInfo.width / 2
            yOffset = robotInfo.height / 2
        }

        this.setState({
            robot: {
                x: (gridSquareInfo.left + (gridSquareInfo.width / 2) - xOffset),
                y: (gridSquareInfo.top + (gridSquareInfo.height / 2) - yOffset)
            }
        })
    }

    /*
     * Generate the table grid template
     */
    createGrid() {
        let rows = []

        // Go throw rows
        for (let i = 0; i < this.props.rows; i++) {
            let columns = []

            // Go throw columns
            for (let j = 0; j < this.props.columns; j++) {
                columns.push(<Grid.Column data-location={`${j},${i}`} key={j}></Grid.Column>)
            }

            rows.push(<Grid.Row key={i}>{columns}</Grid.Row>)
        }

        return <Grid columns={this.props.columns} celled>{rows}</Grid>
    }

    /*
     * Render component
     */
    render() {
        return (
            <Container className='grid-container'>
                <Robot
                    className='robot'
                    top={this.state.robot.y}
                    left={this.state.robot.x}
                    rotate={this.props.robotAngleOfRotation}
                />
                {this.createGrid()}
            </Container>
        )
    }
}

export default TableGrid;