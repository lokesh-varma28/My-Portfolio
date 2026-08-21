import { useEffect, useRef } from 'react';

export default function AuroraBackground({ children }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle system for glowing ambient dust
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.8 + 0.5,
      color: ['rgba(6, 182, 212, ', 'rgba(59, 130, 246, ', 'rgba(168, 85, 247, '][
        Math.floor(Math.random() * 3)
      ],
      alpha: Math.random() * 0.5 + 0.1,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.alpha + ')';
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color + '0.8)';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#030712] overflow-hidden">
      {/* Dynamic Aurora Gradient Mesh Layer */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        {/* Blob 1: Cyan Glow Top-Left */}
        <div className="absolute -top-[20%] -left-[10%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] rounded-full bg-cyan-600/20 blur-[130px] animate-aurora-1" />

        {/* Blob 2: Deep Blue Glow Top-Right */}
        <div className="absolute top-[10%] -right-[15%] w-[60vw] h-[60vw] max-w-[750px] max-h-[750px] rounded-full bg-blue-600/20 blur-[150px] animate-aurora-2" />

        {/* Blob 3: Purple Glow Center-Bottom */}
        <div className="absolute top-[45%] left-[20%] w-[50vw] h-[50vw] max-w-[650px] max-h-[650px] rounded-full bg-purple-600/20 blur-[140px] animate-aurora-3" />

        {/* Blob 4: Soft Accent Cyan Bottom */}
        <div className="absolute -bottom-[20%] right-[10%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] rounded-full bg-cyan-500/15 blur-[160px] animate-aurora-1" />

        {/* Linear SaaS Micro-Grid Overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40 mix-blend-overlay" />
      </div>

      {/* Floating Canvas Particle Layer */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-0 opacity-70"
      />

      {/* Main Content Wrapper */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
