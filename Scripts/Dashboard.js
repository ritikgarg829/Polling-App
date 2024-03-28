import { dbOperation } from "./db-operation.js";

//-------------------------add onclick on add question button--------------------------------------------
const bindEvent = () => {
    const addbutton = document.getElementById('addquestion');
    addbutton.addEventListener("click", showquestion);

    const publishbutton = document.getElementById("publish");
    publishbutton.addEventListener("click", publishquestion);
}
// -----------------------------------------get userinfo after login when userlogin all data will be save in local storage and get the user value from here-----
const getuserInfo = () => {
    if (localStorage) {
        if (localStorage.userInfo) {
            const user = JSON.parse(localStorage.userInfo);
            document.querySelector("#user").innerHTML = user.name;
        } else {
            location.href = "index.html"
        }
    } else {
        console, log("please login with google or please update your browser");
    }
}
// ------------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------it will get  all question from database and call the printallquestion fn as a callback------------------------------------------------------------------------------------------

const getallquestions = () => {
    dbOperation.getAllquestion(printallquestions);
}


// ----------------------------------------------------------add quest id in url and re direct to question.html file-----------------------------------------------------------------

const openQuestion = (currentRow) => {
    const id = currentRow.getAttribute("q-id"); // get id from tr attribute
    location.href = "question.html?question-id=" + id;

}
// --------------------------------------------it will print all quest-------------------------------------------------------------------------------

const printallquestions = (question) => {
    console.log("question is ", question)
    const tbody = document.querySelector("#all-questions");
    const tr = tbody.insertRow();
    tr.setAttribute("q-id", question.id); // set id as a attribute 
    tr.addEventListener("click", () => openQuestion(tr)); //pass id from tr attribute
    const td = tr.insertCell();
    td.className = "hand";
    td.innerText = question.quest;
}

// ---------------- window represent as a tab of the window when load then bind event call------------------------

window.addEventListener('load', () => { // window represent as a tab of the browser when load then bind event call and userinfo call
    bindEvent();                 //bindevent call
    getuserInfo();             //getuserInfo call
    getallquestions();
});


// ------------------------------it will show the container when add question button call otherwise by default conatiner is hidden---------------
const showquestion = () => {
    console.log("show question calling");
    const showbutton = document.getElementById("showquestion");
    showbutton.style.display = 'block';
}

// ----------------------------------take input from inputbox from html and add input value in object---------------------------------------------

const takeinput = () => {
    const quest = document.getElementById("question").value;
    const option1 = document.getElementById("option1").value;
    const option2 = document.getElementById("option2").value;
    const option3 = document.getElementById("option3").value;
    const option4 = document.getElementById("option4").value;
    const answer = document.getElementById("answer").value;
    // --------------------add input value in object key value pair(quest , option1 ..etc are key and input value is pair) ---------------------------------------------------------------------
    const fullquestion = {
        quest, option1, option2, option3, option4, answer
    }

    return fullquestion
}
// ----------------------------------------------------------------------------------------------------------------------------------------------



// ------------------------------take input fnc call and pass the full question object in db obperation (add question) as a parameter-----------------------------

const publishquestion = async () => {
    const fullquestion = takeinput();
    console.log("full question is ", fullquestion)
    // ------------handle the db operation data with try catch because db operation fnc is async and return promise so need to handle error ---------------
    try {
        const doc = await dbOperation.addquestion(fullquestion);
        if (doc && doc.id) {
            console.log("full question added and document created in db", doc)
            document.querySelector('#message').innerHTML = "Question added successfully in db";
        }
    }
    catch (error) {
        document.querySelector('#message').innerHTML = "Error occured while adding question in db"
        console.log("full question not added and errror occured", error)

    }
}
