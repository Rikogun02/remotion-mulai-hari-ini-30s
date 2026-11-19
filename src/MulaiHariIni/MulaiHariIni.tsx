import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, interpolate } from 'remotion';
import { Scene } from './components/Scene';
import { subtitles } from '../assets/subtitles';

const Subtitle: React.FC = () => {
  const frame = useCurrentFrame();
  const cue = subtitles.find((item) => frame >= item.start * 30 && frame < item.end * 30);
  const opacity = cue
    ? interpolate(
        frame,
        [cue.start * 30, cue.start * 30 + 5, cue.end * 30 - 5, cue.end * 30],
        [0, 1, 1, 0],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
      )
    : 0;

  return (
    <div style={{
      position: 'absolute', left: 180, right: 180, bottom: 105,
      textAlign: 'center', opacity, color: '#FFFFFF',
      fontFamily: 'Arial, sans-serif', fontWeight: 700, fontSize: 38,
      lineHeight: 1.25, whiteSpace: 'pre-line',
      textShadow: '0 3px 10px rgba(0,0,0,.9)',
      background: 'rgba(4,9,20,.66)',
      border: '1px solid rgba(69,231,211,.45)',
      borderRadius: 18, padding: '18px 28px',
    }}>
      {cue?.text ?? ''}
    </div>
  );
};

export const MulaiHariIni: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: '#090E1C' }}>
    {Array.from({ length: 5 }, (_, index) => (
      <Sequence key={index} from={index * 180} durationInFrames={180}>
        <Scene index={index} />
      </Sequence>
    ))}
    <Audio src={staticFile('audio/voiceover.wav')} volume={1} />
    <Audio src={staticFile('audio/ambient-bed.wav')} volume={0.42} />
    <Subtitle />
  </AbsoluteFill>
);
