import React from 'react'
import {motion} from 'framer-motion'

const About = () => {

  const divVariant={
    hidden:{
      opacity:0
    },
    visible:{
      opacity:1,
      transition: {
        staggerChildren: 2,       
        delayChildren: 0.3,
        stiffness:5
    },
    } 
   
  }

  const childrenVariantA={
    hidden:{
        x:1000          
    },
    visible:{
        x:-300
    }   
}
const childrenVariantB={
  hidden:{
      x:1000          
  },
  visible:{
      x:-200
  }
}
const childrenVariantC={
  hidden:{
      x:1000          
  },
  visible:{
      x:-100
  }
}

  return (
    <div className='w-full min-h-[100vh-60px] bg-slate-900 md:min-h-[calc(100vh-70px)] lg:min-h-[calc(100vh-80px)] relative font-lobster border-2 border-slate-500 max-w-[1400px] mx-auto'>
        <div className='w-full pt-10'>
          <motion.h3 initial={{scale:1}} animate={{scale:2}} transition={{duration:3}} className='text-3xl md:text-4xl text-slate-50 text-center'>About me</motion.h3>

         <div className='w-full grid grid-cols-1 md:grid-cols-2 place-items-center'>
         <div className='mx-auto w-[200px] h-[200px] rounded-full md:h-[400px] bg-slate-600 md:w-[400px] border-slate-500 border-2 mt-10 overflow-hidden  flex justify-center items-center'>
              <motion.img src="img/me.png" alt="" className='object-cover' initial={{y:1000}} animate={{y:0}} transition={{duration:2}} />
          </div>

         <motion.div variants={ divVariant} initial='hidden' animate='visible' className='hidden md:block mx-auto w-[90%] mt-4 md:mt-10 '>
         <motion.p variants={childrenVariantA}   className='text-slate-300 text-center first-letter:text-3xl first-letter:text-[#ff0] first-line:text-slate-200 tracking-widest text-xl md:translate-x-[-300px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea sequi non porro numquam id eos omnis voluptas possimus sint harum, aut eum earum officia sit accusamus suscipit cupiditate, laboriosam ratione?</motion.p  >

         <motion.p variants={childrenVariantB}   className='text-slate-300 text-center first-letter:text-3xl first-letter:text-[#ff0] first-line:text-slate-200 tracking-widest text-xl md:translate-x-[-200px] mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea sequi non porro numquam id eos omnis voluptas possimus sint harum, aut eum earum officia sit accusamus suscipit cupiditate, laboriosam ratione?</motion.p  >

         <motion.p variants={childrenVariantC}   className='text-slate-300 text-center first-letter:text-3xl first-letter:text-[#ff0] first-line:text-slate-200 tracking-widest text-xl md:translate-x-[-100px] mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea sequi non porro numquam id eos omnis voluptas possimus sint harum, aut eum earum officia sit accusamus suscipit cupiditate, laboriosam ratione?</motion.p  >

        
         </motion.div>

         <div variants={ divVariant} initial='hidden' animate='visible' className='block md:hidden mx-auto w-[90%] mt-4 md:mt-10 '>
         <p    className='text-slate-300 text-center first-letter:text-3xl first-letter:text-[#ff0] first-line:text-slate-200 tracking-widest text-xl md:translate-x-[-300px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea sequi non porro numquam id eos omnis voluptas possimus sint harum, aut eum earum officia sit accusamus suscipit cupiditate, laboriosam ratione?</p  >

         <p    className='text-slate-300 text-center first-letter:text-3xl first-letter:text-[#ff0] first-line:text-slate-200 tracking-widest text-xl md:translate-x-[-200px] mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea sequi non porro numquam id eos omnis voluptas possimus sint harum, aut eum earum officia sit accusamus suscipit cupiditate, laboriosam ratione?</p  >

         <p    className='text-slate-300 text-center first-letter:text-3xl first-letter:text-[#ff0] first-line:text-slate-200 tracking-widest text-xl md:translate-x-[-100px] mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea sequi non porro numquam id eos omnis voluptas possimus sint harum, aut eum earum officia sit accusamus suscipit cupiditate, laboriosam ratione?</p  >

        
         </div>
         </div>
        </div>
    </div>
  )
}

export default About