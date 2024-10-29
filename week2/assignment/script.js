import { members as defaultMembers } from './members.js'; 

// 로컬 스토리지에서 데이터를 가져오는 함수
function loadMembers() {
    const storedMembers = localStorage.getItem('membersData');
    return storedMembers ? JSON.parse(storedMembers) : defaultMembers; // 저장된 데이터가 없으면 기본 members 사용
}

// 로컬 스토리지에 데이터를 저장하는 함수
function saveMembers(data) {
    localStorage.setItem('membersData', JSON.stringify(data));
}

// 전역 변수로 members 선언 후 로컬 스토리지에서 데이터 불러오기
let members = loadMembers();

// 문서 로딩되면 바로 테이블 렌더링 되게
document.addEventListener('DOMContentLoaded', () => {
    const members = loadMembers(); // 로컬 스토리지에서 데이터 로드
    renderTable(members); 
});

// 모달 내 기능
document.querySelector('.modal-add-btn').addEventListener('click', () => {
    // 모든 입력 필드 값 가져오기
    const name = document.getElementById('modal-name').value;
    const englishName = document.getElementById('modal-english-name').value;
    const github = document.getElementById('modal-github').value;
    const gender = document.getElementById('modal-gender').value;
    const role = document.getElementById('modal-role').value;
    const firstWeekGroup = document.getElementById('modal-first-week').value;
    const secondWeekGroup = document.getElementById('modal-second-week').value;

    // 입력 필드 중 하나라도 비어있으면 alert 표시
    if (!name || !englishName || !github || !gender || !role || !firstWeekGroup || !secondWeekGroup) {
        alert("모든 필드를 채워주세요.");
        return;
    }

    // 새로운 멤버 객체 생성
    const newMember = {
        id: members.length + 1, 
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
});

// 모달 닫기 함수
function closeModal() {
    const modal = document.querySelector('.modal');
    modal.style.display = 'none';

    // 모달 내 입력 필드 초기화
    document.querySelectorAll('.modal input').forEach(input => input.value = '');
    document.querySelectorAll('.modal select').forEach(select => select.value = '');
}

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

    // 필터링 조건에 맞는 멤버 필터링
    const filteredMembers = members.filter(member => 
        member.name.toLowerCase().includes(nameInput) &&
        member.englishName.toLowerCase().includes(engnameInput) &&
        member.github.toLowerCase().includes(githubInput) &&
        (genderInput === '' || member.gender === genderInput) &&
        (roleInput === '' || member.role === roleInput) &&
        (week1Input === '' || member.firstWeekGroup === parseInt(week1Input)) && 
        (week2Input === '' || member.secondWeekGroup === parseInt(week2Input))
    );

    renderTable(filteredMembers); // 필터링된 결과로 테이블 다시 렌더링
});

// 초기화 기능
document.getElementById('reset-btn').addEventListener('click', () => {
    // 모든 입력 필드 초기화
    document.querySelectorAll("input").forEach(input => {
        input.value = "";
    });

    document.querySelectorAll("select").forEach(select => {
        select.value = "";
    });

    // 테이블 다시 렌더링
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

    saveMembers(updatedMembers); 
    renderTable(updatedMembers); // 업데이트된 데이터로 테이블 다시 렌더링
});

// 테이블 렌더링 함수
function renderTable(data) {
    // tBody 뽑아내기
    const tBody = document.querySelector("tbody");
    tBody.innerHTML = ''; // 테이블 초기화

    data.forEach (member => {
        // 새로운 행 생성
        const tr = document.createElement("tr");

        // 새로운 td 생성
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

         // GitHub 링크 설정
         const githubLink = document.createElement("a");
         githubLink.href = `https://github.com/${member.github}`; 
         githubLink.target = "_blank"; 
         githubLink.textContent = member.github; // 링크 텍스트로 아이디 표시
         githubTd.appendChild(githubLink); // githubTd에 링크 추가

        // 각 td에 데이터 추가
        nameTd.textContent = member.name;
        engnameTd.textContent = member.englishName;
        genderTd.textContent = member.gender === 'male' ? '남자' : '여자';
        roleTd.textContent = member.role;
        week1Td.textContent = member.firstWeekGroup;
        week2Td.textContent = member.secondWeekGroup;

        // tr에 각 td 추가
        tr.appendChild(checkTd);
        tr.appendChild(nameTd);
        tr.appendChild(engnameTd);
        tr.appendChild(githubTd);
        tr.appendChild(genderTd);
        tr.appendChild(roleTd);
        tr.appendChild(week1Td);
        tr.appendChild(week2Td);

        // tBody에 tr 추가
        tBody.appendChild(tr);
    });

    const allCheckBox = document.querySelector('.all-check');
    const memberCheckboxes = document.querySelectorAll('tbody input[type="checkbox"]');

    // 전체 선택 체크박스 클릭 시 모든 체크박스 상태 변경
    allCheckBox.addEventListener('change', (event) => {
        const isChecked = event.target.checked;
        memberCheckboxes.forEach(checkbox => {
            checkbox.checked = isChecked;
        });
    });

    // 개별 체크박스에 따라 전체 선택 체크박스 상태 변경되게
    memberCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const allChecked = Array.from(memberCheckboxes).every(checkbox => checkbox.checked);
            allCheckBox.checked = allChecked;
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

// 백드롭 클릭 시 모달 닫기
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});