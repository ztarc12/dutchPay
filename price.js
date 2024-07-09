document.addEventListener('DOMContentLoaded',()=>{
  // 금액
  const priced = document.querySelector('#price');
  const priceBox = document.querySelector('#priceBox')
  const priceInputBox = document.querySelector('.priceInputBox')
  const priceBtn = document.createElement('button')
  priceInputBox.appendChild(priceBtn)
  priceBtn.textContent = '금액'

  const addPriceSum = document.createElement('span');
  addPriceSum.className = 'all-price'

  priced.placeholder = '전체 금액을 입력 해주세요'

  function localPriceData(){
    const getLocalDataPrice = JSON.parse(localStorage.getItem('all-price'))
    if(getLocalDataPrice) {
      getLocalDataPrice.forEach(localData => {
        addPrice(localData)
      })
    }
  }
  localPriceData()

  function toLocale(number){
    return Number(number).toLocaleString('ko-KR')
  }

  function addPrice(localData) {
    let localContent = priced.value;
    if(localData) {
      localContent = localData.price
    }
    addPriceSum.textContent = toLocale(localContent);
    // addPriceSum.textContent = '원'
    priceBox.appendChild(addPriceSum);
    priced.value = ''
    savePriceData()
  }

  priced.addEventListener('keydown', ()=>{
    if(window.event.keyCode === 13 && priced.value !== '') {
      addPrice();
    };
  })
  priceBtn.addEventListener('click',()=>{
    if(priced.value !== ''){
      addPrice()
    }
  })
  console.log(priceBox.children[0].textContent) 
  function savePriceData(){
    const priceData = [
      {
        price : priceBox.children[0].textContent.replace(/,/g,'')
      }
    ];
    localStorage.setItem('all-price', JSON.stringify(priceData))
    if(priceData.length === 0) {
      localStorage.removeItem('all-price')
    } else {
      localStorage.setItem('all-price', JSON.stringify(priceData))
    }
  }
  
})