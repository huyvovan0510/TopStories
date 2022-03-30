import AsyncStorage from '@react-native-async-storage/async-storage';

const setItem = async (key, params) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(params));
  } catch (e) {
    console.log('[1;34m ~ file: Storage.js ~ line 7 ~ setItem ~ ERROR', e);
  }
};
const getItem = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value != null ? JSON.parse(value) : null;
  } catch (e) {
    console.log('[1;34m ~ file: Storage.js ~ line 15 ~ getItem ~ ERROR', e);
  }
};
export {getItem, setItem};
