const SectionContainer = ({ children, className = '', width = 'auto', ...props }) => {
  const widthClasses = {
    'auto': '',
    '60': 'w-[60%]',
    '40': 'w-[40%]',
    '45': 'w-[45%]',
    '55': 'w-[55%]',
    '38': 'w-[38%]',
    '62': 'w-[62%]',
  };

  return (
    <div className={`${widthClasses[width] || widthClasses.auto} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default SectionContainer;
