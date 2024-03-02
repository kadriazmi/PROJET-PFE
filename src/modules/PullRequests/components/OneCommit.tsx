import * as dayjs from 'dayjs'
import { useQuery } from 'react-query'
import {  useParams } from 'react-router'
import Avatar from '@src/modules/shared/components/Avatar/Avatar'
import LoadingScreen from '@src/modules/shared/components/Loading'
import { useAppSelector } from '@src/modules/shared/store'
import { fetchGitHubPullRequestCommits } from '@src/modules/shared/store/Queries/Commits'

interface ICommit {
  sha: string
  author: {
    avatar: string
    avatar_url: string
    date: string
    login: string
  }
  commit: {
    message: string
  }
}
export default function Commits({
  currentPullRequestRef,
  handelSelectCommit,
}: {
  currentPullRequestRef: string
  handelSelectCommit: (commitId: string) => void
}) {
  const { id } = useParams()
  const { user } = useAppSelector((state) => state.auth)
  const { data: commits, isLoading: isCommitsLoading } = useQuery({
    queryFn: () =>
      fetchGitHubPullRequestCommits({
        repo: id!,
        user: user?.user_metadata?.user_name,
        ref: currentPullRequestRef,
      }),
    queryKey: ['pullRequestsCommits', { currentPullRequestRef }],
    staleTime: Infinity,
    enabled: !!currentPullRequestRef,
    cacheTime: 0,
  })
  return (
    <div className="pull-request__commit__container">
      {isCommitsLoading ? (
        <LoadingScreen size="s" />
      ) : commits ? (
        <div className="pull-request__commit">
          <p className="pull-request__commit__title">commits list :</p>
          {commits?.reverse().map((commit: ICommit) => (
            <div
              className="pull-request__commit__content"
              onClick={() => handelSelectCommit(commit.sha)}
            >
              <div className="pull-request__commit__content__primary">
                <Avatar
                  pic_url={commit.author.avatar_url}
                  includeToolTip={{ title: `Created by  ${commit.author.login}` }}
                />
                <p className="pull-request__commit__content__primary__title">
                  {commit?.commit?.message}
                </p>
              </div>
              <p className="pull-request__commit__content__date">
                Created at : {dayjs(commit?.author.date).format('YYYY-MM-DD HH:MM')}
              </p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}
