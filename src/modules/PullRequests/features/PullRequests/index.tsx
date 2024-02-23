import { useQuery } from 'react-query'
import { useParams } from 'react-router'
import * as dayjs from 'dayjs'
import { Collapse, Spin, Tooltip } from 'antd'
import { PATH } from '@src/modules/auth/routes/paths'
import LoadingScreen from '@src/modules/shared/components/Loading'
import NoData from '@src/modules/shared/components/NoData'
import MainContainer from '@src/modules/shared/layout/MainContainer/MainContainer'
import { useAppSelector } from '@src/modules/shared/store'
import { fetchGitHubRepositoryPullsRequests } from '@src/modules/shared/store/Queries/PullRequests'
import acceptedIcon from '../../../shared/assets/images/verifie.png'
import rejectedIcon from '../../../shared/assets/images/rejected.png'
import { useState } from 'react'
import { fetchGitHubPullRequestCommits } from '@src/modules/shared/store/Queries/Commits'

interface IPullRequest {
  id: string
  title: string
  created_at: string
  updated_at: string
  locked: boolean
  number: number
  user: {
    login: string
    avatar_url: string
  }
  base: {
    ref: string
  }
  head: {
    ref: string
  }
  merge_commit_sha: string
}
export default function PullRequests() {
  const { id } = useParams()
  const { user } = useAppSelector((state) => state.auth)
  const [currentPullRequestRef, setCurrentPullRequestRef] = useState<string>('')
  const { data: pullRequests, isLoading: isPullRequestsLoading } = useQuery({
    queryFn: () =>
      fetchGitHubRepositoryPullsRequests({ repo: id!, user: user?.user_metadata?.user_name }),
    queryKey: ['pullRequests', {}],
    staleTime: Infinity,
    cacheTime: 1,
  })
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


  const onChange = (key: string | string[]) => {
    setCurrentPullRequestRef(typeof key === 'string' ? key : key[0])
  }

  return (
    <MainContainer
      linkProps={{
        links: [
          { name: 'repositories', href: PATH.REPO },
          { name: 'pull requests', href: '' },
        ],
        title: id!,
      }}
    >
      {isPullRequestsLoading ? (
        <LoadingScreen />
      ) : (
        <div className="pull-requests__container">
          {pullRequests.length === 0 ? (
            <NoData title={`no pull requests in ${id!} `} />
          ) : (
            <div className="pull-request">
              <Collapse
                onChange={onChange}
                items={pullRequests?.map((pull: IPullRequest) => ({
                  key: `${pull.number}`,
                  label: (
                    <div className="pull-request__header">
                      <div className="pull-request__header__primary">
                        <p className="pull-request__header__primary__title">
                          {`Merge branch ${pull?.base.ref} into
                          ${pull?.head.ref}`}
                        </p>
                        <p className="pull-request__header__primary__date">
                          Created At : {dayjs(pull?.created_at).format('YYYY-MM-DD HH:MM')}
                        </p>
                      </div>
                      <div className="pull-request__header__info">
                        <div className="pull-request__header__info__up">
                          <div className="pull-request__header__info__image">
                            <Tooltip title={`Created by  ${pull?.user?.login}`} color="gold">
                              <img
                                className="pull-request__header__info__image--src"
                                src={pull.user.avatar_url}
                                alt=""
                              />
                            </Tooltip>
                          </div>
                          <div className="pull-request__header__info__status">
                            <p
                              className={`pull-request__header__info__status__text ${
                                pull.locked ? 'status--close' : 'status--open'
                              }`}
                            >
                              {pull.locked ? 'Close' : 'Open'}
                            </p>
                            <img
                              className="pull-request__header__info__status__icon"
                              src={pull.locked ? rejectedIcon : acceptedIcon}
                            />
                          </div>
                        </div>
                        <p className="pull-request__header__info__date">
                          Updated at : {dayjs(pull?.updated_at).format('YYYY-MM-DD HH:MM')}
                        </p>
                      </div>
                    </div>
                  ),
                  children: (
                    <div className="pull-request__commit__container">
                      {isCommitsLoading ? (
                        <Spin />
                      ) : commits ? (
                        <div className="pull-request__commit">
                          <p className="pull-request__commit__title">commits list :</p>
                          {commits?.map((commit: any) => (
                            <div className="pull-request__commit__content">
                              <div className="pull-request__commit__content__primary">
                                <img
                                  className="pull-request__commit__content__primary__img"
                                  src={commit.author.avatar_url}
                                  alt=""
                                />
                                <p className="pull-request__commit__content__primary__title">
                                  {commit?.commit?.message}
                                </p>
                              </div>
                              <p className="pull-request__commit__content__date">
                                Created at : {dayjs(pull?.updated_at).format('YYYY-MM-DD HH:MM')}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ),
                }))}
              />
            </div>
          )}
        </div>
      )}
    </MainContainer>
  )
}
