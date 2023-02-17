import {
  Container,
  FormControlLabel,
  IconButton,
  Snackbar,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { trpc } from "@/utils/trpc";
import { z } from "zod";
import LoadingButton from "@mui/lab/LoadingButton";
import { newPostSchema } from "@/server/trpc/router/validation/posts";
import useToggle from "@/hooks/useToggle";
import { Close } from "@mui/icons-material";
import Head from "next/head";

type NewPost = z.infer<typeof newPostSchema>;

const New: React.FC = () => {
  const [snackbarOpen, toggleSnackbar] = useToggle();
  const newMutation = trpc.posts.new.useMutation();

  const handleSubmit = (
    { title, description }: NewPost,
    helpers: FormikHelpers<NewPost>
  ) => {
    newMutation.mutate({ title, description });
    newMutation.isSuccess && helpers.resetForm();

    toggleSnackbar(true);
  };

  return (
    <Container>
      <Head>
        <title>giga-retard - nouveau post</title>
      </Head>
      <Formik
        initialValues={{ description: "", title: "", private: false }}
        onSubmit={handleSubmit}
        validationSchema={toFormikValidationSchema(newPostSchema)}
      >
        {({ errors, touched, handleChange, handleBlur, values }) => (
          <Form>
            <pre>{JSON.stringify(values, null, 2)}</pre>

            <Stack direction='column' gap={4}>
              <FormControlLabel
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.private}
                label='Seulement mes amis'
                control={<Switch />}
                name='private'
              />
              <Field
                as={TextField}
                name='title'
                error={errors.title && touched.title}
                label='Titre'
                helperText={touched.title && errors.title}
              />
              <Field
                as={TextField}
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
      <Snackbar
        open={snackbarOpen}
        onClose={() => toggleSnackbar(false)}
        message={newMutation.isSuccess && "Le post a été créé avec succès !"}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        action={
          <IconButton onClick={() => toggleSnackbar(false)}>
            <Close />
          </IconButton>
        }
      />
    </Container>
  );
};

export default New;
