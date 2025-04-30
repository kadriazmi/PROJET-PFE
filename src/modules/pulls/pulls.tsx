import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { fetchPullRequests } from './API/api'
import LoadingScreen from '@src/modules/shared/components/Loading'
import NoData from '@src/modules/shared/components/NoData'
import { Collapse } from 'antd'
import OnePullRequest from './onepullrequest'
import Commits from './commits'
import MainContainer from '../shared/layout/MainContainer/MainContainer'
import { useAppSelector } from '../shared/store'
const Pulls = () => {
  const { id } = useParams<{ id: string }>()
  const { user } = useAppSelector((state) => state.auth)
  const username = user?.user_metadata.user_name
  const { data: pullRequests, isLoading } = useQuery(['pullRequests', id], () =>
    fetchPullRequests(username!, id!)
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
