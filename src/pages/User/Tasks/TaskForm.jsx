import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button, FileField, InputField, SelectBox, Textarea } from '../../../components/Forms/FormFields';
import { useEffect } from 'react';

// Zod schema for form validation
const taskSchema = z.object({
  title: z.string().min(1, { message: 'Task Title is required' }),
  category: z.string().min(1, { message: 'Task Type is required' }),
  description: z.string().optional(),
  attachment: z.union([
    z.instanceof(File),
    z.string()
  ]).refine(file => {
    if (!file) return true; // No file is allowed
    const fileType = file.type;
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "application/pdf", "text/csv", "text/plain"];
    return allowedTypes.includes(fileType);
  }, { message: 'Only images (jpg, png, gif), PDF, CSV, or TXT files are allowed' })
});

// const _taskID = 0;

const TaskForm = () => {
  const { control, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      category: '',
      description: '',
      attachment: null,
    }
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  useEffect(() => {
    // if(0){
      // setValue("title", "Task Title 1");
    //   setValue("category", "Category 1");
    //   setValue("description", "Task Description");
    //   setValue("attachment", null); // Reset file input field
    // }
  }, [setValue,/* _taskID */])

  return (
    <>
      <h3 className="mx-9 mt-9 text-3xl font-bold dark:text-white">Task Form</h3>
      <div className="mx-9 mt-7 bg-white p-4">
        <form className="m-5" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="title"
            control={control}
            render={({ field  }) => (
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

                options={[
                  { value: 1, label: "Category 1" },
                  { value: 2, label: "Category 2" },
                  { value: 3, label: "Category 3" },
                ]}
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
                previewsrc=""
                error={errors.attachment?.message}
              />
            )}
          />

          <div className="flex justify-end">
            <Button id="submit" lable="Submit" type="submit" label="Submit" />
          </div>
        </form>
      </div>
    </>
  );
};

export default TaskForm;
