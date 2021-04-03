import React, {useState} from 'react';
import ParticlesBg from "particles-bg";
import LineGrid from './LineGrid';
import '../App.css';

const Moods = () => {

  return (
    <React.Fragment>
      <header id="home">
        <ParticlesBg type="circle" bg={true} />
        <nav id="nav-wrap">
          <a className="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
          <a className="mobile-btn" href="#home" title="Hide navigation">Hide navigation</a>

          <ul id="nav" className="nav">
            <li><a  href="/home">Home</a></li>
            <li className="current"><a className="smoothscroll" href="#">Moods</a></li>
            {/* <li><a className="smoothscroll" href="#about">Contact</a></li> */}
          </ul>
        </nav>


        <div className="row banner">
          <div className="banner-text">
            {/* <h1 className="responsive-headline"> Moodify: Lets Moodify Your Playlist</h1> */}
            <h1 className="responsive-headline"> How are you feeling today?</h1>
            <h3>The app will create a playlist with similar songs based on your selection</h3>
            <hr />
            <LineGrid />
          </div>
        </div>
      </header>
      {/* <ListBox hits={listOfResults} /> */}
    </React.Fragment>
  );
}

export default Moods;