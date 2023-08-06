export const JWT_CONSTANTS = () => ({
  SECRET_KEY: process.env.JWT_SECRET_KEY,
  EXPIRATION_TIME: process.env.JWT_EXPIRATION_TIME,
});
