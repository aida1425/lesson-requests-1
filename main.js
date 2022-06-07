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
// ! CREATE
let inpAdd = document.getElementById("inp-add");
let btnAdd = document.getElementById("btn-add");
// console.log(inpAdd, btnAdd);
btnAdd.addEventListener("click", async function () {
  let newToDo = {
    todo: inpAdd.value,
  };
  // console.log(newToDo);
  if (newToDo.todo.trim() === "") {
    alert("заполните полe");
    return;
  }
  await fetch(API, {
    method: "POST",
    body: JSON.stringify(newToDo),
    headers: {
      "Content-type": "application/json; charset=utf-8",
    },
  });
  inpAdd.value = "";
  getTodos();
});
// ! READ
let list = document.getElementById("list");
console.log(list);
async function getTodos() {
  let response = await fetch(API)
    .then(res => res.json())
    .catch(err => console.log(err));
  console.log(response);
  list.innerHTML = "";
  response.forEach(item => {
    let newElem = document.createElement("div");
    newElem.innerHTML = `<span>${item.todo}</span>`;
    list.append(newElem);
  });
}
getTodos();
