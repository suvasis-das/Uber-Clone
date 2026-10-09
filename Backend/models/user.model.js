// const mongoose=require('mongoose');
// const bcrypt=require('bcrypt');
// const jwt=require('jsonwebtoken');


// const userSchema=new mongoose.Schema({
//     fullname:{
//         firstname:{
//             type:String,
//             required:true,
//             minlength:[3,'first name must be greater than 3 character'],

//         },
//         lastname:{
//             type:String,
//             minlength:[2,"last name must be greater than 2"],
//         },
        
//     },
//     email:{
//             type:String,
//             required:true,
//             unique:true,
//             minlength:[5,"email must be greater than 5 characters and also in the email format"],
//         },
//         password:{
//             type:String,
//             required:true,
//             select:false,

//         },
//         socketId:{
//             type:String,
            
//         },
// });


// userSchema.methods.generateAuthToken=function(){
//     const token=jwt.sign({_id:this._id}, process.env.JWT_SECRET)
//     return token;
// }
// userSchema.methods.comparePassword= async function(password){
//     return await bcrypt.compare(password,this.password);
// }
// userSchema.statics.hashPassword=async function(password){
//     return await bcrypt.hash(password,10);
// }

// const userModel=mongoose.model('user',userSchema);

// module.exports=userModel;


const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');

const userSchema=new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,"The firstname should be more than 3 characters"]
        },
        lastname:{
            type:String,
            minlength:[3,"The lastname should be more than 3 characters"]

        },

    },
    email:{
        type:String,
        required:true,
        unique: true,
        minlength:[5,"the email should be more than 5 characters"],
    },
    password:{
        type:String,
        required:true,
        select:false,
        minlength:[6,"the password should be more than 6 characters"],

    },
    socketId:{
        type:String,
    },
    
});


userSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({_id:this._id}, process.env.JWT_SECRET)
    return token;
}

userSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.statics.hashPassword=async function(password){
    return await bcrypt.hash(password,10);
}

const userModel=mongoose.model('user',userSchema);
module.exports=userModel;
