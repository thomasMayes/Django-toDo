FROM python:3.9
ENV PYTHONUNBUFFERED 1
RUN mkdir /Code
WORKDIR /Code
COPY ./requirements.txt .

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

COPY . /Code/

# ENTRYPOINT python /Code/manage.py runserver 0.0.0.0:8000
# CMD ["python", "Code/manage.py", "runserver", "0.0.0.0:8001"]