import React, {memo} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
const renderItems = () => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.imgCover} />
      <View style={styles.boxInfo}>
        <View style={styles.title} />
        <View style={styles.author} />
        <View style={styles.published} />
      </View>
    </View>
  );
};
const Placeholder = () => {
  return (
    <View style={styles.listSection}>
      <FlatList
        data={new Array(10).fill('0')}
        keyExtractor={(item, index) => `${item?.title}-${index}`}
        renderItem={renderItems}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};
export default memo(Placeholder);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {},
  listSection: {},
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginHorizontal: 15,
    flex: 1,
    padding: 8,
  },
  imgCover: {
    width: 80,
    height: 80,
    borderRadius: 6,
    backgroundColor: '#e2dddd',
  },
  boxInfo: {
    flex: 1,
    height: '100%',
    marginRight: 20,
    marginLeft: 20,
  },
  title: {
    backgroundColor: '#e2dddd',
    marginBottom: 15,
    width: '100%',
    height: 20,
    borderRadius: 8,
  },
  author: {
    backgroundColor: '#e2dddd',
    marginBottom: 4,
    width: '70%',
    height: 10,
    borderRadius: 10,
  },
  published: {
    backgroundColor: '#e2dddd',
    width: '40%',
    height: 10,
    borderRadius: 8,
  },
});
