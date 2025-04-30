import { FaCodeBranch } from 'react-icons/fa'
import { AiOutlineCheckCircle } from 'react-icons/ai'

interface OnePullRequestProps {
  pull: any
}

const OnePullRequest: React.FC<OnePullRequestProps> = ({ pull }: any) => {
  return (
    <div className="one-pull-request">
      <div className="pr-header">
        <h3 className="pr-title">
          {pull.title} <FaCodeBranch className="pr-icon" />
        </h3>
        <p className="pr-created">Created At: {new Date(pull.created_at).toLocaleString()}</p>
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
      <p className="pr-updated">Updated At: {new Date(pull.updated_at).toLocaleString()}</p>
    </div>
  )
}

export default OnePullRequest
