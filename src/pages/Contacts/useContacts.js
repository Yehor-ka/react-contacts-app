import { useState, useEffect } from 'react';
import axios from 'axios';

export const useContacts = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
  
    useEffect(() => {
      const getContacts = async () => {
        setIsLoading(true);
        try {
          const { data, error } = await axios('https://randomuser.me/api/?results=200');
          console.log(data);
          if (error) {
            throw new Error(error);
          }
          setData(data.results);
          setIsError(false);
        } catch (e) {
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      };
  
      getContacts();
    }, []);
  
    return {
      isLoading,
      isError,
      data,
    };
  };