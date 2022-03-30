import React, {
  useState,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {StyleSheet} from 'react-native';
import {DEFAULT_VALUE_KEY_WORD, PickerData} from '../constans/data';
import {getItem} from '@utils/Storage';

const FilterComponent = ({onFilter, storiesData}, ref) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(PickerData[0].value);
  const [items, setItems] = useState(PickerData);

  useImperativeHandle(ref, () => ({
    getDefaultValue,
  }));

  const getDefaultValue = useCallback(async () => {
    const data = await getItem(DEFAULT_VALUE_KEY_WORD);
    if (data?.keyWord) {
      onFilter(data?.keyWord);
      setValue(data?.keyWord);
    }
  }, [onFilter]);

  return (
    <DropDownPicker
      style={styles.container}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={value => {
        const keyWord = value();
        onFilter?.(keyWord);
        setValue(keyWord);
      }}
      setItems={setItems}
    />
  );
};
export default forwardRef(FilterComponent);
const styles = StyleSheet.create({
  container: {
    width: '70%',
    alignSelf: 'center',
  },
});
