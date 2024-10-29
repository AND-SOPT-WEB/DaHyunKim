import { members as defaultMembers } from './members.js'; 

// 로컬 스토리지에서 데이터를 가져오는 함수
function loadMembers() {
    const storedMembers = localStorage.getItem('membersData');
    return storedMembers ? JSON.parse(storedMembers) : defaultMembers;
}

// 로컬 스토리지에 데이터를 저장하는 함수
function saveMembers(data) {
    localStorage.setItem('membersData', JSON.stringify(data));
}

// 페이지가 로드되면 테이블을 초기 렌더링
document.addEventListener('DOMContentLoaded', () => {
    const members = loadMembers(); // 로컬 스토리지에서 데이터 로드
    renderTable(members); // 로드된 데이터로 테이블 렌더링
});

// 검색 기능
document.getElementById('search-btn').addEventListener('click', () => {
    const members = loadMembers(); // 검색 시마다 최신 데이터를 가져옴
    const nameInput = document.querySelector('input[name="name"]').value;
    const engnameInput = document.querySelector('input[name="engname"]').value.toLowerCase();
    const githubInput = document.querySelector('input[name="github"]').value.toLowerCase();
    const genderInput = document.querySelector('select[name="gender"]').value;
    const roleInput = document.querySelector('select[name="role"]').value;
    const week1Input = document.querySelector('input[name="week1"]').value;
    const week2Input = document.querySelector('input[name="week2"]').value;

    const filteredMembers = members.filter(member => 
        member.name.includes(nameInput) && 
        member.englishName.toLowerCase().includes(engnameInput) &&
        member.github.toLowerCase().includes(githubInput) &&
        (genderInput === '' || member.gender === genderInput) &&
        (roleInput === '' || member.role === roleInput) &&
        (week1Input === '' || member.firstWeekGroup === parseInt(week1Input)) && 
        (week2Input === '' || member.secondWeekGroup === parseInt(week2Input))
    );

    renderTable(filteredMembers);
});

// 초기화 기능
document.getElementById('reset-btn').addEventListener('click', () => {
    document.querySelectorAll("input").forEach(input => {
        input.value = "";
    });

    document.querySelectorAll("select").forEach(select => {
        select.value = "";
    });

    const members = loadMembers(); // 초기화 시 최신 데이터를 다시 로드
    renderTable(members);
});

// 선택 삭제 기능
document.getElementById('delete-btn').addEventListener('click', () => {
    let members = loadMembers(); // 최신 데이터를 불러옴
    const updatedMembers = members.filter((member, index) => {
        const rowCheckbox = document.querySelectorAll('tbody input[type="checkbox"]')[index];
        return !rowCheckbox.checked; // 체크되지 않은 항목만 남기기
    });

    saveMembers(updatedMembers); // 로컬 스토리지에 갱신된 members 저장
    renderTable(updatedMembers); // 업데이트된 데이터로 테이블 다시 렌더링
});

// 테이블 렌더링 함수
function renderTable(data) {
    const tBody = document.querySelector("tbody");
    tBody.innerHTML = ''; // 테이블 초기화

    data.forEach (member => {
        const tr = document.createElement("tr");

        const checkTd = document.createElement("td");
        const nameTd = document.createElement("td");
        const engnameTd = document.createElement("td");
        const githubTd = document.createElement("td");
        const genderTd = document.createElement("td");
        const roleTd = document.createElement("td");
        const week1Td = document.createElement("td");
        const week2Td = document.createElement("td");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkTd.appendChild(checkbox);

        nameTd.textContent = member.name;
        engnameTd.textContent = member.englishName;
        githubTd.textContent = member.github;
        genderTd.textContent = member.gender === 'male' ? '남자' : '여자';
        roleTd.textContent = member.role;
        week1Td.textContent = member.firstWeekGroup;
        week2Td.textContent = member.secondWeekGroup;

        tr.appendChild(checkTd);
        tr.appendChild(nameTd);
        tr.appendChild(engnameTd);
        tr.appendChild(githubTd);
        tr.appendChild(genderTd);
        tr.appendChild(roleTd);
        tr.appendChild(week1Td);
        tr.appendChild(week2Td);

        tBody.appendChild(tr);
    });

    const allCheckBox = document.querySelector('.all-check');
    const memberCheckboxes = document.querySelectorAll('tbody input[type="checkbox"]');

    allCheckBox.addEventListener('change', (event) => {
        const isChecked = event.target.checked; 
        memberCheckboxes.forEach(checkbox => {
            checkbox.checked = isChecked; 
        });
    });
}

// 모달 열고 닫기 기능
const modal = document.querySelector('.modal');
const modalOpen = document.querySelector('#add-btn');
const modalClose = document.querySelector('.close-btn');

modalOpen.addEventListener('click', function() {
    modal.style.display = 'block';
});

modalClose.addEventListener('click', function() {
    modal.style.display = 'none';
});
