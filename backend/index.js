const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const port = 3002;
const bcrypt = require("bcrypt");
const User = require("./models/User.model");
const Notes = require("./models/Note.model");
const saltRounds = 10;
require('dotenv').config()
const AuthCheck = require("./middlewares/Auth.middleware.js");
const multer  = require('multer')
app.use(express.json());
app.use(express.static("uploads"))
app.use(cors());



//cloudinary

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dlma6bt14',
  api_key: '859238663167662',
  api_secret: 'EDSK2d2zxLW2e0kGWXi8xHf8gMg',
  secure: true,
});




const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const ext = file.mimetype.split("/")[1];
    cb(null, file.fieldname + '-' + uniqueSuffix + "." + ext)
  }
})

const upload = multer({ storage: storage })

app.get("/", (req, res) => {
  res.send("hello")
})

app.post("/user/register", async (req, res) => {
  try {
    const { name, email, password, gender } = req.body;

    //if user is already registered
    alreadyRegister = await User.findOne({ email: email });

    if (alreadyRegister !== null) {
      return res.status(401).json({
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


    console.log(isUser);
    
  //checking pass

  const isPassCorrect = await bcrypt.compare(password, isUser.password);
  if (isPassCorrect == false)
    return res.status(200).json({
      error: true,
      message: "incorrect email or password",
    });

  //jwt

  const access_token = await jwt.sign({ userId: isUser._id }, process.env.JWT_SECRET, {
    expiresIn: "20m",
  });

  //sucess response
  res.status(200).json({
    error: false,
    message: "you are successfully logged in",
    accessToken: access_token,
    user : isUser
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





app.get("/notes/me/:type?", AuthCheck, async (req, res) => {
  try {
      const type = req.params.type;
     
      const userIdObj = new mongoose.Types.ObjectId(req.body.userId);
      let query = { userId: userIdObj, isPinned: false, isArchived: false };

      if(type) {
          query[type] = true;
      }

      const notes = await Notes.find(query);

      
      return res.json({
          Notes: notes
      })
  } catch (error) {
      console.log(error.message);
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
//user token verification


app.post("/user/verify", async (req,res)=> {
  try {
    const token = req.body.token
    await jwt.verify(token, process.env.JWT_SECRET)
    res.status(200).json({
      error:false
    })
    
  } catch (error) {
    res.status(400).json({
      error:true
    })

    
  }
})

app.post("/profile/update", [upload.single('image'), AuthCheck], async(req,res)=>{
try {

  const name = req.body.name
  const image = req.file.filename
  const userId = req.body.userId

  const cloudinaryImage = await cloudinary.uploader.upload(req.file.path)
  console.log(cloudinaryImage);
  
  const updatedUser = await User.findByIdAndUpdate(userId ,{name: name,
    photo:cloudinaryImage.url
  }, {new:true})


    const userFinal = updatedUser.toObject({getters:true})

// console.log(userFinal);
// return;
  return res.status(200).json({
    error: false,
    user: userFinal,
    message: "successfully uploaded"
  })

} catch (error) {
  console.log(error.message)
  return res.status(400).json({
    error: true,
   message: "internal server error"
  })
}
})

// update inPinned note
app.put("/notes/pinned/:id", AuthCheck, async (req, res) => {
  try {
      const id = req.params.id;

      await Notes.findByIdAndUpdate(id, { isPinned: req.body.isPinned });
      return res.status(200).json({
          errors: false,
          message: "successfully updated"
      })
  } catch (error) {
      console.log(error.message);
      return res.status(500).json({
          errors: true
      })
  }
})


mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => {

    app.listen(port, () => {
      console.log(`contacts app listening on port ${port}`);
    });
  })
  .catch((err) => console.log(err.message));



// mongoose
//   .connect("mongodb://127.0.0.1:27017/NotesDb")
//   .then(() => {
//     app.listen(port, () => {
//       console.log(`contacts app listening on port ${port}`);
//     });
//   })
//   .catch((err) => console.log(err.message));
