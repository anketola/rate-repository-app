import { FlatList, View, StyleSheet, TextInput } from 'react-native';
import RepositoryItem from './RepositoryItem';
import theme from '../theme';
import useRepositories from '../hooks/useRepositories';
import {Picker} from '@react-native-picker/picker';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground    
  },
  separator: {
    backgroundColor: theme.colors.mainBackground,
      height: 10
},
input: {
  borderWidth: 2,
  borderRadius: 9,
  backgroundColor: '#ffffff',
  height: 60,
  padding: 20,
  marginLeft: 15,
  marginRight: 15,
  marginTop: 15
},
});

const SortingHeader = ({ handleSortChange, sortingType, handleSearchChange, searchString  }) => {
  
  
  return(
    <View style={{ flex: 1, backgroundColor: theme.colors.mainBackground, height: 120, justifyContent: 'center'}}>      
      <TextInput
        style={[styles.input]}
        placeholder="Search"
        value={searchString}
        onChangeText={(itemValue) => {
          handleSearchChange(itemValue);
        }}
      />
      <Picker
        selectedValue={sortingType}
        onValueChange={(itemValue) => {
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

export const RepositoryListContainer = ({ 
  repositories, 
  sortingType, 
  searchString, 
  handleSortChange, 
  handleSearchChange
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({item}) => <RepositoryItem data={item} />}
      keyExtractor={item => item.id}
      ListHeaderComponent={
      <SortingHeader 
        sortingType={sortingType} 
        handleSortChange={handleSortChange}  
        searchString={searchString} 
        handleSearchChange={handleSearchChange}
      />}
    />
  );
};

const RepositoryList = () => {
  
  const [sortingType, setSortingType] = useState("latest");
  const [searchString, setSearchString] = useState("");
  const [debounceValue] = useDebounce(searchString, 500);

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
  if (searchString !== '') {
    queryArguments = {
      ...queryArguments,
      searchKeyword: debounceValue
    }
  }


  const { repositories } = useRepositories(queryArguments);

  return <RepositoryListContainer 
    repositories={repositories} 
    sortingType={sortingType} 
    searchString={searchString} 
    handleSearchChange={setSearchString} 
    handleSortChange={setSortingType}
    />;
};


export default RepositoryList;