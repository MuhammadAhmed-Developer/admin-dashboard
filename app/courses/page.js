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

export default function CoursePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenedit, setIsModalOpenedit] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  // Loading states for different actions
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [isUpdatingCourse, setIsUpdatingCourse] = useState(false);
  const [isDeletingCourse, setIsDeletingCourse] = useState(false);

  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsAddingCourse(true); // Set loading to true

    let course = {
      courseName,
      courseCode,
      description,
    };

    try {
      const docRef = await addDoc(collection(db, "courses"), course);
      setIsModalOpen(false);
      fetchCourses();
      console.log("Course Added in firebase : ", docRef.id);
    } catch (e) {
      console.error("Error adding course: ", e);
    } finally {
      setIsAddingCourse(false);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const openModalEdit = (item) => {
    setSelectedItem(item);
    console.log("itemmmmmmmmmm", item);
    setCourseName(item.courseName || "");
    setCourseCode(item.courseCode || "");
    setDescription(item.description || "");
    setIsModalOpenedit(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeModalEdit = () => {
    setIsModalOpenedit(false);
  };

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const courseCollection = collection(db, "courses");
      const docs = await getDocs(courseCollection);
      const courseData = [];
      docs.forEach((doc) => {
        courseData.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCourses(courseData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdatingCourse(true); // Set loading to true

    if (!selectedItem) {
      return;
    }

    try {
      const docRef = doc(db, "courses", selectedItem.id);

      await updateDoc(docRef, {
        courseName,
        courseCode,
        description,
      });

      setSelectedItem(null);
      setIsModalOpenedit(false);

      fetchCourses();
    } catch (error) {
      console.error(error);
    } finally {
      setIsUpdatingCourse(false); // Set loading to false
    }
  };

  const handleDelete = async (id) => {
    console.log(`Deleting course with ID ${id}`);
    setIsDeletingCourse(true); // Set loading to true

    try {
      await deleteDoc(doc(db, "courses", id));
      const newCourses = courses.filter((course) => id !== course.id);
      setCourses(newCourses);
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeletingCourse(false);
    }
  };

  return (
    <>
      <div className="overflow-x-auto mt-5 mx-0">
        <h1 className="text-3xl text-orange-500 font-bold mb-15">Courses List</h1>
        <div className="flex flex-row justify-between">
          <h2 className="text-xl font-semibold mb-4 text-center text-white"></h2>
          <button className="text-orange-500 bg-white rounded-lg py-1 px-5 mb-3 hover:bg-orange-500 hover:text-white" onClick={openModal}>Add +</button>
        </div>
        <div className="shadow-lg rounded-lg overflow-hidden">
          <table className="w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">Course Name</th>
                <th className="px-4 py-2">Course Code</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Action</th>
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
                courses?.map((item, i) => (
                  <tr key={i} className="hover:bg-gray-100 hover:text-orange-600 mt-3 text-white text-center border-b border-orange-200">
                    <td className="px-4 py-2">{item.courseName}</td>
                    <td className="px-4 py-2">{item.courseCode}</td>
                    <td className="px-4 py-2">{item.description}</td>
                    <td className="px-4 py-2">
                      <button className="text-blue-500 hover:text-blue-700 mr-5" onClick={() => openModalEdit(item)}>
                        <FaEdit />
                      </button>
                      <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(item.id)}>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpenedit && (
        <div className="fixed text-center inset-0 flex items-center justify-center modal-overlay">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-5 rounded shadow-md w-[90vh]">
              <div className="flex justify-end">
                <button onClick={closeModalEdit} className="text-gray-600 hover:text-gray-800 focus:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <h1 className="text-2xl font-semibold mb-6">Update Course</h1>
              <form onSubmit={handleUpdate} className="mx-auto">
                <div className="mb-6">
                  <label htmlFor="courseName" className="block text-sm font-medium text-gray-600">
                    Course Name
                  </label>
                  <input
                    type="text"
                    id="courseName"
                    name="courseName"
                    value={courseName}
                    className="mt-1 p-2 w-full lg:w-3/4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Enter Course Name"
                    onChange={(e) => setCourseName(e.target.value)}
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="courseCode" className="block text-sm font-medium text-gray-600">
                    Course Code
                  </label>
                  <input
                    type="text"
                    id="courseCode"
                    name="courseCode"
                    value={courseCode}
                    className="mt-1 p-2 w-full lg:w-3/4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Enter Course Code"
                    onChange={(e) => setCourseCode(e.target.value)}
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-600">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={description}
                    className="mt-1 p-2 w-full lg:w-3/4 h-32 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Enter Description"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-orange-500 text-white py-3 w-[75%] px-6 rounded-lg hover:bg-orange-600 focus:outline-none focus:bg-orange-600"
                  >
                    {isUpdatingCourse ? "Updating Course..." : "Update Course"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed text-center inset-0 flex items-center justify-center modal-overlay">
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
                Create a New Course
              </h1>
              <form onSubmit={handleSubmit} className="mx-auto">
                <div className="mb-6">
                  <label
                    htmlFor="courseName"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Course Name
                  </label>
                  <input
                    type="text"
                    id="courseName"
                    name="courseName"
                    className="mt-1 p-2 w-full lg:w-3/4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Enter Course Name"
                    onChange={(e) => setCourseName(e.target.value)}
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="courseCode"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Course Code
                  </label>
                  <input
                    type="text"
                    id="courseCode"
                    name="courseCode"
                    className="mt-1 p-2 w-full lg:w-3/4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Enter Course Code"
                    onChange={(e) => setCourseCode(e.target.value)}
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    className="mt-1 p-2 w-full lg:w-3/4 h-32 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Enter Description"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-orange-500 text-white py-3 w-[75%] px-6 rounded-lg hover:bg-orange-600 focus:outline-none focus:bg-orange-600"
                  >
                    {isAddingCourse ? "Adding Course..." : "Add Course"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


