import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

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
  const theme = useTheme();

  return (
    <Card className={classes.root}
    style={{height:151}}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h4" variant="h4">
            {props.hit.result.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {props.hit.result.primary_artist.name}
          </Typography>
        </CardContent>
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