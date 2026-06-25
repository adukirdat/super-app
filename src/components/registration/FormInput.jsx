const FormInput = ({ label, name, value, onChange, error, type = 'text', placeholder = '' }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="sr-only">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder || label}
        className={`h-11 w-full rounded-none border px-4 text-sm text-white outline-none transition-all placeholder:text-white/40 ${
          error ? 'border-[#FF3131] bg-[#2A2020]' : 'border-transparent bg-[#292929] focus:border-[#72DB73]'
        }`}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default FormInput;
