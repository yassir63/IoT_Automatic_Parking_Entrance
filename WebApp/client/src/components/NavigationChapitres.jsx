import React from 'react'
import { GrFormNext, GrFormPrevious } from 'react-icons/Gr'

export default function NavigationChapitres({ chapitres, page, setPage, titreChapitre }) {

    const count = chapitres.length
    let dotNumber = 0
    let displayedChapters = []
    if (chapitres.length < 8) {
        displayedChapters = chapitres
    } else {
        if (page < 4 || page > count - 3) {
            displayedChapters.push(chapitres.filter((item) => item.NumChapitre.num < 4))
            displayedChapters.push(chapitres.filter((item) => item.NumChapitre.num > count - 3))
            dotNumber = 1
        } else {
            displayedChapters.push(chapitres.filter((item) => item.NumChapitre.num < 3 && item.NumChapitre.num < page - 2))
            displayedChapters.push(chapitres.filter((item) => (item.NumChapitre.num < page + 2 && item.NumChapitre.num > page - 2)))
            displayedChapters.push(chapitres.filter((item) => item.NumChapitre.num > count - 2 && item.NumChapitre.num > page + 2))
            dotNumber = 2
        }
    }

    return (
        <div className='flex flex-col justify-center my-1 w-full'>
            <div className='flex flex-row my-6 justify-between w-full'>
                <button onClick={() => { if (page > 0) setPage(page - 1) }} disabled={page == 0} className={(page == 0 ? 'cursor-not-allowed bg-[#4f5d7370]' : 'bg-[#4f5d73]') + ' flex mx-2 font-bold  p-3 text-center items-center rounded-md'}><GrFormPrevious /> </button>
                <div className='truncate p-3 font-bold'>{page == 0 ? 'Selectionner un Chapitre' : titreChapitre}</div>
                <button onClick={() => { if (page < count) setPage(page + 1) }} disabled={page == count} className={(page == count ? 'cursor-not-allowed bg-[#4f5d7370]' : 'bg-[#4f5d73]') + ' flex mx-2 font-bold  p-3 text-center items-center rounded-md'}><GrFormNext /> </button>
            </div>
            <div className='flex flex-col justify-center'>
                {dotNumber == 0 && <>
                    {displayedChapters.map((item) => (
                        <button key={item.id} onClick={()=>setPage(item.NumChapitre.num)} className={(item.NumChapitre.num==page ? 'bg-slate-500':'bg-slate-400')+' mx-auto m-1 p-3 bg-slate-400 text-center rounded-md w-full'}>
                            {item.titre}
                        </button>
                    ))}
                </>}
                {dotNumber == 1 && <>
                    {displayedChapters[0].map((item) => (
                        <button key={item.id} onClick={()=>setPage(item.NumChapitre.num)} className={(item.NumChapitre.num==page ? 'bg-slate-500':'bg-slate-400')+' mx-auto m-1 p-3 bg-slate-400 text-center rounded-md w-full'}>
                            {item.titre}
                        </button>
                    ))}
                    <div className='text-center font-extrabold -mb-4'>.</div>
                    <div className='text-center font-extrabold -mb-4'>.</div>
                    <div className='text-center font-extrabold '>.</div>
                    {displayedChapters[1].map((item) => (
                        <button key={item.id} onClick={()=>setPage(item.NumChapitre.num)} className={(item.NumChapitre.num==page ? 'bg-slate-500':'bg-slate-400')+' mx-auto m-1 p-3 bg-slate-400 text-center rounded-md w-full'}>
                            {item.titre}
                        </button>
                    ))}

                </>}
                {dotNumber == 2 && <>
                    {displayedChapters[0].map((item) => (
                        <button key={item.id} onClick={()=>setPage(item.NumChapitre.num)} className={(item.NumChapitre.num==page ? 'bg-slate-500':'bg-slate-400')+' mx-auto m-1 p-3 bg-slate-400 text-center rounded-md w-full'}>
                            {item.titre}
                        </button>
                    ))}
                    <div className='text-center font-extrabold -mb-4'>.</div>
                    <div className='text-center font-extrabold -mb-4'>.</div>
                    <div className='text-center font-extrabold '>.</div>
                    {displayedChapters[1].map((item) => (
                        <button key={item.id} onClick={()=>setPage(item.NumChapitre.num)} className={(item.NumChapitre.num==page ? 'bg-slate-500':'bg-slate-400')+' mx-auto m-1 p-3 bg-slate-400 text-center rounded-md w-full'}>
                            {item.titre}
                        </button>
                    ))}
                    <div className='text-center font-extrabold -mb-4'>.</div>
                    <div className='text-center font-extrabold -mb-4'>.</div>
                    <div className='text-center font-extrabold '>.</div>
                    {displayedChapters[2].map((item) => (
                        <button key={item.id} onClick={()=>setPage(item.NumChapitre.num)} className={(item.NumChapitre.num==page ? 'bg-slate-500':'bg-slate-400')+' mx-auto m-1 p-3 bg-slate-400 text-center rounded-md w-full'}>
                            {item.titre}
                        </button>
                    ))}

                </>}
            </div>


        </div>
    )
}
