'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Chile Omereji',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-26T17:01:17.194Z',
    '2020-07-27T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const signupBtn = document.querySelector('.sign-btn');
const containerSignUp = document.querySelector('.sign-up');

const inputSignUpFirstName = document.querySelector('.sign-up-first-name');
const inputSignUpLastName = document.querySelector('.sign-up-last-name');
const inputSignUPEmail = document.querySelector('.sign-up-email');
const signUPPin = document.querySelector('.sign-up-pin');
const signUpInterestRate = document.querySelector('.intrest-rate');
const signUpDeposit = document.querySelector('.first-depost');
const signUpSubmitBtn = document.querySelector('.submit-btn');

const signUpsuccess = document.querySelector('.welcome-success');
const signUpUsername = document.querySelector('.name');
const signUPSuccessPin = document.querySelector('.pin');

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/*
1. create a new date object 
2. from the date object get the day, month, year, hour and minute
3.formate the date and display it on the text content
=============================================================
1. get the movements date from the acoount objects
2. create a new date from the datemovements
3. display each of the dates 

4. create a function that will recieve the date and return the formatted one the it was
5. You have to create a function that will return the numbers of days from a given date

6. use the internationalization api to format the date and to reduce the code for optimum performance and cleaner code 

// though process in implementing the currency accourding to the usr locale

1. use the new Intl.NumberFormat() instead of DateFormat
2. pass in the locale
3. pass in an option containing the currency, style 
4. call the NumberFormat()
5. pass in the number or value to be formatted 
*/

const d = new Intl.DateTimeFormat(navigator.language).format(new Date());

console.log(d);

const displayMovementDate = function (date, locale) {
  const dayPassed = (date1, date2) =>
    Math.round(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24));
  const days = dayPassed(date, new Date());
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days <= 7) return `${days} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
};

const formatcur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;
  containerMovements.innerHTML = '';
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = displayMovementDate(date, acc.locale);

    const formattedMovement = formatcur(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i} ${type}</div>
          <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMovement}</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const printUser = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

printUser(accounts);

const calDisplayBalance = function (mov) {
  // const formattedMovement = formatcur(mov.balance, acc.locale, acc.currency)
  mov.balance = mov.movements.reduce((acc, curr) => acc + curr, 0);
  labelBalance.textContent = formatcur(mov.balance, mov.locale, mov.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumIn.textContent = formatcur(incomes, acc.locale, acc.currency);
  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumOut.textContent = formatcur(out, acc.locale, acc.currency);
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * acc.interestRate) / 100)
    .filter(mov => mov >= 1)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumInterest.textContent = formatcur(interest, acc.locale, acc.currency);
};

const updateUI = function (currentAccount) {
  // Display summary
  calcDisplaySummary(currentAccount);
  //Display balance
  calDisplayBalance(currentAccount);
  //Display movements and update UI
  displayMovements(currentAccount);
};

//Thought process

let currentAccount, timer;

//faked always logged in
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

/*
Implementing the date with internationalization api
======================================================

1. store the api in a variable first
*/
/*
const options = {
  minute: 'numeric',
  hour: 'numeric',
  month: 'long',
  year: 'numeric',
  weekday: 'long',
  day: 'numeric',
};
const myLocale = navigator.language;
console.log(myLocale);
const day = new Intl.DateTimeFormat('en-GB', options).format(new Date());

console.log(day);
*/

//day / month/year
const startLogOutTimer = function () {
  let time = 500;

  const tick = function () {
    const min = `${Math.trunc(time / 60)}`.padStart(2, 0);
    const sec = `${time % 60}`.padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Loggin, to get started';
      containerApp.style.opacity = 0;
    }
    //Decrease the tim
    time--;
  };
  tick();
  const timer = setInterval(tick, 1000);

  //aet the timer to 5 minutes
  //call the timer every second
  // in each call print the remaining time
  //when 9 secods, stop timer and logout
  return timer;
};

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    accs => accs.username === inputLoginUsername.value
  );
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    const name = currentAccount.owner.split(' ')[0];

    inputLoginUsername.value = inputLoginPin.value = '';
    containerApp.style.opacity = 100;

    // Display user name
    labelWelcome.textContent = `Welcome back, ${name}`;
    updateUI(currentAccount);

    const options = {
      minute: 'numeric',
      hour: 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: 'long',
      day: 'numeric',
    };

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(new Date());

    if (timer) clearInterval(timer);
    timer = startLogOutTimer();
    // const now = new Date();
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = now.getHours();
    // const min = now.getMinutes();

    // labelDate.textContent = `${day}/${month}/${year} ${hour}:${min}`;
  }
  inputLoginPin.blur();

  signUpsuccess.style.opacity = 0;
  signUpsuccess.style.display = 'none';
  containerSignUp.style.display = 'none';
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const accountTransferedTo = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  if (
    currentAccount.balance > amount &&
    amount > 0 &&
    accountTransferedTo &&
    accountTransferedTo?.username !== currentAccount.username
  ) {
    accountTransferedTo.movements.push(amount);
    currentAccount.movements.push(-amount);
    currentAccount.movementsDates.push(new Date().toISOString());
    accountTransferedTo.movementsDates.push(new Date().toISOString());
    updateUI(currentAccount);
    clearInterval(timer);
    timer = startLogOutTimer();
  }
  inputTransferAmount.value = inputTransferTo.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      accs => accs.username === inputCloseUsername.value
    );

    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  let loanedAmount = Math.floor(inputLoanAmount.value);
  if (
    loanedAmount > 0 &&
    currentAccount.movements.some(amt => amt > loanedAmount * 0.1)
  )
    setTimeout(function () {
      currentAccount.movements.push(loanedAmount);
      currentAccount.movementsDates.push(new Date().toISOString());
      updateUI(currentAccount);
    }, 2500);
  clearInterval(timer);
  timer = startLogOutTimer();
  inputLoanAmount.value = '';
});

/*
if (amount > 0 && currentAccount.movements.some(amt => amt > amount * 0.1)) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }

*/

let sorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

signupBtn.addEventListener('click', function (e) {
  containerSignUp.style.opacity = 100;
  containerSignUp.style.display = 'flex';
  containerApp.style.opacity = 0;
});

signUpSubmitBtn.addEventListener('click', function (e) {
  e.preventDefault();

  accounts.push({
    owner: `${inputSignUpFirstName.value} ${inputSignUpLastName.value}`,
    movements: [50],
    interestRate: 1.2,
    pin: Number(signUPPin.value),
  });
  printUser(accounts);
  signUpUsername.textContent = `Username: ${
    accounts[accounts.length - 1].username
  }`;
  signUPSuccessPin.textContent = `Pin: ${accounts[accounts.length - 1].pin}`;

  signUpsuccess.style.opacity = 100;
  signUpsuccess.style.display = 'flex';
  containerSignUp.style.opacity = 0;
  containerSignUp.style.display = 'none';
  inputSignUpFirstName.value =
    inputSignUpLastName.value =
    signUPPin.value =
    inputSignUPEmail.value =
      '';
});
const option = {
  style: 'currency',
  // unit: 'mile-per-hour',
  currency: 'EUR',
  useGrouping: false,
};

const num = 3887464.23;
console.log('US: ', new Intl.NumberFormat('en-US', option).format(num));
console.log('Germany: ', new Intl.NumberFormat('de-DE', option).format(num));
console.log(
  'US: ',
  new Intl.NumberFormat(navigator.language, option).format(num)
);

class Node1 {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

const data1 = new Node1(2);
const data2 = data1.next;
// console.log(data2);
// setInterval(function(){
//   const now = new Date()
//   const micro = now.getMilliseconds()
//   const sec = now.getSeconds()
//   const min = now.getMinutes()
//   const hour = now.getHours()

//   console.log(`${hour} : ${min} : ${sec} : ${micro}`);
// },1)
/*

function checkDup(array){

    let count = {}
     for(key in array){

      // here will print 0, 1, 2, 3
      //elements  are:   1, 2, 2, 4
         console.log(key)
         count = {
          1: 1,
          
         }
         count[array[key]] = count[array[key]] + 1 || 1  
         console.log(count)
         //output here  
     }
     for(key in count){
        if(count[key] > 1 ){
         console.log(`${key} was duplicated ${count[key]} times`)
        }
     }
 }
 checkDup([1,2,2,4])


*/

//Thought process
/*
1. create a new date object 
2. from the date object get the day, month, year, hour and minute
3.formate the date and display it on the text content
=============================================================
1. get the movements date from the acoount objects
2. create a new date from the datemovements
3. display each of the dates 



*/
// console.log(date);
// let a = [1, 2, 2, 4];
// const arr = a.reduce((acc, curr) => acc === curr, a[0]);

// console.log(arr);
/*
// class Node1 {
//   constructor(data, next = null) {
//     this.data = data;
//     this.next = next;
//   }
// }

// class Linked {
//   constructor() {
//     this.head = null;
//     this.size = 0;
//   }
//   insertFirst(data) {
//     this.head = new Node1(data, this.head);
//     this.size++;
//   }
// }
// const first = new Linked();
// first.insertFirst(5);
// first.insertFirst(5);
// console.log(first);
//creating a node

class createNode {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}
class createList {
  constructor() {
    this.head = null;
    this.size = 0;
  }
  insert(data){
    data = new createNode(data, this.head)
  }
}

class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}
class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  //insert first node
  insertFirst(data) {
    this.head = new Node(data, this.head);
    this.size++;
  }

  //insert last node
  insertLast(data) {
    let node = new Node(data);
    let current;
    // if empty make it the head
    if (this.head) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.size++;
  }
  //inser at index
  insertAt(data, index) {
    //if index is out of range
    if (index > 0 && index > this.size) {
      return;
    }
    //// if first index
    if (index === 0) {
      this.head = new Node(data, this.head);
      return;
    }
    const node = new Node(data);
    let current, previous;

    //set current to first
    current = this.head;
    let count = 0;
    while (count < index) {
      previous = current; //Node before index
      count++;
      current = current.next;
    }
    node.next = current;
    previous.next = node;

    this.size++;
  }

  //Get at index
  getAt(index) {
    let current = this.head;
    let count = 0;

    while (current) {
      if (count === index) {
        console.log(current.data);
      }
      count++;
      current = current.next;
    }
    return null;
  }

  //Remove at index
  removeAt() {
 let mid;
    
    //if index is out of range
    // if (index > 0 && index > this.size) {
    //   return;
    // }
    //// if first index
    if (mid === 0) {
      this.head = new Node(data, this.head);
      return;
    }

    if(this.size % 2  === 1){
      mid = this.size / 2
      mid = Math.round(mid)
    }else if(this.size % 2 === 0){
      mid = thi.size / 2
      mid = mid + 1
    }

    // if (index > 0 && index > this.size) {
    //   return;
    // }
    let current = this.head;
    let previous;
    let count = 0;

    //Remove
    if (mid === 0) {
      this.head = current.next;
    } else {
      while (count < mid) {
        count++;
        previous = current;
        current = current.next;
      }
      previous.next = current.next;
    }
    this.size--;
  }
  //Clear list

  clearList() {
    this.head = null;
    this.size = 0;
  }

  //print list data
  printListData() {
    let current = this.head;
    while (current) {
      console.log(current.data);
      current = current.next;
    }
  }
}
const ll = new LinkedList();
ll.insertFirst(100);
ll.insertFirst(200);
ll.insertFirst(400);
console.log(ll);

ll.insertLast(500);
// ll.insertAt(600, 2);
// console.log(ll);
ll.removeAt(0);
console.log(ll.getAt(0));
// ll.clearList();
ll.printListData();

console.log(ll);
/*

Given an array a[] of size N which contains elements from 0 to N-1, you need to find all the elements occurring more than once in the given array
*/

// you can only loan an amount when each movement is up to 10%

// const Duplicate = [1, 2, 2, 4];
// const findDuplicate = Duplicate =>
//   removeDuplicate.filter(item, index).Duplicate.indexOf(item);
// const duplicateArray = findDuplicate(removeDuplicate);

// console.log(duplicateArray);

/*
// Given an array a[] of size N which contains elements from 0 to N-1, you need to find all the elements occurring more than once in the given array

// let newlist = [1,2,2,4] input
//output= [2]

// outer loop  to go through the array
// inner loop that will also go through the array 
// the we check if the 

same  we can push to a new array containing the output

let newlist = [1,2,2,4]
const newarr = [];
// loop through the arr
for(let i = 0; i < newlist.length; i++ ){
  // use an inner loop starting from index 1
  for(let j = 1; j > i; i++){
    
    if(newlist[i] === newlist[j]){
      newarr.push(newlist[j])
    }
  }
  
}
console.log(newarr)

let 

//my idea (Mercy)
//const removeDuplicate = [1,2,2,4]
//const findDuplicate = removeDuplicate  => removeDuplicate.filter (item, index) removeDuplicate.indexOf(item)
//const duplicateArray = findDuplicate(removeDuplicate)
//document.write(duplicateArray)
//output = (2)

//raphael
// function checkDup(array){
//     let count = {}
//     for(key in array){
//         count[array[key]] = count[array[key]] + 1 || 1  
//     }
//     for(key in count){
//        if(count[key] > 1 ){
//         console.log(`${key} was duplicated ${count[key]} times`)
//        }
//     }
// }
// checkDup([1,2,2,4])

const 




*
class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}
class NodeList {
  constructor() {
    this.head = null;
    this.size = 0;
  }
  insertFirt(data) {
    this.head = new Node(data, this.head);
    this.size++;
  }
  insertEnd(data) {
    this.head = new Node(data, this.head);
    let current;
    if (this.head === null) {
      return;
    } else {
      let node = new Node(data);
      current = this.head;
      while (current.next) {
        current = current.next;
      }

      current.next = node;
    }

    this.size++;
  }

  inserAtIndex(data, index) {
    const node = new Node(data);
    let current, previous;
    let counter = 0;
    if (index < 0 && index > this.size) {
      return;
    }
    if (index === 0) {
      this.head = new Node(data, this.head);
    } else {
      current = this.head;
      while (counter < index) {
        previous = current;
        counter++;
        current = current.next;
      }
      node.next = current;
      previous.next = node;
    }
    this.size++;
  }

  //Remove at index
  removeAt() {
    let mid;
   
    if ((this.size + 1) % 2 === 1) {
      mid = (this.size + 1) / 2;
      mid = Math.floor(mid);
    } else if ((this.size + 1) % 2 === 0) {
      mid = (this.size + 1) / 2;
      mid = mid + 1;
    }

    let current = this.head;
    let previous;
    let count = 0;

    //Remove
    if (mid === 0) {
      this.head = current.next;
    } else {
      while (count < mid) {
        count++;
        previous = current;
        current = current.next;
      }
      previous.next = current.next;
    }
    this.size--;
  }
  removeBegin() {
    let current = this.head;
    this.head = current.next;
    this.size--;
  }

  print() {
    let current = this.head;
    while (current.next) {
      console.log(current.data);
      current = current.next;
    }
  }
}*/
/*
// Create a node
class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}
// Create a linked list 
class NodeList {
  constructor() {
    //initialize head to point to null
    this.head = null;
    //make the size to be zero
    this.size = 0;
  }
  //funtion to added element at the beginning of the List
  insertFirt(data) {
    //Make the head to point at the  data object created from the instance of the Node class
    this.head = new Node(data, this.head);
    //Increament the size whenever a new node is added to the list
    this.size++;
  }
  removeFromOddOrEvenIndex() {
    //1. declare a variable mid
    let mid;
   //2. check if middle of the LinkedList is odd number
    if ((this.size + 1) % 2 === 1) {
      //3. if step 2 is true the assign mid to linked list (size + 1) divided by two since the size is zero based
      mid = (this.size + 1) / 2;
      //4. Floor the result
      mid = Math.floor(mid);
    } else if ((this.size + 1) % 2 === 0) {
      //5. check if middle of the LinkedList is even number
      mid = (this.size + 1) / 2;
      //6. if step 5 is true the assign mid to linked list (size + 1) divided by two since the size is zero based
      mid = mid + 1;
    }
//7. create a variable current and assign it to the first node head
    let current = this.head;
    //8. declare a vairiable previous
    let previous;
    //9. initialize count to 0
    let count = 0;

    //10. check if the mid is zero
    if (mid === 0) {
      //11. if step 10 is true assign the linked list head  to be current next pointer
      this.head = current.next;
      
    } else {
      //12. if step 10 is false then transverse through the linked list and while the counter is less than the mid. this because the loop will stop at the mid i.e when the condition is false
      while (count < mid) {
        //13. increament the counter
        count++;
        //14. assign the variable previous to the current node
        previous = current;
        //15. assign the current to the current next pointer
        current = current.next;
      }
      //16. At this point the loop will stop at the mid number then make the previous next pointer to point to the current node next pointer by so doing we have by passed a node and we have removed the nod because there is no pointer from the previous node pointing to it
      previous.next = current.next;
    }
    //17. decrease the size of the linked list since a node has been removed
    this.size--;
  }
  //Function to print out the nodes
   print() {
    //create a variable and initalize it to point to the linked list head i.e the first node
    let current = this.head;
    // transverse through the Linked list while current pointer is true
    while (current.next) {
      //Display the data or value is the data part of each node
      console.log(current.data);
      //Assign current to the next pointer so that the loop will keep running until the end of the linked list
      current = current.next;
    }
  }
}

*/

// const nodes = new NodeList();
// nodes.insertFirt(90);
// nodes.insertFirt(190);
// nodes.insertFirt(48);
// nodes.insertEnd(21);
// // nodes.insertEnd(25);
// nodes.inserAtIndex(8900, 2);
// nodes.print();
// console.log('==============================');
// nodes.removeAt();
// // nodes.removeEnd();
// nodes.print();
// console.log(nodes);
// const nodes = new LinkedList();
// nodes.addFirst(134);
// nodes.addLast(90);
// nodes.addFirst(12);
// nodes.addFirst(20);
// nodes.addFirst(40);
// nodes.addFirst(50);
// nodes.insertAtIndex(30, 4);
// console.log(nodes);

// a.next = b
// const b = new LinkedList();
// b.addFisrt(6);
// const c = b.addFisrt(10);
// console.log(b);

/*
/inser at index
  insertAt(data, index) {
    let mid;
    
    //if index is out of range
    // if (index > 0 && index > this.size) {
    //   return;
    // }
    //// if first index
    if (mid === 0) {
      this.head = new Node(data, this.head);
      return;
    }

    if(this.size % 2  === 1){
      mid = this.size / 2
      mid = Math.round(mid)
    }else if(this.size % 2 === 0){
      mid = thi.size / 2
      mid = mid + 1
    }
    const node = new Node(data);
    let current, previous;

    //set current to first
    current = this.head;
    let count = 0;
    while (count < mid) {
      previous = current; //Node before index
      count++;
      current = current.next;
    }
    node.next = current;
    previous.next = node;

    this.size++;
  }

insertLast(data) {
    let node = new Node(data);
    let current;
    // if empty make it the head
    if (this.head) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.size++;
  }

*/

class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}
// Create a linked list
class NodeList {
  constructor() {
    //initialize head to point to null
    this.head = null;
    //make the size to be zero
    this.size = 0;
  }
  //funtion to added element at the beginning of the List
  insertFirt(data) {
    //Make the head to point at the  data object created from the instance of the Node class
    this.head = new Node(data, this.head);
    //Increament the size whenever a new node is added to the list
    this.size++;
  }
  removeFromOddOrEvenIndex() {
    //1. declare a variable mid
    let mid;
    //2. check if middle of the LinkedList is odd number
    if (this.size % 2 === 1) {
      //3. if step 2 is true the assign mid to linked list size divided by two
      mid = this.size / 2;
      //4. take only the integer part
      mid = parseInt(mid);
    } else if (this.size % 2 === 0) {
      //5. check if middle of the LinkedList is even number
      mid = this.size / 2;
      //6. if step 5 is true the assign mid to linked list size  divided by two
    }
    //7. create a variable current and assign it to the first node head
    let current = this.head;
    //8. declare a vairiable previous
    let previous;
    //9. initialize count to 0
    let count = 0;

    //10. check if the mid is zero
    if (mid === 0) {
      //11. if step 10 is true assign the linked list head  to be current next pointer
      this.head = current.next;
    } else {
      //12. if step 10 is false then transverse through the linked list and while the counter is less than the mid. this because the loop will stop at the mid i.e when the condition is false
      while (count < mid) {
        //13. increament the counter
        count++;
        //14. assign the variable previous to the current node
        previous = current;
        //15. assign the current to the current next pointer
        current = current.next;
      }
      //16. At this point the loop will stop at the mid number then make the previous next pointer to point to the current node next pointer by so doing we have by passed a node and we have removed the nod because there is no pointer from the previous node pointing to it
      previous.next = current.next;
    }
    //17. decrease the size of the linked list since a node has been removed
    this.size--;
  }
  //Function to print out the nodes
  print() {
    //create a variable and initalize it to point to the linked list head i.e the first node
    let current = this.head;
    // transverse through the Linked list while current pointer is true
    let counter = 1;
    while (counter <= this.size) {
      //Display the data or value is the data part of each node
      console.log(current.data);
      counter++;
      //Assign current to the next pointer so that the loop will keep running until the end of the linked list
      current = current.next;
    }
  }
}
//Create a node i.e an instance of the NodeList class
const nodes = new NodeList();
//Add nodes to the list by calling the inserFirst method
nodes.insertFirt(90);
nodes.insertFirt(190);
nodes.insertFirt(48);
nodes.insertFirt(600);
nodes.insertFirt(1200);

nodes.print();
console.log(nodes);
console.log('==============================');
nodes.removeFromOddOrEvenIndex();
nodes.print();
console.log(nodes);

//Create a node
class MyNode {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}
//Create list
class MyNodeList {
  constructor() {
    this.head = null;
    this.size = 0;
  }
  //Add Node to the end
  addFromEnd(data) {
    this.head = new MyNode(data, this.head);
    this.size++;
  }
  //removing duplicate nodes from the list
  removeDuplicateNodes() {
    //create a repeatedNode node
    let repeatedNode = new MyNode(Infinity, this.head);
    //Assign the link list head to the currentNode variable
    let currentNode = this.head;
    //Assign the repeatedNode node to previousNode Variable
    let previousNode = repeatedNode;
    //Run a loop
    while (currentNode) {
      //check if the data in the current node is the same as data in the previous node
      if (currentNode.data === previousNode.data) {
        //if the previos step is true run another lope compararing the current node data and the previous node data
        while (currentNode && currentNode.data === previousNode.data) {
          //increment or move the next node
          currentNode = currentNode.next;
        }
        //assign the previous node pointer to the current node
        previousNode.next = currentNode;
      } else {
        //if the current node nata is not the same as the current node data, assign the current node to the current node
        previousNode = currentNode;
        //assign the current node next pointer to the currentNode variable
        currentNode = currentNode.next;
      }
    }
    //return the repeatedNode node pointer to remove the duplicated nodes data
    return repeatedNode.next;
  }
  //Print the data
  printData() {
    let currentNode = this.head;
    while (currentNode) {
      console.log(`data : ${currentNode.data}`);
      currentNode = currentNode.next;
    }
  }
}

const nodeLists = new MyNodeList();
nodeLists.addFromEnd(34);
nodeLists.addFromEnd(34);
nodeLists.addFromEnd(34);
nodeLists.addFromEnd(50);
nodeLists.addFromEnd(50);
nodeLists.removeDuplicateNodes();
nodeLists.printData();
console.log(nodeLists);
