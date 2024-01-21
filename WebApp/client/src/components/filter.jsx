import React, { useState } from 'react';
import SelectComponent from './SelectComponent';

export default function Filter({ items, filters, setFilters }) {
  const [newFilters, setNewFilters] = useState(filters)
  const handleInputChange = ({ newValue, item }) => {
    let resFilters = []
    if (newValue == '' || newValue == 0) {
      resFilters = newFilters.filter((filter) => filter.fieldName != item.fieldName)
    } else {
      let newFilter = newFilters.find((filter) => filter.fieldName == item.fieldName)
      if (newFilter) {
        newFilter.value = newValue
        resFilters = [...newFilters]
      } else {
        newFilter = { fieldName: item.fieldName, type: item.filterType, value: newValue }
        resFilters = [...newFilters, newFilter]
      }
    }
    setNewFilters(resFilters)
  }

  const ApplyFilters = () => {
    setFilters(newFilters)
  }

  const RemoveFilters = () => {
    setNewFilters([])
    setFilters([])
  }

  const getValue = (fieldName) => {
    for (let filter of newFilters) {
      if (filter.fieldName == fieldName) return filter.value
    }
    return ''
  }

  return (
    <>
      <div className='px-2 py-3 bg-gray-200 rounded-md shadow-md m-1 mx-2 '>
        <div className='flex items-center justify-evenly flex-wrap mb-1 '>
          {items.map((item => {
            return (
              <div key={item.id} className='mx-1 my-1 max-w-[200px]'>
                <p className='text-center text-black font-medium'>{item.title}</p>
                {item.type == 'select' ?
                  <SelectComponent
                    items={item.data.items}
                    value={getValue(item.fieldName)}
                    onChange={event => handleInputChange({ newValue: event.target.value, item })}
                    className='p-2 rounded-md bg-white mt-1 max-w-[200px]'
                  /> :
                  <input
                    type={item.type}
                    value={getValue(item.fieldName)}
                    placeholder="Search..."
                    onChange={event => handleInputChange({ newValue: event.target.value, item })}
                    className='p-2 rounded-md bg-white mt-1 max-w-[200px]'
                  />

                }
              </div>
            )
          }))}
        </div>

        <div className='flex justify-center'>
          <button onClick={ApplyFilters} className='p-2 rounded-md mt-2 w-[100%] text-white font-medium mx-5 max-w-[200px] bg-green-500 ' >Apply Filters </button>
          <button onClick={RemoveFilters} className='p-2 rounded-md mt-2 w-[100%] text-white font-medium mx-5 max-w-[200px] bg-red-500' >Remove Filters </button>
        </div>
      </div>
    </>
  );
}




