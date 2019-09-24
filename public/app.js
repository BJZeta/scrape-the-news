$.getJSON('/articles', function (data) {
    for (var i = 0; i < data.length; i++) {
        var singleArt = $("<div data-divId=" + data[i]._id + " class='col-md-4 pt-2'></div>");
        var publisher = $("<h2>" + data[i].publisher + "</h2>");
        var image = data[i].img
        var headline = $('<p>' + data[i].title + '</p>');
        var commentBtn = $("<button type='button' id='commentBtn' data-id=" + data[i]._id + " class='btn btn-dark' >Comment</button>")
        singleArt.append(publisher);
        singleArt.append(publisher);
        singleArt.append(image);
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

