import React, { Component } from 'react';
import './team-component.css';

class TeamComponent extends Component {
  constructor(props) {
    super(props);
    this.team = this.props.team;
  }

  componentDidMount() {}

  render() {
    const isDisabled = !this.props.validate(this.props.channelName);
    const team = this.team;

    return (
    <div>
      {
        team && 
        <div>
          <span className="team-name">{team.name}</span>
          <button onClick={() => this.props.sort(team)} className="sort">&#8597;</button>
          <span className="add-channel">
            <input type="text" onChange={this.props.handleChange} placeholder="Channel name"/>
            <button disabled={isDisabled} onClick={() => this.props.addChannel(team) }>&#8853;</button>
          </span>
        </div>
      }
      {
        team &&
        <ul className="one">
          { team.channels && team.channels.map((channel, idx) => (
            <li className="channel-name" key={channel.index}>
              <span>{channel.name}</span>
              <button onClick={() => this.props.removeChannel(channel.index, team)}>&#8854;</button>
            </li>
          ))}
        </ul>
      }
    </div>
    );
  }
}

export default TeamComponent;
