import { NavLink, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../../../redux/slices/TasksSlice';
import { useCallback, useEffect, useState } from "react";
import DynamicTable from "../../../common/components/Tables/DynamicTable";
import { filterTasksByCategory } from '../../../redux/slices/TasksSlice';
import Swal from 'sweetalert2'
import TaskDetails from "./TaskDetails";
import useFetch from "../../../hooks/useFetch";
import { logout } from "../../../redux/slices/UserSlice";
import Loader from "../../../common/components/Layout/Loader";


const TaskList = () => {

  const { loading, sendData } = useFetch();
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.task);
  console.log(tasks, "tasks")
  const [selectedTask, setSelectedTask] = useState(null);
  // const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();


  const viewSelectedTask = useCallback((_id) => {
    setSelectedTask(tasks.filteredData.find((task) => task.id === _id));
  }, [tasks.filteredData])

  useEffect(() => {
    if (tasks.status === 'idle') {
      dispatch(fetchTasks());
    }
  }, []);

  if (tasks.status === 'failed') {
    return <div>Error: {tasks.error}</div>;
  }

  const handleDeleteTask = async (_id) => {
    const swals = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    })

    if (swals.isConfirmed) {

      const response = await sendData(`/task/api/delete/${_id}`);
      console.log(response);
      if (response.response_type === 'deleted') {
        Swal.fire({
          title: "Deleted!",
          text: "Your task has been deleted.",
          icon: "success"
        });
        dispatch(fetchTasks());
      } else if (response.response_type === 'unauthorized') {
        dispatch(logout());
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
        console.log(response.message);
      }

    }
  }

  const columns = [
    { Header: 'Id', accessor: 'id' },
    { Header: 'Title', accessor: 'title' },
    {
      Header: 'Task Type', accessor: '',
      Cell: (_, row) => (
        <>
          {row.category?.name}
        </>
      )
    },
    { Header: 'Description', accessor: 'description' },
    {
      Header: 'Action', accessor: 'action',
      Cell: (_, row) => (

        <>
          <button type='button' onClick={() => navigate(`/user/task/form/${row.id}`)} className="font-medium ml-2 mr-4 text-green-600 dark:text-red-500 hover:underline">
            <i className='bx bxs-edit text-xl'></i>
          </button>
          <button type='button' onClick={() => handleDeleteTask(row.id)} className="font-medium ml-2 text-red-600 mr-4 dark:text-red-500 hover:underline">
            <i className='bx bxs-trash-alt text-xl'></i>
          </button>
          <button type='button' onClick={() => viewSelectedTask(row.id)} className="font-medium ml-2 text-cyan-600 dark:text-red-500 hover:underline">
            <i className='bx bxs-binoculars text-xl'></i>
          </button>
        </>
      )
    }
  ];

  const filterTask = (e) => {
    dispatch(filterTasksByCategory(e.target.value));
  }

  return (
    <>
      { (tasks.status === 'loading' || loading) && <Loader />  }
      <div className="flex justify-between">
        <h3 className="mx-9 mt-9 text-3xl font-bold dark:text-white">Task List</h3>
        <div className="mt-12 mr-7">
          <NavLink to='/task/form' className="text-white cursor-pointer bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Add Task</NavLink>
        </div>
      </div>
      <div className="mx-9 mt-7 bg-white p-4">

        <div className="flex flex-wrap justify-between">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-[1050px] p-5" >
            <select onChange={filterTask} id="small" className="block absolute w-[270px] p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option selected value='0'>All Tasks</option>
              <option value="1">Personal</option>
              <option value="2">Work</option>
            </select>
            <DynamicTable columns={columns} data={tasks.filteredData} />
          </div>
          <div className="w-[480px] h-auto shadow-md p-5">
            <TaskDetails data={selectedTask} />
          </div>
        </div>
      </div>
    </>
  )
}

export default TaskList