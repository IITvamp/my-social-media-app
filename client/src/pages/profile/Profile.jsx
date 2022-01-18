import "./profile.css";
import Topbar from "../../components/topbar/Topbar";

import Feed from "../../components/feed/Feed";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../config.js";

import { useParams } from "react-router";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const userid = useParams().userid;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axiosInstance.get(`/users?userId=${userid}`);
      setUser(res.data);
      console.log(res.data);
    };
    fetchUser();
  }, [userid]);

  return (
    <>
      <Topbar />
      <div className="profile">
        
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : PF + "person/noCover.png"
                }
                alt=""
              />
              <img
                className="profileUserImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.firstname}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed userId={userid} />
          </div>
        </div>
      </div>
    </>
  );
}
