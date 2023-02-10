//                    Dark Mode Function
toggle = document.getElementById("switch");
navbar =document.getElementById("nav")
toggle.addEventListener("click", function () {
  body = document.body;
  body.classList.toggle("bodydark");
  navbar.classList.toggle('navbar-dark')
  navbar.classList.toggle('bg-dark')
  toogleText = document.getElementById("toogleText");
  if (body.classList == "bodydark") {
    toogleText.innerHTML = "Disable Dark mode";
  } else {
    toogleText.innerHTML = "Enable Dark mode";
  }
});

var title = document.getElementById("title");
var desc = document.getElementById("desc");
var to_do_Box = document.getElementById("to_do_Box");
var dalert = document.getElementById("alert")
date = new Date();
date1 = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();

var todo_Key = firebase.database().ref("Todos").push().getKey();
// console.log(todo_Key);
var submit = document.getElementById("submit");
submit.addEventListener("click", async (e) => {
  e.preventDefault()
  console.log(title.value);
  if (title.value == "" || desc.value == "") {
    // alert("Please enter");
    dalert.classList.remove('hide')
    setTimeout(() => {
    dalert.classList.add('hide')
      
    }, 2000);
  } else {
  console.log(todo_Key);
  var todo_Obj = {
    title: title.value,
    desc: desc.value,
    date: date1,
    title_UID: todo_Key,
  };
  await firebase.database().ref("Todos").child(todo_Key).set(todo_Obj);
  success = document.getElementById("success")
  success.classList.remove('hide')
  setTimeout(() => {
    success.classList.add('hide')
    window.location.reload();
  }, 2000);
  }
  console.log(to_do_Box);

});

firebase
  .database()
  .ref("Todos")
  .once("value", (snap) => {
    var data = Object.values(snap.toJSON());
    console.log(data);
    count = 0;
    data.map((todo) => {
      // console.log(to_do_Box)
      console.log(todo);
      ++count;
      console.log(count);
      to_do_Box.innerHTML += `
              <div id="show">
                <h2 class='m-2'>Task ${count}</h2>
                <ul>
                    <li>Task Title <h3>${todo.title}</h3>
                    </li>
                    <li>Task Description <h2>${todo.desc}</h2>
                    </li>
                </ul>
                <button class="btn btn-danger my-2" id=${todo.title_UID} onclick='delete_func(this)'>Delete</button>
             </div>
    `;
    });
  });

const delete_func = (e) => {
  console.log("delete_func");
  console.log(e.id);
  firebase.database().ref("Todos").child(e.id).remove();
  window.location.reload();
};
