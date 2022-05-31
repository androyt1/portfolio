import React,{useEffect} from 'react'
import { motion } from 'framer-motion'
import {AiFillHtml5,AiFillGithub} from 'react-icons/ai'
import {DiCss3Full,DiJavascript1,DiReact} from 'react-icons/di'
import {FaVuejs,FaJava,FaLaravel,FaNode} from 'react-icons/fa'
import {SiTypescript,SiTailwindcss,SiCsharp} from 'react-icons/si'
import {BsFillBootstrapFill} from 'react-icons/bs'
import AOS from 'aos';
import 'aos/dist/aos.css';

const Services = () => {

  useEffect(()=>{
    AOS.init()
  },[])

  return (
    <div className='w-full min-h-[100vh-60px] md:min-h-[calc(100vh-70px)] lg:min-h-[calc(100vh-80px)] relative font-lobster border-2 border-slate-500 bg-slate-900 max-w-[1400px] mx-auto overflow-hidden'>
      <div className='w-full pt-10 mx-auto border-2 border-slate-400'>
      <motion.h3 initial={{scale:1}} animate={{scale:2}} transition={{duration:3}} className='text-3xl md:text-4xl text-slate-50 text-center'>Services</motion.h3>
      <div className='mt-12 w-[90%] mx-auto'>
      <p className='text-slate-300 text-xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur molestiae qui cupiditate in molestias numquam quidem odit velit dolore suscipit?</p>
      
      <ul className='pl-4 md:pl-8 tracking-wider mt-8'>
        <li data-aos="fade-up" data-aos-duration="2000" className='text-slate-300 mb-2 mt-3'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio, unde!</li>
        <li data-aos="fade-up" data-aos-duration="2000" className='text-slate-300 mb-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto similique porro ad repellat fugit?</li>
        <li data-aos="fade-up" data-aos-duration="2000" className='text-slate-300 mb-2'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis non quas molestiae quae praesentium. Suscipit, perferendis! Tempora voluptatum illum a.</li>
        <li data-aos="fade-up" data-aos-duration="2000" className='text-slate-300 mb-2'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem, totam.</li>
        <li data-aos="fade-up" data-aos-duration="2000" className='text-slate-300 mb-2'>Lorem ipsum dolor sit amet.</li>
      </ul>

       {/* Technologies I work with */}
       <div className='w-full  md:w-[95%] mx-auto'>
        <h5 className='text-xl font-poppins text-slate-50 mt-20 uppercase text-center mx-auto'>Technologies I work with</h5>
        <div data-aos="fade-up"  className='w-full py-8 mt-2 grid grid-cols-3 md:grid-cols-4 gap-9 place-items-center border-2 border-slate-700'>
            <AiFillHtml5 data-aos="zoom-in"  data-aos-duration="2000"  data-aos-delay="50"  className='text-slate-50 text-4xl md:text-6xl' />
            <DiCss3Full data-aos="zoom-in"  data-aos-duration="2000"  data-aos-delay="100"  className='text-slate-50 text-4xl md:text-6xl' />
            <SiTypescript data-aos="zoom-in"  data-aos-duration="2000"  data-aos-delay="150"  className='text-slate-50 text-4xl md:text-6xl' />   
            <DiJavascript1 data-aos="zoom-in"  data-aos-duration="2000"  data-aos-delay="200"  className='text-slate-50 text-4xl md:text-6xl' />
            <FaVuejs data-aos="zoom-in"  data-aos-duration="2000"  data-aos-delay="250"  className='text-slate-50 text-4xl md:text-6xl' />
            <DiReact data-aos="zoom-in"  data-aos-duration="2000"  data-aos-delay="300"  className='text-slate-50 text-4xl md:text-6xl' />
            <BsFillBootstrapFill data-aos="zoom-in"  data-aos-duration="2000"  data-aos-delay="350"  className='text-slate-50 text-4xl md:text-6xl' />
            <SiTailwindcss data-aos="zoom-in"  data-aos-duration="2000"  data-aos-delay="400"  className='text-slate-50 text-4xl md:text-6xl' />
            <AiFillGithub data-aos="zoom-in"  data-aos-duration="2000"  data-aos-delay="450"  className='text-slate-50 text-4xl md:text-6xl' />
            <DiJavascript1 data-aos="zoom-in"  data-aos-duration="2000"  data-aos-delay="500"  className='text-slate-50 text-4xl md:text-6xl' />
            <SiCsharp data-aos="zoom-in"  data-aos-duration="2000"  data-aos-delay="550"  className='text-slate-50 text-4xl md:text-6xl' />
            <FaLaravel data-aos="zoom-in"  data-aos-duration="2000"  data-aos-delay="600"  className='text-slate-50 text-4xl md:text-6xl' />
            <FaJava data-aos="zoom-in"  data-aos-duration="2000"  data-aos-delay="650"  className='text-slate-50 text-4xl md:text-6xl' />
            <FaNode data-aos="zoom-in"  data-aos-duration="2000"  data-aos-delay="700"  className='text-slate-50 text-4xl md:text-6xl' />
        </div>
        </div>
      </div>
      
      </div>
      
    </div> 
  )
}

export default Services