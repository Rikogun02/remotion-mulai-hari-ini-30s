import React from 'react';
import { Composition } from 'remotion';
import { MulaiHariIni } from './MulaiHariIni/MulaiHariIni';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="MainVideo"
    component={MulaiHariIni}
    durationInFrames={900}
    fps={30}
    width={1920}
    height={1080}
  />
);
