import { InputField } from '../../../components/Forms/FormFields';

// id, name, label, type, value, placeholder, error, onChange
const TaskForm = () => {

  const handelInputChange = (e) =>{
    console.log(e.value);
  }

  return (
    <>
      <h3 className=" mx-9 mt-9 text-3xl font-bold dark:text-white">Task Form</h3>
      <div className="mx-9 mt-7 bg-white p-4">
        <form className="mx-auto">
          <InputField id="title" value={``} type="text" placeholder="Enter Task Title" label="Task Title" onChange={handelInputChange}  error={``} />
        </form>
      </div>
    </>
  )
}

export default TaskForm