$(() => {
    const app = Sammy('#rooter', function () {
this.use('Handlebars', 'hbs');

this.get('#/home', handler.getHome);

this.get('#/login', handler.getLogin);
this.post('#/login', handler.postLogin);
this.get('#/register', handler.getRegister);
this.post('#/register', handler.postRegister);
this.get('#/logout', handler.logout);
this.get('#/likes/:currId', handler.postLikes);
this.get('#/edit/:currId', handler.postEdit);
this.get('#/archive/:currId', handler.postArchive);
this.get('#/details/:id', handler.getDetails);
this.get('#/recipe', handler.getCreateRecipe);
this.post('#/recipe', handler.postCreateRecipe);
    });

    app.run('#/home');
})