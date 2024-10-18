import { members } from './members.js'; 

// 이거 안 하면 테이블 렌더링 안 됨
document.addEventListener('DOMContentLoaded', () => {
    renderTable(members);
});

function renderTable(members) {
    // tBody 뽑아내기
    const tBody = document.querySelector("tbody");

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

        // 각 td에 데이터 추가
        nameTd.textContent = member.name;
        engnameTd.textContent = member.englishName;
        githubTd.textContent = member.github;
        genderTd.textContent = member.gender === 'male' ? '남성' : '여성';
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

