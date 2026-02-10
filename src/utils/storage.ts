export const STORAGE_KEY = 'service_register_form'

export const loadForm = () => {
  if (typeof window === 'undefined') return null
  const saved = localStorage.getItem(STORAGE_KEY)
  return saved ? JSON.parse(saved) : null
}

export const saveForm = (data: any) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export const clearForm = () => {
  localStorage.removeItem(STORAGE_KEY)
}


