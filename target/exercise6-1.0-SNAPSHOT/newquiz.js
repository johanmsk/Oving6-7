$(document).ready(function(){
    
    $("#submitQuiz").click(function () {
        var stringArray1 = new Array();
        stringArray1[0] = $("#question1.aInput1").val();
        stringArray1[1] = $("#question1.aInput2").val();
        stringArray1[2] = $("#question1.aInput3").val();
        stringArray1[2] = $("#question1.aInput4").val();
        var svar1 = { values: stringArray1 };

        var stringArray2 = new Array();
        stringArray2[0] = $("#question2.aInput1").val();
        stringArray2[1] = $("#question2.aInput2").val();
        stringArray2[2] = $("#question2.aInput3").val();
        stringArray2[2] = $("#question2.aInput4").val();
        var svar2 = { values: stringArray2 };


        $.ajax({
            url: 'rest/quiz',
            type: 'POST',
            data: JSON.stringify({
                navn: $("#quizname").val(),
                // start: ""+$("#startdate").val()+" "+$("#starttime").val()+".000",
                spms: [
                    {
                        // spm: $("#qInput1"),
                        spm: "hva er d",
                        // riktig: $("input[name='answer1']:checked").val(),
                        riktig:4,
                        svar: [
                            // $("#question1.aInput1").val(),
                            // $("#question1.aInput2").val(),
                            // $("#question1.aInput3").val(),
                            // $("#question1.aInput4").val()
                            "a","b","c","d"
                        ] },
                    {
                        // spm: $("#qInput2"),
                        spm: "Hva er 4",
                        // riktig: $("input[name='answer2']:checked").val(),
                        riktig: 4,
                        svar:[
                            // $("#question2.aInput1").val(),
                            // $("#question2.aInput2").val(),
                            // $("#question2.aInput3").val(),
                            // $("#question2.aInput4").val()
                            "1","2","3","4"
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