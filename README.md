# Cloud Blog
[![Netlify Status](https://api.netlify.com/api/v1/badges/ae27cbfe-d991-47f5-91ca-a63cb6cac4d1/deploy-status)](https://app.netlify.com/projects/cloudblog-ada/deploys)

Simple React + Vite blog app, using AWS Lambda + RDS for the data

## Quick Start

Create an `.env` file:
```
VITE_API_URL=
```

```bash
npm install
npm run dev
```

## In the Lambda:

The following environment variables should be set

```
DB_USER=adauser
DB_PASSWORD=<password>
DB_HOST=<database-connection-string>.rds.amazonaws.com
DB_NAME=production
```

## Read more
- You can find the `pg` docs here: https://node-postgres.com
- The lambda function is deployed to AWS as `adaCloudBlogFetchPosts`