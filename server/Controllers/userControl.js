import userModel from "../Models/userSchema.js";
import bcrypt from "bcrypt";
import { gendrateToken } from "../Token/token.js";
import cloudinary from "../cloudnery.js";

//USer SIGNUP controller

//intha file enna panirkomna , new user signup pandraru apdi pannum bothu fullname, email, password, bio ithella venum.
//  apro ithula yethavathu onnu illanalum Missing details nuh error adikum.
export const signup = async (req, res) => {
  const { fullname, email, password, bio } = req.body;
  try {
    if (!fullname || !email || !password || !bio) {
      return res.json({ success: false, message: "Missing details" });
    }

    const user = await userModel.findOne({ email });

    if (user) {
      return res.json({ success: false, message: "Email already Exists" });
    }

    const hashedpass = await bcrypt.hash(password, 10);
    //create new user
    const newUser = await userModel.create({
      fullname,
      email,
      password:hashedpass,
      bio,
    });
    const token = gendrateToken(newUser._id); // in this palce na newUser._id ah pass pannum bothu enaku new token genarate aavum.
    //   antha _id database la athuvey creata aagura onnu.and database _id and _v ah create pannum . so namba ovvuru user kuh thani thani ah id create panna thevai illa.
    //   and then namab intha edathula antha _id ah dha use pandrom.

    res.json({
      success: true,
      userData: newUser,
      token,
      message: "Account created successfully",
    });
  } catch (e) {
    console.log("error occur while login");

    res.json({
      success: false,
      message: e.message,
    });
  }
};

//user LOGIN controller

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const userData = await userModel.findOne({ email })
        
        const isPasswordCorrect = await bcrypt.compare(password, userData.password)
        if (!isPasswordCorrect) {
            return res.json({success:false , message:"Invalid Password"})
        }
        const token = gendrateToken(userData._id)
        res.json({success : true , userData , token , message:"Login sucessfully"})

    } catch (e) {
        console.log("error occur while login",e.message);

    res.json({
      success: false,
      message: e.message,
    });
  
    }
}
//controller to check if user authenticated
export const checkAuth = (req, res) => {
    res.json({success:true , user:req.user})
}

//to updata user profile details

export const updateProfile = async (req, res) => {
    try {
        const { profilePic, bio, fullname } = req.body
        
        const userId = req.user._id
        let updatedUser

        if (!profilePic) {
          updatedUser =  await userModel.findByIdAndUpdate(userId , {bio , fullname})
        }
        else {
            const upload = await cloudinary.uploader.upload(profilePic)
            updatedUser = await userModel.findByIdAndUpdate(userId, { profilePic: upload.secure_url, bio, fullname })
            res.json({success : true , user: updatedUser})

        }

    } catch (error) {
                    res.json({ success: false, message:error.message });

    }
}
