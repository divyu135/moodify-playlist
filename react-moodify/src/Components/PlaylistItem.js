import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PlaylistMediaCard from './PlaylistMediaCard';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  button: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const ListBox = props => {  

    const classes = useStyles();

    return (
        <React.Fragment>
        <CssBaseline />
        <br/><br/>
          <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={4}>
              {props.list.sort(() => Math.random() - Math.random()).map(song =>  (
                <Grid item key={song.song_id} xs={12} sm={6} md={4}>
                  <PlaylistMediaCard song={song}/>
                </Grid>
              ))}
            </Grid>
          </Container>
        </React.Fragment>
    );
}

export default ListBox;