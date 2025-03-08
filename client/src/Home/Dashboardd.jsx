import { React, useContext, useEffect, useState, useRef } from "react";
import UserContext from "../pages/UserContext";
import BasicDateCalendar from "../components/Calender";
import axios from "axios";
import { Scrollbars } from "react-custom-scrollbars-2";

const Dashboardd = () => {
  const section = "dashboard";
  const { avg, setAvg } = useContext(UserContext);
  const [userData, setUserData] = useState([]);
  const [userData2, setUserData2] = useState([]);
  const [userData3, setUserData3] = useState([]);
  const { uid, setUid } = useContext(UserContext);
  const [presentCount, setPresentCount] = useState(0);
  const [absentCount, setAbsentCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [tp, setTp] = useState(0);

  useEffect(() => {
    const todayDate = new Date().toISOString().split("T")[0]; // Get today's date in "YYYY-MM-DD" format
    let present = 0,
      absent = 0,
      total = 0,
    ttp = 0;

    userData3.forEach((entry) => {
      if (entry.value.date === todayDate) {
        entry.value.slots.forEach((slot) => {
          if (slot.isPresent) present++;
          else absent++;
        });
      }
      ttp += entry.value.slots?.filter((slot) => slot.isPresent).length || 0; // Count total present slots for all days
      total += entry.value.slots?.length || 0; // Count total attendance slots for all days
    });

    setPresentCount(present);
    setAbsentCount(absent);
    setTotalCount(total);
    setTp(ttp);
  }, [userData3]);
  const hasFetched = useRef(false);

  useEffect(() => {
    const savedUid = localStorage.getItem("uid");
    if (savedUid && !uid) {
      setUid(savedUid);
    }
  }, [uid, setUid]);

  useEffect(() => {
    const savedUserData = localStorage.getItem("userData");
    const savedUserData2 = localStorage.getItem("userData2");

    if (savedUserData) setUserData(JSON.parse(savedUserData));
    if (savedUserData2) setUserData2(JSON.parse(savedUserData2));
  }, []);

  useEffect(() => {
    if (uid && !hasFetched.current && userData.length === 0) {
      hasFetched.current = true; // Prevent multiple API calls

      axios
        .post("http://localhost:3000/home", { uid, section })
        .then((res) => {
          if (res.data.user) {
            const user = res.data.user;
            const userArray = Object.keys(user).map((key) => ({
              key: key,
              value: user[key],
            }));
            setUserData(userArray);
            localStorage.setItem("userData", JSON.stringify(userArray)); // ✅ Store in localStorage
          }
          if (res.data.user2) {
            const user2 = res.data.user2;
            const userArray2 = Object.keys(user2).map((key) => ({
              key: key,
              value: user2[key],
            }));
            setUserData2(userArray2);
            console.log(userArray2);

            localStorage.setItem("userData2", JSON.stringify(userArray2)); // ✅ Store in localStorage
          }
          if (res.data.user3) {
            const user3 = res.data.user3;
            const userArray3 = Object.keys(user3).map((key) => ({
              key: key,
              value: user3[key],
            }));
            console.log(userArray3);
            setUserData3(userArray3);
            localStorage.setItem("userData2", JSON.stringify(userArray3)); // ✅ Store in localStorage
          }
        })
        .catch((err) => console.log(err));
    }
  }, [uid]);

  const sem = userData.find((item) => item.key === "semester")?.value;
  const cgpaValue = userData.find((item) => item.key === "cgpa")?.value;
  const sgpaValue = userData.find((item) => item.key === "sgpa")?.value?.[
    Number(sem) - 2
  ]?.value;

  const grade = [
    { key: "CGPA", value: cgpaValue },
    { key: "SGPA", value: sgpaValue },
  ];
  const today = new Date();
  const todayName = today.toLocaleDateString("en-US", { weekday: "long" });
  const timetable = userData.find((item) => item.key === "timetable")?.value;
  const todayTimeTable = timetable?.[todayName] || {};
  const timeSlots = Object.keys(todayTimeTable || {});
  const subjects = Object.values(todayTimeTable || {});

  useEffect(() => {
    if (userData2.length > 0 && sem) {
      const ab = userData2.find((item) => item.key === "semesters")?.value;
      const semCourses = ab
        ? ab[5]?.courses.map((course) => course.percentage)
        : [];

      if (semCourses.length > 0) {
        const average = (
          semCourses.reduce((sum, num) => sum + num, 0) / semCourses.length
        ).toFixed(2);
        setAvg(average);
      }
    }
  }, [userData2, sem]);

  return (
    <div className="rounded-3xl">
      <div className="scrollbar bg-[#F8FAFC] h-[90vh] rounded-3xl p-7 overflow-y-scroll">
        <div className="grid grid-cols-1 grid-rows-1">
          <div className="bg-gradient-to-r from-amber-300  to-yellow-500 p-5 md:text-2xl rounded-3xl">
            Welcome back,
            {` ${userData.find((item) => item.key === "name")?.value}`}! 🎓
            Explore your dashboard to stay updated with classes, assignments,
            and announcements. Let’s make today productive!
            {}
          </div>
        </div>
        <div className="h- w-full rounded-3xl flex gap-20 items-start py-3">
          <div className="grid   md:grid-cols-2 lg:grid-cols-3 md:grid-rows-2 gap-5 w-full">
            <div className="i1">
              <div className="flex gap-5 bg-amber-500 p-5 rounded-3xl relative flex-col">
                <div className="flex justify-between items-center">
                  <div className="text-white ">Attendance</div>
                  <button className="border p-1 text-xs rounded-full flex items-center justify-center  ">
                    <span className="material-symbols-rounded">
                      expand_content
                    </span>
                  </button>
                </div>
                <hr className="border-gray-200" />

                <div className="grid grid-cols-3 gap-5">
                  {[
                    { Total: (tp/totalCount *100).toFixed(2)+"%" },
                    { Present: presentCount },
                    { Absent: absentCount },
                  ].map((item, index) => {
                    const [key, value] = Object.entries(item)[0];
                    return (
                      <div
                        key={index}
                        className="bg-white text-center w-full py-8 rounded-2xl text-black shadow-md"
                      >
                        <div className="">{key}</div>
                        <div className=" ">{value}</div>
                      </div>
                    );
                  })}
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
                      <span className="material-symbols-rounded">
                        expand_content
                      </span>
                    </button>
                  </div>
                </div>
                <hr></hr>

                <div className="flex gap-5">
                  {grade.map((item, index) => (
                    <div
                      key={index}
                      className="bg-[#F2F9FF] text-center w-full py-8 rounded-2xl text-black"
                    >
                      {item.key}
                      <div className="">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="i3 md:row-span-2 hidden md:block rounded-2xl bg-sky-300 ">
              {" "}
              <div className=" rounded-2xl overflow-hidden h-full flex flex-col gap-5 justify-center items-center ">
                <div className=" w-full rounded-2xl ">
                  <BasicDateCalendar></BasicDateCalendar>
                </div>
                <Scrollbars style={{ width: "100%", height: "100%" }}>
                  <div className="px-3">
                    <table className="border-collapse">
                      <thead>
                        <tr>
                          <th className="border pb-2 text-gray-600">Code</th>
                          <th className="border pb-2 text-gray-600">Course</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userData
                          .find((item) => item.key === "courses")
                          ?.value.map((course, index) => (
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
                  </div>
                </Scrollbars>
              </div>
            </div>

            <div className="i4">
              <div className=" h-70 rounded-2xl bg-amber-500 p-5 flex flex-col gap-5">
                <div className="flex justify-between items-center">
                  <div className="">Current Semester Courses</div>
                  <button className="border  p-1 text-xs rounded-full flex items-center justify-center">
                    <span className="material-symbols-rounded">
                      expand_content
                    </span>
                  </button>
                </div>
                <hr />
                <Scrollbars style={{ width: "100%", height: 300 }}>
                  <div className="">
                    <table className="border-collapse">
                      <thead>
                        <tr>
                          <th className="border pb-2 text-gray-600">Code</th>
                          <th className="border pb-2 text-gray-600">Course</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userData
                          .find((item) => item.key === "courses")
                          ?.value.map((course, index) => (
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
                  </div>
                </Scrollbars>
              </div>
            </div>

            <div className="i5">
              <div className="">
                <div className=" h-70 rounded-2xl bg-amber-500 p-5 flex flex-col gap-5">
                  <div className="flex justify-between items-center">
                    <div className="">Today's Timetable</div>
                    <button className="border  p-1 text-xs rounded-full flex items-center justify-center">
                      <span className="material-symbols-rounded">
                        expand_content
                      </span>
                    </button>
                  </div>
                  <hr />
                  <Scrollbars style={{ width: "100%", height: 300 }}>
                    <div className="">
                      <table className="border-collapse w-full">
                        <thead>
                          <tr>
                            <th className="border pb-2 text-gray-600">Time</th>
                            <th className="border pb-2 text-gray-600">
                              Course
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {timeSlots.map((item, index) => (
                            <tr key={index}>
                              <td className="border border-gray-300 px-4 py-2 text-sm">
                                {item}
                              </td>
                              <td className="border border-gray-300 px-4 py-2 text-sm">
                                {subjects[index]}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Scrollbars>
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
