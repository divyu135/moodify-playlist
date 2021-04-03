import React, { Component, Fragment } from 'react';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonIcon from '@material-ui/icons/Person';
import ParticlesBg  from "particles-bg";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Header(props)  {
  
   // const handleClick = () => {
   //    window.alert("Please Sign in to use the app!")
   // }
   const [open, setOpen] = React.useState(false);

   const handleClickOpen = () => {
     setOpen(true);
   };
 
   const handleClose = () => {
     setOpen(false);
   };

    return (
      <header id="home">
      <ParticlesBg type="circle" bg={true} />
      <nav id="nav-wrap">
         <a className="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
	      <a className="mobile-btn" href="#home" title="Hide navigation">Hide navigation</a>

         <ul id="nav" className="nav">
            <li style={{marginLeft:"8%"}} className="current"><a className="smoothscroll" href="#home">Home</a></li>
            <li><a className="smoothscroll" href="#about">About</a></li>
            <li><a className="smoothscroll" href="#contact">Contact</a></li>
            
            {props.data.authenticated ? (
               <li style={{float: "right"}}><a href="/sign_out"> {props.data.username} </a></li>
            ) : (<Fragment>
               <li style={{float: "right"}}><a href="/sign_up"> <PersonAddIcon /> </a></li>
               <li style={{float: "right"}}><a href="/sign_in"> <PersonIcon /> </a></li>
               </Fragment>
              )}
            
               
         </ul>
         
      </nav>

      <div className="row banner">
      
         <div className="banner-text">
            <h1 className="responsive-headline"> Moodify: Lets Moodify Your Playlist</h1>
            <h3>Welcome to moodify, we help you create your playlist based on the moods. To start 
            you can either select the moods or search a song and we will find the mood based on that
            song for you. </h3>
            <hr />
            {props.data.authenticated ? (
               <ul className="social">
                  <a href="/moods" className="button btn project-btn"><i className="fa fa-music"></i>Moods</a>
                  <a href="/search" className="button btn github-btn"><i className="fa fa-search"></i>Search Song</a>
               </ul>
            ) : (
               <ul className="social">
                  <a href="#" onClick={handleClickOpen} className="button btn project-btn"><i className="fa fa-music"></i>Moods</a>
                  <a href="#" onClick={handleClickOpen} className="button btn github-btn"><i className="fa fa-search"></i>Search Song</a>
               </ul>
              )}
            
         </div>
      </div>

      <p className="scrolldown">
         <a className="smoothscroll" href="#about"><i className="icon-down-circle"></i></a>
      </p>
      <div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Not authenticated user?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Please Sign-In to use the web application or create new account using Sign-Up.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
            <a href="/sign_in">
              <Button   color="primary">
                Sign In
              </Button>
            </a>
            <a href="/sign_up">
              <Button   color="primary">
                Sign Up
              </Button>
            </a>
            </DialogActions>
          </Dialog>
        </div>
   </header>
    );
  
}
