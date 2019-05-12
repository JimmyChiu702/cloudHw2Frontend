import React from 'react';

import Switch from '@material-ui/core/Switch';

import { getLightState, switchLight } from 'api/light.js';

import './Main.css';

export default class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLightOn: null,
            isSwitchOn: null
        };

        this.switchLight = this.switchLight.bind(this);
    }

    componentDidMount() {
        this.getLightState();
    }

    render() {
        return (
            <div id='container' className={!!this.state.isLightOn ? 'lightOnBg' : ''}>
                <div id='img-container'>
                    <img id='img' src='./images/bulb.png' alt='bulb' />            
                </div>
                {this.state.isSwitchOn!=null &&
                    <div id='switch-container'>
                        <Switch 
                            id='switch'
                            color='primary'
                            checked={this.state.isSwitchOn}
                            onChange={this.switchLight}
                        />
                    </div>
                }
            </div>
        );
    }

    getLightState() {
        getLightState().then(lightState => {
            console.log(`light state: ${lightState}`);
            this.setState({isLightOn: lightState, isSwitchOn: lightState});
        }).catch(err => {
            console.error('Error getting light state', err);
        });
    }

    switchLight() {
        this.setState(prevState => ({
            isSwitchOn: !prevState.isSwitchOn
        }), () => {
            switchLight(!this.state.isLightOn).then(lightState => {
                console.log(`light state: ${lightState}`);
                this.setState({isLightOn: lightState});
            }).catch(err => {
                console.error('Error getting light state', err);
            });
        })
    }
}