const apiUrl = import.meta.env.VITE_API_URL;
import { ref } from 'vue'

export async function useFetch(endpoint, options) {
    const data = ref(null);
    const error = ref(null);
  
    const response = await fetch(`${apiUrl}/${endpoint}`, {
        options,
        headers: {
        'content-type': 'application/json',
        "X-Requested-With": "XMLHttpRequest",
        "Access-Control-Allow-Origin": "*"
        }
      });

    data.value = await response.json();
     
    return { 
      data: data.value.data,
      error 
    };
  }