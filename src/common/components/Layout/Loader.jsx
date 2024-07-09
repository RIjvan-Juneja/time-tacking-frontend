import LoaderImg from '../../../assets/images/load-8510_256.gif'
import ReactDOM from 'react-dom';

const Loader = () => {
  return ReactDOM.createPortal(
    <>
      <div className='flex w-full h-lvh fixed flex justify-center items-center top-0 left-0 z-[999]' style={{ background: 'rgba(157, 157, 157, 0.35)' }}>
        <img className='w-[100px] h-fit' src={LoaderImg} alt="Loading" />
      </div>
    </>,
    document.getElementById("loader")
  )
}

export default Loader