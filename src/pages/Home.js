import React from 'react'
import { motion } from 'framer-motion'
import './animate.css'
import {BsFacebook,BsGithub,BsLinkedin} from 'react-icons/bs'
import {RiInstagramFill} from 'react-icons/ri'
import {FaUserCircle} from 'react-icons/fa' 

const Home = () => {
  return (
    <div className='w-full min-h-[100vh-60px]  md:min-h-[calc(100vh-70px)] lg:min-h-[calc(100vh-80px)] relative font-lobster border-2 border-slate-600 max-w-[1400px] mx-auto '>
        <header className='w-full  grid grid-cols-1 md:grid-cols-2 bg-slate-900'> 
            <motion.div initial={{x:2000}} animate={{x:0}} transition={{duration:2}} className=' place-items-center flex flex-col justify-center items-start min-h-[60vh] md:min-h-[70vh] relative bg-slate-900 md:pl-16 px-3 py-4' >
                <h1 className='text-4xl mt-12 md:mt-0  sm:tracking-wide md:text-6xl uppercase font-bold tracking-wider mb-4 text-[#ff0] font-satisfy'>Aghoghovwia</h1>
                <h4 className='text-4xl tracking-widest mb-4 uppercase text-slate-100'>Andrew</h4>
                <p className='w-[90%]  text-xl text-gray-100'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis optio nostrum cum beatae porro dolorem odio ratione</p>

                <button className='border-2 border-slate-50 py-2  px-16 bg-[#ff0] md:px-20 mt-12 md:mt-8 shadow-md shadow-[#6e6e32] rounded-full text-xl'>Resume</button>
            </motion.div>
            <motion.div initial={{x:1000}} animate={{x:0}} transition={{duration:1}} className=' min-h-[60vh] md:min-h-[calc(100vh-70px)] lg:min-h-[calc(100vh-80px)] relative  bg-slate-900 overflow-hidden'>
                <motion.img initial={{y:1000}} animate={{y:0}} transition={{delay:1,duration:2}}  src="/img/me.png" alt="" className='md:mx-auto z-10 relative rounded-sm'  />
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className='blob w-[100%] absolute top-20 left-0 z-[1]'>
  <path fill="#ff0"  />
</svg>
<div className='absolute top-0 md:top-32  right-0 h-[40%] grid grid-cols-1 gap-y-2 w-12 bg-transparent z-30'>
    <motion.div whileTap={{x:-100}} className='py-2 border-l-4 border-[#ff0] bg-transparent rounded-l-full  flex justify-center items-center hover:rotate-180'><FaUserCircle className='text-3xl text-[#ff0]'/></motion.div>
    <motion.div whileTap={{x:-100}} className='py-2 border-l-4 border-[#ff0] bg-transparent rounded-l-full  flex justify-center items-center hover:rotate-180 '><BsFacebook className='text-3xl text-[#ff0]'/></motion.div>
    <motion.div whileTap={{x:-100}} className='py-2 border-l-4 border-[#ff0] bg-transparent rounded-l-full  flex justify-center items-center hover:rotate-180 '><BsGithub className='text-3xl text-[#ff0]'/></motion.div>
    <motion.div whileTap={{x:-100}} className='py-2 border-l-4 border-[#ff0] bg-transparent rounded-l-full  flex justify-center items-center hover:rotate-180 '><BsLinkedin className='text-2xl text-[#ff0] rounded-full'/></motion.div>
    <motion.div whileTap={{x:-100}} className='py-2 border-l-4 border-[#ff0] bg-transparent rounded-l-full  flex justify-center items-center hover:rotate-180 '><RiInstagramFill className='text-3xl text-[#ff0]'/></motion.div>
</div>
            </motion.div>
        </header>
       
    </div>
  )
}

export default Home