import React from "react";
import "./Settings.css";

const Settings = () => {
  document.title = "Настройка рейтинга";

  return (
    <div>
      <h1 className="header">Настройка рейтинга</h1>
      <div class="row mb-3 mt-4">
        <div class="col-5">
          <label for="percentageOfOverallRating" class="form-label">
            Количество получающих от общего конкурса
          </label>
          <input
            type="email"
            class="form-control"
            id="percentageOfOverallRating"
          />
        </div>
      </div>
      <div class="mainSettings row ">
        <div class = "col">
          <div class="col m-4">
              <label for="percentageOfOverallRating" class="form-label">
                Научная деятельность
              </label>
              <input class="form-control" id="percentageOfOverallRating" />
            </div>
            <div class="col m-4">
              <label for="percentageOfOverallRating" class="form-label">
                Учебная деятельность
              </label>
              <input class="form-control" id="percentageOfOverallRating" />
            </div>
            <div class="col m-4">
              <label for="percentageOfOverallRating" class="form-label">
                Общественная деятельность
              </label>
              <input class="form-control" id="percentageOfOverallRating" />
            </div>
        </div>
        <div class = "col">
          <div class="col m-4">
              <label for="percentageOfOverallRating" class="form-label">
                Спортивная деятельность
              </label>
              <input class="form-control" id="percentageOfOverallRating" />
            </div>
            <div class="col m-4">
              <label for="percentageOfOverallRating" class="form-label">
                Культурно-творческая деятельность
              </label>
              <input class="form-control" id="percentageOfOverallRating" />
            </div>
        </div>
        </div>
        <div className="row d-flex justify-content-end">
            <a
              name=""
              id=""
              class="btn btn-primary col-auto mt-4"
              role="button"
            >
              Сохранить
            </a>
          </div>
      </div>
  );
};

export default Settings;
