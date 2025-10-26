import css from './NoteForm.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import { Field, Form, Formik, type FormikHelpers, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { type NewNote } from '@/types/note';

const validateForm = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .max(50, 'Title is too long')
    .required('Title is required'),
  content: Yup.string().max(500, 'Content is too long'),
  tag: Yup.string()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'] as const)
    .required('Tag is required'),
});

interface NoteFormProps {
  onClose: () => void;
}
const initialValues: NewNote = {
  title: '',
  content: '',
  tag: 'Todo',
};

const NoteForm = ({ onClose }: NoteFormProps) => {
  const queryClient = useQueryClient();

  const handleCreateNote = (
    values: NewNote,
    actions: FormikHelpers<NewNote>
  ) => {
    mutationCreateNote.mutate(values, {
      onSuccess: () => {
        actions.resetForm();
      },
    });
  };

  const mutationCreateNote = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onClose();
    },
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleCreateNote}
      validationSchema={validateForm}>
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor='title'>Title</label>
          <Field id='title' type='text' name='title' className={css.input} />
          <ErrorMessage component='span' name='title' className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor='content'>Content</label>
          <Field
            as='textarea'
            id='content'
            name='content'
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage component='span' name='content' className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor='tag'>Tag</label>
          <Field as='select' id='tag' name='tag' className={css.select}>
            <option value='Todo'>Todo</option>
            <option value='Work'>Work</option>
            <option value='Personal'>Personal</option>
            <option value='Meeting'>Meeting</option>
            <option value='Shopping'>Shopping</option>
          </Field>
          <ErrorMessage component='span' name='tag' className={css.error} />
        </div>

        <div className={css.actions}>
          <button type='button' className={css.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button type='submit' className={css.submitButton} disabled={false}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default NoteForm;
