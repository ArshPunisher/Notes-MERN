import { useEffect, useState } from "react";
import NoteCard from "../components/NoteCard";
import Modal from "react-modal";
import { MdAdd } from "react-icons/md";
import AddNewNotes from "../components/AddEditNotes";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Toast from "../components/Toast";
import Empty from "../components/Empty";
import addimg from '../assets/images/add_img.svg'
import noteimg from '../assets/images/search_img.svg'

const Home = () => {

  const navigate = useNavigate();

  const [notes, setNotes] = useState([])

  const [isSearch, setIsSearch] = useState<boolean>(false)

  const [userInfo, setUserInfo] = useState<object>();
  
  const [showToast, setShowToast] = useState({
    isShown: false,
    message:'',
    type: 'add'
  })

  const setToastShow = (message:string, type:string)=>{
    setShowToast({
      isShown: true,
      message,
      type
    })
  }

  const onSearchNotes = async (query: any) =>{
    try {
      const response = await axiosInstance.get('/search-notes',{
        params: {query}
      })

      if(response.data && response.data.notes){
        setIsSearch(true)
        setNotes(response.data.notes);
      }
    } catch (error: any) {
      if(error.response && error.response.data && error.response.data.message){
        console.log(error.response.data.message)
      }
    }
  }

  const handleClearSerach = () => {
    setIsSearch(false)
    getAllNotes()
  };


  const handleCloseToast = () =>{
    setShowToast({
      isShown: false,
      message:'',
      type:'add'
    })
  }

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const handleEdit = (noteDetails:any) =>{
    setOpenAddEditModal({isShown:true, type:"edit", data:noteDetails})
  }

  const updatedPinned = async (noteDetails:any) =>{
    const noteId = noteDetails._id
    try {
      const response = await axiosInstance.put(`pinned-notes/${noteId}`, {
        isPinned: !noteDetails.isPinned
      })
      if(response.data && !response.data.error){
        console.log(response)
        getAllNotes()
      }
    } catch (error:any) {
      if(error.response && error.response.data && error.response.data.message){
        console.log(error.response.data.message)
      }
    }
  }

  const handleDelete = async (noteDetails:any) =>{
    const noteId = noteDetails._id
    try {
      const response = await axiosInstance.delete(`delete-notes/${noteId}`)
      if(response.data && !response.data.error){
        setToastShow("Notes Deleted Successfully", "delete")
        console.log(response)
        getAllNotes()
      }
    } catch (error:any) {
      if(error.response && error.response.data && error.response.data.message){
        console.log(error.response.data.message)
      }
    }
  }

  const getUserInfo = async ()=>{
    try {
      const response = await axiosInstance.get('/get-user')
      if(response.data && response.data.user){
        setUserInfo(response.data.user)
      }
    } catch (error:any) {
      if(error.response.status === '401'){
        localStorage.clear()
        navigate('/login')
      }
    }
    
  }

  const getAllNotes = async () =>{
    try {
      const response = await axiosInstance.get("/get-notes")
      if(response.data && response.data.notes){
        setNotes(response.data.notes)
      }
    } catch (error:any) {
      console.log("An unexpected error occured:", error)
    }
  }

  useEffect(()=>{
    getUserInfo();
    getAllNotes();
  },[])

  return (
    <div className="bg-gray-100 h-screen">
      <Navbar userInfo={userInfo} onSearchNotes={onSearchNotes} handleClearSerach={handleClearSerach} />

      <div className="p-2 md:px-8 mx-auto">
        {notes.length > 0 ? <div className="grid grid-cols-2 gap-1 md:grid-cols-3 md:gap-3 mt-4 md:mt-8">
          {notes && notes.map((note: any) => (
              <NoteCard
                title={note.title}
                content={note.content}
                isPinned={note.isPinned}
                date={note.createdAt}
                tags={note.tags}
                onEdit={() => handleEdit(note)}
                onDelete={() => handleDelete(note)}
                onPinned={() => updatedPinned(note)}
              />
            ))}
        </div> : <Empty imgSrc={isSearch ? noteimg: addimg} message={isSearch? 'Oops! No notes found matching your search.':"Start crafting notes today, shaping your knowledge into tools that will sculpt a better tomorrow for you"}/>}

      </div>

      <div
        className="md:w-16 md:h-16 md:right-10 md:bottom-10 w-14 h-14 flex items-center justify-center fixed right-8 bottom-8 rounded-2xl cursor-pointer bg-indigo-500 hover:bg-indigo-700"
        onClick={() => setOpenAddEditModal({ isShown: true, type: "add", data: null })}
      >
        <MdAdd className="text-[3rem] text-white font-semibold" />
      </div>

      <Modal
        ariaHideApp={false}
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="w-[26rem] md:w-[36rem] max-h-3/4 bg-white rounded-md mx-auto mt-14 md:mt-[5rem] p-5"
      >
        <AddNewNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          setToastShow={setToastShow}
          getAllNotes={getAllNotes}
          onClose={() =>
            setOpenAddEditModal({ isShown: false, type: "add", data: null })
          }
        />
      </Modal>
      <Toast isShown={showToast.isShown} message={showToast.message} type={showToast.type} onClose={handleCloseToast} />
    </div>
  );
}
export default Home;
