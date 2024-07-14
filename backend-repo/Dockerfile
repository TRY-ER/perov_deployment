FROM python:3.7.9-slim-buster

COPY docReq.txt /
RUN pip install --no-cache-dir -r docReq.txt 

COPY . /

EXPOSE 8000

CMD ["uvicorn", "main:app", "--port", "8000"]

