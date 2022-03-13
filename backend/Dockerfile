FROM python:3.9-slim as base
FROM base as builder

# update system & install c/c++ (required)
RUN apt-get update && apt-get install -y build-essential

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
    useradd -u 10000 -g med med && \
    mkdir -p /home/med && \
    chown -R med:med /home/med
USER 10000:10001

WORKDIR /home/med
COPY --chown=med:med ./prestart.sh ./start.sh ./
RUN chmod +x ./start.sh ./prestart.sh

# copy application
COPY ./app /home/med

# set work directory and python path
ENV PYTHONPATH=/home/med

# expose port
EXPOSE 5000

# run
CMD ["./start.sh"]
