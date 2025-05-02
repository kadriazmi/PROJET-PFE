import { FaCodeBranch } from 'react-icons/fa'
import { AiOutlineCheckCircle } from 'react-icons/ai'

interface OnePullRequestProps {
  pull: any
}

const OnePullRequest: React.FC<OnePullRequestProps> = ({ pull }: any) => {
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${year}-${month}-${day} ${hours}:${minutes}`
  }
  return (
    <div className="one-pull-request">
      <div className="pr-header">
        <h3 className="pr-title">
          {pull.title} <FaCodeBranch className="pr-icon" />
        </h3>

        <div className="pr-right">
          <img
            src={pull.user.avatar_url}
            alt={`${pull.user.login}'s avatar`}
            className="user-avatar"
          />
          <div className="pr-status">
            <span className="status-text">{pull.state === 'open' ? 'Open' : 'Closed'}</span>
            <AiOutlineCheckCircle className="status-icon" />
          </div>
        </div>
      </div>
      <div className="pr-time">
        <p className="pr-created">Created At: {formatDateTime(pull.created_at).toLocaleString()}</p>
        <p className="pr-updated">Updated At: {formatDateTime(pull.updated_at).toLocaleString()}</p>
      </div>
    </div>
  )
}

export default OnePullRequest
