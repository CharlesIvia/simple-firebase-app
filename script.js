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

//Delete data

removeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  usersRef
    .child(userId.value)
    .remove()
    .then(() => alert("User Deleted"))
    .catch((error) => {
      console.error(error);
    });
});

//Read Data in firebase realtime database

//Events - child_added

usersRef.on("child_added", (snapshot) => {
  console.log("Child added!");
});

//child_changed

usersRef.on("child_changed", (snapshot) => {
  console.log("Child updated");
});

//child_removed

usersRef.on("child_removed", (snapshot) => {
  console.log("Child removed");
});

//value

usersRef.on("value", (snapshot) => {
  console.log("An event occured!");
});

//Snapshop

// usersRef.on("child_added", (snapshot) => {
//   console.log(snapshot.val());
// });

//Databse queries

//orderByKey

usersRef
  .orderByKey()
  .limitToLast(2)
  .on("value", (snapshot) => {
    console.log(snapshot.val());
  });

//orderByChild

usersRef
  .orderByChild("age")
  .limitToFirst(2)
  .on("value", (snapshot) => {
    console.log(snapshot.val());
  });
