const getData = async (url = '') => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Cache: 'no-cache',
    },
    credentials: 'include',
  });
  return response.json();
};

export default getData;
