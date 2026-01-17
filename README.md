# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## Deployment (automatic on push to `main`)

This repository includes a GitHub Actions workflow that builds the React app and deploys it to Google Cloud Run.

What the workflow does:
- Runs `npm ci` and `npm run build`.
- Builds a Docker image using the repository Dockerfile and pushes it to Google Container Registry.
- Deploys the image to Cloud Run.

Secrets you'll need to add to the GitHub repository settings (Repository -> Settings -> Secrets & variables -> Actions):
- `GCP_PROJECT` — your GCP project id
- `GCP_REGION` — e.g. `us-central1`
- `GCP_SA_KEY` — JSON contents of a Google Cloud service account key (see below)
- `CLOUD_RUN_SERVICE` — name for the Cloud Run service (e.g. `morsel`)
- `REACT_APP_NEWSAPI_KEY` — NewsAPI.org key (used at build time)
- `REACT_APP_NEWSDATA_KEY` — NewsData key (used at build time)

Quick setup steps in GCP:
1. Create a GCP project (or use an existing one).
2. Enable the Cloud Run, Cloud Build, and Container Registry APIs.
3. Create a service account with the following roles: Cloud Run Admin, Storage Admin, Cloud Build Editor (or Cloud Build Editor + Service Account User).
4. Create a JSON key for the service account and add the contents to the `GCP_SA_KEY` repository secret.

Local development:
- Copy `morsel/.env.example` to `.env` in the `morsel` folder and set `REACT_APP_NEWSAPI_KEY` and `REACT_APP_NEWSDATA_KEY` for local builds.

If you prefer Cloud Build directly, `morsel/cloudbuild.yaml` is provided and will build/push the image and deploy to Cloud Run (you can trigger this from Cloud Build on source repos).

