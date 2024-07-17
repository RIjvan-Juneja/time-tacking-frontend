import { useState, useCallback } from 'react';

const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (url, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`, options);
      const data = await response.json();

      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  }, []);

  const sendData = useCallback(async (url, payload, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      console.log(`${import.meta.env.VITE_API_URL}${url}`);
      const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`, {
        method: 'POST',
        body: payload,
        ...options,
      });

      const data = await response.json();

      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  }, []);

  return { loading, error, fetchData, sendData };
};

export default useFetch;



// const ExampleComponent = () => {
//   const { loading, error, fetchData, sendData } = useFetch();
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const fetchedData = await fetchData('/api/data');
//         setData(fetchedData);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     loadData();
//   }, [fetchData]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const formData = new FormData(event.target);

//     try {
//       const response = await sendData('/api/submit', formData);
//       console.log('Form submitted successfully:', response);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div>
//       {loading && <p>Loading...</p>}
//       {error && <p>Error: {error}</p>}
//       {data && <div>Data: {JSON.stringify(data)}</div>}

//       <form onSubmit={handleSubmit}>
//         <input type="text" name="example" />
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };