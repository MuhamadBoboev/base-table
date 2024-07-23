import { Box, Button, Modal, TextField, Typography, Fade, Backdrop } from "@mui/material";
import { useMutation } from "react-query";
import { postQuery, queryClient } from "@shared/api";
import toast from "react-hot-toast";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

interface CreatePostModalProps {
  open: boolean;
  handleClose: () => void;
}

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  author: Yup.string().required("Author is required"),
});

export const CreatePostModal: React.FC<CreatePostModalProps> = ({ open, handleClose }) => {
  const mutation = useMutation(postQuery('posts'), {
    onSuccess: () => {
      toast.success('Post created');
      queryClient.invalidateQueries('posts');
    },
    onError: () => {
      toast.error('Error');
    }
  });

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Fade in={open}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create New Post
          </Typography>
          <Formik
            initialValues={{ title: '', author: '', views: 0, likes: 0, comments: 0 }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              mutation.mutate(values);
              setSubmitting(false);
              handleClose();
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Field as={TextField} name="title" label="Title" variant="outlined" />
                  <Field as={TextField} name="author" label="Author" variant="outlined" />
                  <Button type="submit" variant="contained" disabled={isSubmitting}>
                    Submit
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Fade>
    </Modal>
  );
};
