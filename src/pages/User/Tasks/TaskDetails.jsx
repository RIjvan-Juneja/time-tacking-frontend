import React from 'react'
import { compareAsc, format } from "date-fns";
import { Button } from '../../../common/components/Forms/FormFields';

const TaskDetails = ({ data }) => {
  console.log(data, "in details");
  if (!data) return (<>No Records Found</>)
  return (
    <>
      <div className="grid grid-cols-2 gap-4 mt-5 mb-3">
        <Button type="button" lable="start" />
        <Button type="button" lable="puase" isDisabled='false' />
      </div>
      <hr />
      <div className='mt-5'>
        <h1 className='mb-2'>Task ID : {data.id} </h1>
        <a href={data.attachments[0]?.path} target="_blank">attachment : <span className='text-indigo-600'> click Here </span></a>
        <div className="flex grid-cols-2 gap-3 mt-3 mb-3">
          <p className='w-[265px]'>Start From : {format(data.created_at, "yyyy-MM-dd HH:MM:SS")} </p>
          <p>Total Hours : </p>
        </div>
        <h3 className='mb-3'> Today Logs</h3>
        <hr />
        <div className="mt-8">
          <div className="flex items-center p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800" role="alert">
            <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">Info alert!</span> Change a few things up and try submitting .
            </div>
          </div>
          <div className="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
            <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">Success alert!</span> Change a few things up and
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TaskDetails