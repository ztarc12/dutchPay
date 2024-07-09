document.addEventListener('DOMContentLoaded', ()=>{
  const divBox = document.querySelector('#container');
  const inputUser = document.querySelector('#userName');
  const userList = document.querySelector('#userList')
  const userInputBox = document.querySelector('.userInputBox')

  const addBtn = document.createElement('button')
  
  inputUser.placeholder = '인원을 입력해주세요'

  //item 버튼 2개
  const itemBtnBox = document.querySelector('.itemBtnBox')
  const calcultate = document.createElement('button')
  const userReset = document.createElement('button')
  
  itemBtnBox.appendChild(calcultate);
  itemBtnBox.appendChild(userReset);
  userReset.innerText = '초기화'
  calcultate.innerText = '정산'
  userReset.className = 'resetBtn';
  calcultate.className = 'calculate'

  function toLocale(number){
    return Number(number).toLocaleString('ko-KR')
  }

  addBtn.innerText = '추가'
  userInputBox.appendChild(addBtn);

  function addUser(localData) {
    
    let localContentUser = inputUser.value;
    let localContentPrice = '';
    if(localData) {
      localContentUser = localData.user
      localContentPrice = localData.price
    }
    const addUser = document.createElement('li')
    const addUserName = document.createElement('h4')
    const addUserPrice = document.createElement('span')
    addUser.appendChild(addUserName)
    addUser.appendChild(addUserPrice)
    addUser.className ='user-price-list'
    
    addUserName.textContent = localContentUser
    addUserPrice.textContent = toLocale(localContentPrice)
    
    userList.appendChild(addUser)
    
    inputUser.value = '';
    saveUserData()
  }
  inputUser.addEventListener('keydown',(e)=>{
    if(e.keyCode === 13 && inputUser.value !== '') {
      addUser();
    };
  })
  addBtn.addEventListener('click', ()=>{
    if(inputUser.value !== '') {
      addUser()
    }
  })
  // localStorage 저장
  function saveUserData(){
    const userData = [];

    for(let i=0; i<userList.children.length; i++) {
      const userValue = {
        user : userList.children[i].querySelector('h4').textContent,
        price : userList.children[i].querySelector('span').textContent.replace(/,/g, ''),
      }
      userData.push(userValue)
    }
    // localStorage.setItem('user-list', JSON.stringify(userData))
    if(userData.length === 0) {
      localStorage.removeItem('user-list')
    } 
    else {
      localStorage.setItem('user-list', JSON.stringify(userData))
    }
  }
  function localUserData() {
    const getLocalDataUser = JSON.parse(localStorage.getItem('user-list'))
    if(getLocalDataUser) {
      getLocalDataUser.forEach(localData => {
        addUser(localData)
      });
    }
  }
  function shipwonRound(localData) {
    const userData = JSON.parse(localStorage.getItem('user-list'));
    const priceData = JSON.parse(localStorage.getItem('all-price'))

    const addUser = document.createElement('li')
    const addUserPrice = document.createElement('span')
    addUser.appendChild(addUserPrice)

    let localContentPrice = '';
    if(localData) {
      localContentPrice = localData.price
    }

    if(userData && Array.isArray(userData)) {
      const arrData = userData.length
      const value = priceData[0].price / arrData
      const decimalValue = Math.round(value / 100) * 100;

      for(let i=0; i<userData.length; i++) {
        userData[i].price = decimalValue
      }
      localStorage.setItem('user-list', JSON.stringify(userData))
      

      // 다시한번 데이터를 뿌려주기
      for(let i=0; i<userList.children.length; i++){
        userList.children[i].querySelector('span').textContent = toLocale(decimalValue)
      }
    } else {
      return
    }
  }
  calcultate.addEventListener('click',()=>{
    shipwonRound()
  })

  localUserData()
  //reset btn 모든 데이터 및 요소 삭제
  userReset.addEventListener('click',()=>{
    const getPriceData = JSON.parse(localStorage.getItem('all-price'))
    const getUserData = JSON.parse(localStorage.getItem('user-list'))
    const allPrice = document.querySelector('.all-price');
    const userPriceList = document.querySelector('.user-price-list')
    // if(getPriceData[0].price !== '' || getUserData !== '') {
    if((getPriceData && getPriceData[0].price) || getUserData) {
      localStorage.removeItem('all-price')
      localStorage.removeItem('user-list')
      location.reload(true)
    }
  })
})