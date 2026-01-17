import styled from 'styled-components';

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ToggleContainer = styled.div`
  width: 200px;
  height: 40px;
  border-radius: 20px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: ${props => props.isActive ? 'flex-end' : 'flex-start'};
  padding: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  position: relative; // For absolute positioning of labels
`;

const ToggleButton = styled.div`
  width: 50%;
  height: 100%;
  background-color: #4CAF50;
  border-radius: 18px;
  transition: all 0.3s ease;
`;

const Label = styled.span`
  position: absolute;
  color: #333;
  font-weight: bold;

  &:first-child {
    left: 10px;
  }

  &:last-child {
    right: 10px;
  }
`;

const Toggle = ({ onToggle, isActive }) => {

  return (
    <CenteredContainer>
      <ToggleContainer isActive={isActive} onClick={onToggle}>
        <Label>Fresh</Label> 
        <ToggleButton />
        <Label>Relished</Label>
      </ToggleContainer>
    </CenteredContainer>
  );
}

export default Toggle;
