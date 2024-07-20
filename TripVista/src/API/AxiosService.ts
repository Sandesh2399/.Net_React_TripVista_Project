import axiosInstance from "./AxiosConfig";
import { useState } from "react";

const useAxiosAPI = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async (method: string, url: string, data: any) => {
    setLoading(true);
    try {
      const result = await axiosInstance({
        method: method,
        url: url,
        data: data,
        headers: {
          'Content-Type': typeof data === 'object' && data instanceof FormData ? 'multipart/form-data' : 'application/json'
        }
      });
      return { result, error:null }
    } catch (err:any) {
      let error:string =  err.massage;
      return { result: null, error }
    } finally {
      setLoading(false);
    }
  };

  return { loading, fetchData };
};

export default useAxiosAPI;

