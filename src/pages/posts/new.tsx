import { Container } from "@mui/material";
import React from "react";
import { Formik, Form, Field } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";

const New: React.FC = () => {
  return (
    <Container>
      <Formik>
        <Form>
          <Field />
        </Form>
      </Formik>
    </Container>
  );
};

export default New;
