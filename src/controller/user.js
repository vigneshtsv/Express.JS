import { findIndex } from "../common/helper.js"
import DB_CONFIG from '../config/dbConfig.js'
import {MongoClient} from 'mongodb'
const user = [{
    id:1,
    name:"Vignesh",
    email:"vignesh@gmail.com",
    password:"1234",
    status:true,
    role:"user"
}]
const getAllUsers = (req,res)=>{
    try {
        res.status(200).send({
            message:"User data fetch successful",
            user
        })
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error"
        })
    }
}
const getUserById = (req,res)=>{
    try {
        const {id} = req.params
        let index = findIndex(user,id)
        if(index!==-1)
        {
            res.status(200).send({
                message:"User data fetch successful",
                user:user[index]
            })
        }
        else
        {
            res.status(400).send({
                message:"Invalid  User Id",
            })
        }
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error"
        })
    }
}

const addUser = (req,res)=>{
    await client.connect()
    try {
        const db = await client.db(DB_CONFIG.DB_NAME)
        //check if the email exists in db
        const user = await db.collection('users').findOne({email:req.body.email})
        if(!user)
        {
            //if wmail not found create the user
            let newaUser = await db.collection('users').insertOne(req.body)
            res.status(200).send({
                message:"User Added Successfully"
            })
        }
        else
        {
            //if email is found respond error message
            res.status(200).send({
                 message:`User with ${req.body.email} already exists`
            })
        }
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error"
        })
    }
}

const editUserById = (req,res)=>{
    try {
        const {id} = req.params
        let index = findIndex(user,id)
        
        if(index!==-1)
        {
            req.body.id = Number(id)
            user.splice(index,1,req.body)
            res.status(200).send({
                message:"User Edited successful"
            })
        }
        else
        {
            res.status(400).send({
                message:"Invalid User Id",
            })
        }
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error"
        })
    }
}

const deleteUserById = (req,res)=>{
    try {
        const {id} = req.params
        let index = findIndex(user,id)
        if(index!==-1)
        {
            user.splice(index,1)
            res.status(200).send({
                message:"User Deleted Successfully",
            })
        }
        else
        {
            res.status(400).send({
                message:"Invalid User Id",
            })
        }
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error"
        })
    }
}
export default{
    getAllUsers,
    getUserById,
    addUser,
    editUserById,
    deleteUserById
}