'use client'
import React, { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { db } from '@/config/firebase';

export default function Attendance() {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const attendanceCollection = collection(db, 'students');
      // const q = query(attendanceCollection, where('selectedCourse', '==', 'Web and Mobile developnment'));
      const docs = await getDocs(attendanceCollection);
      const studentData = [];
      docs.forEach((doc) => {
        studentData.push({
          id: doc.id,
          ...doc.data(),
          isPresent: null, // Initialize isPresent to null
        });
      });

      setStudents(studentData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAttendance = async (studentid, isPresent, course, name) => {
    try {
      const attendanceCollection = collection(db, 'attendance');
      const attendanceData = {
        studentid,
        name,
        isPresent,
        course,
        date: new Date().toISOString(),
      };
      await addDoc(attendanceCollection, attendanceData);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-3xl text-orange-500 font-bold mb-5">Attendance Management</h1>
      <div className="mb-5">
        <label htmlFor="course" className="block text-sm font-medium text-gray-600">
          Select Course
        </label>
        <select
          id="course"
          name="course"
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        >
          <option value="">Select a course</option>
          <option value="Web and Mobile Development">Web and Mobile Development</option>
          <option value="Graphics Designing">Graphics Designing</option>
          <option value="CCNP">CCNP</option>
        </select>
      </div>
      <table className="w-full table-auto">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Course</th>
            <th className="px-4 py-2">Student Id</th>
            <th className="px-4 py-2">Attendance</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {loading ? (
            <tr className="text-center">
              <td colSpan="4" className="text-xl text-orange-500 font-bold mt-10">
                Loading...
              </td>
            </tr>
          ) : (
            students?.map((item, i) => (
              <tr key={i} className="hover:bg-gray-100 hover:text-orange-600 mt-3 text-center border-b border-orange-200 text-white">
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.selectedCourse}</td>
                <td className="px-4 py-2">{item.studentid}</td>
                <td className="px-4 py-2">
                  <div className={`flex items-center ${item.isPresent === true ? 'selected' : 'unselected'}`}>
                    <input
                      type="radio"
                      id={`present_${item.id}`}
                      name={`attendance_${item.id}`}
                      value="present"
                      checked={item.isPresent === true}
                      onChange={() => handleAddAttendance(item.studentid, true, item.selectedCourse, item.name)}
                    />
                    <label htmlFor={`present_${item.id}`} className="ml-1">Present</label>
                  </div>
                  <div className={`flex items-center mt-1 ${item.isPresent === false ? 'selected' : 'unselected'}`}>
                    <input
                      type="radio"
                      id={`absent_${item.studentid}`}
                      name={`attendance_${item.studentid}`}
                      value="absent"
                      checked={item.isPresent === false}
                      onChange={() => handleAddAttendance(item.studentid, false, item.selectedCourse, item.name)}
                    />
                    <label htmlFor={`absent_${item.id}`} className="ml-1">Absent</label>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    
    </div>
  );
}
