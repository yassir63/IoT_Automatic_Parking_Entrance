

function Modal({ title, body, onSubmit, onCancel }) {
  return (
    <div className='fixed top-0 left-0 w-screen h-screen bg-gray-500 bg-opacity-90 flex justify-center items-center z-50 '>
      <div className='w-[500px] bg-slate-200 rounded-xl shadow-2xl  '>

        <div className='p-[10px] text-center font-medium '>
          <h4 className='m-0'>{title}</h4>
        </div>
        <div className='p-[10px] text-center font-medium'>
          {body}
        </div>
        <div className='p-[10px] flex justify-around'>
          {onCancel && (
            <>
              <button className='bg-green-600 p-1 px-2 text-white font-medium rounded-md' onClick={onCancel} > annuler </button>
              <button className='bg-red-600 p-1 px-2 text-white font-medium rounded-md' onClick={onSubmit}> confirmer</button>
            </>
          )}
          {!onCancel && (
            <button className='bg-green-600 p-1 px-2 text-white font-medium rounded-md' onClick={onSubmit}> OK </button>
          )}


        </div>
      </div>
    </div>
  )
}

export default Modal;