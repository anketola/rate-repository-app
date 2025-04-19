import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
    const {loading, data, refetch } = useQuery(GET_REPOSITORIES, {
        fetchPolicy: 'cache-and-network',
        // Other options
        });
    // const response = await fetch('http://192.168.1.105:5000/api/repositories'); 
    const repositories = data?.repositories
    

  return { repositories, loading, refetch};
};

export default useRepositories;