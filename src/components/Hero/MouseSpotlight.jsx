import { useState, useCallback, useRef, memo } from 'react';

function MouseSpotlight() {
  const containerRef = useRef(null);
  const [active, setActive] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    containerRef.current.style.setProperty('--spotlight-x', `${x}px`);
    containerRef.current.style.setProperty('--spotlight-y', `${y}px`);
  }, []);

  const handleMouseEnter = useCallback(() => setActive(true), []);
  const handleMouseLeave = useCallback(() => setActive(false), []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="absolute inset-0 pointer-events-auto z-0"
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: active ? 1 : 0,
          background: `radial-gradient(750px circle at var(--spotlight-x, 0px) var(--spotlight-y, 0px), rgba(6, 182, 212, 0.12), rgba(59, 130, 246, 0.06) 40%, transparent 70%)`,
        }}
      />
    </div>
  );
}

export default memo(MouseSpotlight);
