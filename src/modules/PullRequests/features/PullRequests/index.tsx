import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router'
import { Collapse } from 'antd'
import { PATH } from '@src/modules/auth/routes/paths'
import LoadingScreen from '@src/modules/shared/components/Loading'
import NoData from '@src/modules/shared/components/NoData'
import MainContainer from '@src/modules/shared/layout/MainContainer/MainContainer'
import { useAppSelector } from '@src/modules/shared/store'
import { fetchGitHubRepositoryPullsRequests } from '@src/modules/shared/store/Queries/PullRequests'
import OnePullRequest from '../../components/OnePullRequest'
import Commits from '../../components/OneCommit'
import { useSearchParams } from 'react-router-dom'

export interface IPullRequest {
  id: string
  title: string
  created_at: Day
  updated_at: Day
  locked: boolean
  number: number
  user: {
    login: string
    avatar_url: string
  }
  base: {
    ref: string
    sha: string
  }
  head: {
    ref: string
    sha: string
  }
  merge_commit_sha: string
}
export default function PullRequests() {
  const { id } = useParams()
  const { user } = useAppSelector((state) => state.auth)
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const { data: pullRequests, isLoading: isPullRequestsLoading } = useQuery({
    queryFn: () =>
      fetchGitHubRepositoryPullsRequests({ repo: id!, user: user?.user_metadata?.user_name }),
    queryKey: ['pullRequests', {}],
    staleTime: Infinity,
    cacheTime: 1,
    enabled: !!user,
  })
  const handelSelectCommit = ({
    commitId,
    base,
    head,
  }: {
    commitId: string
    base: string
    head: string
  }) => {
    setSearchParams({ base, head })
    navigate(PATH.COMMIT.replace(':id', id!).replace(':commitId', commitId))
  }
  if (isPullRequestsLoading) return <LoadingScreen blur size="full" />
  return (
    <MainContainer
      linkProps={{
        links: [
          { name: 'repositories', href: PATH.REPO },
          { name: 'pull requests', href: '' },
        ],
        title: id!,
      }}
      style={{ paddingBottom: 0 }}
    >
      <div className="pull-requests__container">
        {pullRequests?.length === 0 ? (
          <NoData title={`no pull requests in ${id!} `} />
        ) : (
          <div className="pull-request">
            <Collapse
              items={pullRequests?.map((pull: IPullRequest) => ({
                key: `${pull.number}`,
                label: <OnePullRequest pull={pull} />,
                children: (
                  <Commits
                    currentPullRequestRef={`${pull.number}`}
                    handelSelectCommit={(commitId) =>
                      handelSelectCommit({ commitId, head: pull.head.sha, base: pull.base.sha })
                    }
                  />
                ),
              }))}
            />
          </div>
        )}
      </div>
    </MainContainer>
  )
}
