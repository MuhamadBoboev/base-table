import { Box, Button, Modal, TextField, Typography, Fade, Backdrop } from "@mui/material";
import { useMutation } from "react-query";
import { postQuery, queryClient } from "@shared/api";
import toast from "react-hot-toast";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

interface CreatePostModalProps {
  open: boolean;
  handleClose: () => void;
}

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  author: Yup.string().required("Author is required"),
  views: Yup.number().required("Views are required").min(0, "Views cannot be negative"),
  likes: Yup.number().required("Likes are required").min(0, "Likes cannot be negative"),
  comments: Yup.number().required("Comments are required").min(0, "Comments cannot be negative"),
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
          width: 500,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          outline: 'none',
        }}>
          <Typography id="modal-modal-title" variant="h6" component="h2" gutterBottom>
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
            {({ isSubmitting, isValid, dirty, touched, errors }) => (
              <Form>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <Field 
                    as={TextField} 
                    name="title" 
                    label="Title" 
                    variant="outlined" 
                    fullWidth 
                    error={touched.title && !!errors.title}
                    helperText={<ErrorMessage name="title" />}
                  />
                  <Field 
                    as={TextField} 
                    name="author" 
                    label="Author" 
                    variant="outlined" 
                    fullWidth 
                    error={touched.author && !!errors.author}
                    helperText={<ErrorMessage name="author" />}
                  />
                  <Field 
                    as={TextField} 
                    name="views" 
                    label="Views" 
                    variant="outlined" 
                    fullWidth 
                    type="number" 
                    error={touched.views && !!errors.views}
                    helperText={<ErrorMessage name="views" />}
                  />
                  <Field 
                    as={TextField} 
                    name="likes" 
                    label="Likes" 
                    variant="outlined" 
                    fullWidth 
                    type="number" 
                    error={touched.likes && !!errors.likes}
                    helperText={<ErrorMessage name="likes" />}
                  />
                  <Field 
                    as={TextField} 
                    name="comments" 
                    label="Comments" 
                    variant="outlined" 
                    fullWidth 
                    type="number" 
                    error={touched.comments && !!errors.comments}
                    helperText={<ErrorMessage name="comments" />}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, gridGap: 10 }}>
                    <Button onClick={handleClose} fullWidth color="error" variant="outlined">
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      fullWidth 
                      color="success" 
                      variant="contained" 
                      disabled={isSubmitting || !isValid || !dirty}
                    >
                      Submit
                    </Button>
                  </Box>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Fade>
    </Modal>
  );
};
