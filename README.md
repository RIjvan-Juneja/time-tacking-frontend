import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, FileField, InputField, SelectBox, Textarea } from '../../../components/Forms/FormFields';

// Define Zod schema for validation
const TaskFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  category: z.number().nullable().refine((v) => v !== null, 'Task Type is required'),
  description: z.string().min(1, 'Description is required'),
  attachment: z.any().optional().refine((v) => {
    if (!v) return true;
    const allowedMimeTypes = ['text/plain', 'image/jpeg', 'image/png', 'application/pdf', 'text/csv'];
    return allowedMimeTypes.includes(v[0].type);
  }, 'Invalid file type. Only .txt, .jpg, .png, .pdf, and .csv files are allowed.'),
});

const TaskForm = () => {

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(TaskFormSchema),
  });

  const handelInputChange = (e) => {
    console.log(e.target.value);
  }

  const categoryOption = [
    { value: null, label: "Select Task Type" },
    { value: 1, label: "Category 1" },
    { value: 2, label: "Category 2" },
    { value: 3, label: "Category 3" },
  ]

  const onSubmit = (data) => {
    console.log(data);
  }



  return (
    <div>
      <h3 className=" mx-9 mt-9 text-3xl font-bold dark:text-white">Task Form</h3>
      <div className="mx-9 mt-7 bg-white p-4">
        <form className="m-5" onSubmit={handleSubmit(onSubmit)}>
          <InputField id="title" name="title" value={''} type="text" placeholder="Enter Task Title" label="Task Title *" {...register('title')} error={errors.title?.message} />
          <SelectBox id="category" value={''} label="Task Type *" options={categoryOption} {...register('category')} error={errors.category?.message} />
          <Textarea id="description" label="Description *" {...register('description')} error={errors.description?.message} />
          <FileField id="attachment" name="attachment" error={errors.attachment?.message} {...register('attachment')} label="Attachment" previewsrc={''} />
          <div className="flex justify-end">
            <Button id="submit" type="submit" lable="Submit" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskForm


import { Button, FileField, InputField, SelectBox, Textarea } from '../../../components/Forms/FormFields';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Define Zod schema for validation
const TaskFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  category: z.number().nullable().refine((v) => v !== null, 'Task Type is required'),
  description: z.string().min(1, 'Description is required'),
  attachment: z.any().optional().refine((v) => {
    if (!v) return true;
    const allowedMimeTypes = ['text/plain', 'image/jpeg', 'image/png', 'application/pdf', 'text/csv'];
    return allowedMimeTypes.includes(v[0].type);
  }, 'Invalid file type. Only .txt, .jpg, .png, .pdf, and .csv files are allowed.'),
});

const TaskForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(TaskFormSchema),
  });

  const handleInputChange = (e) => {
    console.log(e.target.value);
  }

  const handleSubmitForm = (data) => {
    
    console.log(data);
  }

  const categoryOptions = [
    { value: null, label: "Select Task Type" },
    { value: 1, label: "Category 1" },
    { value: 2, label: "Category 2" },
    { value: 3, label: "Category 3" },
  ];

  return (
    <>
      <h3 className=" mx-9 mt-9 text-3xl font-bold dark:text-white">Task Form</h3>
      <div className="mx-9 mt-7 bg-white p-4">
        <form className="m-5" onSubmit={handleSubmit(handleSubmitForm)}>
          <InputField id="title" name="title" type="text" placeholder="Enter Task Title" label="Task Title *" {...register('title')} onChange={handleInputChange} error={errors.title?.message} />
          <SelectBox id="category" label="Task Type *" options={categoryOptions} {...register('category')} onChange={handleInputChange} error={errors.category?.message} />
          <Textarea id="description" label="Description *" {...register('description')} onChange={handleInputChange} error={errors.description?.message} />
          <FileField id="attachment" name="attachment" error={errors.attachment?.message} {...register('attachment')} onChange={(e) => { console.log(e.target.files[0]) }} label="Attachment" previewsrc={''} />
          <div className="flex justify-end">
            <Button id="submit" type="submit" label="Submit" />
          </div>
        </form>
      </div>
    </>
  );
};

export default TaskForm;