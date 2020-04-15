import React, { Component } from 'react';
import TeamComponent from '../team-component/team-component';
import './team-list.css';

class TeamList extends Component {
    constructor(props) {
        super(props);
        this.teams = [];

        this.teams.push({
            name: 'Team1',
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
            teams: this.teams
        };

        this.addTeam = this.addTeam.bind(this);
        this.formValidation = this.formValidation.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        
    }

    formValidation(teamName) {
        if (teamName.length) {
            const match = teamName.match(/\D/g);
            if (match !== null && match.length === teamName.length)
                return true;
        }

        return false;
    }

    handleChange(e) {
        this.setState({
            teamName: e.target.value
        });
    }

    addTeam() {
        if (this.formValidation(this.state.teamName)) {
            const newTeam = {
                name: this.state.teamName,
                channels: []
            };
            console.log('newTeam: ' + newTeam);
            this.setState(state => state.teams.push(newTeam));
        }
    }

    render() {
        return (
            <div>
                <div className="teams-list">
                    <ul>
                        { this.teams && this.teams.map((team, idx) => (
                            <li key={idx}>
                                <TeamComponent team={team}/>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="add-team">
                    <b>Add Team</b>
                    <input type="text" value={this.state.teamName} onChange={this.handleChange} placeholder="Team name"/>
                    <button disabled={!this.formValidation(this.state.teamName)} onClick={this.addTeam} type="submit">&#8853;</button>
                </div>
            </div>
        );
    }
}

export default TeamList;
