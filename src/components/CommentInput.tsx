import useSnackbar from "@/hooks/useSnackbar";
import { newCommentSchema } from "@/server/trpc/router/validation/comment";
import { trpc } from "@/utils/trpc";
import { TextField } from "@mui/material";
import { Field, Form, Formik, FormikHelpers } from "formik";
import React from "react";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

type Values = z.infer<typeof newCommentSchema>;

const CommentInput: React.FC<{ postId: string }> = ({ postId }) => {
  const snackbar = useSnackbar();
  const utils = trpc.useContext();

  const commentMutation = trpc.comments.new.useMutation({
    onSuccess: () => {
      utils.posts.byPostId.invalidate({ postId });
    },
  });

  const handleSubmit = (values: Values, helpers: FormikHelpers<Values>) => {
    commentMutation.mutate({ comment: values.comment, postId });

    // FIXME: working the 2nd time
    commentMutation.isSuccess && helpers.resetForm();
  };

  return (
    <Formik
      initialValues={{ comment: "" }}
      validationSchema={toFormikValidationSchema(newCommentSchema)}
      onSubmit={handleSubmit}
    >
      <Form>
        <Field as={TextField} placeholder='test' name='comment' fullWidth />
      </Form>
    </Formik>
  );
};

export default CommentInput;
