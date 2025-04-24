import { useMutation, useApolloClient } from "@apollo/client";
import { GET_TOKEN } from "../graphql/mutations";
import useAuthStorage from '../hooks/useAuthStorage';


const useSignIn = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();  
  const [mutate, result] = useMutation(GET_TOKEN);
  
    const signIn = async ({ username, password }) => {
      const response = await mutate({ variables: { username, password }})
      await authStorage.setAccessToken(response.data.authenticate.accessToken);
      console.log('getAccessToken', await authStorage.getAccessToken())
      apolloClient.resetStore();
      

      return response
      };
  
    return [signIn, result];
  };

export default useSignIn;