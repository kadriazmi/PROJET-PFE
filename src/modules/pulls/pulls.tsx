import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { fetchPullRequests } from './api/api'
import LoadingScreen from '@src/modules/shared/components/Loading'
import NoData from '@src/modules/shared/components/NoData'
import { Collapse } from 'antd'
import OnePullRequest from './OnePullRequest'
import Commits from './Commits'
import './styles.scss'
import MainContainer from '../shared/layout/MainContainer/MainContainer'
const Pulls = () => {
  const { id } = useParams<{ id: string }>()
  const { data: pullRequests, isLoading } = useQuery(['pullRequests', id], () =>
    fetchPullRequests('kadriazmi', id)
  )

  if (isLoading) {
    return <LoadingScreen size="full" blur />
  }

  if (!pullRequests || pullRequests.length === 0) {
    return <NoData title={`No Pull Requests in ${id}`} />
  }

  return (
    <MainContainer
      linkProps={{
        title: `${id}`,
        links: [
          { name: 'Repositories', href: '/repositories' },
          { name: 'Pull Requests', href: '' },
        ],
      }}
    >
      <Collapse
        items={pullRequests?.map((pull: any) => ({
          key: `${pull.number}`,
          label: <OnePullRequest pull={pull} />, // Pull request header
          children: <Commits pullNumber={pull.number} />, // Pull request commits list
        }))}
      />
    </MainContainer>
  )
}

export default Pulls
