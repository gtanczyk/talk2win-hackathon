import React from 'react';
import {
  TopProgressBarContainer,
  ProgressBarOuter,
  ProgressBarInner,
  ProgressText,
} from './TopProgressBar.styles';

interface TopProgressBarProps {
  progress: number;
  highScore: number;
}

export const TopProgressBar: React.FC<TopProgressBarProps> = ({
  progress,
}) => {
  // Ensure progress is within 0-100 range
  const normalizedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    
    <TopProgressBarContainer>
      <ProgressText>
          {Math.round(normalizedProgress)}%
        </ProgressText>
      <ProgressBarOuter>
        <ProgressBarInner progress={normalizedProgress} />
      </ProgressBarOuter>
    </TopProgressBarContainer>
  );
};