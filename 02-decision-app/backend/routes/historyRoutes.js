import express from 'express';
import message from '../models/Message.js';
import dotenv from 'dotenv';
import Message from '../models/Message.js';


const router = express.Router();
dotenv.config();
// GET all history
router.get('/', async(req, res) => {
    try{
        const messages = await Message.find().sort({createdAt: -1});
        res.json(messages)
    }catch(error){
        res.status(500).json({error:'Failed to fetch history', details: error.message});
    }
});

// get message by id
router.get('/:id', async(req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        if(!message) return res.status(404).json({error: "Message not found"});
        res.json(message);
    } catch (error){
        res.status(500).json({ error: 'Failed to fetch message', details: error.message });
    }
})

