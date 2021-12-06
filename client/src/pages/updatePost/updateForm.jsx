
import { PermMedia, Cancel } from "@material-ui/icons";

import { useContext, useRef, useState, useEffect } from "react";
import { Grid } from "@material-ui/core"
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import ChipInput from "material-ui-chip-input";
import { useParams } from "react-router";
import { useLocation } from "react-router";

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
      setFile(res.data.file);
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
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      post.img = fileName;
      console.log(post);
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
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
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
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
      </div>
    );
}
