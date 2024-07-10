export const postRequest = async (url, payload = {}) => {
  try {
    console.log(`${import.meta.env.VITE_API_URL}${url}`);
    const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`, {
      method: 'POST',
      body: payload,
      credentials: 'include'
    })
    const result = await response.json();
    return { response, result }
  } catch (error) {
    console.log(error,"eee");
    throw new Error(error)
  }
}



