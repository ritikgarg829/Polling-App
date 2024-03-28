import { dbOperation } from "./db-operation.js";

window.addEventListener("load", () => {
    loadQuestion();
    getuserInfo();
})

// ---------------------------------check user lofin or not ----------------------------------------------------------

const getuserInfo = () => {
    if (!localStorage.userInfo) {
        location.href = "index.html";
    }
}
// ----------------------------------------------------getquestion id ---------------------------------------------------------------------
const getQuestionbyId = () => {
    const currentURL = location.href;
    const url = new URLSearchParams(currentURL);
    let questionid = 0;
    url.forEach(e => questionid = e);
    console.log('Question id is ', questionid);
    return questionid;
}
let questionObject;
// -----------------------------------------------load questions---------------------------------------------------------
const loadQuestion = () => {
    const questionid = getQuestionbyId();
    dbOperation.getQuestionbyId(questionid, printsingleQuestion);
    console.log("question id is", questionid)
}
// -------------------------------------------print single question--------------------------------------------------------------------------

const printsingleQuestion = (question) => {
    questionObject = question;

    const div = document.querySelector("#singlequestion");
    const h2 = document.createElement("h2");
    h2.innerHTML = question.quest;
    div.appendChild(h2);
    createoptions(question, div, "option1");
    createoptions(question, div, "option2");
    createoptions(question, div, "option3");
    createoptions(question, div, "option4");
    div.appendChild(createButton(getQuestionbyId()));

}
// -----------------------------------create options------------------------------------------------------------------------------------------------

const createoptions = (question, div, key) => {
    const option = document.createElement("input");
    option.name = "opt";
    option.type = "radio";
    const span = document.createElement("span");
    span.innerHTML = question[key];
    option.value = question[key];
    div.appendChild(option);
    div.appendChild(span);
    div.appendChild(document.createElement("br"));
}

// -------------------------------------------------------------------submitAnswer fn ------------------------------------------------------------------

async function submitAnswer() {
    const answerOption = document.querySelector('input[name="opt"]:checked');
    console.log('Answer Option ', answerOption.value);
    const answerValue = answerOption.value;
    const userInfo = JSON.parse(localStorage.userInfo);
    const answerObject = {
        'answer': answerValue,
        'user': userInfo.email,
        'qid': this.getAttribute('qid')

    }
    console.log('Answer Object is ', answerObject);
    try {
        await dbOperation.addAnswer(answerObject);
        alert('Answer Submitted...');
        generateReport(this.getAttribute('qid'), answerValue);
    }
    catch (err) {
        alert("Problem in Answering...");
        console.log('Error in Submit Answer ', err);
    }

}
// -------------------------------------------------------------chart-----------------------------------------------------------------------------

async function generateReport(qid) {
    const ctx = document.getElementById('myChart');
    const option1Count = await dbOperation.getColumnCount(qid, questionObject['option1']);
    const option2Count = await dbOperation.getColumnCount(qid, questionObject['option2']);
    const option3Count = await dbOperation.getColumnCount(qid, questionObject['option3']);
    const option4Count = await dbOperation.getColumnCount(qid, questionObject['option4']);
    console.log('Option1 Count ', option1Count);
    console.log('Option2 Count ', option2Count);
    console.log('Option3 Count ', option3Count);
    console.log('Option4 Count ', option4Count);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [questionObject['option1'], questionObject['option2'], questionObject['option3'], questionObject['option4']],
            datasets: [{
                label: '# of Votes',
                data: [option1Count, option2Count, option3Count, option4Count],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
// -------------------------------------------create button -------------------------------------------------------------------------
function createButton(qid) {
    const button = document.createElement('button');
    button.innerText = 'Submit Your Answer';
    button.className = 'btn btn-primary';
    button.setAttribute('qid', qid);
    button.addEventListener('click', submitAnswer);
    return button;
}