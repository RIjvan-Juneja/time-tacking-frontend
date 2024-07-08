import { Button, FileField, InputField, SelectBox, Textarea } from '../../../components/Forms/FormFields';

const TaskForm = () => {

  const handelInputChange = (e) => {
    console.log(e.value);
  }

  const categoryOption = [
    { value: 1, label: "Category 1" },
    { value: 2, label: "Category 2" },
    { value: 3, label: "Category 3" },
  ]

  return (
    <>
      <h3 className=" mx-9 mt-9 text-3xl font-bold dark:text-white">Task Form</h3>
      <div className="mx-9 mt-7 bg-white p-4">
        <form className="m-5">
          <InputField id="title" name="title" value={``} type="text" placeholder="Enter Task Title" label="Task Title *" onChange={handelInputChange} error={``} />
          <SelectBox id="category" value={2} label="Task Type *" options={categoryOption} onChange={handelInputChange} error={``} />
          <Textarea id="description" label="Description *" error={``} onChange={handelInputChange} />
          <FileField id="attachment" name="attachment" error={``} onChange={(e)=>{console.log(e)}} label="Attachment" previewsrc={``} />
          <div className="flex justify-end">
            <Button id="submit" type="submit" lable="Submit" onClick={handelInputChange} />
          </div>
        </form>

      </div>
    </>
  )

}

export default TaskForm