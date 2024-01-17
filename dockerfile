# syntax=docker/dockerfile:1

FROM python:3

# Install dependencies
COPY ./RESTAPI/requirements.txt ./requirements.txt
RUN python -m venv .venv \
    && . .venv/bin/activate \
    && pip install -r requirements.txt