import RNSInfo from 'react-native-sensitive-info';

import { StorageItems } from './../enum/storage';

const options: RNSInfo.RNSensitiveInfoOptions = {};

export const getItem = async (key: StorageItems) =>
  RNSInfo.getItem(key, options);

export const setItem = async (key: StorageItems, value: any) => {
  await RNSInfo.setItem(key, value, options);
};

export const setAuthTokens = async (
  accessToken: string,
  refreshToken: string,
) => {
  await RNSInfo.setItem(StorageItems.ACCESS_TOKEN, accessToken, options);
  await RNSInfo.setItem(StorageItems.REFRESH_TOKEN, refreshToken, options);
};

export const removeItem = async (key: StorageItems) => {
  await RNSInfo.deleteItem(key, options);
};

export const getAll = () => RNSInfo.getAllItems(options);
