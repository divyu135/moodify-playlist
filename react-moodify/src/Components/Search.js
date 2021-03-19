import React, {useState} from 'react';
import ParticlesBg from "particles-bg";
import ListBox from './ListBox';
import '../App.css';

const Search = () => {
  const [search, setSearch] = useState('');
  const [listOfResults, setResults] = useState([]);


  const handleSearch = e => {
    // e.preventDefault();
    fetch('http://localhost:5000/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        search_text: search
      })
    })
      .then(response => response.json())
      .then(json => {
        setResults(json.response.hits)
        // console.log(listOfResults)
      })
    //   .catch(error => {
    //     this.props.onLoginError();
    //   });
  };

  const handleSearchChange = e => {
    setSearch(e.target.value)
  };

  return (
    <React.Fragment>
      <header id="home">
        <ParticlesBg type="circle" bg={true} />
        <nav id="nav-wrap">
          <a className="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
          <a className="mobile-btn" href="#home" title="Hide navigation">Hide navigation</a>

          <ul id="nav" className="nav">
            <li><a  href="/home">Home</a></li>
            <li className="current"><a className="smoothscroll" href="#">Search</a></li>
            {/* <li><a className="smoothscroll" href="#about">Contact</a></li> */}
          </ul>
        </nav>


        <div className="row banner">

          <div className="banner-text">
            {/* <h1 className="responsive-headline"> Moodify: Lets Moodify Your Playlist</h1> */}
            <h3>Search a song and we will find the mood based on that song for you. Then we will create playlist
            based on the found mood.</h3>
            <hr />

            <div style={{ display: "flex", justifyContent: "center" }}>
              <input
                type="text"
                name="search_text"
                className="banner-text"
                style={{ width: "50%" }}
                value={search}
                onChange={handleSearchChange}
                onKeyPress={event => {
                  if (event.key === 'Enter') {
                    handleSearch()
                  }
                }}
              />
            </div>
            <button className="button btn github-btn" onClick={handleSearch}>Search</button>
          </div>
        </div>
      </header>
      <ListBox hits={listOfResults} />
    </React.Fragment>
  );
}

export default Search;