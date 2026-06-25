const DashboardThreeColumn = ({ leftColumn, middleColumn, rightColumn, bottomButton }) => {
  return (
    <div className="flex flex-col h-full p-6 gap-4">
      {/* Three Column Layout */}
      <div className="flex-1 flex gap-4 min-h-0">
        {/* Left Column - 32% */}
        <div className="flex flex-col gap-4 min-h-0" style={{ width: '32%' }}>
          {leftColumn}
        </div>

        {/* Middle Column - 28% */}
        <div className="flex flex-col gap-4 min-h-0" style={{ width: '28%' }}>
          {middleColumn}
        </div>

        {/* Right Column - 28% */}
        <div className="flex flex-col gap-4 min-h-0" style={{ width: '28%' }}>
          {rightColumn}
        </div>
      </div>

      {/* Browse Button */}
      {bottomButton && (
        <div className="flex justify-end">
          {bottomButton}
        </div>
      )}
    </div>
  );
};

export default DashboardThreeColumn;
