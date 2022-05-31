import React,{useState} from 'react'
import { NavLink } from 'react-router-dom'
import { motion,AnimatePresence } from 'framer-motion'
import {BiMenuAltRight,BiMenuAltLeft} from 'react-icons/bi'

const Navbar = () => {

    const[open,setOpen]=useState(false)
    const[scroll,setScroll]=useState(false)

    const toggleScroll=()=>{
        if(window.scrollY > 60){
            setScroll(true)
        }else{
            setScroll(false)
        }
    }
    window.addEventListener('scroll',toggleScroll)

    //toggle state
    const toggleBar=()=>{ 
       setOpen(!open)
    }
 
    const navInterval={
        opened:{
            x:0,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
                stiffness:120
            },
        },
        closed:{
            x:'-100%',
            transition: {
                when: "afterChildren",
              },
        }
    }

    const childrenVariant={
        opened:{
            x:0           
        },
        closed:{
            x:'-300px'
        }
    }
    

  return (
    <motion.div initial={{x:200}} animate={{x:0}} className='w-full h-[60px] md:h-[70px] lg:h-[80px] relative font-lobster md:max-w-[1400px] mx-auto   px-3 bg-slate-700 text-slate-50'>
        <nav className='w-full h-full flex justify-between items-center '>
            <h6 className='text-xl md:text-2xl font-semibold'>Ma logos</h6>
            <ul className='hidden md:block'>
                <li className='inline-block ml-10'><NavLink to='/' className={({isActive})=>(isActive ? 'after:block after:w-full after:h-1 after:bg-[#ff0] font-satisfy':'')}>Home</NavLink></li> 
                <li className='inline-block ml-10'><NavLink to='/about' className={({isActive})=>(isActive ? 'after:block after:w-full after:h-1 after:bg-[#ff0] font-satisfy':'')}>About</NavLink></li>
                <li className='inline-block ml-10'><NavLink to='/services' className={({isActive})=>(isActive ? 'after:block after:w-full after:h-1 after:bg-[#ff0] font-satisfy':'')}>Services</NavLink></li>
                <li className='inline-block ml-10'><NavLink to='/portfolio' className={({isActive})=>(isActive ? 'after:block after:w-full after:h-1 after:bg-[#ff0] font-satisfy':'')}>Portfolio</NavLink></li>
                <li className='inline-block ml-10'><NavLink to='/contact' className={({isActive})=>(isActive ? 'after:block after:w-full after:h-1 after:bg-[#ff0] font-satisfy':'')}>Contact</NavLink></li>
            </ul>
            {
                open ? <BiMenuAltLeft className='text-3xl block sm:block md:hidden text-[#ff0]' onClick={toggleBar}/>:<BiMenuAltRight className='text-3xl block sm:block md:hidden text-[#ff0]' onClick={toggleBar}/>
            }                      
        </nav>  
        <AnimatePresence exitBeforeEnter initial={false}> 
        <motion.div variants={navInterval} animate={open ?'opened':'closed'} className={`w-[40%] h-screen bg-slate-900 fixed  left-0 z-30 pt-20 border-r-2 border-slate-400  ${scroll ? 'top-0':'top-[65px]'} `}>
            <motion.span className='pl-8 block text-xl text-slate-50 mb-8' variants={childrenVariant} onClick={toggleBar}><NavLink to='/'className={({isActive})=>(isActive ? 'after:block after:w-[50%] after:h-1 after:bg-slate-300':'')}>Home</NavLink></motion.span>
            <motion.span className='pl-8 block text-xl text-slate-50 mb-8' variants={childrenVariant} onClick={toggleBar} ><NavLink to='/about'className={({isActive})=>(isActive ? 'after:block after:w-[50%] after:h-1 after:bg-slate-300':'')}>About</NavLink></motion.span>
            <motion.span className='pl-8 block text-xl text-slate-50 mb-8' variants={childrenVariant} onClick={toggleBar} ><NavLink to='/services'className={({isActive})=>(isActive ? 'after:block after:w-[50%] after:h-1 after:bg-slate-300':'')}>Services</NavLink></motion.span>
            <motion.span className='pl-8 block text-xl text-slate-50 mb-8' variants={childrenVariant} onClick={toggleBar} ><NavLink to='/portfolio'className={({isActive})=>(isActive ? 'after:block after:w-[50%] after:h-1 after:bg-slate-300':'')}>Portfolio</NavLink></motion.span>
            <motion.span className='pl-8 block text-xl text-slate-50 mb-8' variants={childrenVariant} onClick={toggleBar} ><NavLink to='/contact'className={({isActive})=>(isActive ? 'after:block after:w-[50%] after:h-1 after:bg-slate-300':'')}>Contact</NavLink></motion.span>
        </motion.div>
        </AnimatePresence>      
    </motion.div>
  )
}

export default Navbar