import { useContext, useState } from 'react';
import login from '../assets/login.jpg';
import { Link } from 'react-router-dom';
import DataFetcher from '../api/DataFetcher';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../components/ContextProvider';
import Cookies from 'js-cookie';
import { accessTokenCookieName, refreshTokenCookieName } from '../constants/CookiesNames'
import {AiOutlineEye,AiOutlineEyeInvisible} from 'react-icons/ai';
import { useEffect } from 'react';




export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const [visible,setVisible]=useState(false);

    const { connected, setConnected } = useContext(AppContext)
    const navigate = useNavigate()
    const submitHandler = async (event) => {
        event.preventDefault();
        setMessage('')
        const response = await DataFetcher({ method: 'POST', path: '/users/login', body: { username, password } })
        if (response.error) {
            setMessage(response.error)
        } else {
            console.log(response);
            Cookies.set(accessTokenCookieName, response.accessToken)
            Cookies.set(refreshTokenCookieName, response.refreshToken)
            setConnected(true)

        }
    }
    useEffect(() => {
        if (connected) navigate('/', { replace: true })
        else if (Cookies.get(accessTokenCookieName)) setConnected(true)

    }, [connected])

    const icon =  visible ? <AiOutlineEyeInvisible/> : <AiOutlineEye /> 
    const inputType = visible ? "text" : "password";
  
    return (
        < >

            <div className='grid-colos-1   lg:grid grid-cols-2  '>


                <div className="flex min-h-screen  flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-100 shadow-xl">

                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Connectez-vous à votre compte
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" onSubmit={submitHandler} method="POST">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Adresse e-mail or username
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="text"
                                        autoComplete="email"
                                        required
                                        value={username}
                                        onChange={(event) => setUsername(event.target.value)}
                                        className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                        Mot de passe
                                    </label>

                                </div>
                                <div className="mt-2 relative block">
                                    <input
                                        id="password"
                                        name="password"
                                        type={inputType}
                                        autoComplete="current-password"
                                        required
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                        className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                    Se connecter
                                </button>
                            </div>
                        </form>

                        <p className="mt-10 text-center text-sm text-gray-500">
                            Pas encore membre ?{' '}
                            <Link to='/register' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                S'inscrire
                            </Link>


                        </p>
                        <p className="mt-10 text-center text-sm text-red-600">{message}</p>
                    </div>
                </div>
                <div className='hidden lg:block'>
                    <img className=' h-full mx-auto' src={login} alt="" height={300} />
                </div>


            </div>
        </>
    )
}

