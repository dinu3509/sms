import React from 'react'
import BasicDateCalendar from '../components/Calender'
const Dashboardd = () => {
  return (
    <div className=' overflow-hidden rounded-3xl'>
      <div className="bg-[#F8FAFC] h-[90vh] rounded-3xl p-7">
        <div className="h- w-full rounded-3xl flex gap-20 items-start py-3">
          
        <div className="flex gap-5 bg-amber-500 p-5 rounded-3xl relative flex-col">
          <div className="flex justify-between items-center">
            <div className="">Attendance</div>
            <div className=""> <button className="border  p-1 text-xs rounded-full flex items-center justify-center"><span class="material-symbols-rounded">
expand_content
</span></button></div>
            </div>
          <hr></hr>
         
<div className="flex gap-5">
{["Total","Present","Present"].map((item , index) => (
          <div key={index} className="bg-[#F2F9FF] text-center w-30 py-8 rounded-2xl text-black">{item}
          <div className="">100%</div></div>
         ))}
</div>
         
        </div>

        <div className="flex gap-5 bg-amber-500 p-5 rounded-3xl relative flex-col">
          <div className="flex justify-between items-center">
            <div className="">Grade</div>
            <div className=""> <button className="border  p-1 text-xs rounded-full flex items-center justify-center"><span class="material-symbols-rounded">
expand_content
</span></button></div>
            </div>
          <hr></hr>
         
<div className="flex gap-5">
{["CGPA","SGPA"].map((item , index) => (
          <div key={index} className="bg-[#F2F9FF] text-center w-30 py-8 rounded-2xl text-black">{item}
          <div className="">100%</div></div>
         ))}
</div>

         
        </div>
        <div className="bg-red-500 ">
        <div className="bg-amber-500 rounded-2xl">
        <BasicDateCalendar></BasicDateCalendar>

</div>
        </div>
   
        </div>

      </div>
      <div class="grid grid-cols-3 grid-rows-2 gap-4 h-72 w-[600px]">
    <div class="bg-yellow-500 flex items-center justify-center rounded-lg text-white font-bold">Item 1</div>
    <div class="bg-green-500 flex items-center justify-center rounded-lg text-white font-bold">Item 2</div>
    <div class="bg-red-500 flex items-center justify-center rounded-lg text-white font-bold">Item 3</div>
    <div class="bg-blue-500 flex items-center justify-center rounded-lg text-white font-bold">Item 4</div>
    <div class="bg-purple-500 flex items-center justify-center rounded-lg text-white font-bold row-span-2">Item 5</div>
  </div>
    </div>
  )
}

export default Dashboardd
