# Начисление рейтинговой стипендии
Модуль системы учета и оценки результатов деятельности студентов, в котором формируются приказы о начислении рейтинговой стипендии  исходя из критериев.

# Сервер

смотри файлик [...]

# Клиент

смотри файлик [...]

# Оглавление   
- [Описание](#Описание)
- [Как установить и запустить проект](#Установка)
    - [Установка парсера](#Парсер)
    - [Установка сервера](#Сервер)
    - [Установка клиента](#Клиент)
- [Использование](#Использование)

#  <a name="Описание"> Описание </a> 
В рамках дисциплины "Проектная деятельность" в ИРНИТУ студенты института ИТиАД занимаются разработкой системы "Рейтинг студентов".
На основе требований заказчика группой студентов был спроектирован и реализован модуль "Начисление рейтинговой стипендии".
Модуль предназначен для определния какие студенты будут получать ретинговую стипендию а какие нет.
Для работы системы необходимы списки заявок студентов,которые подали на рейтинговую стипендию, с количеством баллов.
В результате работы сайт позволяет пользователю скачать файл приказом на начислений рейтинговой стипендии.

Стек технологий:
<div>
<img src="https://e7.pngegg.com/pngimages/328/221/png-clipart-c-programming-language-logo-microsoft-visual-studio-net-framework-javascript-icon-purple-logo.png" title="CSS3" alt="CSS" width="50" height="50"/>&nbsp;
<img src="https://github.com/devicons/devicon/blob/master/icons/postgresql/postgresql-original-wordmark.svg" title="CSS3" alt="CSS" width="50" height="50"/>&nbsp;
<img src="https://github.com/devicons/devicon/blob/master/icons/express/express-original-wordmark.svg" title="CSS3" alt="CSS" width="50" height="50"/>&nbsp;
<img src="https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-original-wordmark.svg" title="NodeJS" alt="NodeJS" width="50" height="50"/>&nbsp;    
<img src="https://github.com/devicons/devicon/blob/master/icons/sequelize/sequelize-original-wordmark.svg" title="NodeJS" alt="NodeJS" width="150" height="40"/>&nbsp;
<img src="https://github.com/devicons/devicon/blob/master/icons/react/react-original-wordmark.svg" title="CSS3" alt="CSS" width="50" height="50"/>&nbsp;
<img src="https://github.com/devicons/devicon/blob/master/icons/bootstrap/bootstrap-original-wordmark.svg" title="NodeJS" alt="NodeJS" width="50" height="50"/>&nbsp;
</div>

Схема БД:
![image](https://user-images.githubusercontent.com/74527737/200838602-087c9c5e-87be-44c1-ba92-d6ce9c5094e6.png)
Архитектура приложения:

![image](https://user-images.githubusercontent.com/74527737/200835066-55ec5365-b294-4682-8dea-a89bca9f7fc3.png)


# <a name="Установка"> Как установить и запустить проект </a> 

## <a name="Парсер"> Парсер </a> 

Запустить один раз решение,что бы появилось консольное окно.

## <a name="Сервер"> Сервер </a>
**Документация API находится в https://github.com/KutenkovV/Student-Raiting/tree/master/server#readme


Установка

```bash
$ npm install
```

Распаковать бэкап БД - файл BackUpEmpty


Старт приложения

```bash
# development
$ npm run dev
```
## <a name="Клиент"> Клиент </a> 
Установка

```bash
$ npm install
```

Старт приложения

```bash
# development
$ npm run start
```

#  <a name="Использование">  Использование </a> 
### Шаг 1 - Загрузите списки
Убедитесь, что файлы названы правильно:
- Студенты, получающие государственную академическую стипендию - ГАС
- Студенты на каникулах - Каникулы
- Студенты со свободным графиком - Свободный график
- Культурно-творческая деятельность - КТД
- Научно-исследовательская деятельность - НИД
- Общественная деятельность - ОД
- Научно-исследовательская деятельность - НИД
- Спортивная деятельность - СД
- Учебная деятельность - УД

### Шаг 2 - Примените настройки
Доля получающих рейтинговую стипендию - 10% от количества получающих государственную академическую стипендию

### Шаг 3 - Проверьте сводку
В сводке собрана статистическая информация о списках, полученных после применения настроек

### Шаг 4 - Распределите студентов, прошедших на нексолько направлений
Система не разрешит выгрузить итоговые списки, пока остаются неопределенные студенты

### Шаг 5 - Выгрузите итоговый список
После распределения студентов, прошедших на несколько напрвлений, появится возможность выгрузить итоговый список на компьютер





   
