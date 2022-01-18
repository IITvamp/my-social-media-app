import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Twitter from "@material-ui/icons/Twitter";
import { LinkedIn, GitHub } from "@material-ui/icons";

const useStyles = makeStyles({
  bottomNavContainer: {
    background: "#222",
  },
  root: {
    "& .MuiSvgIcon-root": {
      fill: "tan",
      "&:hover": {
        fill: "tomato",
        fontSize: "1.8rem",
      },
    },
  },
});

const Footer = () => {
  const classes = useStyles();

  const openURL = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  return (
    <BottomNavigation className={classes.bottomNavContainer}>
      <BottomNavigationAction
        icon={<LinkedIn />}
        className={classes.root}
        onClick={() => {
          openURL("https://www.linkedin.com/in/ayush-bansal-865328206/");
        }}
      />
      <BottomNavigationAction
        icon={<Twitter />}
        className={classes.root}
        onClick={() => {
          openURL("https://twitter.com/ASBansal3");
        }}
      />
      <BottomNavigationAction
        icon={<GitHub />}
        className={classes.root}
        onClick={() => {
          openURL("https://github.com/IITvamp");
        }}
      />
    </BottomNavigation>
  );
};
export default Footer;
