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

// получаем нужные для добавления элементы
let inpAdd = document.getElementById("inp-add");
let btnAdd = document.getElementById("btn-add");
// console.log(inpAdd, btnAdd);
// навесили событие на кнопку "Save"
btnAdd.addEventListener("click", async function () {
  // собираем обьект для добавления в дб.жсон
  let newToDo = {
    todo: inpAdd.value,
  };
  // console.log(newToDo);
  // проверка на заполненность инпута и останавливаем код  с помощью return, чтоб пост(POST) запрос не выполнился
  if (newToDo.todo.trim() === "") {
    alert("заполните полe");
    return;
  }
  // запрос для добавления
  await fetch(API, {
    method: "POST", // указываем метод
    body: JSON.stringify(newToDo), // указываем что именно нужно запостить
    headers: {
      "Content-type": "application/json; charset=utf-8",
    }, // кодировка
  });
  // очищаем инпут после добавления
  inpAdd.value = "";
  // чтобы добавленный таск сразу отобразился в листе вызываем функцию, которая выполняет отображение
  getTodos();
});
// ! READ
// получаем элемент, чтоб в нем отобразить все таски
let list = document.getElementById("list");
// проверяем в консоли, чтоб убедиться что в переменной list сейчас НЕ пусто
// console.log(list);
// функция для получения всех тасков и отображения их  в div#list
// async await нужен здесь для того чтобы при отправке запроса мы сначала получили данные и только потом записали все в переменную response, иначе (если мы не дождемся) туда запишется pending (состояние промиса который еще не выполнен)
async function getTodos() {
  let response = await fetch(API) // если не указать метод запросаю  то по умолчанию это GET запрос
    .then(res => res.json()) // переводим все в json формат
    .catch(err => console.log(err)); // отловим ошибку
  // console.log(response);
  // очищаем div#list чтоб список тасков корректно отображался и не хранил там предыдущие html-элементы со старыми данными
  list.innerHTML = "";
  // перебираем полученный из дб.жсон массив и для каждого обьекта из этого массива создаем div и задаем ему содержимое через метод innerHTML, каждый созданный элемент аппендим(добавялем) в div#list
  response.forEach(item => {
    let newElem = document.createElement("div");
    newElem.id = item.id;
    newElem.innerHTML = `
    <span>${item.todo}</span>
    <button class = "btn-delete">Delete</button>`;
    list.append(newElem);
  });
}
//вызываем функцию чтоб как только откроется страница что-то было отображено
getTodos();
document.addEventListener("click", async function (e) {
  if (e.target.className === "btn-delete") {
    let id = e.target.parentNode.id;
    await fetch(`${API}/${id}`, {
      method: "Delete",
    });
    getTodos();
  }
  // console.log(e.target.parentNode.id);
});
