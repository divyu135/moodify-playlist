import React, { Component } from 'react';
import ParticlesBg  from "particles-bg";

class Header extends Component {
  render() {

    return (
      <header id="home">
      <ParticlesBg type="circle" bg={true} />
      <nav id="nav-wrap">
         <a className="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
	      <a className="mobile-btn" href="#home" title="Hide navigation">Hide navigation</a>

         <ul id="nav" className="nav">
            <li className="current"><a className="smoothscroll" href="#home">Home</a></li>
            <li><a className="smoothscroll" href="#about">About</a></li>
            <li><a className="smoothscroll" href="#contact">Contact</a></li>
         </ul>
      </nav>

      <div className="row banner">
      
         <div className="banner-text">
            <h1 className="responsive-headline"> Moodify: Lets Moodify Your Playlist</h1>
            <h3>Welcome to moodify, we help you create your playlist based on the moods. To start 
            you can either select the moods or search a song and we will find the mood based on that
            song for you. </h3>
            <hr />
            <ul className="social">
               <a href="/moods" className="button btn project-btn"><i className="fa fa-music"></i>Moods</a>
               <a href="/search" className="button btn github-btn"><i className="fa fa-search"></i>Search Song</a>
            </ul>
         </div>
      </div>

      <p className="scrolldown">
         <a className="smoothscroll" href="#about"><i className="icon-down-circle"></i></a>
      </p>

   </header>
    );
  }
}

export default Header;
