import React, {useState, useEffect, useRef, useCallback} from 'react';
import {View, SafeAreaView, StyleSheet, FlatList, Text} from 'react-native';
import CategoriesSection from '@components/CategoriesSection';
import ArticleItems from '@components/ArticleItems';
import {getStoriesByCategory} from '@api';
import Placeholder from '@components/Placeholder';
import NetInfo from '@react-native-community/netinfo';
import FilterComponent from '@components/FilterComponent';
import {setItem} from '@utils/Storage';
import {DEFAULT_VALUE_CATEGORY, DEFAULT_VALUE_KEY_WORD} from '@constans/data';

const renderItems = ({item, index}) => <ArticleItems item={item} />;
const renderEmpty = () => <Placeholder />;

const Home = () => {
  const originalData = useRef([]);
  const filterRef = useRef(null);

  const [storiesData, setStoriesData] = useState([]);
  const [isConnect, setIsConnect] = useState(true);
  const [category, setCategory] = useState();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected) {
        setIsConnect(true);
      } else {
        setIsConnect(false);
      }
    });
  }, []);

  useEffect(() => {
    if (isConnect) {
      getDataFromServer();
    }
  }, [category, getDataFromServer, isConnect]);

  const getDataFromServer = useCallback(() => {
    if (category) {
      getStoriesByCategory(category, data => {
        setStoriesData(data);
        originalData.current = data;
        filterRef.current.getDefaultValue();
      });
    }
  }, [category]);

  const onSelectCategory = async data => {
    setStoriesData([]);
    await setItem(DEFAULT_VALUE_CATEGORY, data);
    setCategory(data);
  };

  const onFilter = async keyWord => {
    await setItem(DEFAULT_VALUE_KEY_WORD, {keyWord: keyWord});
    if (keyWord === 'all') {
      setStoriesData(originalData.current);
    } else {
      const data = originalData.current?.filter(item => {
        return item?.section === keyWord;
      });
      setStoriesData(data);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <CategoriesSection onSelectCategory={onSelectCategory} />
        <View style={styles.listSection}>
          <FilterComponent
            ref={filterRef}
            onFilter={onFilter}
            storiesData={originalData.current}
          />
          <FlatList
            ListEmptyComponent={renderEmpty}
            data={storiesData}
            keyExtractor={(item, index) => `${item?.title}-${index}`}
            renderItem={renderItems}
            showsVerticalScrollIndicator={false}
          />
          {!isConnect && (
            <View style={styles.redBox}>
              <Text style={styles.desc}>No connect internet !</Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {flex: 1},
  listSection: {flex: 1},
  redBox: {
    backgroundColor: 'red',
    alignSelf: 'center',
    position: 'absolute',
    padding: 16,
    borderRadius: 8,
    overflow: 'hidden',
    bottom: 80,
  },
  desc: {
    color: '#Fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
