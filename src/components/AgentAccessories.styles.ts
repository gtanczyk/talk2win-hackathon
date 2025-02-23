import styled from 'styled-components';

export const Hat = styled.div`
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 36px;
  height: 20px;
  background-color: #333;
  border: 2px solid #000;
  border-radius: 5px 5px 0 0;

  /* Hat brim */
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: -6px;
    width: 44px;
    height: 4px;
    background-color: #333;
    border: 2px solid #000;
    border-radius: 2px;
  }

  /* Hat band */
  &::before {
    content: '';
    position: absolute;
    bottom: 4px;
    left: 0;
    width: 100%;
    height: 4px;
    background-color: #666;
    border-radius: 2px;
  }
`;
