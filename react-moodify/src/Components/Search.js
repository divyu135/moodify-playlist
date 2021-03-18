import React from 'react';
import ParticlesBg  from "particles-bg";
import '../App.css';

class Search extends React.Component {
  state = {
    search_text: ''
  };

  handleSearch = e => {
    e.preventDefault();
    fetch('http://localhost:5000/lyrics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.search_text
      })
    })
      .then(response => response.json())
      .then(json => {
        console.log(json.text);
      })
    //   .catch(error => {
    //     this.props.onLoginError();
    //   });
  };

  handleSearchChange = e => {
    this.setState({
      search_text: e.target.value
    });
  };


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
              <li><a className="smoothscroll" href="#about">Contact</a></li>
           </ul>
        </nav>
        
        
        <div className="row banner">
      
         <div className="banner-text">
            {/* <h1 className="responsive-headline"> Moodify: Lets Moodify Your Playlist</h1> */}
            <h3>Search a song and we will find the mood based on that song for you. And create playlist
            based on the found mood.</h3>
            <hr />
            <div 
                style = {{ display: "flex", justifyContent: "center"}}
            >
            <input
            type="text"
            name="search_text"
            className="banner-text"
            style= {{width:"50%"}}
            value={this.state.search_text}
            onChange={this.handleSearchChange}
            />
            </div>
            <button className="button btn github-btn" onClick={this.handleSearch}>Search</button>
         </div>
      </div>
        
        </header>  
      
      
    );
  }
}

export default Search;