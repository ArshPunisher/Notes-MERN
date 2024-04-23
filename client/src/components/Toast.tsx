import { useEffect } from "react";
import { LuCheck } from "react-icons/lu"
import { MdDeleteOutline } from "react-icons/md";

interface Props{
  isShown: boolean;
  type: string;
  message: string;
  onClose: ()=> void;
}

const Toast = ({isShown, type, message, onClose}: Props) => {

  useEffect(()=>{
    const timeoutId = setTimeout(()=>{
      onClose();
    }, 2000)

    return ()=> clearTimeout(timeoutId);
  },[onClose])

  return (
    <div className={`absolute top-20 right-6 transition-all duration-400 ${isShown? 'opacity-100': 'opacity-0'}`}>
      <div className={`min-w-52 bg-white border rounded-md shadow-2xl after:w-[8px] after:h-full ${type === 'delete' ? 'after:bg-red-500' : 'after:bg-green-500'} after:absolute after:left-0 after:top-0 after:rounded-l-lg`}>
        <div className="flex items-center gap-3 px-4 py-2">
          <div className={`w-10 h-10 flex items-center justify-center rounded-full ${type === 'delete' ? 'bg-red-50' : 'bg-green-50'}`}>
            {type === 'delete' ? <MdDeleteOutline className="text-red-500"/> : <LuCheck className="text-green-500"/>}
          </div>
          <p className="text-sm text-slate-500">{message}</p>
        </div>
      </div>
    </div>
  )
}

export default Toast
