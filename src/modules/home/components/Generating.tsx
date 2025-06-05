//@ts-ignore
import { loading } from '../assets'

const Generating = ({ className }: any) => {
  return (
    <div
      className={`flex items-center h-[3.5rem] px-6 bg-n-8/80 rounded-[1.7rem] ${
        className || ''
      } text-base`}
      style={{ color: 'white' }}
    >
      <img className="w-5 h-5 mr-4" src={loading} alt="Loading" />
      AI is generating
    </div>
  )
}

export default Generating
