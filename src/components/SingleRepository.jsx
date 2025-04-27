import { useParams } from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import { useQuery } from "@apollo/client";
import { GET_ONEREPOSITORY } from "../graphql/queries";
import Text from "./Text";

const SingleRepository = () => {
  let { id } = useParams();
  const { data, loading, error } = useQuery(GET_ONEREPOSITORY, {
    variables: {
      id
    },   
      fetchPolicy: 'cache-and-network'            
    });
  
  if (loading) return <Text>Loading data.</Text>;
  if (error) return <Text>{error.message}</Text>;  
  console.log(id)
  console.log(data)
  return (
    <RepositoryItem singleView={true} data={data.repository} />    
  );

};

export default SingleRepository;