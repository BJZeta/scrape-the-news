$.getJSON('/articles', function(data){
    for (var i = 0; i< data.length; i++) {
        var singleArt = $("<div class='col-md-4 pt-2'></div>");
        var publisher = $("<h2>" + data[i].publisher + "</h2>");
        var image = data[i].img
        var headline = $('<p>' + data[i].title + '</p>');
        singleArt.append(publisher);
        singleArt.append(publisher);
        singleArt.append(image);
        singleArt.append(headline);
        $('#articles').append(singleArt);
    }
})