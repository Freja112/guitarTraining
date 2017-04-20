Template.fretboard.helpers({
    // 기본적인 테이블의 틀 생성
    contents: function() {
        var content = "";
        for(var i=0; i<7; i++) {
            content += "<tr style='text-align: center;'>";
            for(var j=0; j<21; j++) {
                if(i==0){
                    if(j!=0){
                        content += "<td style='width: 27.5px;'>" + j + "</td>";
                    } else {   // 테이블의 첫 행(row)
                        content += "<td style='width: 50px; height: 19px;'></td>";
                    }
                } else {
                    if(j!=0) {
                        content += "<td id='fret" + i + "-" + j + "' background='/fret_L.jpg' style='color: ghostwhite;'></td>";
                    } else {  // 테이블의 첫 열(column)
                        content += "<td id='string" + i + "' style='height: 19px;'>" + i + "번줄</td>";
                    }
                }
            }
            content += "</tr>";
        }
        return content;
    },
    radios: function() {
        var radios = "";
        for(var i=0; i<12; i++) {
            radios += "<label class='radio-inline'><input type='radio' name='inlineRadioOptions' id='radio" + i + "' value='" + arr[i] + "'>" + arr[i] + "</label>";
        }
        return radios;
    }
});

Template.fretboard.events(
    {
        "click #btnStart": function(evt, tmpl) {
            var user = Meteor.user();
            if(!user){
                return alert('로그인이 필요합니다');
            }

            $("#stopwatch").show("fast");
            $("#progressBar").show("fast");
            $("#notesRadio").show("fast");
            $("#btnStart").hide("fast");
            $("#btnCheck").show("fast");
            $("#btnStop").show("fast");

            count_question = 0;
            count_correct = 0;
            duringTime = 0;
            id_timer = setInterval(function() {
                duringTime++;
                change_watch(duringTime);
            }, 100);
            fretReset();
            correct = fretRandom();

            $('#btnCheck').trigger('click');
        },
        "click #btnStop": function(evt, tmpl) {
            $("#stopwatch").hide("fast");
            $("#progressBar").hide("fast");
            $("#notesRadio").hide("fast");
            $("#btnStart").show("fast");
            $("#btnCheck").hide("fast");
            $("#btnStop").hide("fast");
            $(":checked").prop('checked', false);
            fretSetting();
            $('#progressRate').css('width', '0%');
            $('#progressRate').text('0%');
            clearInterval(id_timer);
            //alert((duringTime/10) + '초 경과');
            if(count_question > 19) {
                insertDB();
            }
        },
        "click #btnCheck": function(evt, tmpl) {
            if(!$(':checked').val()){
                // radio 미선택시
                return;
            }
            // console.log($(':checked').val());
            // console.log(correct);
            if(correct == $(':checked').val()) {
                // 정답 맞췄을 경우
                count_correct++;
                // console.log("정답 : " + count_correct);
            }
            // 문제 출제 수 카운트
            count_question++;
            // console.log("'" + count_question * 5 + "%'");
            $('#progressRate').css('width', count_question * 5 + "%");
            $('#progressRate').text(count_question * 5 + "%");
            // console.log(" - 문제 " + count_question);
            if(count_question > 19) {
                // 문제 출제 종료
                $('#btnStop').trigger('click');
                return;
            }
            fretReset();
            correct = fretRandom();
        }
    }
);

Template.fretboard.rendered = function() {
    if(!this._rendered) {
        this._rendered = true;
        $('#menu_tr').addClass('active');
        $('#menu_st').removeClass('active');
        fretSetting();
        $('#fret3-3').attr('background', '/fret_down_L.jpg');
        $('#fret4-3').attr('background', '/fret_up_L.jpg');
        $('#fret3-5').attr('background', '/fret_down_L.jpg');
        $('#fret4-5').attr('background', '/fret_up_L.jpg');
        $('#fret3-7').attr('background', '/fret_down_L.jpg');
        $('#fret4-7').attr('background', '/fret_up_L.jpg');
        $('#fret3-9').attr('background', '/fret_down_L.jpg');
        $('#fret4-9').attr('background', '/fret_up_L.jpg');
        $('#fret2-12').attr('background', '/fret_down_L.jpg');
        $('#fret3-12').attr('background', '/fret_up_L.jpg');
        $('#fret4-12').attr('background', '/fret_down_L.jpg');
        $('#fret5-12').attr('background', '/fret_up_L.jpg');
        $('#fret3-15').attr('background', '/fret_down_L.jpg');
        $('#fret4-15').attr('background', '/fret_up_L.jpg');
        $('#progressRate').css('width', '0%');
        $('#progressRate').text('0%');
    }
};






var correct;        // 정답 문자열
var count_question;     // 현재 출제 수 카운트
var count_correct;      // 정답 수 카운트

var id_timer;       // 타이머 id
var duringTime;     // 걸린 시간


var arr = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
var index = [5, 0, 8, 3, 10, 5];

// 지판에 음계를 표시해주는 함수
function fretSetting() {
    for(var i=1; i<7; i++) {
        var temp = index[i-1];
        for(var j=1; j<21; j++) {
            $("#fret" + i + "-" + j).text(arr[(temp++)%12]);
        }
    }
}


// 지판의 음계를 모두 빈칸으로 해주는 함수
function fretReset() {
    for(var i=1; i<7; i++) {
        for(var j=1; j<21; j++) {
            $("#fret" + i + "-" + j).text('');
        }
    }
}

// 지판 음 랜덤 표시
function fretRandom() {
    var x = parseInt(7 - (Math.floor((Math.random() * 100)) % 6 + 1));
    var y = parseInt(Math.floor((Math.random() * 100)) % 20 + 1);
    // console.log(x);
    // console.log(y);
    // console.log((index[x-1]+y-1)%12);
    var note = arr[(index[x-1]+y-1)%12];    // 랜덤위치의 음 갖고오는 수식
    // console.log(note);

    $("#fret" + x + "-" + y).text('●');

    return note;
}


// 날짜 포맷
Date.prototype.format = function(f) {
    if (!this.valueOf()) return " ";

    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var d = this;

    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear();
            case "yy": return (d.getFullYear() % 1000).zf(2);
            case "MM": return (d.getMonth() + 1).zf(2);
            case "dd": return d.getDate().zf(2);
            case "E": return weekName[d.getDay()];
            case "HH": return d.getHours().zf(2);
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
            case "mm": return d.getMinutes().zf(2);
            case "ss": return d.getSeconds().zf(2);
            case "a/p": return d.getHours() < 12 ? "오전" : "오후";
            default: return $1;
        }
    });
};
String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};
//--


// stopwatch
function change_watch(time) {
    if(time >= 999){
        clearInterval(id_timer);
        return;
    }
    var min;
    var sec10;
    var sec1;
    var msec;
    var temp = time;

    msec = temp % 10;
    sec1 = parseInt((temp % 100 - msec) / 10);
    sec10 = parseInt((temp % 600 - sec1*10 - msec) / 100);
    min = parseInt(temp / 600);

    // console.log(min + "분");
    // console.log(sec10 + "초10");
    // console.log(sec1 + "초");
    // console.log(msec + ".초");

    $('#min').text(min);
    $('#sec10').text(sec10);
    $('#sec1').text(sec1);
    $('#msec').text(msec);
}


// DB insert
function insertDB() {
    var obj = {};
    obj.user = Meteor.user();
    obj.date = new Date().format("yyyy-MM-dd");
    obj.correct = count_correct;
    obj.correctRate = (count_correct / 20 * 100).toFixed(2);
    obj.duringTime = duringTime / 10;
    Training.insert(obj);

    Session.set('resultData', obj);
    $('#btnResult').click();
    // console.log(obj);
}