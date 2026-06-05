export const getDataFromBrowwer = <T>(): T | undefined => {
  if (typeof window === 'undefined' || !window.localStorage) {
    return undefined;
  }
  
  try {
    const serializedState = localStorage.getItem('cart');
    if (!serializedState) {
      return undefined;
    }
    return JSON.parse(serializedState) as T;
  } catch (err) {
    console.error('Failed to parse cart state:', err);
    return undefined;
  }
};

export const saveDatainBrowser = (state: unknown): void => {
  if (typeof window === 'undefined' || !window.localStorage) {
    return;
  }

  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cart', serializedState);
  } catch (err) {
    console.error('Failed to save cart state:', err);
  }
};
