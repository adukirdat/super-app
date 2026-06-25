import SectionContainer from './SectionContainer';

const DashboardGrid = ({ topLeft, bottomLeft, right, leftContent, rightContent, className = '' }) => {
  return (
    <div className={`flex flex-col lg:flex-row h-full ${className}`}>
      <SectionContainer width="60" className="p-6 lg:p-8 flex flex-col gap-6 overflow-y-auto lg:overflow-hidden">
        {topLeft && <div className="flex-1">{topLeft}</div>}
        {bottomLeft && <div className="flex-1">{bottomLeft}</div>}
        {leftContent && leftContent}
      </SectionContainer>
      <SectionContainer width="40" className="p-6 lg:p-8 overflow-y-auto lg:overflow-hidden">
        {right || rightContent}
      </SectionContainer>
    </div>
  );
};

export default DashboardGrid;
