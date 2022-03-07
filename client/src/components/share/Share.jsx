import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { PermMedia } from "@material-ui/icons";
import ChipInput from "material-ui-chip-input";
import { makeStyles } from "@material-ui/core/styles";

import { axiosInstance } from "../../config.js";
import { AuthContext } from "../../context/AuthContext";
import { imageUpload } from "../../imageUpload.js";

import {
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Grid,
  Typography,
  Box,
  TextareaAutosize,
  Button,
  Chip,
} from "@material-ui/core";



const useStyles = makeStyles((theme) => ({
  FormBox: {
    display: "block",
    height: "content-fit",
    backgroundColor: "RGB(203, 213, 223)",
    borderRadius: 8,
    textAlign: "left",
    padding: 24,
    width: "90%",
    margin: "auto",
    marginTop: "40px",
  },
  textbox: {
    width: "100%",
    boxSizing: "border-box",
    backgroundColor: "RGB(237, 242, 246)",
    padding: 8,
    border: "none",
  },

  panel: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#3d4953",
    padding: 8,
    marginTop: 8,
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

  newsCard: {
    width: "100%",
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

export default function Share() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [url, setUrl] = useState("/");
  const [tags, setTags] = useState([]);
  const [file, setFile] = useState(null);

  console.log(user);

  const classes = useStyles();

  const handleAddChip = (chip) => {
    setTags([...tags, chip]);
  };

  const handleDeleteChip = (chipToDelete) => {
    setTags(tags.filter((chip) => chip !== chipToDelete));
  };

  // useEffect(() => {
    
  // })

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc,
      title: title,
      url: url,
      tags: tags,
    };

    if (file) {
      const media = [];
      media.push(file);
      console.log(media);
      let newArr = [];
      if(media.length > 0) newArr = await imageUpload(media);
      newPost.img = newArr[0].url;
      console.log(newPost);
    }
    try {
      await axiosInstance.post("/posts", newPost);
      console.log(user);
      window.location.reload();
    } catch (err) {}
  };

  return (
    <Box className={classes.FormBox}>
      <Box>
        <TextareaAutosize
          placeholder="What is the title?"
          minRows={2}
          value={title}
          onChange={(value) => {
            setTitle(value.target.value);
          }}
          className={classes.textbox}
        />
      </Box>

      <Box>
        <TextareaAutosize
          placeholder="What is the description?"
          minRows={10}
          value={desc}
          onChange={(value) => {
            setDesc(value.target.value);
          }}
          className={classes.textbox}
        />
      </Box>

      <Box>
        <TextareaAutosize
          placeholder="What is the url?"
          minRows={2}
          value={url}
          onChange={(value) => {
            setUrl(value.target.value);
          }}
          className={classes.textbox}
        />
      </Box>
      <Box>
        <ChipInput
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={tags}
          onAdd={(chip) => handleAddChip(chip)}
          onDelete={(chip) => handleDeleteChip(chip)}
        />
      </Box>

      <Box className={classes.panel}>
        <Box>
          <label htmlFor="file" className="shareOption">
            <PermMedia htmlColor="tomato" className="shareIcon" />
            <span>Image</span>
            <input
              style={{ display: "none" }}
              type="file"
              id="file"
              accept=".png,.jpeg,.jpg"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>
        </Box>

        <Button
          style={{
            display: "inline-block",
            fontSize: 14,
            marginLeft: "auto",
            color: "#FFFFFF",
            backgroundColor: "#4f9eed",
          }}
          // disabled={disabled}
          classname={classes.submitbutton}
          onClick={submitHandler}
        >
          Post
        </Button>
      </Box>

      <>
        <Card className={classes.newsCard}>
          <CardHeader
            avatar={
              <Link to={`/profile/${user.firstname}`}>
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
            title={user.firstname}
          ></CardHeader>

          <CardContent className={classes.cardContent}>
            <Grid container>
              <Grid item lg={5} md={12} sm={12} xs={12}>
                <img
                  src={
                    file
                      ? URL.createObjectURL(file)
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
                <Typography container className={classes.title}>
                  {title}
                </Typography>

                <Typography className={classes.description}>{desc}</Typography>
                <Typography className={classes.url}>
                  read more at{" "}
                  <a href={url} target="_blank">
                    {" "}
                    <b> this url </b>
                  </a>
                </Typography>
              </Grid>

              <Grid container={"true"}>
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
                  {tags.length > 0 &&
                    tags.map((chip) => {
                      return (
                        <>
                          <Link to={`/tags/${chip}`}>
                            <Chip
                              label={chip}
                              className={classes.chip}
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
    </Box>
  );
}
