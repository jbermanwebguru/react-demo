import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import agent from '../agent';
import { PLAYERS_LOADED } from '../constants/actionTypes';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: PLAYERS_LOADED, payload })
});

class Roster extends React.Component {
  componentWillMount() {
    this.props.onLoad(agent.Players.all());
  }

  render() {
    console.log('this.props.players=', this.props.players);
    if (!this.props.players.players) {
      return (
        <div>
          <h1>Roster</h1>
          <h2>Loading...</h2>
        </div>
      );
    }

    if (this.props.players.players.length === 0) {
      return (
        <div>
          <h1>Roster</h1>
          <h2>You haven't added any players yet!</h2>
          <div className="center">
            <Link className="button" to="/player/new">Add A Player</Link>
          </div>
        </div>
      );
    }

    return (
      <div>
        <h1>Roster</h1>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Rating</th>
              <th>Handedness</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.players.players.map(player => {
                return (
                  <tr>
                    <td>{player.first_name}</td>
                    <td>{player.last_name}</td>
                    <td>{player.rating}</td>
                    <td>{player.handedness}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
        <div className="center">
          <Link className="button" to="/player/new">Add A Player</Link>
        </div>
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Roster);
