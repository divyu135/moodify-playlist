import React from 'react';
import MediaCard from './MediaCard';

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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

  const buttonClicked = (artId) => (e) => {
    e.preventDefault();
    props.clicked(artId);
  }    

    const classes = useStyles();

    return (
        <React.Fragment>
        <CssBaseline />
        <br/><br/>
          <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={4}>
              {props.hits.map(hit =>  (
                <Grid item key={hit.result.id} xs={12} sm={6} md={4}>
                  <MediaCard hit= {hit} />
                </Grid>
              ))}
            </Grid>
          </Container>
        </React.Fragment>
    );
}

export default ListBox;