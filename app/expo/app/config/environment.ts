const ENV = {
  dev: {
    apiUrl: 'http://localhost:3000/api',
    enableLogging: true
  },
  prod: {
    apiUrl: 'https://api.booklyph.com',
    enableLogging: false
  }
};

const getEnvVars = (env = 'dev') => {
  if (env === 'prod') {
    return ENV.prod;
  }
  return ENV.dev;
};

export default getEnvVars;
