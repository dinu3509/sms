import {React,useState,useContext} from 'react'
import {bg} from '../assets';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserContext  from './UserContext';
const Login = () => {
  
  const [er1,setEr1] = useState("");
  const [er2,setEr2] = useState("");
  const navigate = useNavigate();
  const { uid, setUid } = useContext(UserContext);
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState({
    a: Math.floor(Math.random() * 9)+1,
    b: Math.floor(Math.random() * 9)+1,
  });
  const refreshCaptcha = (event) => {
    event.preventDefault(); 
    setCaptcha({
      a: Math.floor(Math.random() * 9)+1,
      b: Math.floor(Math.random() * 9)+1,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if(captcha.a + captcha.b !== parseInt(e.target[3].value)){
      setEr1("Captcha is incorrect");
    }else{setEr1("");}
    console.log(uid, password );

    axios.post("https://school-server-nine-pi.vercel.app/", { uid, password }, { mode: "cors" })
    .then((res) => { console.log(res);
      if(res.data.message === "Success"){
          setEr2("");
          if((captcha.a + captcha.b === parseInt(e.target[3].value))){
          navigate('/home');
          setUid(uid) 
        }else{
            setEr1("Captcha is incorrect");
          }
      }else{
        console.log("error");
        setEr2("Invalid Credentials");
      }
     })
    .catch((err) => { console.log(err); });
  };

  return (<div className='main text-white'>
      <div className="Header text-center text-2xl py-10 backdrop-blur-3xl font-semibold">School Management System</div>
    <div className='flex justify-center flex-col items-center h-[80vh]  '>
        <form action="" className='flex flex-col shadow-xl border backdrop-blur-3xl rounded-2xl rounded-r-2xl border-gray-400 lg:p-4 w-[360px] sm:w-[600px] sm:p-15 p-4 lg:w-[600px]' onSubmit={handleSubmit}>
        <h1 className='text-3xl font-semibold text-center mb-4'>STUDENT LOGIN</h1>

          <div className="p-2  flex flex-col text-xl gap-1 my-2">
          <label htmlFor="" className=''>User ID</label>
          <input type="text" className='bg-transparent outline-0 rounded h-9  px-3 border-b py-5' 
           onChange={(e)=>setUid(e.target.value.toUpperCase())}/>
          </div>

          <div className="p-2  flex flex-col text-xl gap-1 my-2">
          <label htmlFor="">Password</label>
          <input type="password" className='bg-transparent border-b outline-0 rounded h-9  px-3 py-5'
          onChange={(e)=>setPassword(e.target.value)}/>
          </div>
          
          <div className="p-2 my-4 captcha flex gap-3 items-center justify-around ">
            <div className="flex text-2xl font-semibold">{captcha.a} + {captcha.b} </div>

            <div className="refresh flex items-center">
              <button className='h-9 w-9 bg-blue-300 rounded-[4px] flex items-center justify-center cursor-pointer' onClick={refreshCaptcha} type='button'>
              <span className="material-symbols-rounded">
autorenew
</span>
              </button>
            </div>

            <div className="flex items-center">
              <input placeholder='Captcha' type="text" className='bg-white h-9 rounded w-25 outline-0 text-xl pl-3 pr-1 text-black' />
            </div>
            
          </div>
          {er1 && <div className="text-red-500 text-sm">{er1}</div>}

          <div className="my-4">
            <button className='bg-blue-400 text-white h-9 rounded w-full cursor-pointer'>Login</button>
          </div>
          {er2 && <div className="text-red-500 text-sm">{er2}</div>}

          <div className="my-4 ">
            <button className='bg-blue-400 text-white h-9 rounded p-2 cursor-pointer'>Reset Password</button>
          </div>

          
        </form>
        <div className="button absolute bottom-10 right-10 p-2 border rounded-xl flex items-center justify-between gap-2 cursor-pointer" onClick={()=>{
          navigate('/alogin')
        }}> <span className="material-symbols-rounded">
shield_person
</span>Faculty</div>
    </div>
    </div>
  )
}

export default Login
