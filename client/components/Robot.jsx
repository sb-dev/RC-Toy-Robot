import React from 'react';
import { Image } from 'semantic-ui-react';

import bender from '../assets/images/bender.png';

/*
 * The RC Robot
 */
class Robot extends React.Component {
    constructor() {
        super()

        this.state = {
            position: true
        }
    }

    render() {
        return (
            <div className='robot' data-position={this.state.position} style={{top:this.props.top,left:this.props.left,transform:`rotate(${this.props.rotate}deg)`}}>
                <Image src={bender} fluid/>
            </div>
        )
    }
}

export default Robot;