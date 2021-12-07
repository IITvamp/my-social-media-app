
import { PermMedia, Cancel } from "@material-ui/icons";

import { useContext, useRef, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import ChipInput from "material-ui-chip-input";
import { useParams } from "react-router";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Chip } from "@material-ui/core";

import {
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

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
      width: "100%",
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
}));

export default function UpdatePost() {
  const postId = useParams().postId;
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [post, setPost] = useState({});

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [url, setUrl] = useState("");
  const [tags, setTags] = useState("");
  const [file, setFile] = useState("");
  const [image, setImage] = useState("");

  const classes = useStyles();


  const handleAddChip = (chip) => {
    setTags([...tags, chip]);
  };

  const handleDeleteChip = (chipToDelete) => {
    setTags(tags.filter((chip) => chip !== chipToDelete));
  };

  useEffect(() => {
    const fetchpost = async () => {
      const res = await axios.get("/posts/" + postId);
      setPost(res.data);
      console.log(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setUrl(res.data.url);
      setFile(res.data.img);
      setImage(res.data.img);
      setTags(res.data.tags);
    }
    fetchpost();
  }, [postId])

  const submitHandler = async (e) => {
    e.preventDefault();
      post.title = title;
      post.desc = desc;
      post.img = file;
      post.url = url;
      post.tags = tags;
      
    if (file) {
      if (file !== image) {
        const data = new FormData();
        const fileName = Date.now() + file.name;
        data.append("name", fileName);
        data.append("file", file);
        post.img = fileName;
        console.log(post);
        try {
          await axios.post("/upload", data);
        } catch (err) { }
      }
    };
    try {
      await axios.put("/posts/" + postId, post);
      window.location.replace("/");
    } catch (err) {}
  };

    return (
      <div className="share">
        <div className="shareWrapper">
          <div className="shareTop">
            <input
              placeholder={"What's the title " + user.username + "?"}
              className="shareInput"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <hr className="shareHr" />
          <div className="shareTop">
            <input
              placeholder={"What's the description " + user.username + "?"}
              className="shareInput"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <hr className="shareHr" />
          <div className="shareTop">
            <input
              placeholder={"What's the url " + user.username + "?"}
              className="shareInput"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <div />
            <hr className="shareHr" />
          </div>

          <div style={{ padding: "5px 0", width: "94%" }}>
            <ChipInput
              name="tags"
              variant="outlined"
              label="Tags"
              fullWidth
              value={tags}
              onAdd={(chip) => handleAddChip(chip)}
              onDelete={(chip) => handleDeleteChip(chip)}
            />
          </div>
        </div>
        <hr className="shareHr" />
        {/* {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )} */}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>

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
            ></CardHeader>

            <CardContent className={classes.cardContent}>
              <Grid container>
                <Grid item lg={5} md={5} sm={5} xs={12}>
                  {console.log(file)}
                  {console.log(image)}
                  {console.log(file === image)}
                  { file && image &&
                    <img
                      src={
                        file
                          ? file === image
                            ? PF + image
                            : URL.createObjectURL(file)
                          : "http://www.aaru.edu.jo/websites/aaru2/wp-content/plugins/learnpress/assets/images/no-image.png?Mobile=1&Source=%2F%5Flayouts%2Fmobile%2Fdispform%2Easpx%3FList%3D78b536db%252De7c7%252D45d9%252Da661%252Ddb2a2aa2fbaf%26View%3D6efc759a%252D0646%252D433c%252Dab6e%252D2f027ffe0799%26RootFolder%3D%252Fwebsites%252Faaru2%252Fwp%252Dcontent%252Fplugins%252Flearnpress%252Fassets%252Fimages%26ID%3D4786%26CurrentPage%3D1"
                      }
                      alt="haha"
                      className={classes.image}
                    />
                  }
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
                    {title}
                  </Typography>

                  <Typography className={classes.description}>
                    {desc}
                  </Typography>
                  <Typography className={classes.url}>
                    read more at{" "}
                    <a href={url} target="_blank">
                      {" "}
                      <b> this url </b>
                    </a>
                  </Typography>
                </Grid>

                <Grid container={"true"} item>
                  <Grid item={"true"} lg={12} style={{ height: "30px" }}>
                    {tags.length > 0 &&
                      tags.map((chip) => {
                        return (
                          <>
                            <Link to={`/tags/${chip}`}>
                              <Chip label={chip} className={classes.chip} />
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
      </div>
    );
}
