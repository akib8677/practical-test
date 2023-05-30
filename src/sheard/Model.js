import Modal from "react-modal";
import { MdOutlineClose } from 'react-icons/md';

const Model = ({modalDetail, closeModel}) => {
  return (
    <Modal isOpen={modalDetail?.show} className={'custom-model border shadow'} appElement={document.body}>
      <div className='d-flex justify-content-between bg-secondary'>
        <div className='fw-semibold fs-1 mx-2 text-white'>{modalDetail?.title}</div>
        <div className='mt-3 mx-2'> <button onClick={closeModel}> <MdOutlineClose size={25} /> </button></div>
      </div>
      <div className='mt-2'>
        {modalDetail?.component}
      </div>
    </Modal>
  )
}

export default Model