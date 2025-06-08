
function AdContainer() {
  return (
    <div className="w-full flex justify-center py-4">
      <div className="relative w-11/12 max-w-6xl   rounded-xl   overflow-hidden flex items-center justify-center p-4 group">
        <img
          src="/banner.png"
          alt="Advertisement Banner"
          className="object-contain max-h-60 w-full"
        />
        
        {/* Shining Overlay */}
        <div className="shine-overlay" />
      </div>
    </div>
  );
}

export default AdContainer;
