# Cloud Blog

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
