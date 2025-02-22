import React from 'react';
import {
  ProgressContainer,
  ProgressBarOuter,
  ProgressBarInner,
  ProgressText,
  ScoreDisplay,
  ScoreText,
  ProgressStats,
  StatRow,
  StatLabel,
  StatValue,
} from './ProgressDisplay.styles';

interface ProgressDisplayProps {
  goalProgress: number;
  highScore: number;
  isNewHighScore: boolean;
  lastUpdateTime: number;
}

export const ProgressDisplay: React.FC<ProgressDisplayProps> = ({
  goalProgress,
  highScore,
  isNewHighScore,
  lastUpdateTime,
}) => {
  const formatTimeSinceUpdate = () => {
    const seconds = Math.floor((Date.now() - lastUpdateTime) / 1000);
    return seconds < 60 ? `${seconds}s ago` : `${Math.floor(seconds / 60)}m ago`;
  };

  return (
    <ProgressContainer>
      <ProgressBarOuter>
        <ProgressText>{Math.round(goalProgress)}%</ProgressText>
        <ProgressBarInner
          progress={goalProgress}
          isHighScore={goalProgress >= highScore}
        />
      </ProgressBarOuter>

      <ScoreDisplay>
        <ScoreText>Current: {Math.round(goalProgress)}%</ScoreText>
        <ScoreText isHighScore isNew={isNewHighScore}>
          Best: {Math.round(highScore)}%
        </ScoreText>
      </ScoreDisplay>

      <ProgressStats>
        <StatRow>
          <StatLabel>Last Update:</StatLabel>
          <StatValue>{formatTimeSinceUpdate()}</StatValue>
        </StatRow>
        <StatRow>
          <StatLabel>Progress Rate:</StatLabel>
          <StatValue highlight={goalProgress > 0}>
            {goalProgress > 0
              ? `+${(
                  goalProgress /
                  Math.max(1, (Date.now() - lastUpdateTime) / 1000)
                ).toFixed(1)}%/s`
              : 'N/A'}
          </StatValue>
        </StatRow>
      </ProgressStats>
    </ProgressContainer>
  );
};