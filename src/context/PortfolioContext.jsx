import React, { createContext, useContext, useState } from 'react';

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [activeService, setActiveService] = useState(null);
  const [cursorState, setCursorState] = useState('default'); // 'default', 'hover', 'drag', etc.

  // activeService will hold strings like 'Web', 'Dev', 'Graphic' to indicate what the 3D robot should react to.

  return (
    <PortfolioContext.Provider
      value={{
        activeService,
        setActiveService,
        cursorState,
        setCursorState,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
