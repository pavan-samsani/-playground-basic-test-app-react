import React, { useCallback } from "react";
import styled from "styled-components";
import moment from "moment";
import PropTypes from "prop-types";

const CardContainer = styled.div`
  background-color: #22303c;
  color: #fff;
  width: 400px;
  border-radius: 0.75rem;
  box-shadow: 0 22px 70px 4px rgba(0, 0, 0, 0.56), 0 0 0 1px rgba(0, 0, 0, 0.3);
  margin: 15px;

  display: grid;
  grid-template-columns: 40% auto;

  align-items: center;

  will-change: transform;
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.25s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 32px 80px 14px rgba(0, 0, 0, 0.36),
      0 0 0 1px rgba(0, 0, 0, 0.3);
  }
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

const CardContent = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 10px;
  button {
    margin: 10px;
  }
`;

const Img = styled.img`
  margin-left: 50px !important;
`;

function PractitionerCard({ id, photo, name, gender, dob, onDelete }) {
  const getName = useCallback(() => {
    return Boolean(name.replace(/ /g, "")) ? name : "N/A";
  }, [name]);

  const getGender = useCallback(() => {
    return gender ? gender : "N/A";
  }, [gender]);

  const getDob = useCallback(() => {
    return dob ? moment(dob).format("YYYY/MM/DD") : "N/A";
  }, [dob]);

  return (
    <CardContainer>
      <Img
        className="img"
        src={photo}
        alt="Avatar"
        style={{ height: 50, width: 50, borderRadius: "50%" }}
      />
      <CardContent>
        <div>Name: {getName()}</div>
        <div>Gender: {getGender()}</div>
        <div>Date of birth: {getDob()}</div>
        <ViewButton classname="button" onClick={() => onDelete(id)}>
          Delete
        </ViewButton>
      </CardContent>
    </CardContainer>
  );
}

PractitionerCard.propTypes = {
  id: PropTypes.string.isRequired,
  photo: PropTypes.string,
  name: PropTypes.string,
  gender: PropTypes.string,
  dob: PropTypes.string,
};

export default PractitionerCard;
