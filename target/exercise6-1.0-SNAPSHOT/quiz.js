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

});