import React, {useEffect, useState} from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { GrSpotify,GrYoutube, GrSoundcloud } from "react-icons/gr";
import { Button } from '@material-ui/core';

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


const PlaylistMediaCard = props => {

  const classes = useStyles();
  const [youtube, setYoutube] = useState('') 
  const [spotify, setSpotify] = useState('') 
  const [soundcloud, setSoundcloud] = useState('') 
  const [clicked, setClicked] = useState(false)


//   const buttonClicked = (song_id) => (e) => {
//     e.preventDefault();
//     fetch('http://localhost:5000/add_song', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         song_id: song_id
//       })
//     })
//     .then(response => response.json())
//   }  

useEffect(()=>{
    const findMeidaIndex = () =>{
       setClicked(true)
       for (const p in props.song.media) {
          let pr = props.song.media[p]
          if (pr.provider==="youtube") {
              setYoutube(pr.url)
            //   console.log(pr.url)
          } else if (pr.provider==="spotify") {
              setSpotify(pr.url)
            //   console.log(pr.url)
          } else if (pr.provider==="soundcloud") {
              setSoundcloud(pr.url)
          } 
       } 
    }
    findMeidaIndex()
});
  





  return (
    <Card className={classes.root}
    style={{height:151, position:"relative"}}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h4" variant="h4">
            {props.song.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {props.song.artist}
          </Typography>
        </CardContent>
        
        {}
        { clicked ?
        <div className={classes.controls} style={{position:"absolute", bottom:0}}>
            { spotify!=='' ?
                <IconButton aria-label="previous" >
                    <a href={spotify} target="_blank" ><GrSpotify /></a>
                </IconButton> : null
            }
            { youtube!=='' ?
                <IconButton aria-label="previous">
                    <a href={youtube} target="_blank" ><GrYoutube /></a>
                </IconButton> : null
            }
            { soundcloud!=='' ?
                <IconButton aria-label="previous">
                    <a href={soundcloud} target="_blank" ><GrSoundcloud /></a>
                </IconButton> : null
            }
        </div> : null
        }
      </div>
      <CardMedia
        square
        className={classes.cover}
        image={props.song.thumbnail}
        title={props.song.full_title}
      />
    </Card>
  );
}

export default PlaylistMediaCard;