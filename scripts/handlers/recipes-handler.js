window.handler = window.handler || {};

handler.getAllRecipes = function(ctx){

    ctx.isAuth = userService.isAuth();
    ctx.username = userService.getUsername();
  
}
handler.getCreateRecipe = function(ctx){
    ctx.firstName = sessionStorage.getItem('firstName')+' '+ sessionStorage.getItem('lastName')

     loadPartials(ctx)
.then(function (){
   
        this.partial('/views/recipe/share.hbs')
    })
    }


handler.postCreateRecipe = function(ctx){

let catUrls = {
    "Vegetables and legumes/beans": 'https://cdn.pixabay.com/photo/2017/10/09/19/29/eat-2834549__340.jpg',
    'Grain Food':'https://cdn.pixabay.com/photo/2014/12/11/02/55/corn-syrup-563796__340.jpg',
    'Fruits':'https://cdn.pixabay.com/photo/2017/06/02/18/24/fruit-2367029__340.jpg',
    'Milk, cheese, eggs and alternatives':'https://image.shutterstock.com/image-photo/assorted-dairy-products-milk-yogurt-260nw-530162824.jpg',
    'Lean meats and poultry, fish and alternatives':'https://t3.ftcdn.net/jpg/01/18/84/52/240_F_118845283_n9uWnb81tg8cG7Rf9y3McWT1DT1ZKTDx.jpg'
}

   
    
let meal = ctx.params.meal;
let validateUrl = /^https?:\/\/.+/g
let ingredients = ctx.params.ingredients.split(', ');
let prepMethod = ctx.params.prepMethod;
let description = ctx.params.description;
let foodImage = ctx.params.foodImageURL;
let categoryImage = catUrls[ctx.params.category]
if (meal.length<4||ingredients.length<2||prepMethod.length<10||description.length<10||!foodImage.match(validateUrl))
{  notifications.showError('Invalid input')
ctx.target.reset() }
else{

recipesService.create({...ctx.params, likes: 0, categoryImageURL:categoryImage})
.then(res =>{
    notifications.showSuccess('Recipe shared successfully!')
  
})
}
}
handler.getDetails = function(ctx){
    loadPartials(ctx)
    ctx.firstName = sessionStorage.getItem('firstName')+' '+ sessionStorage.getItem('lastName')
     recipesService.getRecipe(ctx.params.id).then(function(res){
  let recipeCreator = res[0]._acl.creator
   let currentUser = sessionStorage.getItem('id');
 

ctx.meal = res[0].meal

ctx.ingredients = res[0].ingredients.split(', ')     
ctx.prepMethod = res[0].prepMethod
ctx.description = res[0].description
ctx.likes = res[0].likes

  ctx.recipeImg = res[0].foodImageURL 
      return ctx.loadPartials({
        header: '/views/common/header.hbs',
        footer: '/views/common/footer.hbs',
        myIngredients: ('/views/recipe/ingr.hbs')

       }).then(function(){
           if(currentUser===recipeCreator){
              ctx.currId = ctx.params.id

            this.partial('/views/recipe/myRecipeDetails.hbs')
               
           }
           else{
              ctx.currId = ctx.params.id
            this.partial('/views/recipe/recipeDetails.hbs')

           }
        
        })
        })
 
}
handler.postLikes = function(ctx){
    loadPartials(ctx)
  
    recipesService.getRecipe(ctx.params.currId).then(function(res){
     let recipeId = res[0]._id;
        ++res[0].likes
    
        recipesService.postLikes(recipeId, res[0])
        .then(res =>{
        
            notifications.showSuccess('You liked that recipe.')
          
        })
    })
}
handler.postArchive = function(ctx){

recipesService.postArchive(ctx.params.currId)
.then(res=>{
    notifications.showSuccess('Your recipe was archived.')

})


}
handler.postEdit = function(ctx){

    recipesService.getRecipe(ctx.params.currId).then(function(res){
        let recipeId = res[0]._id;
    ctx.firstName = sessionStorage.getItem('firstName')+' '+ sessionStorage.getItem('lastName')
    ctx.meal = res[0].meal;
    ctx.ingredients = res[0].ingredients
    ctx.prepMethod = res[0].prepMethod;
    ctx.description = res[0].description
    ctx.foodImageURL = res[0].foodImageURL
    ctx.category = res[0].category   
    ctx.params.likes = res[0].likes;
loadPartials(ctx)
     ctx.loadPartials({
        header: '/views/common/header.hbs',
        footer: '/views/common/footer.hbs',
  
     })
     .then(function (){
        
             this.partial('/views/recipe/edit.hbs')
         

         })
        handler.option = function(){
            $('#defaultRecepieEditMeal').val(ctx.meal)
            $('#defaultRecepieEditIngredients').val(ctx.ingredients)
            $('#defaultRecepieEditMethodOfPreparation').val(ctx.prepMethod)
            $('#defaultRecepieEditDescription').val(ctx.description)
            $('#defaultRecepieEditFoodImageURL').val(ctx.foodImageURL)

$('option').each(function(){
   

    
    if($(this)[0].text===ctx.category){
$(this).prop('selected', true)
    }
})

let catUrls = {
    "Vegetables and legumes/beans": 'https://cdn.pixabay.com/photo/2017/10/09/19/29/eat-2834549__340.jpg',
    'Grain Food':'https://cdn.pixabay.com/photo/2014/12/11/02/55/corn-syrup-563796__340.jpg',
    'Fruits':'https://cdn.pixabay.com/photo/2017/06/02/18/24/fruit-2367029__340.jpg',
    'Milk, cheese, eggs and alternatives':'https://image.shutterstock.com/image-photo/assorted-dairy-products-milk-yogurt-260nw-530162824.jpg',
    'Lean meats and poultry, fish and alternatives':'https://t3.ftcdn.net/jpg/01/18/84/52/240_F_118845283_n9uWnb81tg8cG7Rf9y3McWT1DT1ZKTDx.jpg'
}

$('button').click(function(e){
   

ctx.params.meal = $('#defaultRecepieEditMeal').val();
ctx.params.ingredients = $('#defaultRecepieEditIngredients').val()
ctx.params.prepMethod = $('#defaultRecepieEditMethodOfPreparation').val();
ctx.params.description = $('#defaultRecepieEditDescription').val()
ctx.params.foodImageURL =  $('#defaultRecepieEditFoodImageURL').val()
ctx.params.category =$('#opt :selected').text();

ctx.params.categoryImageURL = catUrls[ctx.params.category]
let meal = ctx.params.meal;
let validateUrl = /^https?:\/\/.+/g
let ingredients = ctx.params.ingredients.split(', ');
let prepMethod = ctx.params.prepMethod;
let description = ctx.params.description;
let foodImage = ctx.params.foodImageURL;
if (meal.length<4||ingredients.length<2||prepMethod.length<10||description.length<10||!foodImage.match(validateUrl))
{  notifications.showError('Invalid input')
handler.postEdit(ctx) }
else{
    delete ctx.params.currId;

recipesService.postEdit(recipeId, {...ctx.params})
.then(res =>{

    notifications.showSuccess('You edited that recipe.')
  
})
}
e.preventDefault()
})

}
        })

}
