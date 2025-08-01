
import { Link } from 'react-router-dom'

const Success = () => {
  return (
    <div className='w-full h-full flex flex-col justify-center items-center gap-4'>
      <h1 className='w-full text-center font-mono text-lg md:text-2xl lg:text-3xl'>Payment is Successful.!</h1>
      <Link to="/user"><button className='btn btn-primary'>Go to home</button></Link>
    </div>
  )
}

export default Success
