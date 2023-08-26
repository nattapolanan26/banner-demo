export default {
  meEndpoint: '/auth/me',
  loginEndpoint: '/api/login',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken', // logout | refreshToken
};
