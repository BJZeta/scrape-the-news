$.getJSON('/articles', function (data) {
  for (var i = 0; i < data.length; i++) {
    var singleArt = $("<div class='col-md-5 pt-2'></div>");
    var publisher = $("<h2>" + data[i].publisher + "</h2>");
    var image = data[i].img
    var link = $("<a href=" + data[i].link + "></a>");
    link.append(image)
    var headline = $('<p>' + data[i].title + '</p>');
    var commentBtn = $("<button id='commentBtn' data-id=" + data[i]._id + "  type='button' class='btn btn-dark commentBtn' >Comment</button>")
    singleArt.append(publisher);
    singleArt.append(publisher);
    singleArt.append(link);
    singleArt.append(headline);
    singleArt.append(commentBtn);
    $('#articles').append(singleArt);
  }
})

{/* <div id="myModal" class="modal">

<!-- Modal content -->
<div class="modal-content">
  <span class="close">&times;</span>
  <p>Some text in the Modal..</p>
</div>

</div> */}
$(document).on('click', '#commentBtn', function () {

  var buttonID = $(this).attr('data-id');

  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;

  $('#commentSection').empty();

  console.log(buttonID);

  $.ajax({
    method: 'GET',
    url: '/articles/' + buttonID
  }).then(function (data)  {
    $("#commentSection").append("<h2>" + data.title + "</h2>");
    $("#commentSection").append("<h3>Username:</h3>");
    $("#commentSection").append("<input id='username' name='username' >");
    $("#commentSection").append("<h3>Comment:</h3>");
    $("#commentSection").append("<textarea id='body' name='body'></textarea>");
    $("#commentSection").append("<button data-id='" + data._id + "' id='saveComment'>Save Comment</button>");

    if (data.comment) {
      $('#username').val(data.comment.username);
      $('#body').val(data.comment.body);
    }
  });
})


$(document).on('click','#saveComment' ,function (e) {

  e.preventDefault();

  const articleId = $(this).attr('data-id');

  var userName = $("#username").val()
  var bodY = $("#body").val();

  console.log(articleId);
  console.log(userName)
  console.log(bodY);
  $.ajax({
    method: 'POST',
    url: '/articles/' + articleId,
    data: {
      username: $("#username").val(),
      body: $("#body").val()
    }
  }).then((data) => {

    $('#commentSection').empty()

  });

  $('#username').val('');
  $('#body').val('');

});
