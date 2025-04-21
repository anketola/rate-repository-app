import { useMutation } from "@apollo/client";
import { GET_TOKEN } from "../graphql/mutations";

const useSignIn = () => {
    const [mutate, result] = useMutation(GET_TOKEN);
  
    const signIn = async ({ username, password }) => {
      const response = await mutate({ variables: { username, password }})
      return response
      };
  
    return [signIn, result];
  };

export default useSignIn;