import {getItem} from '@utils/Storage';
import React, {memo, useState, useEffect, useCallback} from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {DEFAULT_VALUE_CATEGORY, listCategories} from '../constans/data';
const CategoriesSection = ({onSelectCategory}) => {
  const [selectedItem, setSelectedItem] = useState();

  useEffect(() => {
    getDefaultValue();
  }, [getDefaultValue]);

  const getDefaultValue = useCallback(async () => {
    const category = await getItem(DEFAULT_VALUE_CATEGORY);
    if (category) {
      setSelectedItem(category);
      onSelectCategory?.(category);
    } else {
      onSelectCategory?.('home');
    }
  }, [onSelectCategory]);

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.col}>
        {item.map((category, i) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.buttonCategory,
              {borderColor: category === selectedItem ? 'red' : '#000'},
            ]}
            onPress={() => {
              setSelectedItem(category);
              onSelectCategory?.(category);
            }}>
            <Text style={{color: category === selectedItem ? 'red' : '#000'}}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={listCategories}
        keyExtractor={(item, index) => {
          const ids = item.map(itemCol => itemCol);
          return `${ids[index]}-${index}`;
        }}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default memo(CategoriesSection);
const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    marginLeft: 15,
  },
  col: {},
  buttonCategory: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    marginBottom: 8,
  },
});
