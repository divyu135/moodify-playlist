import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MoodImage from './MoodImage'
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 200,
    width: 180,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function LineGrid() {

  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };

  const moods = [
    {
      img: 'https://cdn3.vectorstock.com/i/thumb-large/49/27/young-guy-jumps-with-hands-up-attract-attention-vector-35314927.jpg',
      title: 'Joyful',
      name: 'joy'
    },
    {
      img: 'https://cdn5.vectorstock.com/i/thumb-large/48/24/depressed-boy-sitting-on-floor-mental-health-vector-33294824.jpg',
      title: 'Sad',
      name: 'sadness'
    },
    {
      img: 'https://image.freepik.com/free-vector/post-traumatic-stress-disorder-concept-illustration_114360-3564.jpg',
      title: 'Afraid',
      name: 'fear'
    },
    {
      img: 'https://cdn3.vectorstock.com/i/thumb-large/66/12/angry-teen-isolated-male-character-puberty-and-vector-26306612.jpg',
      title: 'Angry',
      name: 'anger'
    }
  ];
  

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={spacing}>
          {moods.map((mood) => (
            <Grid key={mood.title} item>
              <Paper className={classes.paper} > 
                <MoodImage image={mood.img} text={mood.title} name={mood.name}/>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}