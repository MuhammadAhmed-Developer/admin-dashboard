import {BsGraphUpArrow} from 'react-icons/bs'
import {PiGraphThin} from 'react-icons/pi'
import {VscGraph} from 'react-icons/vsc'
export default function Headercard() {
  return (
    <>

      <p className="text-white text-3xl mb-16 font-bold">HY ADMIN   </p>

      <div className="grid lg:grid-cols-3 gap-5 mb-16">
      <div className=" px-5 py-5 rounded bg-white h-40 shadow-xl border-t border-r border-l  border-4 border-orange-500">
        <div className='flex flex-row justify-between'>
           <h1 >Total Students</h1>
           <div className='bg-orange-500 p-3 rounded-full shadow-xl'>
            <BsGraphUpArrow className='text-white text-xl'/>
           </div>
        </div>
        <div className="font-bold text-orange-500 text-2xl">
         22.22K
        </div>
        <p className='mt-5 text-end text-sm'>since last year</p>
      </div>
        <div className="p-5 rounded bg-white h-40 shadow-xl border-t border-r border-l  border-4 border-blue-500">
        <div className='flex flex-row justify-between'>
           <h1 >Total Courses</h1>
           <div className='bg-blue-500 p-3 rounded-full shadow-xl'>
            <VscGraph className='text-white text-xl'/>
           </div>
        </div>
        <div className="font-bold text-blue-500 text-2xl">
          10
        </div>
        <p className='mt-5 text-end text-sm'>Anounced every year</p>
        </div>
        <div className=" p-5 rounded bg-white h-40 shadow-xl border-t border-r border-l  border-4 border-green-500">
        <div className='flex flex-row justify-between'>
           <h1 > Students Attendance</h1>
           <div className='bg-green-500 p-3 rounded-full shadow-xl'>
            <PiGraphThin className='text-white text-xl'/>
           </div>
        </div>
        <div className="font-bold text-green-500 text-2xl">
         22.22K
        </div>
        <p className='mt-5 text-end text-sm'>since last year</p>
        </div>
      </div>
      <div className="grid col-1 bg-white h-96 shadow-sm"></div>
    </>
  )
}
