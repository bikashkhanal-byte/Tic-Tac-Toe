fetch("https://dummyjson.com/users")
.then(response => response.json())
.then(data =>{
  const users = data.users;
  const result = [];

  for(let i = 0 ; i < users.length; i++){
    const user = users[i];
  result.push({
    id:user.id,
    email:user.email
  })
    console.log(result)
  }
})
  .catch(error => {
    console.error('Error:', error);
  });
  