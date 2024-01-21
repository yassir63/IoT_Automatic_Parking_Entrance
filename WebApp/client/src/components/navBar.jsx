import { BiSolidBookBookmark } from 'react-icons/Bi'
import { FaUsers, FaUniversity } from 'react-icons/Fa';
import { MdGroupAdd } from 'react-icons/Md';
import { PiStudentBold } from 'react-icons/Pi';

import { Link } from 'react-router-dom';

export default function NavBar({ items }) {
    return (
        
            <div className=" flex flex-col bg-[#4f5d73] h-full min-h-screen">

                <div>
                    <h1 className="text-white text-center p-6 font-extrabold text-3xl font-serif">IOT</h1>
                </div>
                <div >
                    <nav>
                        <ul className="  divide-y divide-gray-400 text-white  px-8 leading-10 font-bold mt-7">
                            {items.map((item) => {
                                return <li key={item.id} className="mx-auto"><Link className='flex items-center gap-4' to={item.link}><div><item.icone /></div>{item.title}</Link></li>
                            })}
                        </ul>

                    </nav>
                </div>

            </div>
        
    )
}

