import success from '../assets/success.gif'
import{Link}from 'react-router-dom'
const Success = () => {
  return (
    <div className='bg-slate-200 w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 m-3 rounded'>
      <img src={success} width={150} height={150} className='mix-blend-multiply'></img>
      <p className='text-green-600 font-bold text-xl'>Payment Success</p>
      <Link to='/order' className='p-2 mt-5 border-2 border-green-600 px-3 rounded font-semibold text-green-600 hover:bg-green-600 hover:text-white'>See orders</Link>
    </div>
  )
}

export default Success
