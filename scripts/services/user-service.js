const userService = (() => {
  function isAuth() {
    return sessionStorage.getItem('authtoken') !== null;
  }

function getUsername() {

  return sessionStorage.getItem('username') || '';

}

  function saveSession(res) {
    sessionStorage.setItem('username', res.username);
    sessionStorage.setItem('authtoken', res._kmd.authtoken);
    sessionStorage.setItem('id', res._id)
    sessionStorage.setItem('firstName', res.firstName)
    sessionStorage.setItem('lastName', res.lastName)


  }

  function register(firstName, lastName, username, password) {
    return kinvey.post('user', '', 'basic', {
      firstName,
      lastName,
      username,
      password
    })
  }


  function login(username, password) {
    return kinvey.post('user', 'login', 'basic', {
      username,
      password
    });
  }

  function logout() {
    return kinvey.post('user', '_logout', 'kinvey');
  }

  return {
    register,
    login,
    logout,
    saveSession,
    isAuth,
    getUsername,
    
  }
})()