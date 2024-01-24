import { useState } from 'react';
import DataFetcher from '../api/DataFetcher';

import Modal from '../components/modal';



export default function AddParkingUser() {
  const [userName, setUserName] = useState('');
  const [userMail, setUserMail] = useState('');
  const [userType, setUserType] = useState('');
  const [rfidCode, setRfidCode] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [facepicture, setFacepicture] = useState({});
  const [isConfirmed, setIsConfirmed] = useState(false);



  const userData = { name: userName, mail: userMail ,type: userType};
  const employeeData = { rfidCode: rfidCode, facepicture: facepicture}
  const visitorData = { QrCode: qrCode}


  function handleFileChange(e) {
    const file = e.target.files[0];
  
    if (file) {
      const reader = new FileReader();
      const buffer = reader.readAsArrayBuffer(file);
      console.log(2);
      console.log(buffer);
      setFacepicture(buffer)
    }
  }


  return (


    <div className=' p-4 py-6'>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const parkingUser = await DataFetcher({ method: 'POST', path: '/parkingusers', body: userData });
            console.log(employeeData);
            console.log(visitorData);
            if(parkingUser.type=="Employee"){
                employeeData.ParkingUserId=parkingUser.id
                await DataFetcher({ method: 'POST', path: '/employees', body: employeeData });
            }else if(parkingUser.type=="Visitor"){
                visitorData.ParkingUserId=parkingUser.id
                await DataFetcher({ method: 'POST', path: '/visitors', body: visitorData });
            }
            setIsConfirmed(!isConfirmed);
          } catch (err) {
            alert(err);
          }
        }
        }
        method="POST"
        className=' p-8 bg-white m-10 rounded-xl shadow-2xl font-medium'>
        <div>
          <div className='mb-5 '>
            <label htmlFor="UserName" >Name :</label>
            <div>
              <input
                type="text"
                id='UserName'
                name='UserName'
                className='rounded-md my-1 p-2 bg-gray-100 px-4 w-full mt-3'
                placeholder='type the Name'
                onChange={(e) => setUserName(e.target.value)
                }
                required
              />
            </div>
          </div>
          
          <div className='mb-5'>
            <label htmlFor="UserMail">Mail :</label>
            <div>
              <input
                type="email"
                id='UserMail'
                name='UserMail'
                className='rounded-md my-1 p-2 bg-gray-100 px-4 w-full mt-3'
                placeholder='type the Mail'
                onChange={(e) => setUserMail(e.target.value)
                }
                required
              />
            </div>
          </div>
          <div className='mt-3'>
            <select
                id="UserType"
                onChange={(e) => setUserType(e.target.value)}
                required
                className='rounded-md my-1 p-2 bg-gray-100'
            >
                <option value="" > Select a Type </option>
                <option value="Employee" > Employee </option>
                <option value="Visitor" > Visitor </option>
                {console.log(userData)}
            </select>
          </div>

          {userType=="Employee" && 
          <>
          <div className='mb-5'>
            <label htmlFor="RfidCode">Rfid Code :</label>
            <div>
              <input
                type="text"
                id='RfidCode'
                name='RfidCode'
                className='rounded-md my-1 p-2 bg-gray-100 px-4 w-full mt-3'
                placeholder='type the RfidCode'
                onChange={(e) => setRfidCode(e.target.value)
                }
                required
              />
            </div>
          </div>
          <div className='mb-5'>
            <label htmlFor="facepicture">Face Picture :</label>
            <div>
              <input
                type="file"
                id='facepicture'
                name='facepicture'
                className='rounded-md my-1 p-2 bg-gray-100 px-4 w-full mt-3'
                placeholder='upload face picture'
                onChange={handleFileChange}
                required
              />
            </div>
          </div>
          </>
          

          }
          {userType=="Visitor" && 
          
          <div className='mb-5'>
            <label htmlFor="QrCode">QrCode :</label>
            <div>
              <input
                type="text"
                id='QrCode'
                name='QrCode'
                className='rounded-md my-1 p-2 bg-gray-100 px-4 w-full mt-3'
                placeholder='type the QrCode'
                onChange={(e) => setQrCode(e.target.value)
                }
                required
              />
            </div>
          </div>

          }



        </div>
        
        <div className='mt-2 flex justify-start'>
          <button
            type='submit'
            className=' my-5 bg-green-700 p-2 text-center text-white font-medium rounded-lg px-3'

          > + Ajouter</button>
        </div>
      </form>
      {isConfirmed && <Modal
        title='New Parking User'
        body={'New Parking User created: '}
        onSubmit={() => setIsConfirmed(false)}
      />}


    </div>

  )
}

