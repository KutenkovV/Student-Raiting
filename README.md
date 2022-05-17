# МНЕ ЛЕНЬ ДУМАТЬ СЮДА ОПИСАНИЕ

# You're pretty good

## Немножко о запуске проекта
Что бы запустить сервер надо открыть терминал в папке server, и написать команду: npm run dev
После этого вылезет "Server started on port 8080" ,значит все хорошо и сервер работает.
Так же при поступление запросов на сервер в консоли можно увидеть какие именно запросы.

Для того что бы парсер работал надо открыть его в Visual Studio ,отредактировать 4 раза строку в классе Program
 var cs = "Host=localhost;Port=5432;Database=rating;Username=postgres;Password=root"; для своего подключения к БД 
 и запустить ,появиться консольное окно и потом работа парсера при загрузке должна работать норм.

# Название полей для настройки
(Надо убрать когда сделаем)

<div class="mainSettings">
        <div class="row mt-5">
          <div class="col-5 ">
            <label for="percentageOfOverallRating" class="form-label">
              Научная деятельность
            </label>
            <input name="nidInput" class="form-control" id="percentageOfOverallRating" />
          </div>
          <div class="col-5">
            <label for="percentageOfOverallRating" class="form-label">
              Учебная деятельность
            </label>
            <input name="udInput"class="form-control" id="percentageOfOverallRating" />
          </div>
        </div>
        <div class="row mt-5 ">
          <div class="col-5">
            <label for="percentageOfOverallRating" class="form-label">
              Спортивная деятельность
            </label>
            <input name="sdInput" class="form-control" id="percentageOfOverallRating" />
          </div>
          <div class="col-5">
            <label for="percentageOfOverallRating" class="form-label">
              Культурно-творческая деятельность
            </label>
            <input name="ktdInput" class="form-control" id="percentageOfOverallRating" />
          </div>
        </div>
        <div class="row mt-5">
          <div class="col-5">
            <label for="percentageOfOverallRating" class="form-label">
              Общественная деятельность
            </label>
            <input name="odInput" class="form-control" id="percentageOfOverallRating" />
          </div>
        </div>
        <div class="row mt-5">
          <div className="col-8"></div>
          <div className="col-4">
            <a
              name=""
              id=""
              class="btn btn-primary"
              role="button"
            >
              Сохранить
            </a>
          </div>
        </div>
    </div>
</div>

