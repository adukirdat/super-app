const CategoryCard = ({ title, image, selected, onClick, backgroundColor }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex aspect-[1.05/1] w-full flex-col overflow-hidden rounded-app border-4 p-2 text-left transition-all duration-200 ${
        selected
          ? 'border-[#72DB73] shadow-glow'
          : 'border-transparent hover:border-white/35'
      }`}
      style={{ backgroundColor }}
    >
      <h3 className="mb-2 text-sm font-semibold text-white sm:text-base">{title}</h3>
      <div className="min-h-0 flex-1 overflow-hidden rounded-[10px] bg-black/20">
        <img src={image} alt="" className="h-full w-full object-cover" />
      </div>
    </button>
  );
};

export default CategoryCard;
