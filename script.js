//Fetch dom elements and set variables

const userId = document.getElementById("userId");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const age = document.getElementById("age");
const addBtn = document.getElementById("addBtn");
const updateBtn = document.getElementById("updateBtn");
const removeBtn = document.getElementById("removeBtn");

//Instance of database

const database = firebase.database();

//Save data

const usersRef = database.ref("/users");

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const autoId = usersRef.push().key;
  usersRef.child(autoId).set({
    first_name: firstName.value,
    last_name: lastName.value,
    age: age.value,
  });
});

//Update data

updateBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const newData = {
    first_name: firstName.value,
    last_name: lastName.value,
    age: age.value,
  };

  const autoId = usersRef.push().key;
  const updates = {};
  updates["/users/" + autoId] = newData;
  updates["/super-users/" + autoId] = newData;
  //   usersRef.child(userId.value).update(newData);

  database.ref().update(updates);
});

