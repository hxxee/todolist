const addBtn = document.querySelector('#addBtn'); // 추가 버튼 선택
const todoInput = document.querySelector('#todoInput');

const savedTodoList = JSON.parse(localStorage.getItem('saved-items'));
console.log(savedTodoList)

if (savedTodoList) { // savedTodoList(로컬 데이터)가 존재하면 실행
    for(let i = 0; i < savedTodoList.length; i++){
        createTodo(savedTodoList[i]) // 전달인자로 전달
    }
}

function keyCodeCheck() { // 엔터키로 추가
    if (window.event.keyCode === 13 && todoInput.value !== '') {
        createTodo();
    }
}

addBtn.addEventListener('click', () => { // + 버튼으로 추가
    if (todoInput.value !== '') { // 빈 값 입력 방지
        createTodo();
    }
})

function createTodo(storageData) { // 할 일 추가 기능

    let todoContents = todoInput.value;
    if (storageData) {
        todoContents = storageData.contents
    }

    const todoList = document.querySelector('#todoList');
    const newLi = document.createElement('li'); // li 생성
    const newBtn = document.createElement('button'); // button 생성
    const newSpan = document.createElement('span'); // span 생성
    const deleteAll = document.querySelector('.delete-btn-wrap')

    newLi.appendChild(newBtn); // li안에 button 담기
    newLi.appendChild(newSpan); // li안에 span 담기

    newSpan.textContent = todoContents

    todoList.appendChild(newLi);

    todoInput.value = ''; // value 값에 빈 문자열 담기

    newBtn.addEventListener('click', () => {//체크박스 클릭
        newLi.classList.toggle('complete');
        saveItemsFn();
    });

    newLi.addEventListener('dblclick', () => {//더블클릭
        newLi.remove();
        saveItemsFn();
    });

    if (storageData && storageData.complete === true) {
        newLi.classList.add('complete')
    }
    saveItemsFn();
    
};

function deleteAll() { // 전체 삭제 버튼
    const liList = document.querySelectorAll('#todoList li');
    // console.log(liList[0])
    for ( let i = 0; i < liList.length; i++){
        liList[i].remove();
    }
    saveItemsFn();
};

function saveItemsFn () { // 로컬에 데이터 저장하기
    const saveItems = []; // 빈 배열 할당
  	for (let i = 0; i < todoList.children.length; i++){
        const todoObj = {
        	contents: todoList.children[i].querySelector('span').textContent, // 리스트 목록
          	complete: todoList.children[i].classList.contains('complete') // 완료 표시된 리스트
        };
		saveItems.push(todoObj); // 배열 추가
    }

    if (saveItems.length === 0) { // 데이터가 없다면 값 삭제
        localStorage.removeItem('saved-items')
    }
    else{
        localStorage.setItem('saved-items', JSON.stringify(saveItems));
    }
    // console.log('saved-items', JSON.stringify(saveItems))
}

