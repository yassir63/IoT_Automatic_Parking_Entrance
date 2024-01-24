import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom'

import List from "../components/list";
import Filter from '../components/filter';
import { userColumns } from '../constants/ListsColumns';
import DataFetcher from '../api/DataFetcher';
import { userActions } from '../constants/ListsActions';



export default function Appusers() {
  const [filters, setFilters] = useState([])
  const [nbrItemsPerPage, setNbrItemsPerPage] = useState(5)
  const [page, setPage] = useState(0)
  const [usersData, setUsersData] = useState({ count: 0, rows: [] })

  const [listState, setListState] = useState(true)
  const changeListState = () => setListState(!listState)


  useEffect(() => {
    setPage(0)
  }, [nbrItemsPerPage])
  useEffect(() => {
    console.log(filters);
    const queryParams = `page=${page}&limit=${nbrItemsPerPage}&filters=${JSON.stringify(filters)}`
    DataFetcher({ method: 'GET', path: `/users?${queryParams}` }).then(data => {
        setUsersData(data)
    }).catch(error => {
      console.log(error);
    })


  }, [page, filters, nbrItemsPerPage, listState])



  return (
    <>

      <div className='flex justify-end '>
        <Link to='/add-appUser' className=" my-3 bg-green-600 rounded mr-7 p-2 text-white font-bold">+ Ajouter</Link>
      </div>


      <Filter filters={filters} items={userColumns} setFilters={setFilters} />

      
      <div className='flex justify-center'>
        <List columns={userColumns} data={usersData} page={page} setPage={setPage} nbrItemsPerPage={nbrItemsPerPage} setNbrItemsPerPage={setNbrItemsPerPage} actions={userActions} changeListState={changeListState} />

      </div>
      <div>

      </div>
    </>
  );
}