import LoadingScreen from '@src/modules/shared/components/Loading'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../shared/store'
import { fetchCommits } from './API/api'

interface CommitsProps {
  pullNumber: number
}

const Commits: React.FC<CommitsProps> = ({ pullNumber }: { pullNumber: number }) => {
  const { id } = useParams<{ id: string }>()
  const { user } = useAppSelector((state) => state.auth)
  const username = user?.user_metadata.user_name
  const { data: commits, isLoading } = useQuery(['commits', pullNumber], () =>
    fetchCommits(username!, id!, pullNumber)
  )

  if (isLoading) {
    return <LoadingScreen size="s" />
  }

  if (!commits || commits.length === 0) {
    return <p>No commits found for this pull request.</p>
  }

  return (
    <div className="commits">
      <span className="commits-badge">Commits List:</span>
      {commits.map((commit: any) => (
        <div key={commit.sha} className="commit-item">
          <img
            src={commit.author?.avatar_url || ''}
            alt="Commit Author Avatar"
            className="commit-avatar"
          />
          <div className="commit-info">
            <p className="commit-message">{commit.commit.message}</p>
          </div>
          <p className="commit-date">{new Date(commit.commit.author.date).toLocaleString()}</p>
        </div>
      ))}
    </div>
  )
}

export default Commits
