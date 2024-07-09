import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button, FileField, InputField, SelectBox, Textarea } from '../../../components/Forms/FormFields';
import { useEffect } from 'react';

// ...

const TaskForm = () => {
  // ...

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('category', data.category);
    formData.append('description', data.description);
    formData.append('attachment', data.attachment);

    fetch('/tasks', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Task created successfully:', data);
      })
      .catch((error) => {
        console.error('Error creating task:', error);
      });
  };

  // ...
};

export default TaskForm;