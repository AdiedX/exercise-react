import React, { Component } from 'react';
import './team-component.css';

class TeamComponent extends Component {
    constructor(props) {
        super(props);
        this.team = this.props.team;
        this.teamIndex = this.props.teamIndex;
        this.original = this.team.channels.slice();

        this.state = {
            channelName: '',
            sortVal: 3
        };


        this.formValidation = this.formValidation.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addChannel = this.addChannel.bind(this);
        this.sort = this.sort.bind(this);
    }

    componentDidMount() {
        
    }

    formValidation(channelName) {
        if (channelName.length) {
            const match = channelName.match(/\D/g);
            if (match !== null && match.length === channelName.length) return true;
        }

        return false;
    }

    handleChange(e) {
        this.setState({
            channelName: e.target.value
        });        
    }

    removeChannel(index) {
        console.log('index', index);
        this.team.channels.splice(index - 1, 1);
        console.log('remove: team channels', this.team.channels);
        this.forceUpdate();
    }

    addChannel() {
        if (this.formValidation(this.state.channelName)) {
            const newChannel = {
                name: this.state.channelName,
                index: this.team.channels.length + 1
            };
            console.log('new channel', newChannel);
            this.team.channels.push(newChannel);
            console.log('add: team channels', this.team.channels);
            this.forceUpdate();
        }        
    }

    sort() {
        const val = (this.state.sortVal + 1) % 3;

        if (val === 1) {
            this.team.channels.sort((a, b) => {
                if (a.name > b.name) return 1;
                else if (a.name < b.name) return -1;
                else return 0;
            });
        } else if (val === 2) {
            this.team.channels.sort((a, b) => {
                if (a.name > b.name) return -1;
                else if (a.name < b.name) return 1;
                else return 0;
            });
    
        } else if (val === 0) {
            this.team = this.original;
        }

        this.setState({
            sortVal: this.state.sortVal + 1
        });
    }

    render() {
        return (
        <div>
            {
                this.team && 
                <div>
                    <span className="team-name">{this.team.name}</span>
                    <button onClick={this.sort} className="sort">&#8597;</button>
                    <span className="add-channel">
                        <input value={this.state.channelName} onChange={this.handleChange} placeholder="Channel name"/>
                        <button disabled={!this.formValidation(this.state.channelName)} onClick={this.addChannel}>&#8853;</button>
                    </span>
                </div>
            }
            {
                this.team &&
                <ul className="one">
                    { this.team.channels && this.team.channels.map((channel, idx) => (
                        <li className="channel-name" key={channel.index}>
                            <span>{channel.name}</span>
                            <button onClick={() => this.removeChannel(channel.index)}>&#8854;</button>
                        </li>
                    ))}
                </ul>
            }
        </div>
        );
    }
}

export default TeamComponent;
