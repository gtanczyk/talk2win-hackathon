import { useEffect } from 'react';
import { playAudio } from '../engine/ElevenLabs';

let lastSound = 0;

export function AgentSound({ text }: { text: string }) {
  useEffect(() => {
    if (Date.now() - lastSound < 1000) return;
    lastSound = Date.now();
    playAudio(text);
  }, [text]);
  return null;
}
