import { View, Text } from 'react-native';

const RepositoryItem = ({ data }) => {
  return (
    <View>
      <Text>
          {data.fullName}
      </Text>
      <Text>
          {data.description}
      </Text>
      <Text>
          {data.language}
      </Text>
      <Text>
          {data.stargazersCount}
      </Text>
      <Text>
          {data.forksCount}
      </Text>
      <Text>
          {data.reviewCount}
      </Text>
      <Text>
          {data.ratingAverage}
      </Text>
    </View>
  )
}


export default RepositoryItem;