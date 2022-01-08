# __Task 7. Docker basics__

Task [description here](https://github.com/rolling-scopes-school/basic-nodejs-course/blob/master/descriptions/docker-basics.md)

Task due date / deadline date - 09.01.22 / 09.01.22 23:59(GMT+3)

Self check:
 
 TOTAL POINTS - **130**

-----------

[summaru report](#summary-report)

------------

# __Summary Report__


## Базовая реализация (максимум **110 баллов**)

№ | Description | Points | Status 
--|-------------|--------|-------
1 | Наличие в Readme.md секции с инструкцией как запустить приложение | +20 | +20
2 | Используется user-defined bridge | +30 | +30
3 | При возникновении ошибки контейнер должен перезапускается автоматически | +30 | +30
4 | Логи и файлы базы данных хранятся в volumes, а не в контейнере | +30 | +30
5 | **TOTAL POINTS** |   | **+110**

-----

## Продвинутая реализация (максимум **20 баллов**)

№ | Description | Points | Status 
--|-------------|--------|-------
1 | Итоговый docker-образ с приложением имеет размер меньше 300 мб |   +20  |   +20
2 | **TOTAL POINTS** |   | **+20**

-----

## Штрафы

№ | Description | Points | Penalty 
--|-------------|--------|--------
1 | Внесение изменений в репозиторий после дедлайна не считая коммиты, вносящие изменения только в Readme.md | -39 | 0
2 | За отсутствие отдельной ветки для разработки | -20 | 0
3 | За отсутствие `Pull Request` | -20 | 0
4 | За неполную информацию в описании `Pull Request` | -10 | 0
5 | Используется default bridge network driver | -20 | 0
6 | Конфигурация приложения жестко прописана в docker-compose.yml и Dockerfile | -20 | 0
7 | При изменении файлов в папке src приложение не перезапускается | -20 | 0
8 | Должен использоваться специфичный образ. (Например postgres и node, а не ububtu с установкой node или postgres) | -20 | 0
9 | Postgress image не указана как зависимость для node image | -20 | 0
= | **TOTAL PENALTY** |   | **0**

-----

# Install, run and test

## Docker resources

```
.
├── .env <- Dockerfiles and docker-compose get ENV
├── ...
├── logs <- Server in Docker Container writes logs in error.log and full.log
├── db_data <- Database Postgres in Docker Container stores data files here
├── ...
├── .dockerignore <- Deteremine what Docker ignore
├── Dockerfile-server <- Dockerfile for Server application
├── Dockerfile-database <- Dockerfile for Postgres database
├── docker-compose.yml <- Dockerfile for multicontainer app
├── ...
└── README.md <- Documentation and description
```

[_docker-compose.yml_](docker-compose.yml)
```
services:
  server:
    build:
      context: .
      dockerfile: Dockerfile-server
    ...
  db:
    build:
      context: .
      dockerfile: Dockerfile-database
    ...
volumes:
    ...
networks:
    ...
```
The compose file defines an application with two services `server` and `db`.
When deploying the application, docker-compose takes PORTs from .env file and maps port 4000 of the `server` service container to port 4000 of the host as specified in the file. And port 5432 of the `db` service container to port 5432 of the host.

__Make sure port 4000 and 5432 on the host is not already being in use.__

To run server just copy commands below and past them to your terminal: 
Server mast start on port 4000 and container with database on port 5432

```
git clone https://github.com/SeLub/nodejs2021Q4-service.git

cd nodejs2021Q4-service

git checkout task-7

npm install

docker-compose up --build

```

Now, you can test server by Postam

# Reports and Screenshots 

------------

## Server Logs

You can find server logs in __logs_ directory. 

## Database Data

To access database data use __db_data__ directory.

## Source code

You can modify server`s code and rebuild server in container on the fly.
Source code of the server you can find in __src__ directory. 

![Src modification](Error.gif)

## Docker Network

docker_rsschool-network creat

![Network](d_network.png)

## Size of images and Dockerhub push

![Size of images and Dockerhub push](d_size_hub.png)

## Docker scan

![Docker scan](d_dockerscan.png)

## Docker hub

![Docker hub](dockerhub.png)
