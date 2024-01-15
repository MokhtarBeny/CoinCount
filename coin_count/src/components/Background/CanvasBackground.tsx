import React, { useEffect, useRef } from "react";

const CanvasGradientAnimation = () => {
  const canvasRef = useRef(null);
  let animationFrameId;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Adjust canvas size to fill the screen
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    const drawRotatingGradient = (elapsed) => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const maxRadius = Math.min(canvas.width, canvas.height) / 3;

      // Clear the canvas
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Draw two ellipses moving in a circular path and rotating
      for (let i = 0; i < 2; i++) {
        const orbitRadius = 50 + i * 30; // Orbit radius for the circular path
        const angle = elapsed * 0.002 * (i === 0 ? 1 : -1); // Angle for circular motion
        const rotation = elapsed * 0.001 * (i === 0 ? -1 : 1); // Rotation of the circle

        const x = centerX + orbitRadius * Math.cos(angle);
        const y = centerY + orbitRadius * Math.sin(angle);

        const gradient = context.createLinearGradient(
          0,
          0,
          canvas.width,
          canvas.height
        );
        gradient.addColorStop(0, `hsla(${158 + i * 30}, 82%, 57%, 0.5)`);
        gradient.addColorStop(1, `hsl(${252 + i * 30}, 82%, 57%)`);

        context.save();
        context.translate(x, y);
        context.rotate(rotation);
        context.beginPath();
        context.ellipse(
          0,
          0,
          maxRadius - i * 50,
          (maxRadius - i * 50) * 0.7,
          0,
          0,
          2 * Math.PI
        );
        context.fillStyle = gradient;
        context.fill();
        context.restore();
      }
    };

    const render = (time = 1) => {
      drawRotatingGradient(time * 1);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full blur-[50px] z-0"
    />
  );
};

export default CanvasGradientAnimation;
