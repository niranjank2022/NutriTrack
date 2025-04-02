import { MMKV } from "react-native-mmkv";
import { Platform } from "react-native";

const mmkvStorage = Platform.OS !== "web" ? new MMKV() : null;

export const storeData = (key: string, value: string) => {
  if (Platform.OS !== "web" && mmkvStorage) {
    mmkvStorage.set(key, value);
  } else if (Platform.OS === "web") {
    localStorage.setItem(key, value);
  }
};

export const getData = (key: string): string | null | undefined => {
  if (Platform.OS !== "web" && mmkvStorage) {
    return mmkvStorage.getString(key);
  } else if (Platform.OS === "web") {
    return localStorage.getItem(key);
  }
  return null;
};

export const clearData = (key: string) => {
  if (Platform.OS !== "web" && mmkvStorage) {
    mmkvStorage.delete(key);
  } else if (Platform.OS === "web") {
    localStorage.removeItem(key);
  }
};
