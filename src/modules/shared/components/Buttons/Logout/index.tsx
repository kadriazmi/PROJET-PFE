import LogoutIcon from '@src/modules/shared/assets/icons/logout'

export default function LogOutBtn({ action }: { action?: () => void }) {
  return (
    <button className="Btn" onClick={action}>
      <div className="sign">
        <LogoutIcon />
      </div>
      <div className="text">Logout</div>
    </button>
  )
}
