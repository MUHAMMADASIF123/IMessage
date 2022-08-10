//imports
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Pusher from "pusher";
import MongoData from "./MongoData.js";
// import imessage from "./MongoData"
//config
const app = express();
const port = process.env.PORT || 9000;
//middleware
app.use(cors());
app.use(express.json());
//db connection
const dburl =
  "mongodb+srv://admin:admin@cluster0.exixa.mongodb.net/imessage?retryWrites=true&w=majority";
mongoose.connect(dburl, {
  // useCreateIndex:false,
  useNewUrlParser: true,
  // useUnifieldTopology:false
});
mongoose.connection.once("open", () => {
  console.log("DataBase is Connected Successfully");
});

//routes
app.get("/", (req, res) => res.status(200).send("helo from server"));

app.post('/new/conversation', (req, res) => {
  const dbdata = req.body;
  MongoData.create(dbdata, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.post('/new/message', (req, res) => {
  MongoData.updateOne(
    { _id: req.query.id},
    { $push: { conversation: req.body } },
    (err, data) => {
      if (err) {
        console.log("error saving data");
        res.status(500).send(err);
      console.log(err)
      } else {
        res.status(201).send(data);
        console.log("data is inserted successfully");
        console.log(data);
      }
    }
  );
});
app.get('/get/conversationlist',(req,res)=>{
  MongoData.find((err,data)=>{
    if(err)
    {
      res.status(500).send(err)
    }else{
      data.sort((b,a)=>
      {
        return a.timestamp-b.timestamp;
      });
      let conversations=[]
      data.map((conversationData)=>{
        const conversationInfo={
          id:conversationData._id,
          name:conversationData.chatName,
          timestamp:conversationData.conversation[0].timestamp
        }
        conversations.push(conversationInfo)
      })
      res.status(200).send(conversations)
    }
  })
})
app.get('/get/conversation',(req,res)=>{
  const id=req.query.id;
  MongoData.find({_id :id} ,(err,data)=>{
    if(err)
    { res.status(500).send(err)
    }else{
      res.status(201).send(data)
    }
  })   
})
app.get('/get/lastmessage',(req,res)=>{
  const id=req.query.id;
  MongoData.find({_id:id},(err,data)=>{
if(err){
  res.status(500).send(err)
}else{
  let convdata=data[0].conversation
  convdata.sort((b,a)=>{
return a.timestamp-b.timestamp
  })
  res.status(201).send(convdata[0])
}
  })
})

//listen
app.listen(port, () => console.log(`server is listening at localhost:${port}`));
