import { CSSProperties, ReactElement, ReactNode } from 'react'
import NavList, { INavList } from '../../components/NavList'
import ScrollContainer from '../../components/ScrollContainer'

export interface IMainContainer {
  children: ReactElement | ReactElement[]
  linkProps: INavList
  style?: CSSProperties
}
export default function MainContainer({ children, linkProps, style }: IMainContainer) {
  return (
    <div className="main-container" style={{ ...style }}>
      <NavList {...linkProps} />
      <ScrollContainer>{children}</ScrollContainer>
    </div>
  )
}
