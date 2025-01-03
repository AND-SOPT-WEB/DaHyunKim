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

// 테이블 초기 렌더링
document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
function handleDOMContentLoaded() {
    renderTable(loadMembers());
}

// 모달에서 새 멤버 추가 기능
function handleAddMember() {
    const name = document.getElementById('modal-name').value;
    const englishName = document.getElementById('modal-english-name').value;
    const github = document.getElementById('modal-github').value;
    const gender = document.getElementById('modal-gender').value;
    const role = document.getElementById('modal-role').value;
    const firstWeekGroup = document.getElementById('modal-first-week').value;
    const secondWeekGroup = document.getElementById('modal-second-week').value;

    if (!name || !englishName || !github || !gender || !role || !firstWeekGroup || !secondWeekGroup) {
        alert("모든 필드를 채워주세요.");
        return;
    }

    const members = loadMembers();
    const newMember = {
        id: Date.now(), // 원래 사용하던 배열 대신 date.now를 통해 고유 id 생성, 이렇게 하면 고유성이 보장됨
        name,
        englishName,
        github,
        gender,
        role,
        firstWeekGroup: parseInt(firstWeekGroup),
        secondWeekGroup: parseInt(secondWeekGroup)
    };

    members.push(newMember);
    saveMembers(members);
    renderTable(members);
    closeModal();
}

// 모달 닫기 함수
function closeModal() {
    const modal = document.querySelector('.modal');
    modal.style.display = 'none';
    document.querySelectorAll('.modal input').forEach(input => input.value = '');
    document.querySelectorAll('.modal select').forEach(select => select.value = '');
}

// 검색 기능
function handleSearch() {
    const nameInput = document.querySelector('input[name="name"]').value.toLowerCase();
    const engnameInput = document.querySelector('input[name="engname"]').value.toLowerCase();
    const githubInput = document.querySelector('input[name="github"]').value.toLowerCase();
    const genderInput = document.querySelector('select[name="gender"]').value;
    const roleInput = document.querySelector('select[name="role"]').value;
    const week1Input = document.querySelector('input[name="week1"]').value;
    const week2Input = document.querySelector('input[name="week2"]').value;

    const members = loadMembers().filter(member => 
        member.name.toLowerCase().includes(nameInput) &&
        member.englishName.toLowerCase().includes(engnameInput) &&
        member.github.toLowerCase().includes(githubInput) &&
        (genderInput === '' || member.gender === genderInput) &&
        (roleInput === '' || member.role === roleInput) &&
        (week1Input === '' || member.firstWeekGroup === parseInt(week1Input)) &&
        (week2Input === '' || member.secondWeekGroup === parseInt(week2Input))
    );

    renderTable(members);
}

// 초기화 기능
function handleReset() {
    document.querySelectorAll("input").forEach(input => input.value = "");
    document.querySelectorAll("select").forEach(select => select.value = "");
    renderTable(loadMembers());
}

// 선택 삭제 기능
function handleDeleteSelected() {
    const members = loadMembers();
    const updatedMembers = members.filter(member => {
        const checkbox = document.querySelector(`input[type="checkbox"][data-id="${member.id}"]`);
        return !checkbox || !checkbox.checked; // checkbox가 없거나 체크되지 않은 항목만 남기기
    });

    saveMembers(updatedMembers);
    renderTable(updatedMembers);
    handleReset();
}

// 테이블 렌더링 함수
function renderTable(data) {
    const tBody = document.querySelector("tbody");
    tBody.innerHTML = '';

    data.forEach(member => {
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
        checkbox.setAttribute('data-id', member.id); // 고유 id를 data-id 속성으로 설정
        checkTd.appendChild(checkbox);

        const githubLink = document.createElement("a");
        githubLink.href = `https://github.com/${member.github}`;
        githubLink.target = "_blank";
        githubLink.textContent = member.github;
        githubTd.appendChild(githubLink);

        nameTd.textContent = member.name;
        engnameTd.textContent = member.englishName;
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

    setupCheckboxListeners();
}

// 전체 체크박스 설정
function setupCheckboxListeners() {
    const allCheckBox = document.querySelector('.all-check');
    const memberCheckboxes = document.querySelectorAll('tbody input[type="checkbox"]');

    allCheckBox.addEventListener('change', (event) => {
        const isChecked = event.target.checked;
        memberCheckboxes.forEach(checkbox => {
            checkbox.checked = isChecked;
        });
    });

    memberCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const allChecked = Array.from(memberCheckboxes).every(checkbox => checkbox.checked);
            allCheckBox.checked = allChecked;
        });
    });
}

// 모달 열기 함수
function openModal() {
    const modal = document.querySelector('.modal');
    modal.style.display = 'block';
}

// 모달 닫기 기능을 처리하는 함수
function handleModalClose(event) {
    const modal = document.querySelector('.modal');
    if (event.target === modal) {
        closeModal();
    }
}

// 이벤트 리스너
document.querySelector('.modal-add-btn').addEventListener('click', handleAddMember);
document.getElementById('search-btn').addEventListener('click', handleSearch);
document.getElementById('reset-btn').addEventListener('click', handleReset);
document.getElementById('delete-btn').addEventListener('click', handleDeleteSelected);

const modalOpen = document.querySelector('#add-btn');
const modalClose = document.querySelector('.close-btn');
modalOpen.addEventListener('click', openModal);
modalClose.addEventListener('click', closeModal);
document.querySelector('.modal').addEventListener('click', handleModalClose);