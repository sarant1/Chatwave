FROM python:3.9.9-slim-buster

WORKDIR /chatwave-backend

# Upgrading pip
RUN pip install --upgrade pip

# Copying requirements.txt to WORKDIR
COPY requirements.txt .

# Install dependencies
RUN pip install -r requirements.txt

# Copying the rest of the files
COPY . .

EXPOSE 8080

CMD ["python", "manage.py", "runserver", "0.0.0.0:8080"]