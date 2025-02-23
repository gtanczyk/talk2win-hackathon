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

export const BackButton = styled.button`
  font-family: 'Press Start 2P', cursive;
  font-size: 16px;
  padding: 10px 20px;
  width: fit-content;
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
export const TimeLeft = styled.div`
  font-size: 24px;
  text-align: center;
  margin: 20px 0;
  color: #fff;


`;
