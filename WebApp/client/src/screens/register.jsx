
import { useState } from 'react'
import login from '../assets/login.jpg'
import { useContext } from 'react'
import { AppContext } from '../components/ContextProvider'
import SelectComponent from '../components/SelectComponent'
import { Link, useNavigate } from 'react-router-dom'
import DataFetcher from '../api/DataFetcher'
import Cookies from 'js-cookie'
import {AiOutlineEye,AiOutlineEyeInvisible} from 'react-icons/ai';
import { accessTokenCookieName, refreshTokenCookieName } from '../constants/CookiesNames'







export default function Register() {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [mail, setMail] = useState('')
    const [role, setRole] = useState('1')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState("")
    const [visible,setVisible]=useState(false);
    const { connected, setConnected } = useContext(AppContext)
    const navigate = useNavigate()


    const submitHandler = async (event) => {
        event.preventDefault();
        if (password != confirmPassword) {
            setMessage('la confirmation du password est incorect')
            return
        }
        setMessage('')
        const response = await DataFetcher({ method: 'POST', path: '/users', body: { username, mail, password } })
        if (response.error) {
            setMessage(response.error)
        } else {
            console.log(response);
            Cookies.remove(accessTokenCookieName)
            Cookies.remove(refreshTokenCookieName)
            setConnected(false)
            navigate('/login')

        }
    }
    const icon =  visible ? <AiOutlineEyeInvisible/> : <AiOutlineEye /> 
    const inputType = visible ? "text" : "password";
  

    return (

        <>
            <div className='grid-colos-1   lg:grid grid-cols-2'>
                <div className="flex min-h-screen  flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-100 shadow-xl">

                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Créez votre compte
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" onSubmit={submitHandler} method="POST">
                            <div>
                                <label htmlFor="nom-complet" className="block text-sm font-medium leading-6 text-gray-900">
                                    Name :
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="nom-complet"
                                        name="nom-complet"
                                        type="text"
                                        autoComplete="nom"
                                        required
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                        className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="nom-complet" className="block text-sm font-medium leading-6 text-gray-900">
                                    Username :
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="nom-complet"
                                        name="nom-complet"
                                        type="text"
                                        autoComplete="nom"
                                        required
                                        value={username}
                                        onChange={(event) => setUsername(event.target.value)}
                                        className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Adresse e-mail
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={mail}
                                        onChange={(event) => setMail(event.target.value)}
                                        className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className='text-center'>
                                <SelectComponent
                                        items={[{title: 'Admin', value: '0'},{title: 'Security Agent', value: '1'}]}
                                        value={role}
                                        required={true}
                                        onChange={event => setRole(event.target.value)}
                                        className='p-2 rounded-md bg-white mt-1 max-w-[100%]'
                                    />
                            </div>
                            
                            <div>

                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Mot de passe
                                </label>


                                <div className="mt-2 relative block">
                                    <input
                                        id="password"
                                        name="password"
                                        type={inputType}
                                        autoComplete="current-password"
                                        required
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                        className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                     <i 
                                        className='absolute inset-y-0 right-0 flex items-center pr-3 pt-auto font-bold text-xl'
                                        onClick={()=>setVisible(!visible)}
                                    >{icon}</i>
                                </div>
                            </div>
                            <div>

                                <label htmlFor="confirmer_mot_de_passe" className="block text-sm font-medium leading-6 text-gray-900">
                                    Confirmer le mot de passe :
                                </label>


                                <div className="mt-2 relative block">
                                    <input
                                        id="confirmer_mot_de_passe"
                                        name="confirmer_mot_de_passe"
                                        type={inputType}
                                        autoComplete="current-password"
                                        required
                                        value={confirmPassword}
                                        onChange={(event) => setConfirmPassword(event.target.value)}
                                        className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                      <i 
                                        className='absolute inset-y-0 right-0 flex items-center pr-3 pt-auto font-bold text-xl'
                                        onClick={()=>setVisible(!visible)}
                                    >{icon}</i>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    S'inscrire
                                </button>
                            </div>
                        </form>
                        <p className="mt-10 text-center text-sm text-gray-500">
                            Vous avez deja un compte ?{' '}
                            <Link to='/login' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                Se Connecter
                            </Link>


                        </p>
                    </div>
                </div>
                <div className='hidden lg:block'>
                    <img className=' h-full mx-auto' src={login} alt="" height={300} />
                </div>
                <p className="mt-10 text-center text-sm text-red-600">{message}</p>



            </div>

        </>
    )
}

