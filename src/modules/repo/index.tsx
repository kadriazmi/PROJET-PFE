import { useQuery } from 'react-query'
import CardSkew from '../shared/components/Cards/Cards-SKEW/Card-skew'
import NoData from '../shared/components/NoData'
import { fetchGitHubRepos } from './API/api'
import LoadingScreen from '../shared/components/Loading'
import MainContainer from '../shared/layout/MainContainer/MainContainer'
import { useNavigate } from 'react-router-dom'

const RepoPage = () => {
  const navigate = useNavigate()
  const { data, isLoading } = useQuery({
    queryFn: () => fetchGitHubRepos(),
    queryKey: ['repo', {}],
    cacheTime: 1, // Cache data to reuse without component re-render
    enabled: true, // Replace true with a condition for execution control
  })
  const handleCardClick = (repoName: string) => {
    navigate(`/repositories/${repoName}/pulls`)
  }
  if (isLoading) {
    return <LoadingScreen size="full" blur />
  }
  if (!data || data.length === 0) {
    return <NoData title={'No Projects'}></NoData>
  }

  return (
    <MainContainer
      linkProps={{ title: 'Repositories', links: [{ name: 'Repositories', href: '' }] }}
    >
      <div className="repositories">
        {data?.map((repo: any, index: number) => (
          <CardSkew key={repo.id} autoColors={index + 1} onClick={() => handleCardClick(repo.name)}>
            <p>{repo.name}</p>
          </CardSkew>
        ))}
      </div>
    </MainContainer>
  )
}

export default RepoPage
