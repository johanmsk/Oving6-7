$(document).ready(function() {

    function getQuizID () {
        return $.ajax({
            url: "rest/quiz/getCurrentQuiz",
            type: "GET",
            async: false
        }).responseText
    }

    var quizId = getQuizID();
    var questionId = getCurrentQuestion();

    function getCurrentQuestion(){
        return $.ajax({
            type: "GET",
            url: "rest/quiz/CurrentQuestion",
            async: false
        }).responseText
    }
    function getNumberofQuestions(){
        return $.ajax({
            type: "GET",
            url: "rest/quiz/"+quizId+"/getNumberQ",
            async: false
        }).responseText
    }

    var questions=getNumberofQuestions();
    console.log("#Q: "+questions);

    function getQuestionText(){
        return $.ajax({
            type: 'GET',
            url: 'rest/quiz/CurrentQuestion/'+quizId+'/'+questionId,
            async: false
        }).responseText
    }

    $("#question").html(getQuestionText());

    function getAnswerText(ans) {
        return $.ajax({
            type: 'GET',
            url: 'rest/quiz/' + quizId + '/' + questionId+'/'+ans,
            async: false
        }).responseText
    }

    var answer;
    for(i=0; i<4; i++){
        answer=getAnswerText(i);
        $("#alt"+i).html(answer);
    }

    function getCorrect() {
       return $.ajax({
            type: 'GET',
            url: 'rest/quiz/' + quizId + '/' + questionId,
            async: false
        }).responseText
    }

    function getNick() {
        return $.ajax({
            type: 'GET',
            url: 'rest/quiz/getNick/' + quizId,
            async: false
        }).responseText
    }
    var nick= getNick();

    function addScore(pnts){
        $.ajax({
            type:"POST",
            url: "rest/quiz/"+quizId+"/"+nick+"/"+pnts,
            async: false
        });
    }

    function nextQ(){
        $.ajax({
            type: 'POST',
            url: 'rest/quiz/nextQ',
            async: false
        });
    }

    function getTimeLeft(){
        return $.ajax({
            type:"GET",
            url: "rest/quiz/"+ quizId+"/"+questionId+"/getTimeLeft",
            async: false
        }).responseText;
    }

    var timeleft = getTimeLeft();
    document.getElementById("progressBar").max = timeleft;
    document.getElementById("progressBar").value =timeleft;
    var downloadTimer = setInterval(function () {
        document.getElementById("progressBar").value = --timeleft;
        if (timeleft <= 0) {
            clearInterval(downloadTimer);
            submit();
        }
    }, 1000);


    function submit () {
        var chosen = $("input[name='question']:checked").val();
        console.log(chosen);
        var corr = getCorrect();
        console.log(corr);
        if(chosen===corr){
            console.log('riktig');
            addScore(10);
        }else{
            console.log('feil');
        }
        if(questions>questionId){
            nextQ();
            window.location.reload();
        }else{
            saveScore();
            setTimeout(function () {
                window.location.href = "scoreboard.html";
            },500);
        }
    }

    $("#submit").click(submit);


    function getQuizName() {
        return $.ajax({
            type:"GET",
            url: "rest/quiz/"+ quizId+"/getName",
            async: false
        }).responseText
    }

    function saveScore(){
        $.ajax({
            url: 'rest/quiz/nyScore',
            type: 'POST',
            data: JSON.stringify({
                nick: nick,
                score: scoren,
                quizName: getQuizName()
            }),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        });
        $.ajax({
            url: 'rest/quiz/reset',
            type: 'GET'
        });

    }

    function getScore() {
        return $.ajax({
            type: 'GET',
            url: 'rest/quiz/' + quizId+'/'+nick+'/getScore',
            async: false
        }).responseText
    }

    var scoren=getScore();

    $("#score").html(scoren);

});