window.handler = window.handler || {};

handler.getHome = function (ctx){

ctx.firstName = sessionStorage.getItem('firstName')+' '+ sessionStorage.getItem('lastName')
if(ctx.firstName!=='null null'){
   

recipesService.getAll()
.then(res1=>{


    if(res1){

        ctx.recipes = res1;
       
        loadPartials(ctx)

        ctx.recipes.forEach(x=>x.ingredients = x.ingredients.split(', '))
 
     
        return   ctx.loadPartials({
              header: '/views/common/header.hbs',
              footer: '/views/common/footer.hbs',
              myRecipe: '/views/recipe/myRecipe.hbs',
              myIngredients: '/views/recipe/ingr.hbs'
          }).then(function(){
            this.partial('/views/recipe/recipes.hbs')
    
        })
     
        
    }
    else{

     
loadPartials(ctx)
        return ctx.loadPartials({
            header: '/views/common/header.hbs',
            footer: '/views/common/footer.hbs',
     
        })
        .then(function(){
            this.partial('/views/home/index.hbs')
    
        })
    }
   
})
}
else{
    loadPartials(ctx) 
    .then(function(){
        this.partial('/views/home/index.hbs')

    })
}
 

}
