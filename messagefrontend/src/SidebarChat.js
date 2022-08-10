import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setChat } from "./features/chatSlice";
import db from "./firebase";
import "./SidebarChat.css";
import * as timeago from "timeago.js";
import axios from "axios";

function SidebarChat({ id, chatName,message,timestamp,photo }) {
  const dispatch = useDispatch();
  const [chatInfo, setChatInfo] = useState([]);
  const [lastMsg,setLastMsg]=useState('')
  const [lastPhoto,setLastPhoto]=useState('')
  const [lastTimestamp,setLastTimestamp]=useState('')
  const getSidebarElement =()=>{
    axios.get(`/get/lastmessage?id=${id}`)
    .then((res)=>{
      setLastMsg(res.data.message)
      setLastPhoto(res.data.user.photo)
      setLastTimestamp(res.data.timestamp)
    })
  }

  useEffect(() => {
   getSidebarElement();
  }, []);

  return (
    <div
      onClick={() =>
        dispatch(
          setChat({
            chatId: id,
            chatName: chatName,
            message: message,
          })
        )
      }
      className="sidebarChat"
    >
      <Avatar src={lastPhoto} />
      <div className="sidebarChat__info">
        <h3>{chatName}</h3>
       <h1>{lastMsg}</h1>
        <small>
             {new Date(parseInt(timestamp)).toDateString()}
             
        </small> 
        
      </div>
      
    </div>
  );
}

export default SidebarChat;
