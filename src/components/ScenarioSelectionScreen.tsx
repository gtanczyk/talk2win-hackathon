import React from 'react';
import { SCENARIOS, ScenarioType, Mood, FacialExpression, BodyLanguageExpression, Agent as AgentType } from '../types';
import '@fontsource/press-start-2p';
import {
  Container,
  Title,
  ScenariosGrid,
  ScenarioCard,
  ScenarioTitle,
  ScenarioDescription,
  BackButton,
  AgentsContainer,
} from './ScenarioSelectionScreen.styles';
import { Agent } from './Agent';

const generateAgentVariations = (scenarioType: ScenarioType): AgentType[] => {
  // Define agent variations based on scenario type
  switch (scenarioType) {
    case ScenarioType.WARRIORS_TO_BATTLE:
      return [
        {
          id: '1',
          x: 0,
          y: 0,
          mood: Mood.EXCITED,
          facialExpression: FacialExpression.WIDE_EYES,
          bodyLanguageExpression: BodyLanguageExpression.CHEERING,
          thinkingState: '',
          spokenText: '',
        },
        {
          id: '2',
          x: 90,
          y: 0,
          mood: Mood.SCARED,
          facialExpression: FacialExpression.SQUINTING,
          bodyLanguageExpression: BodyLanguageExpression.COWERING,
          thinkingState: '',
          spokenText: '',
        },
        {
          id: '3',
          x: -90,
          y: 0,
          mood: Mood.ANGRY,
          facialExpression: FacialExpression.RAISED_EYEBROWS,
          bodyLanguageExpression: BodyLanguageExpression.HANDS_ON_HIPS,
          thinkingState: '',
          spokenText: '',
        },
      ];
    case ScenarioType.ANNOUNCE_LAYOFFS:
      return [
        {
          id: '1',
          x: 0,
          y: 0,
          mood: Mood.SAD,
          facialExpression: FacialExpression.FROWN,
          bodyLanguageExpression: BodyLanguageExpression.ARMS_CROSSED,
          thinkingState: '',
          spokenText: '',
        },
        {
          id: '2',
          x: -80,
          y: 0,
          mood: Mood.CONFUSED,
          facialExpression: FacialExpression.RAISED_EYEBROWS,
          bodyLanguageExpression: BodyLanguageExpression.STANDING,
          thinkingState: '',
          spokenText: '',
        },
        {
          id: '3',
          x: 80,
          y: 0,
          mood: Mood.ANGRY,
          facialExpression: FacialExpression.SQUINTING,
          bodyLanguageExpression: BodyLanguageExpression.HOSTILE_GESTURE,
          thinkingState: '',
          spokenText: '',
        },
      ];
    case ScenarioType.POLITICAL_RALLY:
      return [
        {
          id: '1',
          x: 0,
          y: 0,
          mood: Mood.EXCITED,
          facialExpression: FacialExpression.SMILE,
          bodyLanguageExpression: BodyLanguageExpression.CHEERING,
          thinkingState: '',
          spokenText: '',
        },
        {
          id: '2',
          x: 90,
          y: 0,
          mood: Mood.ANGRY,
          facialExpression: FacialExpression.FROWN,
          bodyLanguageExpression: BodyLanguageExpression.THROWING_OBJECT,
          thinkingState: '',
          spokenText: '',
        },
        {
          id: '3',
          x: -100,
          y: 0,
          mood: Mood.NEUTRAL,
          facialExpression: FacialExpression.NEUTRAL,
          bodyLanguageExpression: BodyLanguageExpression.ARMS_CROSSED,
          thinkingState: '',
          spokenText: '',
        },
      ];
    default:
      return [];
  }
};

interface ScenarioSelectionScreenProps {
  onScenarioSelect: (scenario: ScenarioType) => void;
  onBack: () => void;
}

export const ScenarioSelectionScreen: React.FC<ScenarioSelectionScreenProps> = ({ onScenarioSelect, onBack }) => {
  return (
    <Container>
      <Title>Select Scenario</Title>
      <ScenariosGrid>
        {SCENARIOS.map((scenario) => (
          <ScenarioCard
            key={scenario.type}
            onClick={() => scenario.type !== ScenarioType.CREATE_YOUR_OWN && onScenarioSelect(scenario.type)}
            disabled={scenario.type === ScenarioType.CREATE_YOUR_OWN}
          >
            <ScenarioTitle>{scenario.title}</ScenarioTitle>
            <ScenarioDescription>{scenario.description}</ScenarioDescription>

            <AgentsContainer>
              {generateAgentVariations(scenario.type).map((agentConfig) => (
                <Agent key={agentConfig.id} {...agentConfig} scenarioType={scenario.type} />
              ))}
            </AgentsContainer>
          </ScenarioCard>
        ))}
      </ScenariosGrid>
      <BackButton onClick={onBack}>BACK</BackButton>
    </Container>
  );
};
