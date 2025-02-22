import React from 'react';
import { createRoot } from 'react-dom/client';
import { createGlobalStyle } from 'styled-components';
import { IntroScreen } from './components/IntroScreen';
import { ScenarioSelectionScreen } from './components/ScenarioSelectionScreen';
import { ScenarioScreen } from './components/ScenarioScreen';
import { ScenarioType } from './types';

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    body {
        font-family: Arial, sans-serif;
        overflow-x: hidden;
    }
`;

enum GameScreen {
    INTRO = 'INTRO',
    SCENARIO_SELECTION = 'SCENARIO_SELECTION',
    SCENARIO = 'SCENARIO'
}

const App: React.FC = () => {
    const [currentScreen, setCurrentScreen] = React.useState<GameScreen>(GameScreen.INTRO);
    const [selectedScenario, setSelectedScenario] = React.useState<ScenarioType | null>(null);

    const handleStart = () => {
        setCurrentScreen(GameScreen.SCENARIO_SELECTION);
    };

    const handleScenarioSelect = (scenario: ScenarioType) => {
        setSelectedScenario(scenario);
        setCurrentScreen(GameScreen.SCENARIO);
    };

    const handleBackToIntro = () => {
        setCurrentScreen(GameScreen.INTRO);
        setSelectedScenario(null);
    };

    const handleBackToScenarioSelection = () => {
        setCurrentScreen(GameScreen.SCENARIO_SELECTION);
        setSelectedScenario(null);
    };

    return (
        <>
            <GlobalStyle />
            {currentScreen === GameScreen.INTRO && (
                <IntroScreen onStart={handleStart} />
            )}
            {currentScreen === GameScreen.SCENARIO_SELECTION && (
                <ScenarioSelectionScreen
                    onScenarioSelect={handleScenarioSelect}
                    onBack={handleBackToIntro}
                />
            )}
            {currentScreen === GameScreen.SCENARIO && selectedScenario && (
                <ScenarioScreen
                    scenarioType={selectedScenario}
                    onBack={handleBackToScenarioSelection}
                />
            )}
        </>
    );
};

const container = document.getElementById('root');
if (!container) {
    throw new Error('Failed to find the root element');
}

const root = createRoot(container);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);