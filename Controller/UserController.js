import users  from "../Models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const CreateUser = async (req, res) => {
    try {
        const body = req.body;
        const checkUser = await users.findOne({Email: body.Email}); // check if user already exists
        if(!checkUser){
            const user = new users(req.body);
            const salt = await bcrypt.genSalt(5);
            user.Password = await bcrypt.hash(body.Password, salt);
            user.save(users).then(
                res.status(201).json({message: "Succsess Created User"})
            );
        }else{
            res.status(400).json({message: "User already exists"});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const Login = async (req, res) => {
    try {
        const body = req.body;
        const user = await users.findOne({Email: body.Email});
        if(!user){
            res.status(404).json({message: "User not found"});
        }else{
            const validPassword = await bcrypt.compare(body.Password, user.Password);
            if(!validPassword){
                res.status(400).json({message: "Invalid Password"});
            }else{
                const token = jwt.sign({id: user._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "12h"});
                res.status(200).json({message: "Success Login", token});
            }
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const UpdateUserProfile = async (req, res) => {
    try {
        const body = req.body;
        const user = await users.findOne({Email: body.Email});
        if(!user){
            res.status(404).json({message: "User not found"});
        }else{
            user.Name = body.Name;
            user.Email = body.Email;
            user.Phone = body.Phone;
            user.Address = body.Address;
            user.Hobby = body.Hobby;
            user.save(user).then(
                res.status(200).json({message: "Succsess Updated User"})
            );
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const ResetPassword = async (req, res) => {
    try {
        const param = req.params;
        const body = req.body;
        const user = await users.findOne({Email: param.Email});
        if(!user){
            res.status(404).json({message: "User not found"});
        }else{
            if(body.Password != body.ConfirmPassword){
                res.status(400).json({message: "Password not match"});
            }
            const salt = await bcrypt.genSalt(5);
            user.Password = await bcrypt.hash(body.Password, salt);
            user.save(user).then(
                res.status(200).json({message: "Succsess Reset User Password"})
            );
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const DeleteUser = async (req, res) => {
    try {
        const param = req.params;
        const user = await users.findOne({Email: param.Email});
        if(!user){
            res.status(404).json({message: "User not found"});
        }else{
            user.delete(user).then(
                res.status(200).json({message: "Succsess Deleted User"})
            );
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const GetUser = async (req, res) => {
    try {
        const param = req.params;
        const user = await users.findOne({Email: param.Email},'-Password -__v -_id');
        if(!user){
            res.status(404).json({message: "User not found"});
        }else{
            res.status(200).json({message:"Success Get User",user});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const GetAllUser = async (req,res) => {
    try {
        const user = await users.find({},'-Password -__v -_id');
        if(!user){
            res.status(404).json({message: "User not found"});
        }else{
            res.status(200).json({message:"Success Get All User",user});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};