'use client'

import { motion } from 'framer-motion'

export default function HeroMediaFade() {
  return (
    <motion.div
      className="absolute inset-0 z-10 bg-black pointer-events-none"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
    />
  )
}
