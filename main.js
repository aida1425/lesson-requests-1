/*
POST-добавление данных
PUT-полная замена данных
PATCH-частичная замена данных
DELETE-удаление
GET-получение данных
 */

/*
команда для запуска данных json-server json-server -w db.json -p 8000
 */
/*
CRUD -Create(post) Read(get) Update(put/patch) Delete(delete)
 */
const API = "http://localhost:8000/todos";

let inpAdd = document.getElementById("inp-add");
let btnAdd = document.getElementById("btn-add");
// console.log(inpAdd, btnAdd);
btnAdd.addEventListener("click", function () {
  let newToDo = {
    todo: inpAdd.value,
  };
  // console.log(newToDo);
  fetch(API, {
    method: "POST",
    body: JSON.stringify(newToDo),
    headers: {
      "Content-type": "application/json; charset=utf-8",
    },
  });
});
