const recipesService = (() => {

    function getAll(){
return kinvey.get('appdata','recipes', 'kinvey')
}

function create(data){
    return kinvey.post('appdata','recipes','kinvey',data)
}

function getRecipe(Id){

return kinvey.get('appdata',`recipes?query={"_id":"${Id}"}`, 'kinvey')
}
function postLikes(recipeId,data){
    return kinvey.update('appdata',`recipes/${recipeId}`,'kinvey',data)
}

function postArchive(recipeId){
    return kinvey.remove('appdata',`recipes/${recipeId}`,'kinvey')
}
function postEdit (recipeId,data){
    return kinvey.update('appdata',`recipes/${recipeId}`,'kinvey',data)
}

return{
getAll,
create,
getRecipe,
postArchive,
postLikes,
postEdit
};




})();