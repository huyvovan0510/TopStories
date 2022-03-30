import React, {memo} from 'react';
import {Text, View, StyleSheet, ImageBackground} from 'react-native';
import moment from 'moment';

const ArticleItems = ({item}) => {
  // console.log(
  //   '[1;34m ~ file: ArticleItems.js ~ line 6 ~ ArticleItems ~ item',
  //   item.section,
  // );
  const publishTime = moment(item?.published_date).startOf('day').fromNow();
  if (!item?.title && !item?.byline) {
    return null;
  }
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imgCover}
        source={{uri: item?.multimedia?.[0]?.url}}>
        <View style={styles.tag}>
          <Text style={styles.section}>{item.section}</Text>
        </View>
      </ImageBackground>
      <View style={styles.boxInfo}>
        <Text style={styles.title} numberOfLines={2}>
          {item?.title || ''}
        </Text>
        <Text numberOfLines={1} style={styles.author}>
          {item?.byline || ''}
        </Text>
        <Text style={styles.published}>{`Published ${publishTime}` || ''}</Text>
      </View>
    </View>
  );
};
export default memo(ArticleItems);
const styles = StyleSheet.create({
  container: {
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
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  author: {
    fontSize: 12,
    fontWeight: '300',
    marginBottom: 4,
  },
  published: {
    fontSize: 12,
    fontWeight: '300',
  },
  tag: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: 8,
    right: 3,
    bottom: 3,
  },
  section: {
    padding: 5,
    fontSize: 10,
  },
});
