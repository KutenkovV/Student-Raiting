import React, { useEffect, useState } from "react";


function Ud() {
  document.title = "Учебная";

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // Примечание: пустой массив зависимостей [] означает, что
  // этот useEffect будет запущен один раз
  // аналогично componentDidMount()
  useEffect(() => {
    fetch("http://localhost:8080/api/listLoad/ud")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
        // чтобы не перехватывать исключения из ошибок в самих компонентах.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Загрузка...</div>;
  } else {
    return (
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Баллы</th>
            <th>Уровень</th>
            <th>ФИО</th>
            <th>ГРУППА</th>
            <th>ИНСТИТУТ</th>
            <th>ГАС</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.student.studnumber}</td>
              <td>{item.reating.points}</td>
              <td>{item.reating.reatingcourse.courselevel.level}</td>
              <td>{item.student.fullname}</td>
              <td>{item.student.educationgroup}</td>
              <td>{item.student.institute}</td>
              <td>{item.student.sad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Ud;
