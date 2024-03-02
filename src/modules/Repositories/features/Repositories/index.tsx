import { PATH } from '@src/modules/auth/routes/paths'
import CardSkew from '@src/modules/shared/components/Cards/Cards-SKEW/Card-skew'
import LoadingScreen from '@src/modules/shared/components/Loading'
import NoData from '@src/modules/shared/components/NoData'
import MainContainer from '@src/modules/shared/layout/MainContainer/MainContainer'
import { fetchGitHubRepositories } from '@src/modules/shared/store/Queries/Repositories'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'

export default function Repositories() {
  const navigate = useNavigate()
  const { data: repositories, isLoading } = useQuery({
    queryFn: () => fetchGitHubRepositories(),
    queryKey: ['repositories', {}],
    staleTime: Infinity,
    cacheTime: 1,
  })
  const handelRepoClick = (repo: string) => {
    navigate(PATH.PULLS.replace(':id', repo))
  }
  return (
    <MainContainer
      linkProps={{
        links: [{ name: 'repositories', href: '' }],
        title: 'repositories',
      }}
      style={{ paddingBottom: 0 }}
    >
      {isLoading ? (
        <LoadingScreen blur/>
      ) : (
        <div className="repositories-container">
          {!repositories || repositories?.length === 0 ? (
            <NoData title={`no repositories yet `} />
          ) : (
            repositories?.map((repo: { name: string; visibility: string }, i: number) => (
              <CardSkew autoColors={i + 1}>
                <div
                  className="repositories-container__card"
                  onClick={() => handelRepoClick(repo?.name)}
                >
                  <p className="repositories-container__card__title">{repo?.name}</p>
                  <div className="repositories-container__card__visibility">
                    <p className="repositories-container__card__visibility__status">
                      {repo?.visibility}
                    </p>
                  </div>
                </div>
              </CardSkew>
            ))
          )}
        </div>
      )}
    </MainContainer>
  )
}
