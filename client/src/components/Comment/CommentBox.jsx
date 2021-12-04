import { useState, useEffect, useContext } from 'react';
import {
    Box, Typography, makeStyles
} from '@material-ui/core';

import Reply from './Reply';

const useStyles = makeStyles((theme) => ({
  CommentBox: {
    display: "flex",
    flexDirection: "row",
    height: 100,
    backgroundColor: "#1d252c",
    borderRadius: 8,
    textAlign: "left",
    padding: 24,
    width: "90%",
    margin: "auto",
  },
  commentspan: {
    fontSize: 20,
    fontWeight: 900,
    display: "inline-block",
    marginRight: 4,
    marginBottom: 8,
    color: "#FFFFFF",
  },
  commentscountpan: {
    fontSize: 20,
    fontWeight: 900,
    display: "inline-block",
    marginRight: 4,
    marginBottom: 8,
    color: "#53626f",
  },
  leftContainer: {
    width: 50,
  },
  rightContainer: {},
}));

export default function CommentBox() {
    const classes = useStyles();
    return (
      <>
        <Box className={classes.CommentBox}>
          <Typography classname={classes.commentspan}>Comments</Typography>
          <Typography classname={classes.commentscountpan}>9</Typography>
          <Reply></Reply>

          <Box className={classes.leftContainer}></Box>
          <Box className={classes.rightContainer}></Box>
        </Box>
      </>
    ); 
}