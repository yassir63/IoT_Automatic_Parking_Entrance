import { Outlet, Link, useNavigate } from "react-router-dom";
import NavBar from "../components/navBar";
import Header from "../components/header";
import { useContext, useEffect } from "react";
import { AppContext } from "../components/ContextProvider";
import DataFetcher from "../api/DataFetcher";
import { useState } from "react";
import Cookies from "js-cookie";
import { accessTokenCookieName } from "../constants/CookiesNames";
import { BiSolidBookBookmark } from "react-icons/Bi";
import { FiAlignJustify } from "react-icons/fi";
import { MdGroup, MdGroupAdd, MdGroups2 } from "react-icons/Md";
import { PiStudentBold } from "react-icons/Pi";


const navBarItems = [
    // {
    //     id: 1,
    //     link: '/Monitoring',
    //     title: 'Monitoring',
    //     icone: FiAlignJustify,
    // },
    {
        id: 3,
        link: '/AppUsers',
        title: 'App Users',
        icone: FiAlignJustify,
    },
    {
        id: 2,
        link: '/ParkingUsers',
        title: 'Parging Users',
        icone: FiAlignJustify,
    },
    {
        id: 4,
        link: '/sites',
        title: 'Sites',
        icone: FiAlignJustify,
    },
 
    {
        id: 5,
        link: '/vehicles',
        title: 'Vehicles',
        icone: FiAlignJustify,
    },
    {
        id: 6,
        link: '/permissions',
        title: 'Permissions',
        icone: FiAlignJustify,
    },
    
]

export default function Layout() {
    const { connected, setConnected } = useContext(AppContext)
    const navigate = useNavigate()
    const [users, setUsers] = useState([])
    useEffect(() => {
        console.log(connected);
        if (!Cookies.get(accessTokenCookieName)) {
            setConnected(false)
            navigate('/login', { replace: true })
            return;
        }
        setConnected(true)
        DataFetcher({ method: 'GET', path: '/users' }).then(data => {
            if (!data) {
                console.log(data.error.message);
                setConnected(false)
                navigate('/login', { replace: true })
                return;
            }
            setUsers(data)
        }).catch(error => {
            console.log(error);
            setConnected(false)
        })


    }, [connected])

    return (


        <div className="grid grid-cols-7 relative">
            <div className="col-span-1 h-full bg-[#4f5d73] max-w-80 ">
                <NavBar items={navBarItems} />
            </div>
            <div className="col-span-6 ">
                <Header />
                <div>
                    <Outlet />
                </div>
            </div>
        </div>

    )
}



