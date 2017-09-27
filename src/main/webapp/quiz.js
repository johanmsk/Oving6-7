$(document).ready(function(){

    $('#quizT').DataTable( {
        ajax: {
            url: 'rest/quiz',
            dataSrc: ''
        },
        columns: [
            { data: 'id' },
            { data: 'navn' },
            { data: 'start'}
        ]
    });

    $("#goToQuiz").click(function () {
        var data=$("#quizid").val();
        var nick=$("#nick").val();
        $.ajax({
            url: 'rest/quiz/setQuiz/'+data,
            type: "POST",
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        });
        $.ajax({
            url: 'rest/quiz/CurrentQuestion/'+0,
            type: 'POST',
            data: JSON.stringify(0),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        })
        $.ajax({
            url: 'rest/quiz/'+data+'/'+nick,
            type: 'POST',
            data: JSON.stringify({
                nick: nick,
                score: 0
            }),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        })
    });

});