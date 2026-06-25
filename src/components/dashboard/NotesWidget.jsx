import useStore from '../../store/useStore';

const NotesWidget = () => {
  const note = useStore((state) => state.notes);
  const setNotes = useStore((state) => state.setNotes);

  return (
    <div className="flex h-full min-h-[260px] flex-col rounded-app bg-[#F1C75B] p-5 text-[#111111] shadow-panel lg:min-h-[382px]">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-base font-bold">All notes</h2>
        {note && (
          <button
            type="button"
            onClick={() => setNotes('')}
            className="text-[11px] font-bold text-[#111111]/60 transition hover:text-[#111111]"
          >
            Clear
          </button>
        )}
      </div>
      
      <textarea
        value={note}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="This is how I am going to learn MERN Stack in next 3 months."
        className="app-scrollbar min-h-0 flex-1 resize-none border-none bg-transparent text-xs font-medium leading-relaxed text-[#111111] outline-none placeholder:text-[#111111]"
      />
    </div>
  );
};

export default NotesWidget;
