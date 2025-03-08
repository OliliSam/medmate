/*

* User *

*/

export const addUserToLocalStorage = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  };
  
  export const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user');
  };
  
  export const getUserFromLocalStorage = () => {
    const result = localStorage.getItem('user');
    const user = result ? JSON.parse(result) : null;
    return user;
  };
  
  /*
  
  * Token *
  
  */
  
  export const addTokenToLocalStorage = (token) => {
    localStorage.setItem('token', token);
  };
  
  export const removeTokenFromLocalStorage = () => {
    localStorage.removeItem('token');
  };
  
  export const getTokenFromLocalStorage = () => {
    const token = localStorage.getItem('token');
    return token ? token : null;
  };