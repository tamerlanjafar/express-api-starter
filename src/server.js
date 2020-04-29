import './config/index';
import colors from 'colors';
import app from './app';

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`.yellow.bold);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', error => {
    console.log(`Error: ${error.message}`.red);
    server.close(() => process.exit(1));
});
