const getStateFromStorage = () =>
  JSON.parse(window.localStorage.getItem('i18n'))

const storeStateInStorage = (state) =>
  window.localStorage.setItem('i18n', JSON.stringify(state))

export { getStateFromStorage, storeStateInStorage }
