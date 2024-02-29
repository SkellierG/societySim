const config = {
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET || 'benpoken123',
  JWT_EXPIRATION: '12h'
  //AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || 'your-access-key-id',
  //AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || 'your-secret-access-key',
  //EMAIL_HOST: process.env.EMAIL_HOST || 'smtp.example.com',
  //EMAIL_PORT: process.env.EMAIL_PORT || 587,
  //EMAIL_USERNAME: process.env.EMAIL_USERNAME || 'your-email@example.com',
  //EMAIL_PASSWORD: process.env.EMAIL_PASSWORD || 'your-email-password',
  //LOG_LEVEL: process.env.LOG_LEVEL || 'info'
};

export default config;