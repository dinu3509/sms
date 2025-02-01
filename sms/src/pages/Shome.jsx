import { React, useState } from 'react';
import { zoro } from '../assets';
import { NavLink } from 'react-router-dom';
import Profilee from '../Home/Profilee';
import Dashboardd from '../Home/Dashboardd';
import Attendancee from '../Home/Attendancee';
const Shome = () => {


  const [activeMenu, setActiveMenu] = useState("Profile");

  const menuItems = [
    { name: "Profile", icon: "person", component: <Profile /> },
    { name: "Dashboard", icon: "dashboard", component: <Dashboard /> },
    { name: "Attendance", icon: "event", component: <Attendance /> },
    { name: "Academic Track", icon: "school", component: <AcademicTrack /> },
    { name: "Fees", icon: "payments", component: <Fees /> },
    { name: "Mentor Details", icon: "group", component: <MentorDetails /> },
    { name: "Events", icon: "calendar_today", component: <Events /> },
    { name: "Logout", icon: "logout", component: <Logout /> },
    
    // Additional items
    { name: "Messages", icon: "message", component: <Messages /> },
    { name: "Notifications", icon: "notifications", component: <Notifications /> },
    { name: "Settings", icon: "settings", component: <Settings /> },
    { name: "Help", icon: "help", component: <Help /> },
    { name: "Support", icon: "support_agent", component: <Support /> },
    { name: "Projects", icon: "work", component: <Projects /> },
    { name: "Team", icon: "people", component: <Team /> },
    { name: "Calendar", icon: "calendar_today", component: <Calendar /> },
  ];
  

  const [menu, setMenu] = useState(false);

  return (
    <div className="min-h-screen relative  bg-gradient-to-r from-[#0F2027] via-[#203A43] to-[#2C5364] py-10">
  
      {/* Sidebar */}
      <div
        className={`fixed scrollbar h-11/12 my-10 flex flex-col py-5 px-3  bg-gradient-to-b from-[#076585] via-[#076585] to-[#fff] top-0  gap-5 left-2 items-center transition-all duration-300 ease-in-out overflow-y-scroll rounded-2xl  ${
          menu ? 'w-60' : 'w-20'
        }`}
      >
        <div className="w-full flex justify-center">
          <button onClick={() => setMenu(!menu)} className="text-white text-2xl">
            <span className="material-symbols-rounded">menu</span>
          </button>
        </div>

        {/* User Image and Details */}
        {menu && (
          <div className="hidden lg:block transition-opacity duration-300">
            <img src={zoro} className="w-30 h-30 rounded-full border" alt="User" />
          </div>
        )}

        {/* Name and Roll Number */}
        <div className="bg-gray-800 flex justify-center flex-col text-white rounded-lg p-2 w-full">
          {menu ? (
            <div className="font-semibold">
              <div>D.DINESH REDDY</div>
              <div className="text-xs">VU22CSEN0100635</div>
            </div>
          ) : (
            <div className="font-semibold">
              <div>DDR</div>
              <div className="text-xs">0635</div>
            </div>
          )}
        </div>

        {/* Menu Items */}
        <ul className="menu bg-gray-800 w-full p-2 rounded-lg gap-5 flex flex-col">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveMenu(item.name)}
              className={`flex items-center gap-2 text-white p-2 rounded-lg transition-all duration-300 ${
                activeMenu === item.name ? "bg-gray-700 " : "hover:bg-gray-700"
              }`}
            >
              <span className="material-symbols-rounded">{item.icon}</span>
              <span>{menu && item.name}</span>
            </button>
          ))}
        </ul>
      </div>
      <main className={`${menu ? "pl-[241px]" : "pl-[80px]"}  h-auto `}>
        {menuItems.find((item) => item.name === activeMenu)?.component}
        
      </main>
    </div>
  );
};

const Profile = () => <div className=" mx-5 px-5  rounded-2xl text-white  h-40/42 ">
  <div className=""><Profilee></Profilee></div>
</div>;


const Dashboard = () =>  <div className=" mx-5 px-5  rounded-2xl text-white  ">
<div className=""><Dashboardd></Dashboardd></div>
</div>;

const Attendance = () => <div className="p-5 text-white"><Attendancee></Attendancee></div>;
const AcademicTrack = () => <div className="p-5 text-white">Academic Track Content</div>;
const Fees = () => <div className="p-5 text-white">Fees Content</div>;
const MentorDetails = () => <div className="p-5 text-white">Mentor Details Content</div>;
const Events = () => <div className="p-5 text-white">Events Content</div>;
const Logout = () => <div className="p-5 text-white">Logout Content</div>;
const Messages = () => <div className="p-5 text-white">Messages Content</div>;

const Notifications = () => <div className="p-5 text-white">Notifications Content</div>;

const Settings = () => <div className="p-5 text-white">Settings Content</div>;

const Help = () => <div className="p-5 text-white">Help Content</div>;

const Support = () => <div className="p-5 text-white">Support Content</div>;

const Projects = () => <div className="p-5 text-white">Projects Content</div>;

const Team = () => <div className="p-5 text-white">Team Content</div>;

const Calendar = () => <div className="p-5 text-white">Calendar Content</div>;


export default Shome;
