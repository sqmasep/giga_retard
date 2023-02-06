import { Container, Stack, TextField } from "@mui/material";
import React from "react";
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { trpc } from "@/utils/trpc";
import { z } from "zod";
import LoadingButton from "@mui/lab/LoadingButton";
import { newPostSchema } from "@/server/trpc/router/validation/posts";
import StyledTextField from "@/components/TextField";

type NewPost = z.infer<typeof newPostSchema>;

const New: React.FC = () => {
  const newMutation = trpc.posts.new.useMutation();
  const handleSubmit = (
    { title, description }: NewPost,
    helpers: FormikHelpers<NewPost>
  ) => {
    newMutation.mutate({ title, description });
    helpers.resetForm();
  };
  console.log(newMutation);
  return (
    <Container>
      <Formik
        initialValues={{ description: "", title: "" }}
        onSubmit={handleSubmit}
        validationSchema={toFormikValidationSchema(newPostSchema)}
      >
        {({ errors, touched }) => (
          <Form>
            <Stack direction='column' gap={4}>
              <Field
                as={StyledTextField}
                name='title'
                error={errors.title && touched.title}
                label='Titre'
                helperText={touched.title && errors.title}
              />
              <Field
                as={StyledTextField}
                name='description'
                error={errors.description && touched.description}
                label='Description'
                helperText={touched.description && errors.description}
              />
              <LoadingButton
                fullWidth
                variant='contained'
                loading={newMutation.isLoading}
                type='submit'
              >
                Créer le post
              </LoadingButton>
            </Stack>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default New;
