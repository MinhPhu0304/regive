import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export function useAxiosGet(url) {
  const [request, setRequest] = useState({
    loading: false,
    data: null,
    error: false,
  });

  const jwt = Cookies.get("user")

  useEffect(() => {
    setRequest({ loading: true, data: null, error: false });
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((response) => {
        setRequest({ loading: false, data: response.data, error: false });
      })
      .catch((error) => {
        setRequest({ loading: false, data: null, error: true });
      });
  }, [url]);

  return request;
}

export function useAxiosPut(url) {
  const data = {"name":"testname","items":['Item 1', "Item 2"]}

  const jwt = Cookies.get("user")

  useEffect(() => {
    axios
      .put(url, data, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((response) => console.log(response.status))
      .catch((error) => console.log(error));
    })

  return 'complete';
};