const express=require('express');
const router=express.Router();
const {body}=require("express-validator");
const userController=require('../controllers/user.controller')



router.post('/register',[
    body('email').isEmail().withMessage('invalid email'),
    body('fullname.firstname').isLength({min:3}).withMessage('the first name must be greater than 3'),
    body('password').isLength({min:6}).withMessage('password must at least 6 characters'

    )],
    userController.registerUser
)



module.exports=router;