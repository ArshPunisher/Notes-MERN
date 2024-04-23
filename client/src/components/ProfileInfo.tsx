import { useNavigate } from "react-router-dom"
import { getInitials } from "../utils/helper"

interface Props{
  userInfo?: any;
}

const ProfileInfo = ({userInfo}: Props) => {

  const navigate = useNavigate()
  const onLogout = () =>{
    localStorage.clear()
    navigate('/login')
  }

  return (
    <div className='flex items-center gap-3'>
      <div className="w-10 h-10 md:w-12 md:h-12 text-slate-900 font-medium bg-slate-100 cursor-pointer rounded-full flex items-center justify-center">
        {getInitials(userInfo?.fullname)}
      </div>

      <div>
        <p className='hidden md:flex text-sm font-medium'>{userInfo?.fullname}</p>
        <button className='text-sm text-slate-700 font-medium hover:underline hover:underline-offset-2' onClick={onLogout}>Logout</button>
      </div>
    </div>
  )
}

export default ProfileInfo
