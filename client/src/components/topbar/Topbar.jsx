import { AppBar, Toolbar, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";

import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import HamburgerDrawer from "../AnimatedSidebar/HamurgerDrawer";

import inshortsLogo from "../Assets/real inshorts logo.png"

const useStyles = makeStyles({
  header: {
    background: "#fff",
    height: 70,
    position: "relative",
  },
  logolink: {
    position: "relative",
    margin: "auto",
    right: "30px",
    cursor: "pointer",
  },
  logoImage: {
    height: "50px",
    right: "30px",
    cursor: "pointer",
  },
  avatar: {
    cursor: "pointer",
    height: 36,
    width: 36,
  },
});
export default function TopBar() {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <>
      <AppBar className={classes.header}>
        <Toolbar>
          <HamburgerDrawer />
          <Link to={`/`} className={classes.logolink}>
            <img src={inshortsLogo} alt="logo" className={classes.logoImage} />
          </Link>
          <Link to={`/profile/${user.username}`}>
            <Avatar
              src={
                user.profilePicture
                  ? PF + user.profilePicture
                  : PF + "person/noAvatar.png"
              }
              alt=""
              className={classes.avatar}
            />
          </Link>
        </Toolbar>
      </AppBar>
    </>
  );
}

// import "./topbar.css";
// import { Search, Person, Chat, Notifications } from "@material-ui/icons";
// import { Link } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../../context/AuthContext";

// import HamburgerDrawer from "../AnimatedSidebar/HamurgerDrawer"

// export default function Topbar() {
//   const { user } = useContext(AuthContext);
//   const PF = process.env.REACT_APP_PUBLIC_FOLDER;
//   return (
//     <div className="topbarContainer">
//       <div className="menu">
//         <HamburgerDrawer/>
//       </div>
//       <div className="topbarLeft">
//         <Link to="/" style={{ textDecoration: "none" }}>
//           <span className="logo">my news</span>
//         </Link>
//       </div>
//       <div className="topbarCenter">
//         <div className="searchbar">
//           <Search className="searchIcon" />
//           <input
//             placeholder="Search for friend, post or video"
//             className="searchInput"
//           />
//         </div>
//       </div>
//       <div className="topbarRight">
//         <div className="topbarLinks">
//           <span className="topbarLink">Homepage</span>
//           <span className="topbarLink">Timeline</span>
//         </div>
//         <div className="topbarIcons">
//           <div className="topbarIconItem">
//             <Person />
//             <span className="topbarIconBadge">1</span>
//           </div>
//           <div className="topbarIconItem">
//             <Chat />
//             <span className="topbarIconBadge">2</span>
//           </div>
//           <div className="topbarIconItem">
//             <Notifications />
//             <span className="topbarIconBadge">1</span>
//           </div>
//         </div>
//         <Link to={`/profile/${user.username}`}>
//           <img
//             src={
//               user.profilePicture
//                 ? PF + user.profilePicture
//                 : PF + "person/noAvatar.png"
//             }
//             alt=""
//             className="topbarImg"
//           />
//         </Link>
//       </div>
//     </div>
//   );
// }
