window.handler = window.handler || {};



handler.getLogin = function (ctx){

 loadPartials(ctx)  
.then(function(){
    this.partial('/views/user/login.hbs');
})
}

handler.postLogin = function (ctx){
    if (ctx.params.username.length<3){
        notifications.showError('Username must be at least 3 symbols')
      ctx.target.reset()       
    }
    else if(ctx.params.password.length<6){
        notifications.showError('Password must be at least 6 symbols')
        ctx.target.reset() 
    }
  else{
 
    let {username, password} = ctx.params
userService.login(username, password)
.then(res =>{
   
    userService.saveSession(res)
 
   notifications.showSuccess('Logged successfully!')
  
})

.catch( notifications.showResponseError)

}
}

handler.logout = function(ctx){
    userService.logout().then(()=>{
   
        
        return ctx.loadPartials({
            header: '/views/common/header.hbs'
           
     
        })
        .then(function(){
            this.partial('/views/common/logout.hbs')
          
                       
                    
    
        })
})
sessionStorage.clear()

    }
   


handler.getRegister = function (ctx){
 
    loadPartials(ctx)
    
    .then(function(){
        this.partial('/views/user/register.hbs');
    })
}

handler.postRegister = function (ctx){
  
    if (ctx.params.firstName.length<2||ctx.params.lastName.length<2){
        notifications.showError('Firstname and lastname must be at least 2 symbols')
      ctx.target.reset()       
    }
    else if(ctx.params.password.length<6){
        notifications.showError('Password must be at least 6 symbols')
        ctx.target.reset() 
    }
    else if (ctx.params.username.length<3){
        notifications.showError('Username must be at least 3 symbols')
        ctx.target.reset() 
    }
  else if (ctx.params.password!==ctx.params.repeatPassword){
    notifications.showError('Password and repeatPassword must be equal.')
    ctx.target.reset() 
  }
  else{
    let {firstName, lastName, username, password} = ctx.params
userService.register(firstName, lastName, username, password)
.then(res =>{
    userService.saveSession(res)

notifications.showSuccess('Registered successfully!')

  
}).catch( notifications.showResponseError)
  }
}