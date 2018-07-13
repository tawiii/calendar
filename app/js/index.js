function ready() {
  var doc = document;
  var arrBackward = doc.getElementsByClassName('date-selection__arrow')[0];
  var arrForward = doc.getElementsByClassName('date-selection__arrow')[1];
  var nameMonth = doc.getElementsByClassName('date-selection__date')[0];
  var monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
  ];
  var date = new Date();
  var nowMonth = date.getMonth();
  var nowYear = date.getFullYear();
  var today = date.getDate();
  var nextMonthDay = 0;
  var tagRow = null;
  var tagCell = null;
  var tagTdAll = null;
  var arrDay = ['Понедельник,', 'Вторник,', 'Среда,', 'Четверг,', 'Пятница,', 'Суббота,', 'Воскресенье,'];
  var cellsEmptyNum = 0;
  var firstСharacter = null;
  var spanDay = null;
  var spanNum = null;
  var day = null;

  function createCalendar(id, year, month) {
    var elem = doc.getElementById(id);
    var cellsEmpty = 0;
    var beforeMonth = new Date(year, month, 0).getDate();
    var myDate = new Date(year, month);
    var table = '<table class="table"><tr>';

    nameMonth.innerHTML = '<span>'+ monthNames[month] +'</span> <span>'+ year +'</span>';    

    for (var i = 0; i < getDay(myDate); i++) {
      table += '<td></td>';
    }
    
    while (myDate.getMonth() == month) {
      table += '<td>' + myDate.getDate() + '</td>';

      if (getDay(myDate) % 7 == 6) {
        table += '</tr><tr>';
      }

      myDate.setDate(myDate.getDate() + 1);
    }
    
    if (getDay(myDate) != 0) {
      for (var i = getDay(myDate); i < 7; i++) {
        table += '<td>'+ ++nextMonthDay +'</td>';
      }
    }
    
    table += '</tr></table>';
    
    elem.innerHTML = table;

    tagRow = doc.getElementsByTagName('tr')[0];
    tagCell = tagRow.getElementsByTagName('td');
    tagTdAll = doc.getElementsByTagName('td');
    
    for (var i = 0; i < tagCell.length; i++) {
      spanDay = doc.createElement('span');
      spanDay.innerHTML = arrDay[i];
      tagCell[i].appendChild(spanDay)

      firstСharacter = tagCell[i].innerHTML.charAt(0)
      !Number(firstСharacter) ? cellsEmpty++ : null;
    }

    cellsEmptyNum = cellsEmpty

    for (var i = 0; i < cellsEmpty; i++) {
      spanNum = doc.createElement('span');
      spanNum.innerHTML = beforeMonth - (--cellsEmptyNum);
      tagCell[i].appendChild(spanNum);
    }

    if (date.getMonth() == month && date.getFullYear() == year) {
      tagTdAll[today + cellsEmpty - 1].classList.add('active');
    }  

  }

  function getDay(date) {
    day = date.getDay();
    if (day == 0) day = 7;
    return day - 1;
  }

  arrBackward.onclick = function() {
    nextMonthDay = 0 
    if (nowMonth == 0) {
      --nowYear;
      nowMonth = 12;
    }
    createCalendar("calendar", nowYear, --nowMonth);
  }
  arrForward.onclick = function() {
    nextMonthDay = 0 
    if (nowMonth == 11) {
      ++nowYear;
      nowMonth = -1;
    }
    createCalendar("calendar", nowYear, ++nowMonth);
  }

  createCalendar("calendar", nowYear, nowMonth);


//modal header

var addBtn = doc.getElementsByClassName('header__btn')[0];
var modal = doc.getElementsByClassName('header__add-modal')[0];
var cancel = doc.getElementsByClassName('header__cancel')[0];

addBtn.onclick = function(e) {
  e.stopPropagation();
  modal.classList.toggle('header__add-modal--active');
}
modal.onclick = function(e) {
  e.stopPropagation();
}
doc.onclick = removeClass;
cancel.onclick = removeClass;
function removeClass(e) {
  modal.classList.remove('header__add-modal--active');
}

}

document.addEventListener("DOMContentLoaded", ready);

