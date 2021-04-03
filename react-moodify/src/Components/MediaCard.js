import React, {useState} from 'react';
import Redirect from 'react-router-dom/Redirect';
import { makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PlaylistPlay from '@material-ui/icons/PlaylistPlay';

import swal from 'sweetalert';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
    width: 160
  },
  cover: {
    width: 151,
    height: 151
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));


const MediaCard = props => {

  const classes = useStyles();
  const [redirect, setRedirect] = useState(false)
  const [playlist, setPlaylist] = useState([])
  const [mood_name, setMoodName] = useState('')

  const handleSelection = (name) => {
    console.log(name)
    fetch('http://localhost:5000/playlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        selected_mood: name
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

  const buttonClicked = (song_id) => (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/add_song', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        song_id: song_id
      })
    })
    .then(response => response.json())
    .then(json=> {
      setMoodName(json.mood_type)
      // window.alert("Mood type: "+ json.mood_type)
      swal("Detected Emotion of the Song: "+ json.mood_type)
      handleSelection(json.mood_type)
    })

    



  }  

  return (
    <Card className={classes.root}
    style={{height:151, position:"relative"}}>
    { redirect ? (<Redirect   to={{
          pathname: "/playlist",
          state: { playlist: playlist, mood_name:mood_name}
        }} />) : null }
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h4" variant="h4">
            {props.hit.result.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {props.hit.result.primary_artist.name}
          </Typography>
        </CardContent>
        <div className={classes.controls}
        style={{position:"absolute", bottom:0}}
        >
          <IconButton aria-label="playlistPlay"
            onClick={buttonClicked(props.hit.result.id)}
          >
            <PlaylistPlay className={classes.playIcon} />
          </IconButton>
        </div>
      </div>
      <CardMedia
        square
        className={classes.cover}
        image={props.hit.result.song_art_image_thumbnail_url}
        title={props.hit.result.full_title}
      />
    </Card>
  );
}

export default MediaCard;