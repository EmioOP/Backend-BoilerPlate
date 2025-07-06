# E-commerce Backend

A secure and scalable Node.js backend API for e-commerce applications built with Express.js and MongoDB.

## Features

- **Security First**: Built-in security middleware for production-ready deployment
- **Rate Limiting**: Prevents API abuse with configurable request limits
- **Data Sanitization**: Protects against NoSQL injection attacks
- **CORS Support**: Configurable cross-origin resource sharing
- **Environment Configuration**: Environment-based configuration management
- **Request Logging**: Development-friendly request logging
- **Error Handling**: Global error handling with detailed development feedback

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js 5.x
- **Database**: MongoDB (with Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Helmet, HPP, Express Rate Limit, Express Mongo Sanitize
- **Development**: Nodemon for auto-restart

## Security Features

### Middleware Stack
- **Helmet**: Sets various HTTP headers to secure the app
- **HPP**: Prevents HTTP Parameter Pollution attacks
- **Express Mongo Sanitize**: Sanitizes user input to prevent NoSQL injection
- **Rate Limiting**: Limits each IP to 100 requests per 15 minutes
- **CORS**: Configurable cross-origin resource sharing

### Data Protection
- Request body size limited to 10KB
- URL parameter size limited to 10KB
- Cookie parsing support
- Secure headers automatically set

## Package Manager

This project uses **pnpm** as the package manager. Make sure you have pnpm installed:

```bash
npm install -g pnpm
```

### Why pnpm?
- **Fast**: Up to 2x faster than npm
- **Efficient**: Saves disk space with content-addressable storage
- **Strict**: Better dependency resolution and security
- **Compatible**: Works with npm and yarn lockfiles

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ecommerce-backend
```

2. Install dependencies:
```bash
pnpm install
```

3. Create a `.env` file in the root directory:
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
# Add your MongoDB connection string
# Add your JWT secret
# Add other environment variables as needed
```

4. Start the development server:
```bash
pnpm dev
```

## Environment Variables

Create a `.env` file with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Client Configuration
CLIENT_URL=http://localhost:3000

# Database Configuration
# MONGODB_URI=mongodb://localhost:27017/ecommerce

# JWT Configuration
# JWT_SECRET=your-secret-key
# JWT_EXPIRE=30d

# Add other configuration variables as needed
```

## API Endpoints

The API is prefixed with `/api` and includes rate limiting.

### Rate Limiting
- **Window**: 15 minutes
- **Limit**: 100 requests per IP per window
- **Scope**: All `/api` routes

### CORS Configuration
- **Origin**: Configurable via `CLIENT_URL` environment variable
- **Credentials**: Enabled
- **Methods**: GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS
- **Headers**: Content-Type, Authorization, X-Requested-With, Accept, Origin, Access-Control-Allow-Origin, device-remember-token

## Development

### Available Scripts

- `pnpm dev` - Start development server with auto-restart
- `pnpm test` - Run tests (not implemented yet)

### Development Features

- **Morgan Logging**: Detailed request logging in development mode
- **Error Stack Traces**: Full error stack traces shown in development
- **Nodemon**: Automatic server restart on file changes

## Project Structure

```
ecommerce-backend/
├── index.js          # Main application file
├── package.json      # Dependencies and scripts
├── .env              # Environment variables (create this)
├── README.md         # This file
└── ...               # Additional files and folders
```

## Error Handling

The application includes global error handling middleware that:
- Logs errors to console
- Returns appropriate HTTP status codes
- Provides detailed error messages in development
- Sanitizes error messages in production

## Security Considerations

- All user inputs are sanitized against NoSQL injection
- HTTP parameter pollution is prevented
- Rate limiting prevents abuse
- Security headers are automatically set
- Request size limits prevent large payload attacks
- CORS is properly configured

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

ISC

## Dependencies

### Production Dependencies
- **express**: Web framework
- **mongoose**: MongoDB ODM
- **jsonwebtoken**: JWT authentication
- **bcrypt**: Password hashing
- **helmet**: Security headers
- **cors**: Cross-origin resource sharing
- **express-rate-limit**: Rate limiting
- **express-mongo-sanitize**: NoSQL injection prevention
- **hpp**: HTTP parameter pollution prevention
- **cookie-parser**: Cookie parsing
- **morgan**: Request logging
- **dotenv**: Environment variable management

### Development Dependencies
- **nodemon**: Development server with auto-restart

## TODO

- [ ] Add API route implementations
- [ ] Add database connection setup
- [ ] Add authentication middleware
- [ ] Add input validation
- [ ] Add comprehensive testing
- [ ] Add API documentation
- [ ] Add Docker support
- [ ] Add CI/CD pipeline

## Support

For support, please open an issue in the repository or contact the development team.
