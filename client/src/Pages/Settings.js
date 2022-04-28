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
      <div class="mainSettings">
        <div class="row mt-5">
          <div class="col-5 ">
            <label for="percentageOfOverallRating" class="form-label">
              Научная деятельность
            </label>
            <input class="form-control" id="percentageOfOverallRating" />
          </div>
          <div class="col-5">
            <label for="percentageOfOverallRating" class="form-label">
              Учебная деятельность
            </label>
            <input class="form-control" id="percentageOfOverallRating" />
          </div>
        </div>
        <div class="row mt-5 ">
          <div class="col-5">
            <label for="percentageOfOverallRating" class="form-label">
              Спортивная деятельность
            </label>
            <input class="form-control" id="percentageOfOverallRating" />
          </div>
          <div class="col-5">
            <label for="percentageOfOverallRating" class="form-label">
              Культурно-творческая деятельность
            </label>
            <input class="form-control" id="percentageOfOverallRating" />
          </div>
        </div>
        <div class="row mt-5">
          <div class="col-5">
            <label for="percentageOfOverallRating" class="form-label">
              Спортивная деятельность
            </label>
            <input class="form-control" id="percentageOfOverallRating" />
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
  );
};

export default Settings;
