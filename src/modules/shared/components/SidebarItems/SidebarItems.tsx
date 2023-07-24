import { Link, useLocation } from 'react-router-dom'
import { SIDEBARITEMS } from '../Sidebar/items'

interface ISidebarItemsProps {
  collapseSidebar: boolean
}

const SidebarItems: React.FC<ISidebarItemsProps> = ({ collapseSidebar }) => {
  const { pathname } = useLocation()

  return (
    <div className="sidebar-items">
      {SIDEBARITEMS?.map((route, index) => {
        return (
          <Link
            to={route?.link}
            key={index}
            className={`item ${pathname === route?.link && 'active'}`}
          >
            <div
              className={`link-icon-stroke-color ${
                pathname === route?.link && 'link-icon-stroke-color-active'
              }`}
            >
              {route?.icon}
            </div>
            {!collapseSidebar ? route?.label.toUpperCase() : null}
          </Link>
        )
      })}
    </div>
  )
}

export default SidebarItems
