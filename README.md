# Things Market

## Backend

### Install requirements

Is recommend use python virtual environments to work locally.

To install the python requirements go to `backend` directory and run `pip install -r requirements.txt`.

### Run Backend

To run locally the project you go to `backend` directory and run `python manage.py runserver`.

### Run Backend Test

To run locally the tests you go to `backend` directory and run `python manage.py test`.

### Run Backend Coverage

To run locally the coverage you go to `frontend` directory and run `coverage manage.py runserver && coverage report`.

## Frontend

### Run Frontend Project

To run locally the project you go to `frontend` directory and run `npm start`.

### Run Frontend Test

To run locally the tests you go to `frontend` directory and run `npm run test`.

### Run Frontend build

To run locally the tests you go to `frontend` directory and run `npm run build --prod`.

## Database

To run locally install MongoDB and update `backend.backend.settings.py` to ref local database.

## Docker

To run complete just run `docker-compose up`.

To update the docker-compose images run `docker-compose build`.

### Run backend with mock data

To run the backend with mock data create a `.env` file with the next structure.

```
backend:
    environment:
        DEV_ENV=true
```

And run `docker-compose --env-file file_name`