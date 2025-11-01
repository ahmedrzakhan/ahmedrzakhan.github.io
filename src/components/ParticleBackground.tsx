import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  hue: number; // Color hue for gradient effect
  phase: number; // For wave motion
}

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      const particles: Particle[] = [];
      const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.6 + 0.2,
          hue: Math.random() * 3, // 0: cyan, 1: purple, 2: pink
          phase: Math.random() * Math.PI * 2,
        });
      }

      particlesRef.current = particles;
    };

    const getParticleColor = (hue: number, opacity: number): string => {
      // Liquid glass gradient colors
      if (hue < 1) {
        // Cyan to Purple
        const mix = hue;
        return `rgba(${Math.floor(0 + (162 - 0) * mix)}, ${Math.floor(217 + (89 - 217) * mix)}, ${Math.floor(255 + (255 - 255) * mix)}, ${opacity})`;
      } else if (hue < 2) {
        // Purple to Pink
        const mix = hue - 1;
        return `rgba(${Math.floor(162 + (255 - 162) * mix)}, ${Math.floor(89 + (107 - 89) * mix)}, ${Math.floor(255 + (157 - 255) * mix)}, ${opacity})`;
      } else {
        // Pink to Cyan
        const mix = hue - 2;
        return `rgba(${Math.floor(255 + (0 - 255) * mix)}, ${Math.floor(107 + (217 - 107) * mix)}, ${Math.floor(157 + (255 - 157) * mix)}, ${opacity})`;
      }
    };

    const drawParticles = () => {
      // Create trailing effect instead of full clear
      ctx.fillStyle = 'rgba(10, 14, 39, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const time = timeRef.current;

      particlesRef.current.forEach((particle, index) => {
        // Apply wave motion for liquid feel
        const waveX = Math.sin(time * 0.001 + particle.phase) * 0.5;
        const waveY = Math.cos(time * 0.001 + particle.phase) * 0.5;

        // Update position with wave
        particle.x += particle.vx + waveX;
        particle.y += particle.vy + waveY;

        // Wrap around edges with smooth transition
        if (particle.x < -10) particle.x = canvas.width + 10;
        if (particle.x > canvas.width + 10) particle.x = -10;
        if (particle.y < -10) particle.y = canvas.height + 10;
        if (particle.y > canvas.height + 10) particle.y = -10;

        // Cycle hue for color shifting
        particle.hue = (particle.hue + 0.001) % 3;

        // Pulse opacity for breathing effect
        const pulseOpacity = particle.opacity * (0.8 + Math.sin(time * 0.002 + particle.phase) * 0.2);

        // Draw particle with glow
        const color = getParticleColor(particle.hue, pulseOpacity);

        // Outer glow
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 4
        );
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 4, 0, Math.PI * 2);
        ctx.fill();

        // Core particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        // Draw flowing connections
        particlesRef.current.slice(index + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const opacity = 0.15 * (1 - distance / 150);

            // Create gradient line
            const lineGradient = ctx.createLinearGradient(
              particle.x, particle.y,
              otherParticle.x, otherParticle.y
            );

            const color1 = getParticleColor(particle.hue, opacity);
            const color2 = getParticleColor(otherParticle.hue, opacity);

            lineGradient.addColorStop(0, color1);
            lineGradient.addColorStop(1, color2);

            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = lineGradient;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        });
      });

      timeRef.current += 16; // Approximate 60fps
    };

    const animate = () => {
      drawParticles();
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    createParticles();
    animate();

    const handleResize = () => {
      resizeCanvas();
      createParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Liquid morphing shapes in background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="liquid-shape liquid-shape-1 w-96 h-96 absolute top-20 -left-20" />
        <div className="liquid-shape liquid-shape-2 w-80 h-80 absolute bottom-40 -right-20" />
        <div className="liquid-shape liquid-shape-3 w-72 h-72 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
        style={{ background: 'transparent' }}
      />
    </>
  );
};

export default ParticleBackground;