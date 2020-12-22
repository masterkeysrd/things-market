#!/bin/bash

python manage.py migrate

if [[ -z "${DEV_ENV}" ]]; then
    python manage.py loaddata mock_data.json
fi

python manage.py runserver 0.0.0.0:8000
