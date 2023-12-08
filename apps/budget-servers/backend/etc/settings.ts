export const BUDGET = () => ({
  BUDGET_SERVER_PORT: process.env.BUDGET_SERVER_PORT,
  SYSTEM_CATEGORY_NAME: 'SYSTEM_CATEGORY',
  SYSTEM_SUBCATEGORY_NAME: 'SYSTEM_SUBCATEGORY',
});

export const MONGO = () => ({
  // MONGO_SERVER:               process.env.MONGO_SERVER,
  // MONGO_INITDB_ROOT_USERNAME: process.env.MONGO_INITDB_ROOT_USERNAME,
  // MONGO_INITDB_ROOT_PASSWORD: process.env.MONGO_INITDB_ROOT_PASSWORD,
  // MONGO_INITDB_DATABASE:      process.env.MONGO_INITDB_DATABASE,
  // MONGO_AUTH_SOURCE:          process.env.MONGO_AUTH_SOURCE,
  // MONGO_PORT:                 process.env.MONGO_PORT,
  // MONGO_PROTOCOL:             process.env.MONGO_PROTOCOL,
  MONGO_STRING: process.env.MONGO_STRING,
});

export const SUPABASE = () => ({
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_KEY: process.env.SUPABASE_KEY,
  SUPABASE_JWT: process.env.SUPABASE_JWT,
});
