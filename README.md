# Product Catalog

![Test all the things](https://github.com/quiltyweb/productcatalog/workflows/Test%20all%20the%20things/badge.svg)
![Heroku](https://heroku-badge.herokuapp.com/?app=productcatalog)

## Setup

- Install Docker
- Install [`direnv`](https://direnv.net/)
  - Loads env vars from `.env`, which is convenient
- Create an env file:
  - `cp .env.example .env`
  - Set the uncommented env var values
- `docker-compose up --build`

Optional:
- Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) (only necessary for deploying or dumping the prod DB)

### Database
- To set up or restore your local database using the production DB, run `./scripts/set_local_db_to_prod.sh [DUMP FILENAME]`
  - The dump filename is an optional arg that will use a local `*.sql` or `*.dump` file instead of downloading a new one from Heroku.
  - **WARNING:** This will erase any data you currently have on your local DB.

## Running the app

- `docker-compose up` (add `-d` if you want to run it in the background)
- Open the browser to `localhost:3000`

## Deployment

We host the app on Heroku.

We deploy automatically to Heroku with every merged PR that passes CI via a GitHub integration. If you want to deploy manually do the following:
- While on `master`, run `git push heroku master`
