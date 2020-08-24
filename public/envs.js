
 $(document).ready(function () {
   console.log('Ready')
   // get message from user input
   $('#btnMessage').click(() => {
     let message = $('#messageBox').val()
     let data = {
        message
     }
     $.get('/message', data, function () {

     })
   })


   // retrieve of messages fro all input boxes
   setInterval(() => {
     $.get('/messages', function (messages) {
       $('#messages').empty()
       messages.forEach((message) => {
         $('#messages').append('<div class="row">' + message.message + '</div>')
       })
     
     })

   }, 5000)

})
