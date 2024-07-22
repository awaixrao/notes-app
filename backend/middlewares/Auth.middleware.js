const JWT_SECRET = "asdfa8765@@@vmnxclvnb?{:{P>l,;l.ol3r2p9y29$%%^^78p34yh;igdsitdsaydsa6wq87436s.';.l;kdfn;k;[xncvkabnsvlkbzxclk";
const jwt = require("jsonwebtoken");


const AuthCheck = async( req, res, next) =>{

    try {
       console.log(req.headers);

        const token = req.headers.authorization.split(" ")[1];

        if(token) {
            const decoded = await jwt.verify(token, JWT_SECRET);
            req.body.userId = decoded.userId;
            next();
        }
         else {
            // if token not found
            return res.status(400).json({
                errors: true,
                message: "token not found"
            })
        }
    }
        
        catch (error) {
            console.log(error.message);
            return res.status(400).json({
                errors: true,
                message: "Authorization failed"
            })
        }
    }


        module.exports = AuthCheck;
