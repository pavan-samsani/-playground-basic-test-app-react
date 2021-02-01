import React from 'react';
import styled from 'styled-components';
import { VIEWS } from '../Constants';

const Container = styled.div`
  display: flex;
`;

const ViewButton = styled.button`
  margin: 10px;
  background-color: rgb(29, 161, 242);
  padding: 8px 16px;
  border-radius: 21px;
  border: 0;
  color: #fff;
  font-weight: bolder;
  font-size: 16px;
  cursor: pointer;`

const Button = styled.button`
  margin: 0 10px;
`;

export default function ViewSwitch({
  onViewChange
}) {
  return (
    <Container>
      <ViewButton onClick={() => onViewChange(VIEWS.PATIENT)}>Patient</ViewButton>
      <ViewButton onClick={() => onViewChange(VIEWS.QUESTIONNAIRE)}>Questionnaire</ViewButton>
      <ViewButton onClick={() => onViewChange(VIEWS.PRACTITIONER)}>Practitioner</ViewButton>
    </Container>
  )
}
