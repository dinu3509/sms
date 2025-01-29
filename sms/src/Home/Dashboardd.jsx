import React from "react";
import { Scrollbars } from 'react-custom-scrollbars';

import BasicDateCalendar from "../components/Calender";
const Dashboardd = () => {
  const courses = [
    { code: "24CSEN1081", name: "Intermediate Coding-II" },
    {
      code: "CLAD2031",
      name: "Preparation For Campus Placement-2 (Soft Skills 6A)",
    },
    { code: "CSEN2031", name: "Artificial Intelligence" },
    { code: "CSEN2031P", name: "Artificial Intelligence Lab" },
    { code: "CSEN2071", name: "Cryptography and Network Security" },
    { code: "CSEN2111", name: "Agile Software Development" },
    { code: "CSEN3031", name: "Compiler Design" },
    { code: "CSEN3031P", name: "Compiler Design Lab" },
    {
      code: "CSEN3071",
      name: "Web Application Development and Software Frameworks",
    },
    {
      code: "CSEN3071P",
      name: "Web Application Development and Software Frameworks Lab",
    },
    { code: "FINA3011", name: "Financial Markets and Services" },
    { code: "INTN2333", name: "Internship 1" },
  ];
  return (
    <div className=" rounded-3xl">
      <div className="scrollbar bg-[#F8FAFC] h-[90vh] rounded-3xl p-7 overflow-y-scroll">
        <div className="grid grid-cols-1 grid-rows-1">
          <div className="bg-gradient-to-r from-amber-300  to-yellow-500 p-5 text-2xl rounded-3xl">Welcome back, Dinesh Reddy! 🎓 Explore your dashboard to stay updated with classes, assignments, and announcements. Let’s make today productive!</div>
        </div>
        <div className="h- w-full rounded-3xl flex gap-20 items-start py-3">
          <div className="grid grid-cols-2 lg:grid-cols-3 grid-rows-2 gap-5 w-full">
            <div className="i1">
              {" "}
              <div className="flex gap-5 bg-amber-500 p-5 rounded-3xl relative flex-col">
                <div className="flex justify-between items-center">
                  <div className="">Attendance</div>
                  <div className="">
                    {" "}
                    <button className="border  p-1 text-xs rounded-full flex items-center justify-center">
                      <span class="material-symbols-rounded">
                        expand_content
                      </span>
                    </button>
                  </div>
                </div>
                <hr></hr>

                <div className="flex gap-5">
                  {["Total", "Present", "Present"].map((item, index) => (
                    <div
                      key={index}
                      className="bg-[#F2F9FF] text-center w-full py-8 rounded-2xl text-black"
                    >
                      {item}
                      <div className="">100%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="i2">
              <div className="flex gap-5 bg-amber-500 p-5 rounded-3xl relative flex-col">
                <div className="flex justify-between items-center">
                  <div className="">Grade</div>
                  <div className="">
                    {" "}
                    <button className="border  p-1 text-xs rounded-full flex items-center justify-center">
                      <span class="material-symbols-rounded">
                        expand_content
                      </span>
                    </button>
                  </div>
                </div>
                <hr></hr>

                <div className="flex gap-5">
                  {["CGPA", "SGPA"].map((item, index) => (
                    <div
                      key={index}
                      className="bg-[#F2F9FF] text-center w-full py-8 rounded-2xl text-black"
                    >
                      {item}
                      <div className="">100%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="i3 row-span-2 h-full rounded-2xl bg-sky-300">
              {" "}
              <div className=" rounded-2xl overflow-hidden h-full flex flex-col gap-5 justify-center items-center ">
                <div className=" w-full rounded-2xl ">
                  <BasicDateCalendar></BasicDateCalendar>
                </div>
                <Scrollbars style={{width: '100%', height: "100%" }}>
       
      
                <div className="px-3">
                  <table className="border-collapse">
                    <thead>
                      <tr>
                        <th class="border pb-2 text-gray-600">Code</th>
                        <th class="border pb-2 text-gray-600">Course</th>
                      </tr>
                    </thead>
                    <tbody>
                      {courses.map((course) => (
                        <tr key={course.code}>
                          <td className="border border-gray-300 px-4 py-2 text-sm">
                            {course.code}
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-sm">
                            {course.name}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div></Scrollbars>
              </div>
            </div>

            <div className="i4">
              <div className=" h-70 rounded-2xl bg-amber-500 p-5 flex flex-col gap-5">
                <div className="flex justify-between items-center">
                  <div className="">Current Semester Courses</div>
                  <button className="border  p-1 text-xs rounded-full flex items-center justify-center">
                    <span class="material-symbols-rounded">expand_content</span>
                  </button>
                </div>
                <hr />
                <Scrollbars style={{width: '100%', height: 300 }}>
       
      
                <div className="">
                  <table className="border-collapse">
                    <thead>
                      <tr>
                        <th class="border pb-2 text-gray-600">Code</th>
                        <th class="border pb-2 text-gray-600">Course</th>
                      </tr>
                    </thead>
                    <tbody>
                      {courses.map((course) => (
                        <tr key={course.code}>
                          <td className="border border-gray-300 px-4 py-2 text-sm">
                            {course.code}
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-sm">
                            {course.name}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div></Scrollbars>
              </div>
            </div>




            <div className="i5">

            <div className="">
              <div className=" h-70 rounded-2xl bg-amber-500 p-5 flex flex-col gap-5">
                <div className="flex justify-between items-center">
                  <div className="">Current Semester Courses</div>
                  <button className="border  p-1 text-xs rounded-full flex items-center justify-center">
                    <span class="material-symbols-rounded">expand_content</span>
                  </button>
                </div>
                <hr />
                <Scrollbars style={{width: '100%', height: 300 }}>
       
      
                <div className="">
                  <table className="border-collapse">
                    <thead>
                      <tr>
                        <th class="border pb-2 text-gray-600">Code</th>
                        <th class="border pb-2 text-gray-600">Course</th>
                      </tr>
                    </thead>
                    <tbody>
                      {courses.map((course) => (
                        <tr key={course.code}>
                          <td className="border border-gray-300 px-4 py-2 text-sm">
                            {course.code}
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-sm">
                            {course.name}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div></Scrollbars>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboardd;
