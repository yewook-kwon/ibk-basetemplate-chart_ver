//시간
$(document).ready(function () {
  function updateClock() {
    var now = new Date();

    // 날짜 정보 가져오기
    var year = now.getFullYear();
    var month = now.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줌
    var day = now.getDate();
    var weekDay = now.getDay(); // 요일 정보 가져오기

    // 요일 배열 생성
    var weekDays = ["일", "월", "화", "수", "목", "금", "토"];

    // 시간 정보 가져오기
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    var period = "AM";

    // 12시간 형식으로 변환
    if (hours >= 12) {
      period = "PM";
      if (hours > 12) hours -= 12;
    }
    if (hours == 0) {
      hours = 12;
    }

    // 한 자리 숫자일 경우 앞에 0을 추가
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    //if (seconds < 10) seconds = '0' + seconds;

    // 날짜와 시간 형식 지정
    var formattedDate = year + ". " + month + ". " + day + "" +  "(" + weekDays[weekDay] + ")";
    var formattedTime = hours + ":" + minutes;

    // HTML 요소에 업데이트
    $(".date").text(formattedDate);
    $(".time").text(formattedTime);
    $(".ampm").text(period);
  }

  // 처음 로드 시 한 번 실행
  updateClock();

  // 매 초마다 updateClock 함수 실행
  setInterval(updateClock, 1000);
});