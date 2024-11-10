import { Alert } from "react-native";
import { useEffect, useState } from "react";
import { CustomErrorExceptioner } from "@/utils/classes/CustomErrorException";

// Define T as a generic type parameter for the hook
type TAppWriteServiceReturnType<T> = () => Promise<T>;

function useAppwrite<T>(fn: TAppWriteServiceReturnType<T>) {
  // Use T as the type for `data`
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  // Define fetchData as a function instead of an arrow function
  async function fetchData() {
    setLoading(true);
    try {
      const res = await fn();
      setData(res);
    } catch (error: any) {
      const errorResult = new CustomErrorExceptioner(error);
      Alert.alert(String(errorResult.errorCode), errorResult.handleError());
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  function refetch() {
    fetchData();
  }
  return { data, loading, refetch };
}

export default useAppwrite;
