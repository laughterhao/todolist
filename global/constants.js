export const API_HOST = process.env.NODE_ENV === 'production' ? 'https://todolist-ebon-beta.vercel.app' : 'http://localhost:5000';
export const API_GET_DATA = `${API_HOST}/post/1`