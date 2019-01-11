import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Sources from './src/components/sources.jsx';
import axios from 'axios';



class Related extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       currentTrack: null,
       relatedTracks: null,
       id: 1
    };
  }
  componentDidMount() {
    console.log('component mounted');
    var songId;
    var id = window.location.pathname.slice(
      1,
      window.location.pathname.length - 1
    );

    id ? songId = Number(id) : songId = this.state.id;

    this.getRelatedTracks(songId);
  }

  getRelatedTracks(id) {
    axios.get(`/${id}`)
      .then(res => {
        this.setState({
          currentTrack: res.data.currTrack,
          relatedTracks: res.data.relTracks,
          playlists: res.data.plists
        });
        // console.log(this.state.currentTrack);
      })
      .catch(err => console.log('get err: ', err));
  }

  render() {
    if(this.state.currentTrack === null){
      return (<div>Loading ...</div>)
    } else {
      return (
      <div style={{width:300, borderLeft: 'groove', borderWidth: 1, borderColor:'gray', paddingLeft: 30}}><Sources currentTrack={this.state.currentTrack} plists={this.state.playlists} relatedTracks={this.state.relatedTracks}/></div>
      )
  }

  }
}

ReactDOM.render(<Related />, document.getElementById('Related'));