import { useState, useEffect, useContext } from "react";
import {
  Box,
  Typography,
  makeStyles,
  TextareaAutosize,
} from "@material-ui/core";
import { Link } from "react-router-dom";

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
    border:'none',
  },
  panel: {},
}));

export default function Reply(){
  const [text, setText] = useState("");
  const classes = useStyles();
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
                  <Box>
                      
                  </Box>
              </Box>
      </Box>
    </>
  );
};
