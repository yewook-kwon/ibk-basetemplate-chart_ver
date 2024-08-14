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

// 차트 1
const ctx1 = document.getElementById('exchangeRateChart').getContext('2d');
const tooltip1 = document.getElementById('tooltip');

dates1 = ['4/15', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '5/13', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '6/12', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '7/12']

const exchangeRates1 = [1371.60, 1383.70, 1395.30, 1386.30, 1375.90, 1385.00, 1380.60, 1377.90, 1370.00, 1376.60, 1375.90, 1378.70, 1378.00, 1378.50, 1365.20, 1357.80, 1364.40, 1367.90, 1367.90, 1370.10, 1369.00, 1349.40, 1355.20, 1356.20, 1364.40, 1363.10, 1364.50, 1370.00, 1365.40, 1359.50, 1364.80, 1376.50, 1381.60, 1377.60, 1373.10, 1371.50, 1366.90, 1377.90, 1377.40, 1377.80, 1371.00, 1377.70, 1380.40, 1380.50, 1380.80, 1383.80, 1389.10, 1389.70, 1386.40, 1390.10, 1389.20, 1382.40, 1380.80, 1387.40, 1389.40, 1381.90, 1379.00, 1379.40, 1383.40, 1385.60, 1380.10];

var gradient1 = ctx1.createLinearGradient(0, 0, 0, 590);
gradient1.addColorStop(0, 'rgba(0, 40, 140, 1.0)');
gradient1.addColorStop(1, 'rgba(0, 40, 140, 0.3)');

const exchangeRateData1 = {
    labels: dates1,
    datasets: [{
        label: '환율 (USD/KRW)',
        data: exchangeRates1,
        borderColor: 'rgba(0, 40, 140, 1)',
        backgroundColor: gradient1,
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 0
    }]
};

const config1 = {
    type: 'line',
    data: exchangeRateData1,
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: false // legend 숨기기
            },
            tooltip: {
                enabled: false // 기본 툴팁 비활성화
            },
        },
        interaction: {
            mode: 'index',
            intersect: false
        },
        scales: {
            x: {
                title: {
                    display: false,
                    text: '날짜 (월/일)',
                },
                grid: {
                    display: false
                }
            },
            y: {
                title: {
                    display: false,
                    text: '환율 (KRW)',
                },
                suggestedMax: 1410,
                beginAtZero: false,
                grid: {
                    color: 'rgba(200, 200, 200, 0.8)',
                }
            }
        }
    }
};

const exchangeRateChart1 = new Chart(ctx1, config1);

const getDateIndex1 = (dateString) => {
    return dates1.findIndex(date => date === dateString);
};

const showTooltipsForDates1 = (dateIndices) => {
    const colors = ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 206, 86)']; // Array of RGB colors
    dateIndices.forEach((dateIndex, i) => {
        if (dateIndex !== -1) {
            const dataPoint = exchangeRateData1.datasets[0].data[dateIndex];

            const x = ctx1.canvas.offsetLeft + (dateIndex + 0.5) * (ctx1.canvas.width / exchangeRateData1.labels.length);
            const y = ctx1.canvas.offsetTop + (1 - (dataPoint - Math.min(...exchangeRates1)) / (Math.max(...exchangeRates1) - Math.min(...exchangeRates1))) * ctx1.canvas.height;

            const tooltipClone = tooltip1.cloneNode(true);
            tooltipClone.innerHTML = `${dataPoint}`;
            tooltipClone.style.display = 'block';
            tooltipClone.style.backgroundColor = colors[i % colors.length];
            tooltipClone.style.left = `${x}px`;
            tooltipClone.style.top = `${y - 30}px`;
            document.body.appendChild(tooltipClone);
        }
    });
};

const desiredDates1 = ["4/15", "5/13"];
const desiredDateIndices1 = desiredDates1.map(getDateIndex1);
showTooltipsForDates1(desiredDateIndices1);

// 차트 2
const ctx2 = document.getElementById('exchangeRateChart2').getContext('2d');
const tooltip2 = document.getElementById('tooltip2');

dates2 = ['4/15', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '5/13', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '6/12', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '7/12']

const exchangeRates2 = [1371.60, 1383.70, 1395.30, 1386.30, 1375.90, 1385.00, 1380.60, 1377.90, 1370.00, 1376.60, 1375.90, 1378.70, 1378.00, 1378.50, 1365.20, 1357.80, 1364.40, 1367.90, 1367.90, 1370.10, 1369.00, 1349.40, 1355.20, 1356.20, 1364.40, 1363.10, 1364.50, 1370.00, 1365.40, 1359.50, 1364.80, 1376.50, 1381.60, 1377.60, 1373.10, 1371.50, 1366.90, 1377.90, 1377.40, 1377.80, 1371.00, 1377.70, 1380.40, 1380.50, 1380.80, 1383.80, 1389.10, 1389.70, 1386.40, 1390.10, 1389.20, 1382.40, 1380.80, 1387.40, 1389.40, 1381.90, 1379.00, 1379.40, 1383.40, 1385.60, 1380.10];

var gradient2 = ctx2.createLinearGradient(0, 0, 0, 590);
gradient2.addColorStop(0, 'rgba(0, 40, 140, 1.0)');
gradient2.addColorStop(1, 'rgba(0, 40, 140, 0.3)');

const exchangeRateData2 = {
    labels: dates2,
    datasets: [{
        label: '환율 (USD/KRW)',
        data: exchangeRates2,
        borderColor: 'rgba(0, 40, 140, 1)',
        backgroundColor: gradient2,
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 0
    }]
};

const config2 = {
    type: 'line',
    data: exchangeRateData2,
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: false // legend 숨기기
            },
            tooltip: {
                enabled: false // 기본 툴팁 비활성화
            },
        },
        interaction: {
            mode: 'index',
            intersect: false
        },
        scales: {
            x: {
                title: {
                    display: false,
                    text: '날짜 (월/일)',
                },
                grid: {
                    display: false
                }
            },
            y: {
                title: {
                    display: false,
                    text: '환율 (KRW)',
                },
                suggestedMax: 1410,
                beginAtZero: false,
                grid: {
                    color: 'rgba(200, 200, 200, 0.8)',
                }
            }
        }
    }
};

const exchangeRateChart2 = new Chart(ctx2, config2);

const getDateIndex2 = (dateString) => {
    return dates2.findIndex(date => date === dateString);
};

const showTooltipsForDates2 = (dateIndices) => {
    const colors = ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 206, 86)']; // Array of RGB colors
    dateIndices.forEach((dateIndex, i) => {
        if (dateIndex !== -1) {
            const dataPoint = exchangeRateData2.datasets[0].data[dateIndex];

            const x = ctx2.canvas.offsetLeft + (dateIndex + 0.5) * (ctx2.canvas.width / exchangeRateData2.labels.length);
            const y = ctx2.canvas.offsetTop + (1 - (dataPoint - Math.min(...exchangeRates2)) / (Math.max(...exchangeRates2) - Math.min(...exchangeRates2))) * ctx2.canvas.height;

            const tooltipClone = tooltip2.cloneNode(true);
            tooltipClone.innerHTML = `${dataPoint}`;
            tooltipClone.style.display = 'block';
            tooltipClone.style.backgroundColor = colors[i % colors.length];
            tooltipClone.style.left = `${x}px`;
            tooltipClone.style.top = `${y - 30}px`;
            document.body.appendChild(tooltipClone);
        }
    });
};

const desiredDates2 = ["4/15", "5/13"];
const desiredDateIndices2 = desiredDates2.map(getDateIndex2);
showTooltipsForDates2(desiredDateIndices2);