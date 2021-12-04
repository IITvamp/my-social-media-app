import { makeStyles, Box, Avatar, Typography } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { Search, MoreVert } from "@material-ui/icons";

import { AuthContext } from "../../context/AuthContext";


const useStyles = makeStyles({
  header: {
    height: 50,
    background: "#ededed",
    display: "flex",
    padding: "10px 16px",
    alignItems: "center",
  },
  name: {
    marginLeft: 10,
  },
  rightContainer: {
    marginLeft: "auto",
    "& > *": {
      padding: 8,
      fontSize: 22,
      color: "#919191",
      
    },
  },
});


const Header = () => {
    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const classes = useStyles();

    
    return (
      <Box className={classes.header}>
        <Avatar
          aria-label="news card"
          src={
            user.profilePicture
              ? PF + user.profilePicture
              : PF + "person/noAvatar.png"
          }
          alt=""
        ></Avatar>
        <Box>
          <Typography className={classes.name}>{user.username}</Typography>
        </Box>
        <Box className={classes.rightContainer}>
          <Search />
          <MoreVert />
        </Box>
      </Box>
    );
};

export default Header;
