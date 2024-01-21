import React from 'react'
import SelectComponent from './SelectComponent'

export default function EditComponent({columns,values,setValues,onSave}) {
    return (
        <form onSubmit={onSave}>
            <div className='flex items-center justify-evenly flex-wrap mb-3 '>
                {columns.map((item) => {
                    if (item.type == 'number') {
                        return (
                            <div key={item.id} className='mx-2 my-1 max-w-[200px]'>
                                <p className='text-center text-black font-medium'>{item.title}</p>
                                <input
                                    type='number'
                                    value={values[item.fieldName]}
                                    disabled={item.fieldName == 'id'}
                                    required
                                    onChange={event => setValues({ ...values, [item.fieldName]: event.target.value })}
                                    className={(item.fieldName == 'id' ? 'bg-gray-300': 'bg-white')+' p-2 rounded-md mt-1 max-w-[200px]'}
                                />
                            </div>
                        )
                    }
                    if (item.type == 'text') {
                        return (
                            <div key={item.id} className='mx-2 my-1 max-w-[200px]'>
                                <p className='text-center text-black font-medium'>{item.title}</p>
                                <input
                                    type='text'
                                    value={values[item.fieldName]}
                                    required
                                    onChange={event => setValues({ ...values, [item.fieldName]: event.target.value })}
                                    className='p-2 rounded-md bg-white mt-1 max-w-[200px]'
                                />
                            </div>
                        )
                    }

                    if (item.type == 'select') {
                        return (
                            <div key={item.id} className='mx-2 my-1 max-w-[200px]'>
                                <p className='text-center text-black font-medium'>{item.title}</p>
                                <SelectComponent
                                    items={item.data.items}
                                    value={values[item.fieldName]}
                                    required={true}
                                    onChange={event => setValues({ ...values, [item.fieldName]: event.target.value })}
                                    className='p-2 rounded-md bg-white mt-1 max-w-[200px]'
                                />
                            </div>
                        )
                    }
                })}

            </div>

            <div className='flex justify-center'>
                <button className='p-2 rounded-md  w-[100%] text-white font-medium mx-5 max-w-[200px] bg-green-500 ' >Save </button>
            </div>
        </form>
    )
}
