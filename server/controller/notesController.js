const userModel = require('../models/users')
const notesModel = require('../models/notes')
const { createToken } = require('../service/authentication')


exports.login = async (req, res) =>{
  
  const {email, password} = req.body;
  try {
    const token = await userModel.matchPassword(email, password)
    res.status(200).json({msg: 'Success', token})
  } catch (error) {
    res.status(404).json({
      error:true,
      message:error.message
    })
  }
}

exports.register = async (req, res) =>{

  const {fullname, email, password, gender} = req.body;
  try {
    const isExist = await userModel.findOne({email})
    if(isExist) throw new Error("User Already exists")
    const user = await userModel.create({
      fullname, 
      email, 
      password,
      gender
    })
    console.log(user)
    const token = createToken(user);
    res.status(201).json({msg: 'Success',
    user, token})
  } catch (error) {
    res.status(400).json({error:true, message:error.message})
  }
}

exports.getUser = async (req, res) =>{
  try {
    const user = await userModel.findById(req.user._id);
    res.status(201).json({msg:"success", user})
  } catch (error) {
    res.status(401).json({error:true, message:error.message})
  }
}

exports.getNotes = async (req, res) =>{
  try {
    const notes = await notesModel.find({createdBy: req.user._id}).sort({isPinned: -1});
    console.log(notes)
    res.status(201).json({msg:"success get all notes", notes})
  } catch (error) {
    res.status(400).json({error:true, message:error.message})
  }
}

exports.searchNotes = async (req, res) =>{
  const {query} = req.query
  try {
    if(!query){
      res.status(400).json({error:true, message:"Search query is required"})
    }

    const notes = await notesModel.find({createdBy: req.user._id, $or: [
      {title: {$regex: new RegExp(query, 'i')}},
      {content: {$regex: new RegExp(query, 'i')}},
    ]})

    console.log(notes)
    res.status(201).json({msg:"success get all notes", notes})
  } catch (error) {
    res.status(400).json({error:true, message:error.message})
  }
}

exports.addNotes = async (req, res) =>{

  const {title, content, tags} = req.body;
  try {
    const notes = await notesModel.create({
      title, 
      content, 
      tags,
      createdBy: req.user._id
    })
    console.log(notes)
    res.status(201).json({msg: 'Success', notes})
  } catch (error) {
    res.status(400).json({error:true, message:error.message})
  }
}

exports.editNotes = async (req, res) =>{

  const noteId = req.params.noteId
  const {title, content, tags, isPinned} = req.body;
  try {
    const notes = await notesModel.findOneAndUpdate({_id:noteId}, {title, content, tags, isPinned})
    console.log("Updated DATA")
    res.status(201).json({msg:"ok", notes})
  } catch (error) {
    res.status(400).json({error:true, message:error.message})
  }
}

exports.pinnedNotes = async (req, res) =>{

  const noteId = req.params.noteId
  const {isPinned} = req.body;
  try {
    const notes = await notesModel.findOneAndUpdate({_id:noteId}, {isPinned})
    res.status(201).json({msg:"ok", notes})
  } catch (error) {
    res.status(400).json({error:true, message:error.message})
  }
}

exports.deleteNotes = async (req, res) =>{

  const noteId = req.params.noteId
  try {
    await notesModel.deleteOne({_id:noteId})
    console.log("Deleted Note")
    res.status(200).json({error:false, message:"Note Successfully Deleted"})
  } catch (error) {
    res.status(400).json({error:true, message:error.message})
  }
}

