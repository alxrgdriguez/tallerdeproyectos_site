import React, { useEffect, useRef, useState } from "react";
import SpinnerText from "./SpinnerText";

let hasLoadedOnce = false;

const LoadingWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [showSpinner, setShowSpinner] = useState(!hasLoadedOnce);
  const [contentVisible, setContentVisible] = useState(hasLoadedOnce);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (hasLoadedOnce) {
      setShowSpinner(false);
      setContentVisible(true);
      return;
    }

    timeoutRef.current = window.setTimeout(() => {
      setContentVisible(true);
      setShowSpinner(false);
      hasLoadedOnce = true;
    }, 1200);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      {showSpinner && <SpinnerText />}
      <div
        aria-busy={showSpinner}
        style={{
          opacity: contentVisible ? 1 : 0,
          transition: "opacity 0.4s ease-in-out",
          minHeight: "100vh",
        }}
      >
        {children}
      </div>
    </>
  );
};

export default LoadingWrapper;