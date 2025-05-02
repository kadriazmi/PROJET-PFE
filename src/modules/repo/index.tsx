import { useQuery } from 'react-query'
import CardSkew from '../shared/components/Cards/Cards-SKEW/Card-skew'
import NoData from '../shared/components/NoData'
import { fetchGitHubRepos } from './API/api'
import LoadingScreen from '../shared/components/Loading'
import MainContainer from '../shared/layout/MainContainer/MainContainer'

const RepoPage = () => {
  const { data, isLoading } = useQuery({
    queryFn: () => fetchGitHubRepo(),
    queryKey: ['repo', {}],
    cacheTime: 1, // Cache data to reuse without component re-render
    enabled: true, // Replace true with a condition for execution control
  })
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
      {data?.map((repo, index: number) => (
        <CardSkew key={repo.id} autoColors={index + 1}>
          <p>{repo.name}</p>
        </CardSkew>
      ))}
    </MainContainer>
  )
}

export default RepoPage

// working with pulls branch
