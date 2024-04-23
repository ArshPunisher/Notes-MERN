import { useState } from "react";
import TagInput from "./TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../utils/axiosInstance";

interface Props{
  type: any
  noteData: any
  getAllNotes?: any;
  onClose: ()=>void;
  setToastShow: any;
}

const AddEditNotes = ({type, noteData, getAllNotes ,onClose, setToastShow} : Props) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);

  const [error, setError] = useState("");

  const addNewNote = async () =>{
    try {
      const response = await axiosInstance.post("/add-notes",{
        title,
        content,
        tags
      })
      if(response.data && response.data.notes){
        setToastShow("Notes Added Successfully", "add")
        getAllNotes()
        onClose()
      }
    } catch (error:any) {
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message)
      }
    }
  }

  const editNote = async () =>{
    const noteId = noteData._id
    try {
      const response = await axiosInstance.put(`/edit-notes/${noteId}`,{
        title,
        content,
        tags
      })
      if(response.data && response.data.notes){
        setToastShow("Notes Updated Successfully", "add")
        getAllNotes()
        onClose()
      }
    } catch (error:any) {
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message)
      }
    }
  }

  const handleAddNote = () =>{
    setError("")
    if(!title){
      setError("Please enter the title")
      return
    }
    if(!content){
      setError("Please enter the content")
      return
    }

    if(type === 'edit'){
      editNote()
    }
    else{
      addNewNote()
    }
  }


  return (
    <div className="relative">
      <button
        className="w-8 h-8 rounded-full flex items-center justify-center absolute -top-4 -right-3 hover:bg-slate-50"
        onClick={onClose}
      >
        <MdClose className="text-xl text-slate-400" />
      </button>

      <div className="flex flex-col gap-2">
        <label className="input-label">TITLE</label>
        <input
          type="text"
          className="text-2xl bg-slate-50 text-slate-950 p-2 rounded outline-none"
          placeholder="Go to Gym at 5pm"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 mt-2">
        <label className="input-label">CONTENT</label>

        <textarea
          type="text"
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
        />
      </div>

      <div className="mt-3">
        <label className="input-label">TAGS</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {error && <p className="text-xs text-red-500 pt-4">{error}</p>}

      <button className="btn-primary bg-indigo-500 hover:bg-indigo-700 font-medium mt-5 p-3" onClick={handleAddNote}>
        {type === "edit" ? "UPDATE" : "ADD"}
      </button>
    </div>
  );
};

export default AddEditNotes;
