'use client'
import { db } from '@/config/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { BsGraphUpArrow } from 'react-icons/bs'
import { PiGraphThin } from 'react-icons/pi'
import { VscGraph } from 'react-icons/vsc'
// import { BarChart, Bar, XAxis,YAxis,CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Image from 'next/image';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, PieChart, Pie, Sector} from 'recharts';

const colors = [ 'orange',"blue", 'green'];
const COLORS = [ 'orange',"blue", 'green'];



const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};


const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
};

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

// import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

// const data = [
//     { name: 'Group A', value: 400 },
//     { name: 'Group B', value: 300 },
//     { name: 'Group C', value: 300 },
//     { name: 'Group D', value: 300 },
//   ];
  
//   const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
//   const RADIAN = Math.PI / 180;
//   const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
//     const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//     const x = cx + radius * Math.cos(-midAngle * RADIAN);
//     const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
//     return (
//       <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
//         {`${(percent * 100).toFixed(0)}%`}
//       </text>
//     );
//   };
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

  const data = [
    {
      name: 'Students',
      uv: student.length,
      pv: 500,
      amt: 2400,
    },
    {
      name: 'course',
      uv: courses.length,
      pv: 398,
      amt: 2210,
    },
    {
      name: 'atendence',
      uv: atendence.length,
      pv: 800,
      amt: 2290,
    },

  ];

  const dataa = [
    { name: 'Students', value: student.length },
    { name: 'course', value: courses.length },
    { name: 'atendence', value: atendence.length },
    // { name: 'Group D', value: 300 },
  ];
  



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

      {/* ya div hy nichy vali  */}
      <div className="flex flex-row  col-1 bg-white h-96 shadow-sm mb-20">

    

<BarChart
      width={590}
      height={350}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Bar dataKey="uv" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % 20]} />
        ))}
      </Bar>
    </BarChart>

    <PieChart width={500} height={350}>
          <Pie
            data={dataa}
            margin={{
              top: 20,
              right: 50,
              left: 0,
              bottom: 5,
            }}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {dataa.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>


      </div>
    </>
  )
}
