import { members } from './members.js'; 

// 문서 로딩되면 바로 테이블 렌더링 되게
document.addEventListener('DOMContentLoaded', () => {
    renderTable(members);
});

document.getElementById('search-btn').addEventListener('click', () => {
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

function renderTable(members) {
    // tBody 뽑아내기
    const tBody = document.querySelector("tbody");
    tBody.innerHTML = ''; // 테이블 초기화

    members.forEach (member => {
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

        // 각 td에 데이터 추가
        nameTd.textContent = member.name;
        engnameTd.textContent = member.englishName;
        githubTd.textContent = member.github;
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
}

