import React from 'react';
import PlaylistItem from './PlaylistItem';
import '../App.css';
// import '../form.css';

const Playlist = (props) => {

  return (
    <React.Fragment>
        <nav id="nav-wrap" className="nav-wrap-bg">
          <a className="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
          <a className="mobile-btn" href="#home" title="Hide navigation">Hide navigation</a>
          <ul id="nav" className="nav">
            <li><a  href="/home">Home</a></li>
            <li className="current"><a className="smoothscroll" href="/playlist">Playlist</a></li>
            {/* <li><a className="smoothscroll" href="#about">Contact</a></li> */}
          </ul>
        </nav>
        <div style={{marginTop:52}}> 
          <h4 style={{textAlign:'center'}}>Playlist for Emotion: {props.location.state.mood_name.charAt(0).toUpperCase() + props.location.state.mood_name.slice(1)}</h4>
          <PlaylistItem list={props.location.state.playlist} />
        </div>
    </React.Fragment>
  );
}

export default Playlist;