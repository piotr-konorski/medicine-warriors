# Dockerfile.web

FROM python:3.9-slim as base
FROM base as builder

# update system & install c/c++ (required)
RUN apt-get update && apt-get install -y build-essential

# set env variables
# prevents Python from writing pyc files
ENV PYTHONDONTWRITEBYTECODE 1
# prevents Python from buffering stdout and stderr 
ENV PYTHONUNBUFFERED 1

RUN mkdir /install
WORKDIR /install
COPY requirements.txt /requirements.txt
RUN pip install --upgrade pip
RUN pip install --no-cache-dir --prefix="/install" -r /requirements.txt

FROM base
COPY --from=builder /install /usr/local

# install netcat for internal network inspection
RUN apt-get update && apt-get install -y netcat

# copy gunicorn config
COPY ./gunicorn_conf.py /gunicorn_conf.py

# copy startup scripts (& make them executable)
COPY ./prestart.sh /prestart.sh
RUN chmod +x /prestart.sh
COPY ./start.sh /start.sh
RUN chmod +x /start.sh

# copy application
COPY ./app /app

# set work directory and python path
WORKDIR /app
ENV PYTHONPATH=/app

# expose port
EXPOSE 80

# run
CMD ["/start.sh"]
