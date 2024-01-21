import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import DropDown from './dropDown';
import { GrFormNext, GrFormPrevious } from 'react-icons/Gr'


function List({ columns, data, setPage, page, nbrItemsPerPage,setNbrItemsPerPage, actions, onSubmit,changeListState ,member}) {


  const rows = data.rows
  const displayItems = rows.map((item) => (
    <tr key={item.id} className="">
      {columns.map(column => (
        <td key={column.id} className="border px-8 py-4">{item[column.fieldName]}</td>
      ))}
       <td className="border px-8 py-4 text-[#4f5d73]">{actions ? 
       <DropDown item={item} actions={actions} changeListState={changeListState}/>:
       <button 
       className='bg-green-500 text-white rounded-lg  font-medium p-2'
       onClick={()=>onSubmit(item)}
       >Ajouter</button> 
       }</td>
    </tr>));

  const pageCount = Math.ceil(data.count / nbrItemsPerPage);

  const changePage = ({ selected }) => {
    setPage(selected);
  };





  return (
    <div className=" px-3 mt-1 h-full" >
      <div className='m-2'>
         <label htmlFor="itemPerPage"
         className='flex justify-center gap-4 mt-3'>
          <h1 className='font-medium'>lignes par page </h1>
          <input 
            id='itemPerPage'
            type="number"
            min='1'
            value={nbrItemsPerPage}
            onChange={(event)=> setNbrItemsPerPage(event.target.value)}
            className='bg-gray-100 rounded-md px-2 py-0.5 w-[70px]'
           />
        </label>
      </div>
      <table className="shadow-lg bg-white w-[1000px] h-full">
        <thead>
          <tr>
            {columns.map((column) => {
              return <th key={column.id} className="bg-gray-100 border  px-8 py-4 text-center">{column.title}</th>
            })}
            <th className="bg-gray-100 border  px-8 py-4 text-center">actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {displayItems}
        </tbody>
      </table>
      {rows.length>0 && <div className='flex justify-center py-4'>
        <ReactPaginate
          previousLabel={<div className='font-bold bg-[#4f5d73] p-2 rounded-md '><GrFormPrevious /> </div>}
          nextLabel={<div className='font-bold bg-[#4f5d73] p-2 rounded-md '><GrFormNext /> </div>}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={'flex h-full gap-6'}
          activeClassName={"bg-[#4f5d73] px-2 rounded-md text-white"}
        />
      </div>}
    </div>
  );
}

export default List;