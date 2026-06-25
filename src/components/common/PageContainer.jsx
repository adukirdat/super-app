const PageContainer = ({ children, className = '' }) => {
  return (
    <div className={`min-h-screen bg-black text-white ${className}`}>
      <div className="mx-auto min-h-screen w-full max-w-[1180px]">
        {children}
      </div>
    </div>
  );
};

export default PageContainer;
