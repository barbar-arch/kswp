export const getStorage = () => {
  return window.sessionStorage
}

export const storeUserToken = token => {
  getStorage().setItem('bar', token)
}
