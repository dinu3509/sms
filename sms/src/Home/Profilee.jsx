import React from 'react';
import { zoro } from '../assets';

const Profilee = () => {
  return (
    <>
    <div className="flex flex-col items-center justify-center">
      <div className="w-full h-auto border rounded-2xl pt-30 pb-5 px-5 relative mt-20 lg:mt-25">
      <div className="absolute top-[-35px] text-2xl font-bold left-2">PROFILE</div>


        <div className="">
          <img
            src={zoro}
            className="lg:w-50 lg:h-50 w-40 h-40 rounded-full  absolute top-[0] left-0 right-0 bottom-full m-auto"
            alt="User"
          />
        </div>
        <div className="grid lg:grid-cols-5 md:grid-cols-4 gap-5 gap-y-12 sm:grid-cols-2">

          <div className="border p-1 rounded-lg relative bg-gray-700">VU22CSEN0100635
            <div className=" absolute top-[-20px] left-0 text-xs">Registration No.</div>
          </div>
          <div className="border p-1 rounded-lg relative">VSP
            <div className=" absolute top-[-20px] left-0 text-xs">Campus </div>
          </div>
          <div className="border p-1 rounded-lg relative">GIT
            <div className=" absolute top-[-20px] left-0 text-xs">College</div>
          </div>
          <div className="border p-1 rounded-lg relative">2022-2026
            <div className=" absolute top-[-20px] left-0 text-xs">Batch</div>
          </div>
          <div className="border p-1 rounded-lg relative">UG
            <div className=" absolute top-[-20px] left-0 text-xs">Degree</div>
          </div>

          <div className="border p-1 rounded-lg relative bg-gray-700">CSE
            <div className=" absolute top-[-20px] left-0 text-xs">Program</div>
          </div>
          <div className="border p-1 rounded-lg relative">CSE
            <div className=" absolute top-[-20px] left-0 text-xs">Branch </div>
          </div>
          <div className="border p-1 rounded-lg relative">III Yr
            <div className=" absolute top-[-20px] left-0 text-xs">Class</div>
          </div>
          <div className="border p-1 rounded-lg relative">A
            <div className=" absolute top-[-20px] left-0 text-xs">Section</div>
          </div>
          <div className="border p-1 rounded-lg relative">6
            <div className=" absolute top-[-20px] left-0 text-xs">Semester</div>
          </div>
          

          
        </div>
       

       
      </div>
      <div className="h-auto pt-10 border w-full mt-15 p-5 rounded-2xl relative">
      <div className="absolute top-[-35px] text-2xl font-bold left-2">PERSONAL DETAILS</div>
      <div className="relative grid lg:grid-cols-5 md:grid-cols-4 gap-5 gap-y-12 sm:grid-cols-2">

<div className="border p-1 rounded-lg relative bg-gray-700">Dharmala Dinesh Reddy
  <div className=" absolute top-[-20px] left-0 text-xs">Student Full Name</div>
</div>
<div className="border p-1 rounded-lg relative">836030795962
  <div className=" absolute top-[-20px] left-0 text-xs">Aadhar Number</div>
</div>
<div className="border p-1 rounded-lg relative">04 Nov 2004
  <div className=" absolute top-[-20px] left-0 text-xs">DOB</div>
</div>
<div className="border p-1 rounded-lg relative">
  <div className=" absolute top-[-20px] left-0 text-xs">Blood Group</div>
</div>
<div className="border p-1 rounded-lg relative">8309077059
  <div className=" absolute top-[-20px] left-0 text-xs">Mobile Number</div>
</div>

<div className="border p-1 rounded-lg relative bg-gray-700">ddharmal2@gitam.in
  <div className=" absolute top-[-20px] left-0 text-xs">E-mail</div>
</div>
<div className="border p-1 rounded-lg relative">M
  <div className=" absolute top-[-20px] left-0 text-xs">Gender </div>
</div>
<div className="border p-1 rounded-lg relative">Indian
  <div className=" absolute top-[-20px] left-0 text-xs">Nationality</div>
</div>
<div className="border p-1 rounded-lg relative">Hindu
  <div className=" absolute top-[-20px] left-0 text-xs">Religion</div>
</div>
<div className="border p-1 rounded-lg relative">Dharmala Venkata Ramana
  <div className=" absolute top-[-20px] left-0 text-xs">Father Name</div>
</div>
<div className="border p-1 rounded-lg relative">Dharmala Devaki Devi
  <div className=" absolute top-[-20px] left-0 text-xs">Mother Name</div>
</div>
<div className="border p-1 rounded-lg relative">General
  <div className=" absolute top-[-20px] left-0 text-xs">Category</div>
</div>



</div>

      </div>

      <div className="h-auto pt-10 border w-full m-15 p-5 rounded-2xl relative">
      <div className="absolute top-[-35px] text-2xl font-bold left-2">PERMANENT ADDRESS</div>
      <div className="relative grid lg:grid-cols-5 md:grid-cols-4 gap-5 gap-y-12 sm:grid-cols-2">

<div className="border p-1 rounded-lg relative bg-gray-700">58-10-32
  <div className=" absolute top-[-20px] left-0 text-xs">Door Number</div>
</div>
<div className="border p-1 rounded-lg relative">Visakhapatnam
  <div className=" absolute top-[-20px] left-0 text-xs">Location</div>
</div>
<div className="border p-1 rounded-lg relative">Visakhapatnam
  <div className=" absolute top-[-20px] left-0 text-xs">City</div>
</div>
<div className="border p-1 rounded-lg relative">Andhra Pradesh
  <div className=" absolute top-[-20px] left-0 text-xs">State</div>
</div>
<div className="border p-1 rounded-lg relative">India
  <div className=" absolute top-[-20px] left-0 text-xs">Country</div>
</div>

<div className="border p-1 rounded-lg relative bg-gray-700">530009
  <div className=" absolute top-[-20px] left-0 text-xs">Pincode</div>
</div>


</div>

      </div>
    </div>
    </>
  );
};

export default Profilee;
