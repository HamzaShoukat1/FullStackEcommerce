export const getDataFromBrowwer = ()=>{
  try {
    const serializedState = localStorage.getItem('cart')
    if(!serializedState)
    {
      return undefined

    }
  return JSON.parse(serializedState)
    
  } catch (err) {
    console.log('failer', err);
    return undefined
    
  }
};


export const saveDatainBrowser = (state:any)=>{
  try {


    localStorage.setItem('cart', JSON.stringify(state)) //Browsers only store strings in localStorage.
    
  } catch (err) {
    console.log('failed', err)
    return undefined
    
  }

};