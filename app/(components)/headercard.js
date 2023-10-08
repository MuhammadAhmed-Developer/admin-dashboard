'use client'
import { db } from '@/config/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { BsGraphUpArrow } from 'react-icons/bs'
import { PiGraphThin } from 'react-icons/pi'
import { VscGraph } from 'react-icons/vsc'
// import { BarChart } from '@mui/x-charts/BarChart';
import { Doughnut } from 'react-chartjs-2';
import Image from 'next/image';
export default function Headercard() {
  const [student, setstudent] = useState([]);
  const [courses, setcourses] = useState([]);
  const [atendence, setatendence] = useState([]);
  const fetchData = async () => {
    try {
      const collections = collection(db, "students");
      const docs = await getDocs(collections);
      const studentdata = [];
      docs.forEach((doc) => {
        studentdata.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setstudent(studentdata);
    } catch (error) {
      console.log(error);
    } finally {
      // setLoading(false); // Set loading to false after fetching
    }
  };



  const fetchcourses = async () => {
    try {
      // setLoading(true);
      const collections = collection(db, "courses");
      const docs = await getDocs(collections);
      const studentdata = [];
      docs.forEach((doc) => {
        studentdata.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setcourses(studentdata);
    } catch (error) {
      console.log(error);
    } finally {
      // setLoading(false); // Set loading to false after fetching
    }
  };


  const fetchattendense = async () => {
    try {
      // setLoading(true);
      const collections = collection(db, "attendance");
      const queryRef = query(collections, where("isPresent", "==", true));
      const docs = await getDocs(queryRef);
      const studentdata = [];
      docs.forEach((doc) => {
        studentdata.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setatendence(studentdata);
    } catch (error) {
      console.log(error);
    } finally {
      // setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    fetchData();
    fetchcourses()
    fetchattendense()
  }, []);




  return (
    <>

      <p className="text-white text-3xl mb-16 font-bold">HY ADMIN   </p>

      <div className="grid lg:grid-cols-3 gap-5 mb-16">
        <div className=" px-5 py-5 rounded bg-white h-40 shadow-xl border-t border-r border-l  border-4 border-orange-500">
          <div className='flex flex-row justify-between'>
            <h1 >Total Students</h1>
            <div className='bg-orange-500 p-3 rounded-full shadow-xl'>
              <BsGraphUpArrow className='text-white text-xl' />
            </div>
          </div>
          <div className="font-bold text-orange-500 text-2xl">
            {student.length}
          </div>
          <p className='mt-5 text-end text-sm'>since last year</p>
        </div>
        <div className="p-5 rounded bg-white h-40 shadow-xl border-t border-r border-l  border-4 border-blue-500">
          <div className='flex flex-row justify-between'>
            <h1>Total Courses</h1>
            <div className='bg-blue-500 p-3 rounded-full shadow-xl'>
              <VscGraph className='text-white text-xl' />
            </div>
          </div>
          <div className="font-bold text-blue-500 text-2xl">
            {courses.length}
          </div>
          <p className='mt-5 text-end text-sm'>Anounced every year</p>
        </div>
        <div className=" p-5 rounded bg-white h-40 shadow-xl border-t border-r border-l  border-4 border-green-500">
          <div className='flex flex-row justify-between'>
            <h1 > Students Attendance</h1>
            <div className='bg-green-500 p-3 rounded-full shadow-xl'>
              <PiGraphThin className='text-white text-xl' />
            </div>
          </div>
          <div className="font-bold text-green-500 text-2xl">
            {atendence.length}
          </div>
          <p className='mt-5 text-end text-sm'>since last year</p>
        </div>
      </div>
      <div className="grid col-1 bg-white h-96 shadow-sm mb-20">
        <Image src="/graph.png" alt="graph" height={100} width={1000}/>
      </div>
    </>
  )
}
