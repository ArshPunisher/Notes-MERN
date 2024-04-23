
interface Props{
  imgSrc: any
  message: string
}

const Empty = ({imgSrc, message}: Props) => {
  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <img src={imgSrc} alt="No Notes" className="w-80"/>

      <p className="w-[1/2] mt-2 text-lg font-medium text-slate-700 text-center">{message}</p>
    </div>
  )
}

export default Empty
