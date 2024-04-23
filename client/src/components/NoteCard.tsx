import moment from "moment"
import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md"

interface Props{
  title: string
  date: string
  content: string
  tags: any
  isPinned: (boolean);
  onEdit: ()=> void;
  onDelete: ()=> void;
  onPinned: ()=> void;
}

const NoteCard = ({title, date, content, tags, isPinned, onEdit, onDelete, onPinned}: Props) => {
  return (
    <div className="bg-white border p-4 md:px-8 md:py-6 rounded-md hover:shadow-md transition-all ease-in-out">
      <div className="flex flex-col relative">
        <h2 className="text-md leading-tight md:text-xl font-medium">{title}</h2>
        <p className="text-xs font-medium text-slate-500">{moment(date).format('Do MMM YYYY')}</p>

        <button className="absolute -top-1.5 -right-1.5 md:-top-3 md:-right-4" onClick={onPinned}>
          <MdOutlinePushPin className={`icon-btn hover:text-blue-600 ${isPinned ? 'text-blue-600': "text-slate-300"}`} />
        </button>
      </div>


      <p className="text-sm font-medium text-slate-600 mt-4">
      {content}
      </p>

      <div className="flex items-center justify-between mt-2">
      <div className="text-xs text-slate-500">
        {tags.length >0 && tags.map((tag)=>`# ${tag}`)}
      </div>
        <div className="flex gap-2">
          <MdCreate onClick={onEdit} className="icon-btn hover:text-green-600" />
          <MdDelete onClick={onDelete} className="icon-btn hover:text-red-600" />
        </div>
      </div>
    </div>
  );
};
export default NoteCard
