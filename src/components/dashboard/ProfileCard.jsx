import useStore from '../../store/useStore';

const ProfileCard = () => {
  const user = useStore((state) => state.user);
  const selectedCategories = useStore((state) => state.selectedCategories);

  return (
    <div className="app-panel flex min-h-[168px] gap-5 bg-[#5746EA] p-5">
      <div className="flex w-[92px] shrink-0 items-end justify-center overflow-hidden rounded-[46px] border-4 border-white bg-gradient-to-b from-[#FF7CCB] via-[#7758FF] to-[#201234]">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/15">
          <span className="text-3xl font-bold text-white">
            {(user.name || user.username || 'U').charAt(0).toUpperCase()}
          </span>
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <p className="truncate text-sm font-medium text-white/90">{user.name || 'KK Vinay'}</p>
        <p className="truncate text-sm text-white/90">{user.email || 'Vinay090@gmail.com'}</p>
        <p className="truncate text-sm text-white/80">{user.mobile || '9999999999'}</p>
        <p className="mb-4 truncate text-2xl font-bold leading-tight text-white">{user.username || 'vinay060'}</p>

        <div className="grid grid-cols-2 gap-2">
          {selectedCategories.map((category) => (
            <span
              key={category.id}
              className="truncate rounded-full bg-white/30 px-3 py-1 text-center text-[11px] font-medium text-white"
            >
              {category.title}
            </span>
          ))}
          {selectedCategories.length === 0 && (
            <span className="text-white/60 text-xs">No categories selected</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
