import React, { Component } from 'react';
import TeamComponent from '../team-component/team-component';
import './team-list.css';

class TeamList extends Component {
  constructor(props) {
    super(props);
    this.teams = [];

    this.teams.push({
      name: 'Team1',
      sort: 0,
      channels: [{
        name: 'Channel1',
        index: 1
      },
      {
        name: 'Channel2',
        index: 2
      }]
    });

    this.teams.push({
      name: 'Team2',
      sort: 0,
      channels: [{
        name: 'Channel1',
        index: 1
      },
      {
        name: 'Channel2',
        index: 2
      }]
    });

    this.state = {
      teamName: '',
      channelName: '',
      teams: this.teams
    };

    this.sort = this.sort.bind(this);
    this.addTeam = this.addTeam.bind(this);
    this.addChannel = this.addChannel.bind(this);
    this.removeChannel = this.removeChannel.bind(this);
    this.formValidation = this.formValidation.bind(this);
    this.handleTeamChange = this.handleTeamChange.bind(this);
    this.handleChannelChange = this.handleChannelChange.bind(this);
  }
  
  sort(team) {
    const sort = team.sort + 1;
    team.sort = sort;
    const val = (sort) % 3;

    if (val === 1) {
      team.channels.sort((a, b) => {
        const x = a.name.toUpperCase();
        const y = b.name.toUpperCase();

        if (x > y) return 1;
        else if (x < y) return -1;
        else return 0;
      });

    } else if (val === 2) {
      team.channels.sort((a, b) => {
        const x = a.name.toUpperCase();
        const y = b.name.toUpperCase();

        if (x < y) return 1;
        else if (x > y) return -1;
        else return 0;
      });
    } else if (val === 0) {
      team.channels.sort((a, b) => {
        if (a.index > b.index) return 1;
        else if (a.index < b.index) return -1;
        else return 0;
      });
    }

    const i = this.state.teams
      .findIndex(t => t.name === team.name 
          && t.channels.length === team.channels.length);

    const teams = this.state.teams;
    teams[i] = team;

    this.setState({
      teams: teams
    });
  }

  componentDidMount() {}

  formValidation(name) {
    const match = name.match(/[^0-9]+/);

    if (match !== null)
      return true;
    else
      return false;
  }

  handleTeamChange(e) {
    this.setState({
      teamName: e.target.value
    });
  }
  
  handleChannelChange(e) {
    this.setState({
      channelName: e.target.value
    });
  }

  addTeam() {
    const newTeam = {
      name: this.state.teamName,
      channels: []
    };

    this.setState(state => state.teams.push(newTeam));
  }

  addChannel(team) {
    const newChannel = {
      name: this.state.channelName,
      index: team.channels.length + 1
    };

    const teams = this.state.teams;
    const i = teams
      .findIndex(t => t.channels.length === team.channels.length
        && t.name === team.name);

    teams[i].channels.push(newChannel);

    this.setState({
      teams: teams
    });
  }

  removeChannel(index, team) {
    const i = team.channels.
      findIndex(t => t.index === index);

    const teams = this.state.teams;

    const idx = teams
      .findIndex(t => t.index === team.index
        && t.name === team.name);

    teams[idx].channels.splice(i, 1);

    this.setState({
      teams: teams
    });
  }

  render() {
    const isDisabled = !this.formValidation(this.state.teamName);

    return (
      <div>
        <div className="teams-list">
          <ul>
            { this.teams && this.teams.map((team, idx) => (
              <li key={idx}>
                <TeamComponent
                  handleChange={this.handleChannelChange}
                  validate={this.formValidation}
                  team={team}
                  addChannel={this.addChannel}
                  removeChannel={this.removeChannel}
                  sort={this.sort}
                  channelName={this.state.channelName}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="add-team">
          <b>Add Team</b>
          <input type="text" onChange={this.handleTeamChange} placeholder="Team name"/>
          <button disabled={isDisabled} onClick={this.addTeam} type="submit">&#8853;</button>
        </div>
      </div>
    );
  }
}

export default TeamList;
