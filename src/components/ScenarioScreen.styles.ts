import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 20px;
  background-color: #000;
  color: #fff;
  font-family: 'Press Start 2P', cursive;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 2px solid #fff;
`;

export const Title = styled.h2`
  font-size: 24px;
  margin: 0;
  color: #0ff;
`;

export const BackButton = styled.button`
  font-family: 'Press Start 2P', cursive;
  font-size: 16px;
  padding: 10px 20px;
  background-color: transparent;
  color: #fff;
  border: 2px solid #fff;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #fff;
    color: #000;
  }
`;

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
`;

export const PlaceholderText = styled.p`
  font-size: 16px;
  text-align: center;
  margin: 20px 0;
  color: #888;
`;