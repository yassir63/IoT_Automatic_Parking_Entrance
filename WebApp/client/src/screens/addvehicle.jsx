import { useState } from 'react';
import DataFetcher from '../api/DataFetcher';

import Modal from '../components/modal';



export default function AddVehicle() {
  const [userName, setUserName] = useState('');
  const [userUserName, setUserUserName] = useState('');
  const [userMail, setUserMail] = useState('');
  const [userRole, setUserRole] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);



  const userData = { name: userName, username: userUserName, mail: userMail ,role: userRole,password:userPassword};



  return (


    <div className=' p-4 py-6'>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const response = await DataFetcher({ method: 'POST', path: '/users', body: userData });
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
            <label htmlFor="UserUserName">UserName :</label>
            <div>
              <input
                type="text"
                id='UserUserName'
                name='UserUserName'
                className='rounded-md my-1 p-2 bg-gray-100 px-4 w-full mt-3'
                placeholder='type the User Name'
                onChange={(e) => setUserUserName(e.target.value)
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
          <div className='mb-5'>
            <label htmlFor="UserPassWord">PassWord :</label>
            <div>
              <input
                type="password"
                id='UserPassWord'
                name='UserPassWord'
                className='rounded-md my-1 p-2 bg-gray-100 px-4 w-full mt-3'
                placeholder='type the password'
                onChange={(e) => setUserPassword(e.target.value)
                }
                required
              />
            </div>
          </div>
        </div>
        <div className='mt-3'>
          <select
            id="UserRole"
            onChange={(e) => setUserRole(e.target.value)}
            required
            className='rounded-md my-1 p-2 bg-gray-100'
          >
            <option value="" > Select a Role </option>
            <option value="Management" > Management </option>
            <option value="Security" > Security </option>
            {console.log(userData)}
          </select>
        </div>
        <div className='mt-2 flex justify-start'>
          <button
            type='submit'
            className=' my-5 bg-green-700 p-2 text-center text-white font-medium rounded-lg px-3'

          > + Ajouter</button>
        </div>
      </form>
      {isConfirmed && <Modal
        title='New App User'
        body={'New App user created with Role: ' +userData.role}
        onSubmit={() => setIsConfirmed(false)}
      />}


    </div>

  )
}

