import React from 'react'
import styles from '@/styles/filterNote.module.css';

const FilterNote = (props: any) => {
  return (
    <input
          className="max-w-96 w-[80%] h-8 my-4 rounded-lg border border-gray-400 p-1"
          type="text"
          placeholder="Filter by title or content"
          value={props.filter}
          onChange={(e) => props.setFilter(e.target.value)}
        />
  )
}

export default FilterNote