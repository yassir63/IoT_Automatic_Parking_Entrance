import React from 'react'

export default function ChapitreBox({chapitre,actions}) {
  return (
    <div className='p-1 h-full'>
    <div  className='cursor-grab flex flex-col justify-center w-full h-full bg-slate-600 rounded-xl overflow-hidden p-1'>
        <div className='flex flex-row w-full p-1 justify-between h-1/5'>
            {actions.length==2 && (<>
            <div className='flex flex-col flex-1 justify-center bg-red-600 text-white  rounded-lg'><button onClick={()=>actions[0].onSubmit(chapitre)} className='p-1'>{actions[0].title}</button></div>
            <div className='flex flex-[2] flex-col justify-center text-center text-white font-extrabold'>-- {chapitre.NumChapitre.num} --</div>
            <div className='flex flex-col flex-1 justify-center bg-green-500 text-white  rounded-lg'><button onClick={()=>actions[1].onSubmit(chapitre)} className='p-1'>{actions[1].title}</button></div>
            </>)}
            {actions.length==1 && <div className='flex flex-[0.5] justify-center m-auto bg-green-500 text-white rounded-lg'><button onClick={()=>actions[0].onSubmit(chapitre)} className='p-1'>{actions[0].title}</button></div>}
        </div>
        <div className='text-white text-center items-center h-1/6 font-bold truncate'>
            {chapitre.titre}
        </div>
        <div className='overflow-clip hover:overflow-y-scroll text-center items-center h-3/5 text-white w-[95%] mx-auto p-1'>
            {chapitre.description}
        </div>
        <div className='mt-2'></div>
    </div>
    </div>
  )
}
