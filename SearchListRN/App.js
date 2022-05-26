import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, TextInput} from 'react-native';

function App() {
  const [masterData, setmasterData] = useState([]);
  const [filterData, setfilterData] = useState([]);
  const [searchval, setsearchval] = useState('');

  useEffect(() => {
    fetchPosts();
    return () => {};
  }, []);

  const fetchPosts = () => {
    const apiURL = 'https://jsonplaceholder.typicode.com/posts';
    fetch(apiURL)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setmasterData(data);
        setfilterData(data);
      });
  };

  const ShowItem = ({item}) => {
    return (
       <Text style={styles.listItemStyle}>{item.id + ' - ' + item.title}</Text>
    );
  };

  const SeperatorView = () => {
    return <View style={styles.seperatorStyle} />;
  };

  const filterList = text => {
    setsearchval(text);
    if (text) {
      const matchedData = filterData.filter(item => {
        const title = item.title ? item.title.toUpperCase() : ''.toUpperCase();
        return title.indexOf(text.toUpperCase()) > -1;
      });
      setmasterData(matchedData);
    } else {
      setmasterData(masterData);
    }
  };
  return (
    <View style={styles.constainerStyle}>
      <TextInput
        style={styles.inputStyle}
        placeholder="Search here"
        value={searchval}
        onChangeText={filterList}
      />

      <FlatList
        data={masterData}
        ItemSeparatorComponent={SeperatorView}
        keyExtractor={({item, index}) => index}
        renderItem={ShowItem}
      />
    </View>
  );
}

export default App;
const styles = StyleSheet.create({
  constainerStyle: {
    marginTop: 50,
    padding: 5,
    flex: 1,
  },
  seperatorStyle: {
    width: '100%',
    height: 1,
    padding: 1,
    marginTop: 1,
    backgroundColor: '#991100',
  },
  listItemStyle: {
    fontSize: 24,
    margin: 10,
    backgroundColor: 'white',
  },
  inputStyle: {
    borderColor: 'gray',
    borderWidth: 1,
    height: 50,
    fontSize: 18,
    padding: 8,
    borderRadius: 10,
  },
});
