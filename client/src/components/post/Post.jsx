// import "./post.css";
import {useLocation } from "react-router-dom";
import { axiosInstance } from "../../config.js";

import {
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Grid,
  Typography,
  Box,
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";


import { makeStyles } from "@material-ui/core/styles";  
import { useContext, useEffect, useState } from "react";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Chip } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";

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
    cursor: "pointer",
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
  chip: {
    display:'flex',
    margin: 5,
    
  }
}));

export default function Post({ post }) {
  const [votes, setVotes] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);
  const [postUser, setPostUser] = useState({});
  const [tags, setTags] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user} = useContext(AuthContext);

  const location = useLocation();

  useEffect(() => {
    setIsLiked(post.likes.includes(user._id));
  }, [user._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axiosInstance.get(`/users?userId=${post.userId}`);
      setPostUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const upvoteHandler = () => {
    try {
      axiosInstance.put("/posts/" + post._id + "/upvote", { userId: user._id });
    } catch (err) { }
    setVotes(isDownvoted ? votes + 2 : isLiked ? votes -1 : votes + 1);
    setIsLiked(!isLiked);
    setIsDownvoted(isDownvoted ? false : true);
  };

  const downvoteHandler = () => {
    try {
      axiosInstance.put("/posts/" + post._id + "/downvote", { userId: user._id });
    } catch (err) {}
    setVotes(isLiked ? votes - 2 : isDownvoted ? votes + 1 : votes - 1);
    setIsDownvoted(!isDownvoted);
    setIsLiked(isLiked ? false : true);
  };

  const deleteHandler = () => {
    try {
      axiosInstance.delete("/posts/" + post._id);
      console.log(`post deleted with id ${post._id}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const classes = useStyles();

  return (
    <>
      <Card className={classes.newsCard}>
        <Box>
          <CardHeader
            avatar={
              <Link to={`/profile/${postUser._id}`}>
                <Avatar
                  aria-label="news card"
                  src={
                    postUser.profilePicture
                      ? PF + postUser.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                ></Avatar>
              </Link>
            }
            title={postUser.firstname}
            subheader={format(post.createdAt)}
          ></CardHeader>
        </Box>
        {post.userId === user._id && !location.pathname.startsWith("/post") && (
          <>
            <IconButton color="primary" onClick={deleteHandler}>
              <DeleteIcon />
            </IconButton>
            <Link to={`/post/edit/${post._id}`}>
              <IconButton color="primary">
                <EditIcon />
              </IconButton>
            </Link>
          </>
        )}
        <CardContent className={classes.cardContent}>
          <Grid container>
            <Grid item lg={5} md={12} sm={12} xs={12}>
              <img
                src={
                  post.img
                    ? post.img
                    : "http://www.aaru.edu.jo/websites/aaru2/wp-content/plugins/learnpress/assets/images/no-image.png?Mobile=1&Source=%2F%5Flayouts%2Fmobile%2Fdispform%2Easpx%3FList%3D78b536db%252De7c7%252D45d9%252Da661%252Ddb2a2aa2fbaf%26View%3D6efc759a%252D0646%252D433c%252Dab6e%252D2f027ffe0799%26RootFolder%3D%252Fwebsites%252Faaru2%252Fwp%252Dcontent%252Fplugins%252Flearnpress%252Fassets%252Fimages%26ID%3D4786%26CurrentPage%3D1"
                }
                alt="haha"
                className={classes.image}
              />
            </Grid>

            <Grid
              item
              lg={7}
              md={12}
              sm={12}
              xs={12}
              className={classes.rightContainer}
            >
              <Link to={`/post/${post._id}`}>
                <Typography
                  container
                  className={classes.title}
                  onClick={() =>
                    console.log(`you clicked on post with title ${post?.title}`)
                  }
                >
                  {post?.title}
                </Typography>
              </Link>

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
              <Grid
                item={"true"}
                lg={12}
                style={{
                  height: "30px",
                  margin: "5px",
                  marginLeft: "-3px",
                  marginTop: "4px",
                }}
              >
                {/* {post?.tags.length > 0 && <SmallChip tags={post.tags}/>} */}
                {post?.tags.length > 0 &&
                  post.tags.map((chip) => {
                    return (
                      <>
                        <Link to={`/tags/${chip}`}>
                          <Chip
                            classname={classes.chip}
                            label={chip}
                            style={{
                              color: "red",
                              margin: "2px",

                              cursor: "pointer",
                            }}
                          />
                        </Link>
                      </>
                    );
                  })}
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
