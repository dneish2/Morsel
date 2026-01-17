# Morsel Project

## Overview
Morsel is a React application designed to provide users with a seamless experience in accessing and managing articles from various categories.

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/morsel.git
   cd morsel
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   - Copy the `.env.example` to `.env` and fill in the required API keys and configuration settings.

## Usage
To start the development server, run:
```bash
npm start
```

## Deployment Guidelines

### GitHub Actions
The project uses GitHub Actions for CI/CD. The workflow is defined in `.github/workflows/deploy.yml`. Ensure that you have set up the necessary secrets in your GitHub repository for deployment.

### Google Cloud Deployment
1. **App Engine Configuration**
   - The deployment configuration is specified in `deployment/app.yaml`. Adjust the settings as necessary for your environment.

2. **Nginx Configuration**
   - The Nginx configuration for serving the application is located in `deployment/nginx.conf`.

3. **Cloud Build Configuration**
   - The `cloudbuild.yaml` file defines the steps for building and deploying the application using Google Cloud Build.

## Managing API Keys
- Ensure that sensitive information such as API keys is stored in the `.env` file and not hard-coded in the application. Use the `.env.example` as a reference for the required keys.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.