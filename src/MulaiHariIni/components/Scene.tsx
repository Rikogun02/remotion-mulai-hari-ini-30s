import React from 'react';
import { Img, interpolate, staticFile, useCurrentFrame } from 'remotion';

export const Scene: React.FC<{ index: number }> = ({ index }) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, 179], [1, 1.045], { extrapolateRight: 'clamp' });
  const opacity = interpolate(frame, [0, 10, 169, 179], [0, 1, 1, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', opacity }}>
      <Img
        src={staticFile(`scenes/scene-${String(index + 1).padStart(2, '0')}.svg`)}
        style={{ width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${scale})` }}
      />
    </div>
  );
};
