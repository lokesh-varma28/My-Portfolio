import React, { useState, useCallback, memo } from 'react';

function MouseSpotlight() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPos({ x, y });
  }, []);

  const handleMouseEnter = useCallback(() => setActive(true), []);
  const handleMouseLeave = useCallback(() => setActive(false), []);

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="absolute inset-0 pointer-events-auto z-0"
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: active ? 1 : 0,
          background: `radial-gradient(750px circle at ${pos.x}px ${pos.y}px, rgba(6, 182, 212, 0.12), rgba(59, 130, 246, 0.06) 40%, transparent 70%)`,
        }}
      />
    </div>
  );
}

export default memo(MouseSpotlight);
