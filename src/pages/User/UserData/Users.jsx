import { useCallback, useEffect, useState } from "react";
import DynamicTable from "../../../common/components/Tables/DynamicTable";
import useFetch from "../../../hooks/useFetch";


const Users = () => {

  const { loading, sendData } = useFetch();
  const [users, setUsers] = useState([]);

  useEffect(() => {

    (async function fetchUsers() {

      try {
        const response = await sendData(`/users/api/userlist`);
        setUsers(response.data)
        
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
    { Header: 'Role', accessor: 'role.role_name' },
    { Header: 'Registation Date', accessor: 'created_at' },
  ];

  return (
    <>
      <h3 className="mx-9 mt-9 text-3xl font-bold dark:text-white">User List</h3>

      <div className="mx-9 mt-7 bg-white p-4">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-5" >
          <DynamicTable columns={columns} data={[]} />
        </div>
      </div>
    </>
  )
}

export default Users