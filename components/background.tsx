"use client";

import React, { useEffect, useState } from "react";

const Background = () => {
  const [particles, setParticles] = useState<
    { id: number; left: number; delay: number }[]
  >([]);

  useEffect(() => {
    // Generate floating particles
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 8; i++) {
        newParticles.push({
          id: i,
          left: Math.random() * 100,
          delay: Math.random() * 20,
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  return (
    <>
      {/* Gradient Overlay */}
      <div className="gradient-overlay" />

      {/* Floating Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle particle-float"
          style={{
            left: `${particle.left}%`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </>
  );
};

export default Background;
