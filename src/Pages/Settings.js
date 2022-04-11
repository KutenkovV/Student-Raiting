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
            Процент количества получающих от общего конкурса
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
          <div class="col-5 ms-5 ms-auto">
            <label for="percentageOfOverallRating" class="form-label">
              Учебная деятельность
            </label>
            <input class="form-control" id="percentageOfOverallRating" />
          </div>
        </div>
        <div class="row mt-5 ">
          <div class="col-5 ">
            <label for="percentageOfOverallRating" class="form-label">
              Спортивная деятельность
            </label>
            <input class="form-control" id="percentageOfOverallRating" />
          </div>
          <div class="col-5 ms-auto ">
            <label for="percentageOfOverallRating" class="form-label">
              Культурно-творческая деятельность
            </label>
            <input class="form-control" id="percentageOfOverallRating" />
          </div>
        </div>
        <div class="row mt-5 ">
          <div class="col-5 ">
            <label for="percentageOfOverallRating" class="form-label">
              Спортивная деятельность
            </label>
            <input class="form-control" id="percentageOfOverallRating" />
          </div>
        </div>
        <div class="row">
          <a
            name=""
            id=""
            class="btn btn-primary mt-5 col-1 ms-auto"
            role="button"
          >
            Сохранить
          </a>
        </div>
      </div>
    </div>
  );
};

export default Settings;
