import { IoIosArrowDropdownCircle } from 'react-icons/Io';
import { BiSolidEditAlt } from 'react-icons/Bi';
import { AiFillDelete, AiFillEye } from 'react-icons/ai';
import { useState, useContext } from 'react';
import Modal from './modal';
import { useNavigate } from 'react-router-dom';

function DropDown({ item, actions, changeListState }) {
  const [ishovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false)
  const [modal, setModal] = useState('')
  const navigate = useNavigate()
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const onClick = async (action) => {
    if (!action.showModal) {
      await action.submit({ navigate, item });
      changeListState()
      return
    }
    if (action.modal.type == 'success') {
      await action.submit({ navigate, item })
      changeListState()
      setModal((<Modal
        title={action.modal.title}
        body={action.modal.body}
        onSubmit={() => {
          setShowModal(false)
        }}
      />))
    } else if (action.modal.type == 'confirmation') {
      setModal((<Modal
        title={action.modal.title}
        body={action.modal.body}
        onCancel={() => setShowModal(false)}
        onSubmit={async () => {
          await action.submit({ navigate, item })
          setShowModal(false)
          changeListState()
        }}
      />))
    }

    setShowModal(true)
    setTimeout(() => setIsHovered(false), 10)

  }

  return (
    <>

      <div className='relative flex justify-center' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div className='flex justify-center cursor-pointer '>
          <IoIosArrowDropdownCircle />
        </div>
        {ishovered && <div className=' p-2  font-bold text-gray-500 leading-8 rounded-md shadow-xl bg-white text-center absolute z-10'>
          {actions.map((action) => {
            return (<button
              key={action.id}
              onClick={() => onClick(action)}
              className='w-full hover:bg-slate-100 cursor-pointer px-2 rounded-lg my-1 flex justify-between items-center'
            >
              <div className='flex flex-row justify-between w-full'>
                <div className='flex flex-1 justify-center items-center px-2 '><action.icone /></div>
                <div className='flex flex-[3] justify-center items-center px-1 '>{action.title}</div>
              </div>
            </button>)
          })}
        </div>}
        {showModal && <div>{modal}</div>}

      </div>

    </>
  )
}

export default DropDown;