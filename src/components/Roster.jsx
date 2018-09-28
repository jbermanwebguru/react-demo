import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import agent from '../agent';
import { PLAYERS_LOADED, DELETE_PLAYER } from '../constants/actionTypes';

const mapStateToProps = state => ({ ...state.players });

const mapDispatchToProps = dispatch => ({
  onClickDelete: (playerId) => {
    const payload = agent.Players.delete(playerId);
    dispatch({ type: DELETE_PLAYER, payload, playerId });
  },
  onLoad: payload => {
    dispatch({ type: PLAYERS_LOADED, payload });
  }
});

class Roster extends React.Component {
  componentWillMount() {
    this.props.onLoad(agent.Players.all());
  }

  handleDelete(playerId) {
    this.props.onClickDelete(playerId);
  }

  render() {
    if (!this.props.players) {
      return (
        <div>
          <h1>Roster</h1>
          <h2>Loading...</h2>
        </div>
      );
    }

    if (this.props.players.length === 0) {
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
              <th style={{textAlign: 'center'}}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.players.map(player => {
                return (
                  <tr key={player.id}>
                    <td>{player.first_name}</td>
                    <td>{player.last_name}</td>
                    <td>{player.rating}</td>
                    <td>{player.handedness}</td>
                    <td style={{textAlign: 'center'}}>
                      <button onClick={this.handleDelete.bind(this, player.id)} className="delete delete-icon">
                        <div className="lid"></div>
                        <div className="lidcap"></div>
                        <div className="bin"></div>
                      </button>
                    </td>
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
