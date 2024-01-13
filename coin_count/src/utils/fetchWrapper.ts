
export const fetchWrapper = async <T>(
  resource: RequestInfo | URL,
  config: RequestInit,
): Promise<T> => {

  
  const requestOptions: RequestInit = {
    headers: config?.headers,
    method: config?.method,
    body: config?.body,
  };
  

  const response = await fetch(resource, requestOptions)
  if (!response.ok) {
    const error = await response.json();
    throw error;
    }

    return (await response.json()) as T;
}
