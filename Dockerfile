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

RUN groupadd -g 10001 med && \
    useradd -u 10000 -g med med \
    && mkdir -p /home/med \
    && chown -R med:med /home/med
USER 10000:10001

# copy gunicorn config
COPY --chown=med:med ./gunicorn_conf.py /gunicorn_conf.py

# copy startup scripts (& make them executable)
COPY --chown=med:med ./prestart.sh /prestart.sh
COPY --chown=med:med ./start.sh /start.sh

# copy application
COPY ./app /home/med

# set work directory and python path
WORKDIR /home/med
ENV PYTHONPATH=/home/med

# expose port
EXPOSE 8080

# run
CMD ["/start.sh"]
