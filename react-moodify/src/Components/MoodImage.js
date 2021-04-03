import React, { useState } from 'react';
import Redirect from 'react-router-dom/Redirect';  
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 180
  },
});


export default function MoodImage(props) {
  const classes = useStyles();
  const [redirect, setRedirect] = useState(false)
  const [playlist, setPlaylist] = useState([])

  const handleSelection = e => {
    console.log(props.name)
    fetch('http://localhost:5000/playlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        selected_mood: props.name
      })
    })
      .then(response => response.json())
      .then(json => {
        // setResults(json.response.hits)
        setPlaylist(json.playlist)
        console.log(playlist)
        setRedirect(true)
      })
  };
  return (
    <Card 
      className={classes.root}
      onClick={handleSelection}>
        
        { redirect ? (<Redirect   to={{
          pathname: "/playlist",
          state: { playlist: playlist, mood_name: props.name}
        }} />) : null }
      
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.image}
          title="Contemplative Reptile"
        />
          <Typography gutterBottom variant="h5" >
            {props.text}
          </Typography>
      </CardActionArea>
    </Card>
  );
}