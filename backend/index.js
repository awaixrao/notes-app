const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const port = 3002;
const bcrypt = require("bcrypt");
const User = require("./models/User.model");
const Notes = require("./models/Note.model");
const JWT_SECRET =
  "asdfa8765@@@vmnxclvnb?{:{P>l,;l.ol3r2p9y29$%%^^78p34yh;igdsitdsaydsa6wq87436s.';.l;kdfn;k;[xncvkabnsvlkbzxclk";
const saltRounds = 10;
const AuthCheck = require("./middlewares/Auth.middleware.js");

app.use(express.json());
app.use(cors());

app.post("/user/register", async (req, res) => {
  try {
    const { name, email, password, gender } = req.body;

    //if user is already registered
    alreadyRegister = await User.findOne({ email: email });

    if (alreadyRegister !== null) {
      return res.status(400).json({
        errors: true,
        message: "user already registered",
      });
    } else {
      const hashed = await bcrypt.hash(password, saltRounds);
      //saving user
      const user = await User.create({
        name: name,
        email: email,
        password: hashed,
        gender: gender,
      });
      //sucess response
      res.status(200).json({
        error: false,
        message: "user sucessfully resgisterd",
        user: user,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: true,
      message: "invalid registeration",
    });
  }
});

app.post("/user/login", async (req, res) => {
  const { email, password } = req.body;
  // is user or not
  const isUser = await User.findOne({ email: email });

  if (isUser == null)
    return res.status(400).json({
      error: true,
      message: "incorrect email or password",
    });

  //checking pass

  const isPassCorrect = await bcrypt.compare(password, isUser.password);
  if (isPassCorrect == false)
    return res.status(200).json({
      error: true,
      message: "incorrect email or password",
    });

  //jwt

  const access_token = await jwt.sign({ userId: isUser._id }, JWT_SECRET, {
    expiresIn: "2h",
  });

  //sucess response
  res.status(200).json({
    error: false,
    message: "you are successfully logged in",
    accessToken: access_token,
  });
});

//notes crud

app.post("/notes/create", AuthCheck, async (req, res) => {
  try {
    const { title, content, userId } = req.body;
    //conert string id to object id
    const userIdObject = new mongoose.Types.ObjectId(userId);
    const newNote = await Notes.create({
      title: title,
      content: content,
      userId: userIdObject,
    });

    return res.status(201).json({
      errors: false,
      message: "successfully created",
      note: newNote,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: true,
    });
  }
});

app.get("/notes", async (req, res) => {
  try {
    const notes = await Notes.find();
    res.status(200).json({
      error: false,
      Notes: notes,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
});

app.get("/notes/me", AuthCheck, async (req, res) => {
  try {
    const {userId} = req.body;
    console.log(userId);
    const objectuserid = new mongoose.Types.ObjectId(userId);

    const notes = await Notes.find({
      userId: objectuserid,
    });

    res.status(200).json({
      error: false,
      Notes: notes,
    });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
});

app.delete("/notes/:id", AuthCheck, async (req, res) => {
  try {
    const noteid = req.params.id;
    const { userId } = req.body;

    const objectuserid = new mongoose.Types.ObjectId(userId);
    const notefind = await Notes.findOne({
      _id: noteid,
      userId: objectuserid,
    });
    if (notefind === null) {
      return res.status(404).json({
        error: true,
        message: "Note not found",
      });
    }

    await notefind.deleteOne();

    res.status(200).json({
      error: false,
      message: "Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
});

app.put("/notes/:id", AuthCheck, async (req, res) => {
  try {
    const noteid = req.params.id;
    const { userId } = req.body;
    const objectuserid = new mongoose.Types.ObjectId(userId);
    // finding note
    const notefind = await Notes.findOne({
      _id: noteid,
      userId: objectuserid,
    });

    if (notefind === null) {
      return res.status(404).json({
        error: true,
        message: "Note not found",
      });
    }

    const updated = await Notes.findByIdAndUpdate(noteid, req.body, {
      new: true,
    });

    res.status(200).json({
      error: false,
      updatednote: updated,
      message: "updated Sucessfully",
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
});

mongoose
  .connect("mongodb://127.0.0.1:27017/NotesDb")
  .then(() => {
    app.listen(port, () => {
      console.log(`contacts app listening on port ${port}`);
    });
  })
  .catch((err) => console.log(err.message));
