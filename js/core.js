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
    var formattedDate =
      year + ". " + month + ". " + day + "" + "(" + weekDays[weekDay] + ")";
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
const ctx1 = document.getElementById("exchangeRateChart").getContext("2d");
const tooltip1 = document.getElementById("tooltip");

dates1 = [
  "4/15",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "5/13",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "6/12",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "7/12",
];

const exchangeRates1 = [
  1371.6, 1383.7, 1395.3, 1386.3, 1375.9, 1385.0, 1380.6, 1377.9, 1370.0,
  1376.6, 1375.9, 1378.7, 1378.0, 1378.5, 1365.2, 1357.8, 1364.4, 1367.9,
  1367.9, 1370.1, 1369.0, 1349.4, 1355.2, 1356.2, 1364.4, 1363.1, 1364.5,
  1370.0, 1365.4, 1359.5, 1364.8, 1376.5, 1381.6, 1377.6, 1373.1, 1371.5,
  1366.9, 1377.9, 1377.4, 1377.8, 1371.0, 1377.7, 1380.4, 1380.5, 1380.8,
  1383.8, 1389.1, 1389.7, 1386.4, 1390.1, 1389.2, 1382.4, 1380.8, 1387.4,
  1389.4, 1381.9, 1379.0, 1379.4, 1383.4, 1385.6, 1380.1,
];

var gradient1 = ctx1.createLinearGradient(0, 0, 0, 590);
gradient1.addColorStop(0, "rgba(0, 40, 140, 1.0)");
gradient1.addColorStop(1, "rgba(0, 40, 140, 0.3)");

const exchangeRateData1 = {
  labels: dates1,
  datasets: [
    {
      label: "환율 (USD/KRW)",
      data: exchangeRates1,
      borderColor: "rgba(0, 40, 140, 1)",
      backgroundColor: gradient1,
      borderWidth: 2,
      fill: true,
      tension: 0.4,
      pointRadius: 0,
    },
  ],
};

const config1 = {
  type: "line",
  data: exchangeRateData1,
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: false, // legend 숨기기
      },
      tooltip: {
        enabled: false, // 기본 툴팁 비활성화
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      x: {
        title: {
          display: false,
          text: "날짜 (월/일)",
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: false,
          text: "환율 (KRW)",
        },
        suggestedMax: 1410,
        beginAtZero: false,
        grid: {
          color: "rgba(200, 200, 200, 0.8)",
        },
      },
    },
  },
};

const exchangeRateChart1 = new Chart(ctx1, config1);

const getDateIndex1 = (dateString) => {
  return dates1.findIndex((date) => date === dateString);
};

const showTooltipsForDates1 = (dateIndices) => {
  const colors = [
    "rgb(255, 99, 132)",
    "rgb(54, 162, 235)",
    "rgb(255, 206, 86)",
  ]; // Array of RGB colors
  dateIndices.forEach((dateIndex, i) => {
    if (dateIndex !== -1) {
      const dataPoint = exchangeRateData1.datasets[0].data[dateIndex];

      const x =
        ctx1.canvas.offsetLeft +
        (dateIndex + 0.5) *
          (ctx1.canvas.width / exchangeRateData1.labels.length);
      const y =
        ctx1.canvas.offsetTop +
        (1 -
          (dataPoint - Math.min(...exchangeRates1)) /
            (Math.max(...exchangeRates1) - Math.min(...exchangeRates1))) *
          ctx1.canvas.height;

      const tooltipClone = tooltip1.cloneNode(true);
      tooltipClone.innerHTML = `${dataPoint}`;
      tooltipClone.style.display = "block";
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
const ctx2 = document.getElementById("exchangeRateChart2").getContext("2d");
const tooltip2 = document.getElementById("tooltip2");

dates2 = [
  "4/15",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "5/13",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "6/12",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "7/12",
];

const exchangeRates2 = [
  1371.6, 1383.7, 1395.3, 1386.3, 1375.9, 1385.0, 1380.6, 1377.9, 1370.0,
  1376.6, 1375.9, 1378.7, 1378.0, 1378.5, 1365.2, 1357.8, 1364.4, 1367.9,
  1367.9, 1370.1, 1369.0, 1349.4, 1355.2, 1356.2, 1364.4, 1363.1, 1364.5,
  1370.0, 1365.4, 1359.5, 1364.8, 1376.5, 1381.6, 1377.6, 1373.1, 1371.5,
  1366.9, 1377.9, 1377.4, 1377.8, 1371.0, 1377.7, 1380.4, 1380.5, 1380.8,
  1383.8, 1389.1, 1389.7, 1386.4, 1390.1, 1389.2, 1382.4, 1380.8, 1387.4,
  1389.4, 1381.9, 1379.0, 1379.4, 1383.4, 1385.6, 1380.1,
];

var gradient2 = ctx2.createLinearGradient(0, 0, 0, 590);
gradient2.addColorStop(0, "rgba(0, 40, 140, 1.0)");
gradient2.addColorStop(1, "rgba(0, 40, 140, 0.3)");

const exchangeRateData2 = {
  labels: dates2,
  datasets: [
    {
      label: "환율 (USD/KRW)",
      data: exchangeRates2,
      borderColor: "rgba(0, 40, 140, 1)",
      backgroundColor: gradient2,
      borderWidth: 2,
      fill: true,
      tension: 0.4,
      pointRadius: 0,
    },
  ],
};

const config2 = {
  type: "line",
  data: exchangeRateData2,
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: false, // legend 숨기기
      },
      tooltip: {
        enabled: false, // 기본 툴팁 비활성화
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      x: {
        title: {
          display: false,
          text: "날짜 (월/일)",
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: false,
          text: "환율 (KRW)",
        },
        suggestedMax: 1410,
        beginAtZero: false,
        grid: {
          color: "rgba(200, 200, 200, 0.8)",
        },
      },
    },
  },
};

const exchangeRateChart2 = new Chart(ctx2, config2);

const getDateIndex2 = (dateString) => {
  return dates2.findIndex((date) => date === dateString);
};

const showTooltipsForDates2 = (dateIndices) => {
  const colors = [
    "rgb(255, 99, 132)",
    "rgb(54, 162, 235)",
    "rgb(255, 206, 86)",
  ]; // Array of RGB colors
  dateIndices.forEach((dateIndex, i) => {
    if (dateIndex !== -1) {
      const dataPoint = exchangeRateData2.datasets[0].data[dateIndex];

      const x =
        ctx2.canvas.offsetLeft +
        (dateIndex + 0.5) *
          (ctx2.canvas.width / exchangeRateData2.labels.length);
      const y =
        ctx2.canvas.offsetTop +
        (1 -
          (dataPoint - Math.min(...exchangeRates2)) /
            (Math.max(...exchangeRates2) - Math.min(...exchangeRates2))) *
          ctx2.canvas.height;

      const tooltipClone = tooltip2.cloneNode(true);
      tooltipClone.innerHTML = `${dataPoint}`;
      tooltipClone.style.display = "block";
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

// 차트 3
const ctx3 = document.getElementById("exchangeRateChart3").getContext("2d");
const tooltip3 = document.getElementById("tooltip3");

dates3 = [
  "4/15",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "5/13",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "6/12",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "7/12",
];

const exchangeRates3 = [
  1371.6, 1383.7, 1395.3, 1386.3, 1375.9, 1385.0, 1380.6, 1377.9, 1370.0,
  1376.6, 1375.9, 1378.7, 1378.0, 1378.5, 1365.2, 1357.8, 1364.4, 1367.9,
  1367.9, 1370.1, 1369.0, 1349.4, 1355.2, 1356.2, 1364.4, 1363.1, 1364.5,
  1370.0, 1365.4, 1359.5, 1364.8, 1376.5, 1381.6, 1377.6, 1373.1, 1371.5,
  1366.9, 1377.9, 1377.4, 1377.8, 1371.0, 1377.7, 1380.4, 1380.5, 1380.8,
  1383.8, 1389.1, 1389.7, 1386.4, 1390.1, 1389.2, 1382.4, 1380.8, 1387.4,
  1389.4, 1381.9, 1379.0, 1379.4, 1383.4, 1385.6, 1380.1,
];

var gradient3 = ctx3.createLinearGradient(0, 0, 0, 590);
gradient3.addColorStop(0, "rgba(0, 40, 140, 1.0)");
gradient3.addColorStop(1, "rgba(0, 40, 140, 0.3)");

const exchangeRateData3 = {
  labels: dates3,
  datasets: [
    {
      label: "환율 (USD/KRW)",
      data: exchangeRates2,
      borderColor: "rgba(0, 40, 140, 1)",
      backgroundColor: gradient2,
      borderWidth: 2,
      fill: true,
      tension: 0.4,
      pointRadius: 0,
    },
  ],
};

const config3 = {
  type: "line",
  data: exchangeRateData3,
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: false, // legend 숨기기
      },
      tooltip: {
        enabled: false, // 기본 툴팁 비활성화
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      x: {
        title: {
          display: false,
          text: "날짜 (월/일)",
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: false,
          text: "환율 (KRW)",
        },
        suggestedMax: 1410,
        beginAtZero: false,
        grid: {
          color: "rgba(200, 200, 200, 0.8)",
        },
      },
    },
  },
};

const exchangeRateChart3 = new Chart(ctx3, config3);

const getDateIndex3 = (dateString) => {
  return dates3.findIndex((date) => date === dateString);
};

const showTooltipsForDates3 = (dateIndices) => {
  const colors = [
    "rgb(255, 99, 132)",
    "rgb(54, 162, 235)",
    "rgb(255, 206, 86)",
  ]; // Array of RGB colors
  dateIndices.forEach((dateIndex, i) => {
    if (dateIndex !== -1) {
      const dataPoint = exchangeRateData3.datasets[0].data[dateIndex];

      const x =
        ctx3.canvas.offsetLeft +
        (dateIndex + 0.5) *
          (ctx3.canvas.width / exchangeRateData3.labels.length);
      const y =
        ctx3.canvas.offsetTop +
        (1 -
          (dataPoint - Math.min(...exchangeRates3)) /
            (Math.max(...exchangeRates3) - Math.min(...exchangeRates3))) *
          ctx3.canvas.height;

      const tooltipClone = tooltip3.cloneNode(true);
      tooltipClone.innerHTML = `${dataPoint}`;
      tooltipClone.style.display = "block";
      tooltipClone.style.backgroundColor = colors[i % colors.length];
      tooltipClone.style.left = `${x}px`;
      tooltipClone.style.top = `${y - 30}px`;
      document.body.appendChild(tooltipClone);
    }
  });
};

const desiredDates3 = ["4/15", "5/13"];
const desiredDateIndices3 = desiredDates3.map(getDateIndex3);
showTooltipsForDates3(desiredDateIndices3);


// 차트 4
const ctx4 = document.getElementById("exchangeRateChart4").getContext("2d");
const tooltip4 = document.getElementById("tooltip4");

dates4 = [
  "4/15",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "5/13",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "6/12",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "7/12",
];

const exchangeRates4 = [
  1371.6, 1383.7, 1395.3, 1386.3, 1375.9, 1385.0, 1380.6, 1377.9, 1370.0,
  1376.6, 1375.9, 1378.7, 1378.0, 1378.5, 1365.2, 1357.8, 1364.4, 1367.9,
  1367.9, 1370.1, 1369.0, 1349.4, 1355.2, 1356.2, 1364.4, 1363.1, 1364.5,
  1370.0, 1365.4, 1359.5, 1364.8, 1376.5, 1381.6, 1377.6, 1373.1, 1371.5,
  1366.9, 1377.9, 1377.4, 1377.8, 1371.0, 1377.7, 1380.4, 1380.5, 1380.8,
  1383.8, 1389.1, 1389.7, 1386.4, 1390.1, 1389.2, 1382.4, 1380.8, 1387.4,
  1389.4, 1381.9, 1379.0, 1379.4, 1383.4, 1385.6, 1380.1,
];

var gradient4 = ctx4.createLinearGradient(0, 0, 0, 590);
gradient4.addColorStop(0, "rgba(0, 40, 140, 1.0)");
gradient4.addColorStop(1, "rgba(0, 40, 140, 0.3)");

const exchangeRateData4 = {
  labels: dates4,
  datasets: [
    {
      label: "환율 (USD/KRW)",
      data: exchangeRates2,
      borderColor: "rgba(0, 40, 140, 1)",
      backgroundColor: gradient2,
      borderWidth: 2,
      fill: true,
      tension: 0.4,
      pointRadius: 0,
    },
  ],
};

const config4 = {
  type: "line",
  data: exchangeRateData4,
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: false, // legend 숨기기
      },
      tooltip: {
        enabled: false, // 기본 툴팁 비활성화
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      x: {
        title: {
          display: false,
          text: "날짜 (월/일)",
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: false,
          text: "환율 (KRW)",
        },
        suggestedMax: 1410,
        beginAtZero: false,
        grid: {
          color: "rgba(200, 200, 200, 0.8)",
        },
      },
    },
  },
};

const exchangeRateChart4 = new Chart(ctx4, config4);

const getDateIndex4 = (dateString) => {
  return dates4.findIndex((date) => date === dateString);
};

const showTooltipsForDates4 = (dateIndices) => {
  const colors = [
    "rgb(255, 99, 132)",
    "rgb(54, 162, 235)",
    "rgb(255, 206, 86)",
  ]; // Array of RGB colors
  dateIndices.forEach((dateIndex, i) => {
    if (dateIndex !== -1) {
      const dataPoint = exchangeRateData4.datasets[0].data[dateIndex];

      const x =
        ctx4.canvas.offsetLeft +
        (dateIndex + 0.5) *
          (ctx4.canvas.width / exchangeRateData4.labels.length);
      const y =
        ctx4.canvas.offsetTop +
        (1 -
          (dataPoint - Math.min(...exchangeRates4)) /
            (Math.max(...exchangeRates4) - Math.min(...exchangeRates4))) *
          ctx4.canvas.height;

      const tooltipClone = tooltip4.cloneNode(true);
      tooltipClone.innerHTML = `${dataPoint}`;
      tooltipClone.style.display = "block";
      tooltipClone.style.backgroundColor = colors[i % colors.length];
      tooltipClone.style.left = `${x}px`;
      tooltipClone.style.top = `${y - 30}px`;
      document.body.appendChild(tooltipClone);
    }
  });
};

const desiredDates4 = ["4/15", "5/13"];
const desiredDateIndices4 = desiredDates4.map(getDateIndex4);
showTooltipsForDates4(desiredDateIndices4);

