import { motion, AnimatePresence } from 'framer-motion'
import { ReactElement, useRef, useState } from 'react'

export interface IBalanceCard {
  children: ReactElement | ReactElement[]
}
export default function CardBalance({ children }: IBalanceCard) {
  const hoverCloud = useRef<any>(null)
  const [hoverEffect, setHoverEffect] = useState({ state: false, x: 0, y: 0, rx: 0, ry: 0 })
  const handelMouseMove = (event: any) => {
    if (hoverCloud.current) {
      const rect = hoverCloud.current.getBoundingClientRect()
      const mouseX = event.clientX - hoverCloud.current.getBoundingClientRect().left
      const mouseY = event.clientY - hoverCloud.current.getBoundingClientRect().top
      const rotateX = (mouseY / rect.height - 0.5) * 20
      const rotateY = -(mouseX / rect.width - 0.5) * 20
      setHoverEffect((prev) => ({ ...prev, x: mouseX, y: mouseY, rx: rotateX, ry: rotateY }))
    }
  }
  const { state, x, y, rx, ry } = hoverEffect
  return (
    <div
      ref={hoverCloud}
      className="card-balance"
      onMouseEnter={() => setHoverEffect((prev) => ({ ...prev, state: true }))}
      onMouseLeave={() => setHoverEffect((prev: any) => ({ ...prev, state: false, rx: 0, ry: 0 }))}
      onMouseMove={handelMouseMove}
      style={{ transform: `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg)` }}
    >
      <AnimatePresence>
        {state && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="card-balance-hover"
            style={{ top: y, left: x, transform: 'translate(-50%, -50%)' }}
          />
        )}
      </AnimatePresence>
      {children}
    </div>
  )
}
