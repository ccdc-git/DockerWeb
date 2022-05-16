###########
# BUILDER #
###########

# pull official base image
FROM python:3.9.12-alpine as builder

# set work directory
WORKDIR /usr/src/app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install psycopg2 dependencies
RUN apk update
RUN apk add --no-cache --virtual build-deps gcc python3-dev musl-dev \
        libxml2 \
        libxml2-dev
RUN apk add gcc g++ libffi-dev libxslt-dev mariadb-dev

# lint
RUN pip install --upgrade pip

# install dependencies
COPY ./requirements* .

RUN pip -V
RUN pip wheel --no-cache-dir --no-deps --wheel-dir /usr/src/app/wheels -r requirements-prod.txt

#########
# FINAL #
#########

# pull official base image
FROM python:3.9.12-alpine

# create directory for the app user
RUN mkdir -p /home/app

# create the app user
RUN addgroup -S app && adduser -S app -G app

# create the appropriate directories
ENV HOME=/home/app
ENV APP_HOME=/home/app/web
RUN mkdir $APP_HOME
RUN mkdir $APP_HOME/staticfiles
WORKDIR $APP_HOME

# install dependencies
RUN apk update && apk add libpq
RUN apk add --no-cache mariadb-connector-c
COPY --from=builder /usr/src/app/wheels /wheels
RUN pip install --upgrade pip
RUN pip install --no-cache /wheels/*

ADD entrypoint.sh .
ADD app/ .
