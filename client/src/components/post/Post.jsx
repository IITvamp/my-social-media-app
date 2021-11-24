import "./post.css";


import {
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";

import { makeStyles } from "@material-ui/core/styles";  
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Chip } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
// import Button from "@material-ui/core/Button";
const useStyles = makeStyles((theme) => ({
  newsCard: {
    width: "70%",
    marginTop: 20,
    marginLeft: "auto",
    marginRight: "auto",
  },
  image: {
    width: "88%",
    height: 300,
    borderRadius: 10,
    objectFit: "cover",
    [theme.breakpoints.down("md")]: {
      width:"100%",
    },
  },
  cardContent: {
    padding: 8,
    paddingBottom: "2px !important",
    paddingTop: "2px !important",
  },
  rightContainer: {
    margin: "5px 0px 0px -25px",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("md")]: {
      margin: "5px 0px 0px 5px",
    },
  },
  title: {
    color: "#44444d",
    fontWeight: "40px",
    fontSize: "20px",
    lineHeight: 1.2,
  },
  description: {
    marginTop: 10,
  },
  url: {
    marginTop: "auto",
    marginBottom: "20px",
    textDecoration: "none",
    [theme.breakpoints.down("md")]: {
      marginTop: 40,
      marginBottom: 5,
    },
  },
}));

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const [tags, setTags] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const deleteHandler = () => {
    try {
      axios.delete("/posts/" + post._id);
      console.log(`post deleted with id ${post._id}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  const classes = useStyles();

  return (
    <>
      <Card className={classes.newsCard}>
        <CardHeader
          avatar={
            <Link to={`/profile/${user.username}`}>
              <Avatar
                aria-label="news card"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              ></Avatar>
            </Link>
          }
          title={user.username}
          subheader={format(post.createdAt)}
        ></CardHeader>
        {post.userId === currentUser._id && (
          <IconButton color="primary" onClick={deleteHandler}>
            <DeleteIcon/>
          </IconButton>
        )}
        <CardContent className={classes.cardContent}>
          <Grid container>
            <Grid item lg={5} md={5} sm={5} xs={12}>
              <img
                src={
                  PF + post.img
                    ? PF + post.img
                    : "http://www.aaru.edu.jo/websites/aaru2/wp-content/plugins/learnpress/assets/images/no-image.png?Mobile=1&Source=%2F%5Flayouts%2Fmobile%2Fdispform%2Easpx%3FList%3D78b536db%252De7c7%252D45d9%252Da661%252Ddb2a2aa2fbaf%26View%3D6efc759a%252D0646%252D433c%252Dab6e%252D2f027ffe0799%26RootFolder%3D%252Fwebsites%252Faaru2%252Fwp%252Dcontent%252Fplugins%252Flearnpress%252Fassets%252Fimages%26ID%3D4786%26CurrentPage%3D1"
                }
                alt="haha"
                className={classes.image}
              />
            </Grid>

            <Grid
              item
              lg={7}
              md={7}
              sm={7}
              xs={12}
              className={classes.rightContainer}
            >
              <Typography container className={classes.title}>
                {post?.title}
              </Typography>
              <Typography className={classes.description}>
                {post?.desc}
              </Typography>
              <Typography className={classes.url}>
                read more at{" "}
                <a href={post?.url} target="_blank">
                  {" "}
                  <b> this url </b>
                </a>
              </Typography>
            </Grid>

            <Grid container={"true"} item>
              <Grid item={"true"} lg={12} style={{ height: "30px" }}>
                {/* <Stack direction="row" spacing={1}> */}
                {post.tags.map((chip) => {
                  return (
                    <>
                      {/* <p>{chip} </p> */}
                      {/* {console.log(chip)} */}
                      <Chip label={chip} />
                    </>
                  );
                })}
                {/* </Stack> */}
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>

    // <div className="post">
    //   <div className="postWrapper">
    //     <div className="postTop">
    //       <div className="postTopLeft">
    //         <Link to={`/profile/${user.username}`}>
    //           <img
    //             className="postProfileImg"
    //             src={
    //               user.profilePicture
    //                 ? PF + user.profilePicture
    //                 : PF + "person/noAvatar.png"
    //             }
    //             alt=""
    //           />
    //           <span className="postUsername">{user.username}</span>
    //         </Link>
    //         <span className="postDate">{format(post.createdAt)}</span>
    //       </div>
    //       <div className="postTopRight">
    //         <MoreVert />
    //       </div>
    //     </div>

    //     <div className="newsCard">
    //       <img
    //         alt={"it's something"}
    //         src={
    //           PF + post.img
    //             ? PF + post.img
    //             : "http://www.aaru.edu.jo/websites/aaru2/wp-content/plugins/learnpress/assets/images/no-image.png?Mobile=1&Source=%2F%5Flayouts%2Fmobile%2Fdispform%2Easpx%3FList%3D78b536db%252De7c7%252D45d9%252Da661%252Ddb2a2aa2fbaf%26View%3D6efc759a%252D0646%252D433c%252Dab6e%252D2f027ffe0799%26RootFolder%3D%252Fwebsites%252Faaru2%252Fwp%252Dcontent%252Fplugins%252Flearnpress%252Fassets%252Fimages%26ID%3D4786%26CurrentPage%3D1"
    //         }
    //         className="newsImage"
    //       />
    //       <div className="newsText">
    //         <div>
    //           <span className="title">{post?.title}</span>
    //           <br />
    //         </div>
    //         <div className="lowerNewsText">
    //           <div className="description">{post?.desc}</div>
    //           <span className="readmore">
    //             read more at{" "}
    //             <a href={post?.url} target="__blank" className="source">
    //               <b>{"hahahah"}</b>
    //             </a>
    //           </span>
    //           <div className="tagWindow">
    //             {post.tags.map((chip) => {
    //               return (
    //                 <p>{chip} </p>
    //                 // <Chip label={chip} onClick={console.log(`clicked on chip ${chip}`) }/>
    //               );
    //             })}
    //           </div>
    //         </div>
    //       </div>
    //     </div>

    //     {/*  */}
    //     <div className="postBottom">
    //       <div className="postBottomLeft">
    //         <img
    //           className="likeIcon"
    //           src={`${PF}heart.png`}
    //           onClick={likeHandler}
    //           alt=""
    //         />
    //         <span className="postLikeCounter">{like} people like it</span>
    //       </div>
    //       <div className="postBottomRight">
    //         <span className="postCommentText">{post.comment} comments</span>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
