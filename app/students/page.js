'use client'
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import { db } from "@/config/firebase";


export default function page() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenedit, setIsModalOpenedit] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [student, setstudent] = useState();
  const [loading, setLoading] = useState(false);

  const [name, setname] = useState("");
  const [studentid, setstudentid] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState('')


  const handelSubmit = async (e) =>{
    e.preventDefault()
    let students = {
      name,
      studentid,
      phone,
      address
     }
     try {
      const docRef = await addDoc(collection(db, "students"), students);
      setIsModalOpen(false);
      console.log("Document Added  in firebase : ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const openModal = () => {
    setIsModalOpen(true);
  };
  const openModaledit = (item) => {
    setSelectedItem(item);
    console.log("itemmmmmmmmmm",item);
    setname(item.name || "");
    setstudentid(item.studentid || "");
    setphone(item.phone || "");
    setaddress(item.address || "")
    setIsModalOpenedit(true);
  };  

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const closeModaledit = () => {
    setIsModalOpenedit(false);
  };


  const fetchData = async () => {
    try {
      setLoading(true);
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
      // console.log(listdata);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);




  const handleUpdate = async (e) => {
    e.preventDefault();
  
    if (!selectedItem) {
      return;
    }
  
    try {
      const docRef = doc(db, "students", selectedItem.id);
  
      await updateDoc(docRef, {
        name,
        studentid,
        phone,
        address,
      });
  
      // Close the modal and clear selected item
      setSelectedItem(null);
      setIsModalOpenedit(false);
  
      // Fetch updated data
      fetchData();
  
    } catch (error) {
      console.error(error);
    }
  };





  const handleDelete = async (id) => {
    console.log(`Deleting item with ID ${id}`);
    await deleteDoc(doc(db, "students", id));
    const newStudents = student.filter((student)=>id !== student.id)
    setLoading(false)
    setstudent(newStudents)
  };

  return (
    <>
    <div className="overflow-x-auto mt-5 mx-0">
      <h1 className="text-3xl text-orange-500 font-bold mb-15">Students List</h1>
      <div className="flex flex-row justify-between">
        <h2 className="text-xl font-semibold mb-4 text-center text-white">
          
        </h2>
        <button className="text-orange-500 bg-white rounded-lg py-1 px-5 mb-3 hover:bg-orange-500 hover:text-white" onClick={()=>openModal()}>Add +</button>
      </div>
        <div className="shadow-lg rounded-lg overflow-hidden">
          <table className="w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Student Id</th>
                <th className="px-4 py-2">Phone No</th>
                <th className="px-4 py-2">Address</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            {loading ? (
              <div className="d-flex justify-start text-center mt-5">
                <span class="loader text-center ml-[70vh] mt-56"></span>
              </div>
            ) : (
              <tbody className="text-gray-700">
                <>
                  {student?.map((item, i) => {
                     return ( 
                      <tr  key={i} className="hover:bg-gray-100 hover:text-orange-600 mt-3 text-white text-center border-b border-orange-200">
                        <td className="px-4 py-2">{item.name}</td>
                        <td className="px-4 py-2">{item.studentid}</td>
                        <td className="px-4 py-2">{item.phone}</td>
                        <td className="px-4 py-2">{item.address}</td>
                        <td className="px-4 py-2">
                          <button
                            className="text-blue-500 hover:text-blue-700 mr-5"
                            onClick={()=>openModaledit(item)}
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDelete(item.id)}
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                     );
                   })}
                </>
                {/* Add more table rows with data and icons as needed */}
              </tbody>
            )}
          </table>
        </div>
      </div>



      

      {isModalOpenedit && (
        <div
          className="fixed text-center inset-0 flex items-center justify-center modal-overlay"
          
        >
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-5 rounded shadow-md w-[90vh]">
              <div className="flex justify-end">
                <button
                  onClick={closeModaledit}
                  className="text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <h1 className="text-2xl font-semibold mb-6">
                Update Student
              </h1>
              <form onSubmit={handleUpdate} className="mx-auto">
                <div className="mb-6">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-600"
                  >
                   Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    className="mt-1 p-2 w-full lg:w-3/4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Enter title"
                    onChange={(e) => setname(e.target.value)}
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Student Id
                  </label>
                  <input
                    type="number"
                    id="studentid"
                    name="studentid"
                    value={studentid}
                    className="mt-1 p-2 w-full lg:w-3/4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Enter Student Id"
                    onChange={(e) => setstudentid(e.target.value)}
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Phone No
                  </label>
                  <input
                    type="phone"
                    id="phone"
                    name="phone"
                    value={phone}
                    className="mt-1 p-2 w-full lg:w-3/4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Enter Phone No"
                    onChange={(e) => setphone(e.target.value)}
                  />
                  <label
                    htmlFor="description"
                    className="block text-sm mt-5 font-medium text-gray-600"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={address}
                    className="mt-1 p-2 w-full lg:w-3/4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Enter Address "
                    onChange={(e) => setaddress(e.target.value)}
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-orange-500 text-white py-3 w-[75%] px-6 rounded-lg hover:bg-orange-600 focus:outline-none focus:bg-orange-600"
                  >
                    Update Student
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}






















{isModalOpen && (
        <div
          className="fixed text-center inset-0 flex items-center justify-center modal-overlay"
        >
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-5 rounded shadow-md w-[90vh]">
              <div className="flex justify-end">
                <button
                  onClick={closeModal}
                  className="text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <h1 className="text-2xl font-semibold mb-6">
                Create a New Student
              </h1>
              <form onSubmit={handelSubmit} className="mx-auto">
                <div className="mb-6">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-600"
                  >
                   Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="mt-1 p-2 w-full lg:w-3/4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Enter title"
                    onChange={(e) => setname(e.target.value)}
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Student Id
                  </label>
                  <input
                    type="number"
                    id="studentid"
                    name="studentid"
                    className="mt-1 p-2 w-full lg:w-3/4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Enter Student Id"
                    onChange={(e) => setstudentid(e.target.value)}
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Phone No
                  </label>
                  <input
                    type="phone"
                    id="phone"
                    name="phone"
                    className="mt-1 p-2 w-full lg:w-3/4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Enter Phone No"
                    onChange={(e) => setphone(e.target.value)}
                  />
                  <label
                    htmlFor="description"
                    className="block text-sm mt-5 font-medium text-gray-600"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className="mt-1 p-2 w-full lg:w-3/4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Enter Address "
                    onChange={(e) => setaddress(e.target.value)}
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-orange-500 text-white py-3 w-[75%] px-6 rounded-lg hover:bg-orange-600 focus:outline-none focus:bg-orange-600"
                  >
                    Add Student
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}


    </>
  )
}
