$(document).ready(function(){
    // Bind opp tabellen mot rest-ressursen '/kunder'
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



    //Button from quiztable to play
    $("#goToQuiz").click(function (){
        $('.nav-tabs a[href="#play"]').tab('show');
    });





    //old functions

    // Slett rest-ressursen '/kunder/kundeId'
    $("#delete").click(function () {
        $.ajax({
            url: 'rest/kunder/' + $("#deleteId").val(),
            type: 'DELETE',
            success: function(result) {
                $('#quizt').DataTable().ajax.reload();
            }
        });
    });

    // Lag ny rest-ressursen under '/kunder/'
    $("#create").click(function () {
        $.ajax({
            url: 'rest/kunder',
            type: 'POST',
            data: JSON.stringify({
                id: $("#newId").val(),
                navn: $("#newName").val(),
            }),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function(result) {
                $('#quizT').DataTable().ajax.reload();
            }
        });
    });
    $("#update").click(function(){
        $.ajax({
            url: 'rest/kunder/' + $("#newId").val(),
            type: 'PUT',
            data: JSON.stringify({
                id: $("#newId").val(),
                navn: $("#newName").val(),
            }),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function(result){
                $('#quizT').DataTable().ajax.reload();
            }
        });
    });
});