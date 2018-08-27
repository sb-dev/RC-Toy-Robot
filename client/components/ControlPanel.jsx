import React from 'react';
import { Grid, Menu, Icon, Modal, Button, Form, Statistic, Message } from 'semantic-ui-react';

import { parseRobotLocation, directionMap } from '../../helpers/RobotHelper'

/*
 * The control panel which allows the user to send commands to the robot
 */
class ControlPanel extends React.Component {
    constructor() {
        super()

        this.state = {
            robotNewX: 0,
            robotNewY: 0,
            robotNewDirection: '',
            report: {
                x: 0,
                y: 0,
                facing: 'south'
            }
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleDropdownChange = this.handleDropdownChange.bind(this)
    }

    /*
     * Component event hooks
     */
    componentDidMount() {
        this.updateControlPanelState()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.robotLocation != this.props.robotLocation || prevProps.robotDirection != this.props.robotDirection) {
            this.updateControlPanelState()
        }
    }

    /*
     * Update Control Panel State
     */
    updateControlPanelState() {
        if (this.props.robotLocation) {
            const {x,y} = parseRobotLocation(this.props.robotLocation)
            this.setState({
                robotNewX: x,
                robotNewY: y,
                robotNewDirection: this.props.robotDirection,
                report: {
                    x: x,
                    y: y,
                    facing: this.props.robotDirection
                }
            })
        }
    }

    /*
     * Place Robot Form Handlers
     */

    handleDropdownChange (e, result) {
        const { name, value } = result
        this.setState({
            [name]: value
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    /*
     * Place robot Handlers
     */

    handlePlaceRobotClick () {
        this.props.onPlaceClick(this.state.robotNewX, this.state.robotNewY, this.state.robotNewDirection)
    }

    handlePlaceModalOpen (){
        this.props.onPlaceModalOpenClick()
    }

    handlePlaceModalClose (){
        this.props.onPlaceModalCloseClick()
    }

    /*
     * Move and Rotate robot Handlers
     */

    handleRotateRobotLeftClick () {
        this.props.onLeftClick()
    }

    handleMoveRobotClick () {
        this.props.onMoveClick()
    }

    handleRotateRobotRightClick () {
        this.props.onRightClick()
    }

    /*
     * Report Handlers
     */
    handleReportModalOpen (){
        this.props.onReportModalOpenClick()
    }

    handleReportModalClose (){
        this.props.onReportModalCloseClick()
    }

    /*
     * Render component
     */
    render() {
        /*
         * Create Facing options for ui
         */
        let facingOptions = []
        Object.keys(directionMap).forEach((direction) => {
            facingOptions.push({
                key: direction.charAt(0),
                text: direction,
                value: direction
            })
        })

        /*
         * Create location options for ui
         */
        let xOptions = [], yOptions = []
        for (let i = 0; i < this.props.columns; i++) {
            xOptions.push({
                key: `x${i}`,
                text: i,
                value: i
            })
        }
        for (let i = 0; i < this.props.rows; i++) {
            yOptions.push({
                key: `y${i}`,
                text: i,
                value: i
            })
        }

        /*
         * Render Control Panel component
         */
        return (
            <Grid>
                <Grid.Row centered>
                    <Grid.Column className='center aligned'>
                        <Menu icon compact className='controls'>
                            <Menu.Item name='Place Robot'>
                                <Modal
                                    className='place-modal'
                                    trigger={<Icon name='arrows alternate' onClick={this.handlePlaceModalOpen.bind(this)}/>}
                                    centered={false}
                                    open={this.props.placeModalOpen} basic>
                                    <Modal.Header>Place robot</Modal.Header>
                                    <Modal.Content>
                                        <Form inverted>
                                            <Form.Group widths='equal'>
                                                <Form.Select fluid label='X' name='robotNewX' value={this.state.robotNewX} options={xOptions} placeholder='X' onChange={this.handleDropdownChange} />
                                                <Form.Select fluid label='Y' name='robotNewY' value={this.state.robotNewY} options={yOptions} placeholder='Y' onChange={this.handleDropdownChange} />
                                                <Form.Select fluid label='Facing' name='robotNewDirection' value={this.state.robotNewDirection} options={facingOptions} placeholder='Facing' onChange={this.handleDropdownChange} />
                                            </Form.Group>
                                        </Form>
                                    </Modal.Content>
                                    <Modal.Actions>
                                        <Button basic onClick={this.handlePlaceModalClose.bind(this)} inverted>
                                            Cancel
                                        </Button>
                                        <Button basic onClick={this.handlePlaceRobotClick.bind(this)} inverted>
                                            Place
                                        </Button>
                                    </Modal.Actions>
                                </Modal>
                            </Menu.Item>
                            <Menu.Item name='Rotate Robot Left' onClick={this.handleRotateRobotLeftClick.bind(this)}>
                                <Icon name='undo' />
                            </Menu.Item>
                            <Menu.Item name='Move Robot' className={this.props.isRobotMovable ? null : 'disabled'} onClick={this.handleMoveRobotClick.bind(this)}>
                                <Icon name='arrow up' />
                            </Menu.Item>
                            <Menu.Item name='Rotate Robot Right' onClick={this.handleRotateRobotRightClick.bind(this)}>
                                <Icon name='redo' />
                            </Menu.Item>
                            <Menu.Item name='Show Robot Report' onClick={this.handleReportClick}>
                                <Modal
                                    className='report-modal'
                                    trigger={<Icon name='info circle' onClick={this.handleReportModalOpen.bind(this)}/>}
                                    centered={false}
                                    open={this.props.reportModalOpen} basic>
                                    <Modal.Header>Report</Modal.Header>
                                    <Modal.Content>
                                        <Statistic.Group inverted>
                                            <Statistic>
                                                <Statistic.Value>{this.state.report.x}</Statistic.Value>
                                                <Statistic.Label>X</Statistic.Label>
                                            </Statistic>
                                            <Statistic>
                                                <Statistic.Value>{this.state.report.y}</Statistic.Value>
                                                <Statistic.Label>Y</Statistic.Label>
                                            </Statistic>
                                            <Statistic>
                                                <Statistic.Value>
                                                    <Icon name='compass outline' />
                                                    {this.state.report.facing}
                                                </Statistic.Value>
                                                <Statistic.Label>Facing</Statistic.Label>
                                            </Statistic>
                                        </Statistic.Group>
                                    </Modal.Content>
                                    <Modal.Actions>
                                        <Button basic onClick={this.handleReportModalClose.bind(this)} inverted>
                                            Close
                                        </Button>
                                    </Modal.Actions>
                                </Modal>
                            </Menu.Item>
                        </Menu>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default ControlPanel;