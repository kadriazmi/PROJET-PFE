import Stars from '../../components/Stars'
import GlobeCanvas from './Globe'
interface MainLayoutProps {
  children: React.ReactNode
  includeGlobe?: boolean
}

const UniverseWrapper = ({ children, includeGlobe }: MainLayoutProps) => {
  return (
    <div className="universe-layout">
      <Stars />
      {includeGlobe && <GlobeCanvas />}
      {children}
    </div>
  )
}

export default UniverseWrapper
