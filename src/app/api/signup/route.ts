import dbconnect from "@/lib/dbconnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendverificationemail";


export async function POST(request: Request) {
  await dbconnect();    
  try {
    const { username, email, password } = await request.json();
    const existingUserVerifiedbyUsername = await UserModel.findOne({ username, isVerified: true }); 
    if (existingUserVerifiedbyUsername) {
        return Response.json({ success: false, message: "Username is already taken" }, { status: 400 });  
         
    }

    const existingUserVerifiedbyEmail = await UserModel.findOne({ email, isVerified: true });
    if (existingUserVerifiedbyEmail) {
        true // TODO: Back here 
    }
    else{
      const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        VerifyCode: Math.floor(100000 + Math.random() * 900000).toString(),
        verifycodexpriy: expiryDate,
        isverified: false,
        isacceptmsg: true,
        messages: []
      })
      await newUser.save(); 

      // Send verification email
      const response = await sendVerificationEmail(email, username, newUser.VerifyCode);
      if (response.success) {
        return Response.json({ success: true, message: "Verification email sent successfully" }, { status: 200 });
      } else {
        return Response.json({ success: false, message: "Failed to send verification email" }, { status: 500 });
      }
    }

    
  } catch (error) {
    console.error("Error in signup route:", error);
    return Response.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}