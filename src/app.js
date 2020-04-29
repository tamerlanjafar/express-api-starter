import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import xss from 'xss-clean';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';

import routes from './routes';
import errorHandler from './middlewares/error';
import { generateAppError } from './utils/error';

const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Enable CORS
app.use(cors());

// Set security headers
app.use(helmet());

// Data sanitization against XSS (clean user input from malicious HTML code)
app.use(xss());

// Prevent http param pollution
app.use(hpp());

// Rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 mins
    max: 500,
    message: 'Too Many Requests from this IP, please try again in 10 minutes.'
});
app.use(limiter);

app.use('/api/v1', routes);

app.all('*', (req, res, next) => {
    next(generateAppError('endpointNotFound', 404));
});

app.use(errorHandler);

export default app;
