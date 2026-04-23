'use client'

import { motion } from 'framer-motion'

export default function HeroText() {
  return (
    <div className="relative z-10 h-full flex flex-col justify-between px-0 md:px-16 pb-0 pt-32">
      <div />

      <div className="flex flex-col md:flex-row md:items-end md:justify-start gap-6 md:gap-4 select-none">
        <motion.h1
          className="w-[120vw] -ml-[11vw] -mr-[6vw] md:mx-0 md:w-auto text-[37vw] md:text-[20vw] lg:text-[26vw] [font-family:var(--font-metropolis-semibold)] text-white leading-none tracking-tighter lowercase translate-y-[28%] text-center md:text-left md:-translate-x-[3vw]"
          initial={{ y: '40%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          dream
        </motion.h1>

        <motion.div
          className="hidden md:block text-left pb-[10%] md:pb-[5%]"
          initial={{ y: '60%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          transition={{ duration: 1.0, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[6vw] sm:text-[4vw] md:text-[2vw] lg:text-[1.4vw] text-white tracking-wide leading-normal font-light opacity-30">
            Comunicação
            <br />e Eventos
          </p>
        </motion.div>
      </div>
    </div>
  )
}
