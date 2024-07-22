import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Swal from 'sweetalert2'
import * as z from 'zod';
import { Button, FileField, InputField, SelectBox, Textarea } from '../../../common/components/Forms/FormFields';
import { useEffect, useState } from 'react';
import Loader from '../../../common/components/Layout/Loader';
import { useNavigate, useParams } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/slices/UserSlice';
import { fetchCategory } from '../../../redux/slices/CategorySlice';

// Zod schema for form validation
const taskSchema = z.object({
  title: z.string().min(1, { message: 'Task Title is required' }),
  category: z.string().min(1, { message: 'Task Type is required' }),
  description: z.string().optional(),
  attachment: z.any().optional().refine(file => {
    if (!file) return true; // No file is allowed
    const fileType = file.type;
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    return allowedTypes.includes(fileType);
  }, { message: 'Only images (jpg, png, gif) files are allowed' })
});

const TaskForm = () => {

  const { loading, sendData } = useFetch();
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);

  const { _taskId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCategory());
  }, [])

  const [file, setFile] = useState({
    type: null,
    url: null
  });

  const { control, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      category: '',
      description: '',
      attachment: null,
    }
  });

  const onSubmit = async (data) => {

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('category_id', data.category);
    formData.append('description', data.description);
    if (data.attachment) {
      formData.append('attachment', data.attachment);
    }
    if (_taskId) {
      formData.append('task_id', _taskId);
    }


    try {

      const response = await sendData(`/task/api/${(!_taskId) ? 'add' : 'edit'}`, formData);

      if (response.response_type === 'success') {
        await Swal.fire(response.message);
        navigate('/user/task/list')
      } else if (response.response_type === 'unauthorized') {
        dispatch(logout());
      } else {
        await Swal.fire(response.message);
      }

    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    if (_taskId) {
      try {
        const response = await sendData(`/task/api/getTasks/${_taskId}`);

        if (response.response_type === 'success') {
          setValue("title", response.data.title);
          setValue("category", `${response.data.category_id}`);
          setValue("description", response.data.description);
          if (response.data?.attachments.length != 0) {
            setFile({
              type: (['image/gif', 'image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml'].includes(response.data.attachments[0].file_type)) ? 'image' : 'file',
              url: response.data.attachments[0].path
            })
          }
        } else {
          console.log(response.message);
          navigate('/user/task/list')
        }

      } catch (error) {
        console.log(error);
        navigate('/user/task/list')

      }
    }
  }

  useEffect(() => {
    if (_taskId) {
      fetchData();
    }
  }, [setValue, _taskId])

  return (
    <>
      {loading && <Loader />}
      <h3 className="mx-9 mt-9 text-3xl font-bold dark:text-white">Task Form</h3>
      <div className="mx-9 mt-7 bg-white p-4">
        <form className="m-5" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                ref={null}
                id="title"
                name="title"
                type="text"
                placeholder="Enter Task Title"
                label="Task Title *"
                error={errors.title?.message}
              />
            )}
          />

          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <SelectBox
                {...field}
                id="category"
                label="Task Type *"
                ref={null}

                options={category.category.data}
                error={errors.category?.message}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Textarea
                {...field}
                id="description"
                label="Description"
                ref={null}
                error={errors.description?.message}
              />
            )}
          />

          <Controller
            name="attachment"
            control={control}
            render={({ field }) => (
              <FileField
                id="attachment"
                name="attachment"
                label="Attachment"
                onChange={(e) => {
                  field.onChange(e.target.files[0]);
                }}
                previewsrc={file}
                error={errors.attachment?.message}
              />
            )}
          />

          <div className="flex justify-end">
            <Button id="submit" lable={_taskId ? 'Update' : 'Submit'} type="submit" label="Submit" />
          </div>
        </form>
      </div>
    </>
  );
};

export default TaskForm;
