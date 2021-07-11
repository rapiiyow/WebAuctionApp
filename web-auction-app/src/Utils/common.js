// return the user data from the session storage
export const getUser = () => {
    const userStr = sessionStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    else return null;
  }
  
  // remove the user from the session storage
  export const removeUserSession = () => {
    sessionStorage.removeItem('user');
  }
  
  // set the user from the session storage
  export const setUserSession = (user) => {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  export const setSelectedItemSession = (item) => {
    sessionStorage.setItem('item', JSON.stringify(item));
  }

  export const removeSelectedItemSession = () => {
    sessionStorage.removeItem('item');
  }

  export const getSelectedItem = () => {
    const itemId = sessionStorage.getItem('item');
    if (itemId) return JSON.parse(itemId);
    else return null;
  }