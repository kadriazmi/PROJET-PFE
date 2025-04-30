import React from 'react'
import { useQuery } from 'react-query'
import { fetchCommits } from './api/api'
import LoadingScreen from '@src/modules/shared/components/Loading'
import './Commits.scss'

interface CommitsProps {
  pullNumber: number
}

const Commits: React.FC<CommitsProps> = ({ pullNumber }) => {
  const { data: commits, isLoading } = useQuery(['commits', pullNumber], () =>
    fetchCommits('kadriazmi', 'PROJET-PFE', pullNumber)
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
