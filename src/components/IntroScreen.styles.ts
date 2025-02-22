import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #000;
    color: #fff;
`;

export const Title = styled.h1`
    font-family: 'Press Start 2P', cursive;
    font-size: 48px;
    text-align: center;
    margin-bottom: 40px;
    text-shadow: 0 0 10px #fff;
    animation: pulse 2s infinite;

    @keyframes pulse {
        0% {
            text-shadow: 0 0 10px #fff;
        }
        50% {
            text-shadow: 0 0 20px #fff, 0 0 30px #0ff;
        }
        100% {
            text-shadow: 0 0 10px #fff;
        }
    }
`;

export const StartButton = styled.button`
    font-family: 'Press Start 2P', cursive;
    font-size: 24px;
    padding: 20px 40px;
    background-color: #000;
    color: #fff;
    border: 2px solid #fff;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background-color: #fff;
        color: #000;
        transform: scale(1.1);
    }
`;