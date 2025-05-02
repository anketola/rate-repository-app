import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ( sortSettings ) => {
    console.log('sortSettings', sortSettings);
    
    const variables = {
      orderBy: sortSettings.orderBy,
      orderDirection: sortSettings.orderDirection,
      ...(sortSettings.searchKeyword && { searchKeyword: sortSettings.searchKeyword })
    };

    const {loading, data, refetch } = useQuery(GET_REPOSITORIES, {
        fetchPolicy: 'cache-and-network',
        variables        
    });
    const repositories = data?.repositories
    

  return { repositories, loading, refetch};
};

export default useRepositories;