const LinkedInBanner = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      {/* LinkedIn Cover: 1584 x 396 pixels */}
      <div 
        className="bg-background border border-border shadow-sm"
        style={{ 
          width: '1584px', 
          height: '396px',
          position: 'relative'
        }}
      >
        {/* Content positioned to the right to avoid profile photo overlap */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ 
            paddingLeft: '35%' // Offset to the right
          }}
        >
          <span className="font-logo text-6xl tracking-wider text-foreground mb-4">
            GO DATA
          </span>
          <p className="text-xl text-muted-foreground tracking-wide">
            Especialistas em Oracle. Nada mais.
          </p>
        </div>
      </div>
      
      {/* Instructions */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-foreground text-background px-6 py-3 rounded-lg text-sm">
        Tire um screenshot deste banner (1584 x 396 pixels) para usar no LinkedIn
      </div>
    </div>
  );
};

export default LinkedInBanner;
