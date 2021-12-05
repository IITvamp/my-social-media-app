import { useState, useEffect, useContext } from "react";
import {
  Box,
  Typography,
  makeStyles,
  TextareaAutosize,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";


import { AuthContext } from "../../../context/AuthContext";

const useStyles = makeStyles((theme) => ({
  replybox: {
    width: "100%",
    borderRadius: 8,
    border: "solid 1px #3d4953",
    overflow: "hidden",
  },
  textbox: {
    width: "100%",
    boxSizing: "border-box",
    backgroundColor: "#13181d",
    padding: 8,
    color: "#cccccc",
    border: "none",
  },
  panel: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#3d4953",
    padding: 8,
  },
  comment_as: {
    display: "inline-block",
    fontSize: 14,
    color: "#cccccc",
    marginRight: 8,
  },
  username: {
    display: "inline-block",
    fontSize: 14,
    color: "#4f9eed",
    marginRight: 8,
  },
  submitbutton: {
    display: "inline-block",
    fontSize: 14,
    margin: "auto",
    color: "#FFFFFF",
    backgroundColor: "#4f9eed",
  },
}));

export default function Reply(){
  const [text, setText] = useState("");
  const classes = useStyles();

  const user = useContext(AuthContext)
  return (
    <>
      <Box className={classes.replybox}>
        <TextareaAutosize
          placeholder="What are your thoughts?"
          minRows={2}
          value={text}
          onChange={(value) => {
            setText(value.target.value);
          }}
          className={classes.textbox}
        />
        <Box className={classes.panel}>
          <Typography classname={classes.comment_as}>
            Comment as{" "}
            <Link to="" className={classes.username}>
              {user.username}
            </Link>
          </Typography>
          <Box classname={classes.submitbutton}>
            <Button classname={classes.submitbutton}>Comment</Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};
