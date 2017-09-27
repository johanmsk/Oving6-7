$(document).ready(function() {
    $('#scoreboard').DataTable({
        ajax: {
            url: 'rest/quiz/scores',
            dataSrc: ''
        },
        columns: [
            {data: 'nick'},
            {data: 'quizName'},
            {data: 'score'}
        ]
    });
});