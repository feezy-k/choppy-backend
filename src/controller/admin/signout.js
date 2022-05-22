exports.signout = async (req,res) => {
    if(req.cookies.token){
     res
     .clearCookie("token")
     .status(200)
     .json({ message: "Successfully logged out 😏 🍀", token: req.cookies.token });
    }else{
     res.send('Cookies no dey o');
    }
   }
   