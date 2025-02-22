import { useEffect } from 'react';
import { playAudio } from '../engine/ElevenLabs';
import { ScenarioType } from '../types';

let lastSound = 0;

const VoiceMap: Record<ScenarioType, string[]> = {
  [ScenarioType.WARRIORS_TO_BATTLE]: ['viking_1', 'viking-2'],
  [ScenarioType.ANNOUNCE_LAYOFFS]: ['Sarah', 'Roger'],
  [ScenarioType.POLITICAL_RALLY]: ['Sarah', 'Roger'],
  [ScenarioType.CREATE_YOUR_OWN]: [],
};

export function AgentSound({ text, scenarioType }: { text: string; scenarioType: ScenarioType }) {
  useEffect(() => {
    if (Date.now() - lastSound < 100) return;
    lastSound = Date.now();
    // pick random voice from the map
    const voices = VoiceMap[scenarioType];
    const voice = voices[Math.floor(Math.random() * voices.length)];
    if (voice) {
      playAudio(text, voice);
    }
  }, [text]);
  return null;
}
