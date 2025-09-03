/*
    2025. 09. 03

    api 유저 정보 리스트를 html 페이지에 출력

*/



/* 메인 */

const USER_LIST = [];

(async function main() {
  const mainTag = document.querySelector('main');
  const noticeSpan = document.createElement('span');
  const userListDiv = document.getElementById('user-list');

  mainTag.style.setProperty('height', '95%');
  userListDiv.style.setProperty('height', '95%');

  userListDiv.appendChild(noticeSpan);
  
  noticeSpan.classList.add('notice-text');
  noticeSpan.textContent = 'Loading...';
  
  try {
    const userList =  await getUserList();

    mainTag.style.removeProperty('height');
    userListDiv.style.removeProperty('height');

    printUserList(userList);
    noticeSpan.remove();

  } catch(err) {
    userListDiv.setAttribute('display', 'none');
    noticeSpan.setAttribute('display', 'block');
    noticeSpan.textContent = '데이터를 불러올 수 없습니다.'
  }
})();


/* 유저 리스트 읽어오기 */
async function getUserList (count=20) {
  const URL = `https://randomuser.me/api/?results=${count}`;
  const response = await fetch(URL);
  const data = await response.json();

  data.results.forEach(user => USER_LIST.push(user));
  console.log(data.results);

  return data.results;
}


/* 유저 리스트 출력 */
function printUserList(userList) {
  userList.forEach((  user) => insertUserHtml(user));

}

/* 웹페이지의 유저 리스트를 리셋 */
function resetUserHtml() {
  const userListDiv = document.getElementById('user-list');

  userListDiv.innerHTML = "";  
}

/*  웹 페이지에 그리는 기능 */
function insertUserHtml(user) {
  const userListDiv = document.getElementById('user-list');
  const userDiv = document.createElement('div');
  const imgTag = document.createElement('img');
  const nameSpan = document.createElement('span');
  const mailSpan = document.createElement('span');
  const phoneSpan = document.createElement('span');
  const userInfoDiv = document.createElement('div');

  userDiv.classList.add('user');
  
  imgTag.setAttribute('src', user.picture.thumbnail);
  imgTag.classList.add('user-img');
  nameSpan.textContent = user.name.first + user.name.last;
  nameSpan.classList.add('user-name');
  mailSpan.textContent = user.email;
  mailSpan.classList.add('user-contact');
  phoneSpan.textContent = user.phone;
  phoneSpan.classList.add('user-contact');

  
  userInfoDiv.appendChild(nameSpan);
  userInfoDiv.appendChild(mailSpan);
  userInfoDiv.appendChild(phoneSpan);
  userInfoDiv.classList.add('user-info');

  userDiv.appendChild(imgTag);
  userDiv.appendChild(userInfoDiv);

  userListDiv.appendChild(userDiv);
}


function reloadUserListHTml() {

}

/*  조회 유저 수 설정 셀렉트 박스 - 이벤트 */
const userCntSelect =  document.querySelector('.search-count');
userCntSelect.addEventListener('change', async event => {
  const userCnt = event.target.value;
  const noticeSpan = document.createElement('span');
  const userListDiv = document.getElementById('user-list');
  const mainTag = document.querySelector('main');

  resetUserHtml();
  mainTag.style.setProperty('height', '90%');
  userListDiv.style.setProperty('height', '90%');


  userListDiv.appendChild(noticeSpan);
  noticeSpan.classList.add('notice-text');
  noticeSpan.textContent = 'Loading...';
  
  try {
    const userList =  await getUserList(userCnt);

    mainTag.style.removeProperty('height');
    userListDiv.style.removeProperty('height');

    printUserList(userList);
    noticeSpan.remove();

  } catch(err) {
    userListDiv.setAttribute('display', 'none');
    noticeSpan.setAttribute('display', 'block');
    noticeSpan.textContent = '데이터를 불러올 수 없습니다.'
  }

  
});



/*  검색 인풋 텍스트  - 이벤트 리스너 */
const searchInput = document.querySelector('input[name="search-input"]');
searchInput.addEventListener('input', event => {
  const inputValue = event.target.value;
  const searchList = USER_LIST.filter(el => {
    return el.name.first.includes(inputValue) || el.name.last.includes(inputValue) || el.email.includes(inputValue)
  });

  printUserList(searchList);

});


/* 검색 버튼 - 이벤트 리스너  */
const searchBtn = document.querySelector('.search-btn');
searchBtn.addEventListener('click', event => {
  const inputValue = searchInput.value;
  const searchList = USER_LIST.filter(el => {
    return el.name.first.includes(inputValue) || el.name.last.includes(inputValue) || el.email.includes(inputValue)
  });

  printUserList(searchList);

});