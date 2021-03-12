FROM python:3.9
ENV PYTHONUNBUFFERED 1
RUN mkdir /Code
WORKDIR /Code
COPY ./requirements.txt .

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

COPY . /Code/

CMD python manage.py makemigrations && python manage.py migrate && python manage.py runserver
# CMD ["python", "manage.py", "migrate"]
# CMD ["python", "manage.py", "runserver"]
