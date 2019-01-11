import React, { Component } from 'react';
import SoundStats from './soundStats.jsx';


class RelatedTracks extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ margin: 5, width: 300 }}>
        <div style={{ display: 'flex', flexDirection: 'row', color: 'gray', borderBottom: 'solid', borderWidth: 1 }}>
          <span style={{ backgroundImage: `url(https://s3.us-east-2.amazonaws.com/feccompimgs/Screen+Shot+2019-01-06+at+12.05.10+PM.png)`,
           backgroundPosition:'top 10',width: 22, height: 22, opacity: 1, paddingRight: 10 }}></span><span style={{ flex: 1 }}>Related Tracks</span><span style={{ }}>View All</span>
        </div>

        <ul style={{ listStyle: 'none', margin: 0, padding: 0, paddingTop: 5 }}>
          {this.props.relatedTracks.map(track => {
            let background = track.albumart;
            return (
              <li>
                <div style={{ display: 'flex', flexDirection: 'row'}}>
                  <span style={{ flex: 1 }}>
                    <div style={{ backgroundImage: `url(${background})`, width: 50, height: 50, opacity: 1 }} />
                  </span>

                  <div style={{ flex: 3 }}>
                    <div style={{color: 'gray'}}>{track.artist}</div>
                    <div>{track.track}</div>
                    <SoundStats stats={[track.plays, track.likes, track.shares, track.comments]} />
                  </div>
                </div>
              </li>
            )
          })
          }
        </ul>
      </div>
    )

  }

}

export default RelatedTracks;