import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import questionnaire from "../assets/questionnaire.json";
import styled from "styled-components";
import * as Yup from "yup";
import { isValidDate } from "../helper";

const FormContainer = styled(Form)`
  display: flex;
  flex-direction: column;
  @media only screen and (min-width: 768px) {
    width: 500px;
  }
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

const FieldContainer = styled.div`
  margin: 10px 0;
  display: flex;
  flex-direction: column;
`;

const CheckBoxContainer = styled.div`
  margin: 10px 0;
`;

const Error = styled.span`
  color: red;
`;

const encodeLinkId = (linkId) => Buffer.from(linkId).toString("base64");

const generateInitialValues = (items, values) => {
  items.forEach((item) => {
    if (item.item) {
      generateInitialValues(item.item, values);
    } else {
      let initialVal;
      switch (item.type) {
        case "boolean":
          initialVal = false;
          break;
        case "date":
          initialVal = "";
          break;
        case "string":
          initialVal = "";
          break;
        default:
          break;
      }
      values[encodeLinkId(item.linkId)] = initialVal;
    }
  });
  return values;
};

const generateValidationSchema = (items, schema) => {
  items.forEach((item) => {
    if (item.item) {
      generateValidationSchema(item.item, schema);
    } else {
      let initialVal;
      switch (item.type) {
        case "date":
          initialVal = Yup.string()
            .required(`This field is required`)
            .test(
              "test-date",
              "Invalid Date format, please use YYYY/MM/DD",
              (value) => isValidDate(value)
            );
          break;
        case "string":
          initialVal = Yup.string()
            .required(`This field is required`)
            .max(20, "Too Long!");
          break;
        default:
          break;
      }
      schema[encodeLinkId(item.linkId)] = initialVal;
    }
  });
  return Yup.object().shape(schema);
};

const generateForm = (items, list) => {
  items.forEach((item) => {
    if (item.item) {
      list.push(<FieldContainer key={item.linkId}>{item.text}</FieldContainer>);
      generateForm(item.item, list);
    } else {
      let elem;
      const name = encodeLinkId(item.linkId);
      switch (item.type) {
        case "boolean":
          elem = (
            <CheckBoxContainer key={item.linkId}>
              <Field name={name} type="checkbox" />
              <label>{item.text}</label>
              <Error>
                <ErrorMessage name={name} />
              </Error>
            </CheckBoxContainer>
          );
          break;
        case "date":
          elem = (
            <FieldContainer key={item.linkId}>
              <div>{item.text}</div>
              <Field name={name} />
              <Error>
                <ErrorMessage name={name} />
              </Error>
            </FieldContainer>
          );
          break;
        case "string":
          elem = (
            <FieldContainer key={item.linkId}>
              <div>{item.text}</div>
              <Field name={name} />
              <Error>
                <ErrorMessage name={name} />
              </Error>
            </FieldContainer>
          );
          break;
        default:
          break;
      }
      list.push(elem);
    }
  });
  return list;
};

const generateResponseItems = (items, values) => {
  return items.map((i) => {
    if (i.item) {
      return { ...i, item: generateResponseItems(i.item, values) };
    } else {
      return {
        linkId: i.linkId,
        text: i.text,
        answer: values[encodeLinkId(i.linkId)],
      };
    }
  });
};

const initialValues = generateInitialValues(questionnaire.item, {});

const schema = generateValidationSchema(questionnaire.item, {});

export default function Questionnaire() {
  const [formList, setFormList] = useState([]);
  const [response, setResponse] = useState(null);
  const [initialVal] = useState(initialValues);

  useEffect(() => {
    const initialList = [];
    const list = generateForm(questionnaire.item, initialList);
    setFormList(list);
  }, [setFormList]);

  return (
    <Formik
      validationSchema={schema}
      initialValues={initialVal}
      onSubmit={(values) => {
        const item = generateResponseItems(questionnaire.item, values);
        const response = {
          Identifier: {
            value: questionnaire.id,
          },
          status: questionnaire.status,
          subject: questionnaire.subjectType,
          item,
        };
        setResponse(JSON.stringify(response, null, 4));
        console.log(JSON.parse(JSON.stringify(response, null, 4)));
      }}
    >
      <FormContainer>
        {[...formList]}
        <button type="submit">Submit</button>
        {response && (
          <pre>
            {/* <ul>
              {JSON.parse(response).item.map((item) => {
                if (!item.item) {
                  return <li>{item.text}</li>;
                } else {
                  item.item.map((subitem) => {
                    console.log(subitem.text);
                    return <li>{subitem.text}</li>;
                  });
                }
              })}
            </ul> */}
            {response}
          </pre>
        )}
        {}
      </FormContainer>
    </Formik>
  );
}
