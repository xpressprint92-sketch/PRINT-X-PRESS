import React from 'react';

export const AbstractMotionBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Base dark tone - semi-transparent to keep motion vibrant */}
      <div className="absolute inset-0 bg-slate-950/35" />

      {/* Floating Gradient Blob 1 - Vibrant Electric Blue / Cyan */}
      <div
        className="absolute -top-32 -left-32 w-[700px] h-[700px] rounded-full bg-cyan-500/45 blur-[90px] animate-blob"
        style={{ animationDuration: '14s' }}
      />

      {/* Floating Gradient Blob 2 - Deep Indigo / Royal Blue */}
      <div
        className="absolute top-1/4 -right-40 w-[850px] h-[850px] rounded-full bg-blue-600/40 blur-[110px] animate-blob"
        style={{ animationDuration: '18s', animationDelay: '2s' }}
      />

      {/* Floating Gradient Blob 3 - Vibrant Violet / Purple */}
      <div
        className="absolute -bottom-40 left-1/5 w-[800px] h-[800px] rounded-full bg-indigo-600/40 blur-[100px] animate-blob"
        style={{ animationDuration: '16s', animationDelay: '4s' }}
      />

      {/* Floating Gradient Blob 4 - Center Vivid Cyan/Blue Orb */}
      <div
        className="absolute top-2/3 right-1/4 w-[600px] h-[600px] rounded-full bg-blue-400/35 blur-[90px] animate-blob"
        style={{ animationDuration: '20s', animationDelay: '6s' }}
      />

      {/* Subtle Grid / Noise Texture Overlay for High-End Tech Feel */}
      <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:24px_24px]" />

      {/* Elegant Lighting Vignette */}
      <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/10 via-transparent to-slate-950/40" />
    </div>
  );
};
