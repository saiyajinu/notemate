import React from 'react'

interface Props {
    id: string;
    title: string;
    content: string;
  }

const Note = (props : Props) => {
  return (
    <div className='w-64 h-64 border relative border-gray-400 rounded-lg bg-purple-400 font-semibold'>
        <button className="absolute top-[-4px] right-[-4px] text-lg bg-black hover:bg-red-600 text-white rounded-full cursor-pointer transition duration-300 ease-out">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
        </button>
        <div className='p-4 border-b border-gray-400 bg-purple-600 text-xl'>
            {props.title}
        </div>
        <div className='p-4 text-md'>
            {props.content}
        </div>
    </div>
  )
}

export default Note