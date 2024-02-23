import { AnimatePresence, motion } from 'framer-motion'
import Lottie from 'react-lottie'
//@ts-ignore
import githubLottieAnimation from '../../assets/animations/loader.json'

export default function LoadingScreen() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: githubLottieAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='loader-github'>
        <Lottie options={defaultOptions} height={250} width={250} />
      </motion.div>
    </AnimatePresence>
  )
}
