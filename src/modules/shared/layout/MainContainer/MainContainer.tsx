import { ReactNode } from 'react'
import NavList, { INavList } from '../../components/NavList'

export interface IMainContainer {
  children: ReactNode | ReactNode[] | null
  linkProps: INavList
}
export default function MainContainer({ children, linkProps }: IMainContainer) {
  return (
    <div className="main-container">
      <NavList {...linkProps} />
      {children}
    </div>
  )
}
