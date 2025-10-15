import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthStorage {
  constructor(namespace = "auth") {
    this.namespace = namespace;
  }

  async getAccessToken() {
    return await AsyncStorage.getItem("auth");
  }

  async setAccessToken(accessToken) {
    return await AsyncStorage.setItem("auth", accessToken);
  }

  async removeAccessToken() {
    return await AsyncStorage.removeItem("auth");
  }
}

export default AuthStorage;
