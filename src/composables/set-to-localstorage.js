export function useSetToLocalStorage(item) {
  localStorage.setItem('userData', JSON.stringify(item))
}