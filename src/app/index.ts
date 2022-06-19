import express from 'express';
import expressLoader from '@blog-api-express';

const app = express();

expressLoader({ app });

export default app;
