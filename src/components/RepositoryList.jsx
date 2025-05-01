import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import theme from '../theme';
import useRepositories from '../hooks/useRepositories';
import {Picker} from '@react-native-picker/picker';
import { useState } from 'react';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground    
  },
  separator: {
    backgroundColor: theme.colors.mainBackground,
      height: 10
},
});

const SortingHeader = ({ handleSortChange, sortingType }) => {
  
  return(
    <View style={{ flex: 1, backgroundColor: theme.colors.mainBackground, height: 60, justifyContent: 'center'}}>      
      <Picker
        selectedValue={sortingType}
        onValueChange={(itemValue, itemIndex) => {
          //setSortingSettings(itemValue)
          handleSortChange(itemValue)
        }}>
        <Picker.Item label="Select an item.." value="" enabled={false} />
        
        <Picker.Item label="Latest repositories" value="latest" />
        <Picker.Item label="Highest rated repositories" value="highest" />
        <Picker.Item label="Lowest rated repositories" value="lowest" />
      </Picker>
    </View>
  )    
}

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, sortingType, handleSortChange }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({item}) => <RepositoryItem data={item} />}
      keyExtractor={item => item.id}
      ListHeaderComponent={<SortingHeader sortingType={sortingType} handleSortChange={handleSortChange} />}
    />
  );
};

const RepositoryList = () => {
  
  const [sortingType, setSortingType] = useState("latest");
  
  let queryArguments;

  if (sortingType === "latest") {
    queryArguments = {
      orderBy: "CREATED_AT",
      orderDirection: "DESC"
    }
  } else if (sortingType == "highest") {
    queryArguments = {
      orderBy: "RATING_AVERAGE",
      orderDirection: "DESC"
    }
  } else if (sortingType == "lowest") {
    queryArguments = {
      orderBy: "RATING_AVERAGE",
      orderDirection: "ASC"
    }
  } 

  const { repositories } = useRepositories(queryArguments);

  return <RepositoryListContainer repositories={repositories} sortingType={sortingType} handleSortChange={setSortingType}/>;
};


export default RepositoryList;