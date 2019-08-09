const notifications = (() => {

  $(document).on(
    {
    ajaxStart: () => $('#loadingBox').fadeIn() ,
    ajaxStop: () => $('#loadingBox').fadeOut()
  })



   function showSuccess(message) {
    let successBox = $('#successBox');

    successBox.text(message);
    successBox.fadeIn();
    if (message ==='Logged successfully!'||message==='Registered successfully!'){
    successBox.on('click', function(){
      $(this).fadeOut();
      window.location.href = '#/home'
    })
  }
 

 window.setTimeout(() => {

  successBox.fadeOut();
  window.location.href = '#/home'
  

 }, 5000) 


  }

  function showError(message) {
 
    let errorBox = $('#errorBox');
  
    errorBox.text(message);
    errorBox.fadeIn();
    $('#errorBox').on('click', function(){
      $(this).fadeOut()
    })
  }

function showResponseError(err){

showError(err.responseJSON.description)
}
  return {
    showSuccess,
    showError,
    showResponseError
    
  }
})();