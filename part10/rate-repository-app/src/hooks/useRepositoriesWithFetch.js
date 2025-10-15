import { useEffect, useState } from "react";
import { Platform } from "react-native";

const WEB_URL = "http://localhost:5000/api/repositories";
const MOBILE_URL = "http://192.168.1.106:5000/api/repositories";

const useRepositories = () => {
  const [repositories, setRepositories] = useState();
  const [loading, setLoading] = useState(false);

  const fetchRepositories = async () => {
    setLoading(true);

    // eslint-disable-next-line no-undef
    const response = await fetch(Platform.OS !== "web" ? MOBILE_URL : WEB_URL);
    const json = await response.json();

    setLoading(false);
    setRepositories(json);
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  return { repositories, loading, refetch: fetchRepositories };
};

export default useRepositories;
