export const getTokens = () => {
  const tokens = JSON.parse(localStorage.getItem('sb-ubjozfideufsivqozjqy-auth-token') || '{}')
  return {
    access_token: tokens.provider_token,
    refresh_token: tokens.refresh_token,
  }
}

export const clearTokens = () => {
  localStorage.removeItem('sb-ubjozfideufsivqozjqy-auth-token')
}
