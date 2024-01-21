import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom'

import List from "../components/list";
import Filter from '../components/filter';
import { parkingUserColumns } from '../constants/ListsColumns';
import DataFetcher from '../api/DataFetcher';
import { parkingUserActions } from '../constants/ListsActions';



export default function ParkingUsers() {
  const [filters, setFilters] = useState([])
  const [nbrItemsPerPage, setNbrItemsPerPage] = useState(5)
  const [page, setPage] = useState(0)
  const [parkingUsersData, setparkingUsersData] = useState({ count: 0, rows: [] })

  const [listState, setListState] = useState(true)
  const changeListState = () => setListState(!listState)


  useEffect(() => {
    setPage(0)
  }, [nbrItemsPerPage])
  useEffect(() => {
    console.log(filters);
    const queryParams = `page=${page}&limit=${nbrItemsPerPage}&filters=${JSON.stringify(filters)}`
    DataFetcher({ method: 'GET', path: `/parkingusers?${queryParams}` }).then(data => {
      setparkingUsersData(data)
    }).catch(error => {
      console.log(error);
    })


  }, [page, filters, nbrItemsPerPage, listState])



  return (
    <>

      <div className='flex justify-end '>
        <Link to='/ajouter-parkingUser' className=" my-3 bg-green-600 rounded mr-7 p-2 text-white font-bold">+ Ajouter</Link>
      </div>


      <Filter filters={filters} items={parkingUserColumns} setFilters={setFilters} />

      
      <div className='flex justify-center'>
        <List columns={parkingUserColumns} data={parkingUsersData} page={page} setPage={setPage} nbrItemsPerPage={nbrItemsPerPage} setNbrItemsPerPage={setNbrItemsPerPage} actions={parkingUserActions} changeListState={changeListState} />

      </div>
      <div>

      </div>
    </>
  );
}