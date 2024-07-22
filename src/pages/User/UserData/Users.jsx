import { useEffect, useState } from "react";
import DynamicTable from "../../../common/components/Tables/DynamicTable";
import useFetch from "../../../hooks/useFetch";
import { format } from "date-fns";
import Loader from "../../../common/components/Layout/Loader";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/slices/UserSlice";



const Users = () => {

  const { loading, sendData } = useFetch();
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {

    (async function fetchUsers() {

      try {
        const response = await sendData(`/users/api/userlist`);
        if(response.response_type === 'unauthorized'){
          dispatch(logout());
        }
        const formattedUsers = response.data.map(user => ({
          ...user,
          role_name: user.role.role_name,
          created_at: format(new Date(user.created_at), 'yyyy-MM-dd HH:mm:ss'),
        }));
        setUsers(formattedUsers)
        
      } catch (error) {
        console.log(error);
      }
    }
    )()
  },[])

  const columns = [
    { Header: 'User Id', accessor: 'id' },
    { Header: 'First Name', accessor: 'first_name' },
    { Header: 'Last Name', accessor: 'last_name' },
    { Header: 'Email', accessor: 'email' },
    { Header: 'Mobile Number', accessor: 'mobile_number' },
    { Header: 'Role', accessor: 'role_name', },
    { Header: 'Registation Date', accessor: 'created_at' },
  ];

  return (
    <>
      {loading && <Loader />}
      <h3 className="mx-9 mt-9 text-3xl font-bold dark:text-white">User List</h3>

      <div className="mx-9 mt-7 bg-white p-4">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-5" >
          <DynamicTable columns={columns} data={users} dataPerPage={5} />
        </div>
      </div>
    </>
  )
}

export default Users