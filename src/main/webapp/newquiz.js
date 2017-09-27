$(document).ready(function(){
    
    $("#submitQuiz").click(function () {
        $.ajax({
            url: 'rest/quiz',
            type: 'POST',
            data: JSON.stringify({
                navn: $("#quizname").val(),
                // start: ""+$("#startdate").val()+" "+$("#starttime").val()+".000",
                spms: [
                    {
                        spm: $("#qInput1").val(),
                        riktig: $("input[name='answer1']:checked").val(),
                        time: $("#time1").val(),
                        svar: [
                            {svar: $("#ans11").val()},
                            {svar: $("#ans12").val()},
                            {svar: $("#ans13").val()},
                            {svar: $("#ans14").val()}
                        ] },
                    {
                        spm: $("#qInput2").val(),
                        riktig: $("input[name='answer2']:checked").val(),
                        time: $("#time2").val(),
                        svar:[
                            {svar: $("#ans21").val()},
                            {svar: $("#ans22").val()},
                            {svar: $("#ans23").val()},
                            {svar: $("#ans24").val()}
                        ]}
                    ]}),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            traditional: true,
            success: function (result) {
                $("#success").html("Quizzen ble lagt til!")
            }
        }); 
        
    });
    
    // $('#addQ').click(function () {
    //     var num = $('.clonedInput').length;    // how many 'duplicatable' input fields we currently have
    //     if(num<9) {
    //         var newNum = new Number(num + 1);  // the numeric ID of the new input field being added
    //         // create the new element via clone(), and manipulate it's ID using newNum value
    //         var newElem = $('#question' + num).clone().attr('id', 'question' + newNum).attr('class', 'clonedInput').find('input:text').val('').end();
    //
    //         // manipulate the name/id values of the input inside the new element
    //         newElem.children('.radios').attr('name', 'answer' + newNum);
    //         newElem.children('#qInput' + num).attr('id', 'qInput' + newNum).attr('name', 'question' + newNum);
    //         for (i = 0; i < 5; i++) {
    //             newElem.children('.aInput' + i).attr('placeholder', 'Answer ' + i);
    //             newElem.children('.radios').prop('checked', false);
    //         }
    //
    //         // insert the new element after the last 'duplicatable' input field
    //         $('#question' + num).after(newElem);
    //     }
    // });
});