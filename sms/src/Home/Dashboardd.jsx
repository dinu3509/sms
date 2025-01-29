import React from 'react'

const Dashboardd = () => {
  return (
    <div className=' overflow-hidden rounded-3xl'>
      <div className="bg-[#F8FAFC] h-[90vh] rounded-3xl p-7">
        <div className="h- w-full bg-red-400 rounded-3xl flex gap-20 items-center px-10">
          
        <div className="flex gap-5 bg-amber-500 p-10 rounded-3xl relative">
          <div className=""></div>
          <button className="border h-fit p-1 absolute top-2 right-2 text-xs rounded-full flex items-center justify-center"><span class="material-symbols-rounded">
expand_content
</span></button>
<div className="flex gap-5">
{["Total","Present","Present"].map((item , index) => (
          <div key={index} className="bg-[#F2F9FF] text-center w-30 py-10 rounded-2xl text-black">{item}
          <div className="">100%</div></div>
         ))}
</div>
         
        </div>

        <div className="flex gap-5">
         {["CGPA","SGPA"].map((item , index) => (
          <div key={index} className="bg-[#F2F9FF] text-center w-30 py-10 rounded-2xl text-black">{item}
          <div className="">100%</div>
          </div>
         ))}
        </div>

        </div>

      </div>
      
    </div>
  )
}

export default Dashboardd
