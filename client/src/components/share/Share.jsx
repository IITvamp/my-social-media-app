import "./share.css";
import {
  PermMedia,
  Cancel,
} from "@material-ui/icons";

import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import ChipInput from "material-ui-chip-input";

export default function Share() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  // const desc = useRef();
  // const title = useRef();
  // const url = useRef();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [url, setUrl] = useState("/");
  const [tags, setTags] = useState([]);
  const [file, setFile] = useState(null);

  const handleAddChip = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDeleteChip = (chipToDelete) => {
    setTags(tags.filter((tag) => tag !== chipToDelete),);};

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc,
      title: title,
      url: url,
      tags: tags.sp
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      console.log(newPost);
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      await axios.post("/posts", newPost);
      window.location.reload();
    } catch (err) {}
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <input
            placeholder={"What's the title " + user.username + "?"}
            className="shareInput"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <hr className="shareHr" />
        <div className="shareTop">
          <input
            placeholder={"What's the description " + user.username + "?"}
            className="shareInput"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <hr className="shareHr" />
        <div className="shareTop">
          <input
            placeholder={"What's the url " + user.username + "?"}
            className="shareInput"
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
