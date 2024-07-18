import React from 'react'

const CounterCard = ({ icon, title ,data }) => {
  return (
    <>
      <div className='border h-[130px] p-4 flex justify-center items-center shadow-md rounded-md'>
        <div className="rounded-full border-dashed border-2 border-indigo-600 flex justify-center items-center h-[75px] w-[75px]"> { icon }</div>
        <div>
          <h4 className='ml-5'>{ title }</h4>
          <span className='ml-5 text-4xl'> {data} </span>
        </div>
      </div>
    </>
  )
}

export default CounterCard