import mongoose, {Schema, Document} from "mongoose";

export interface Message extends Document {
    content: string, 
    createdAt: Date 
}

const MessageSchema: Schema<Message> = new Schema({ 
    content: {type: String, required: true}, 
    createdAt:{type: Date,required:true,default: Date.now}
})

export interface User extends Document {
    username: string, 
    email: string, 
    password: string, 
    VerifyCode: string, 
    verifycodexpriy: Date, 
    isverified: boolean,
    isacceptmsg: boolean, 
    messages: Message[]
} 

const UserSchema: Schema<User> = new Schema({ 
    username: {type: String, required: [true, "Username is required"], trim: true, unique: true}, 
    email:{type: String ,required: [true, "Email is required"],match:[/.+\@.+\..+/, "Use Valid Email"]}, 
    password:{type: String, required:  [true, "Password is required"], },
    VerifyCode:{type: String, required:  [true, "Verifycode is required"], },
    verifycodexpriy:{type: Date, required:  [true, "Verifycodeexpiry is required"],},
    isverified:{type: Boolean, default: true,},
    isacceptmsg:{type: Boolean, default: true,},
    messages: [MessageSchema]
})

const Usermodel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema)

export default Usermodel
