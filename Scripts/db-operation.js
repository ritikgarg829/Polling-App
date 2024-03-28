import { db } from "./Firebase.js";
import { addDoc, collection, getDocs, query, doc, getDoc, getCountFromServer, where } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

// ----------------------------------------all db operation perform here (CRUD)-------------------------------------------------
export const dbOperation = {


    // --------------------------add data in db (fullquestion---allinput value) parameter come from publish question fnc in indexedDB.js------------------------------    
    async addquestion(fullquestion) {
        try {
            const doc = await addDoc(collection(db, "fullquestion"), fullquestion) // db database , fullquestion in quotes is collection name in firebase and fullquestion is text value data 
            return doc
        }
        catch (error) {
            console.log("error while adding a question", error);
            throw error;
        }
    },

    // -------------------------------------------------------------------submit the answer------------------------------------------------------------------


    async addAnswer(answerObject) {
        // Async Prg
        try {
            const doc = await addDoc(collection(db, 'answers'), answerObject); // Assign to Async Thread
            return doc;
        }
        catch (err) {
            console.log('Error During add a Answer ', err);
            throw err;
        }
    },

    // ----------------------------------------------------------------------------------------------------------------------------------------------------


    async getColumnCount(qid, ans) {
        console.log('getColumnCount::: Question id ', qid, 'Ans ', ans);
        ans = ans.trim();
        const coll = collection(db, "answers");
        const q = query(coll, where("qid", "==", qid), where('answer', '==', ans));
        const snapshot = await getCountFromServer(q);
        const count = snapshot.data().count;
        return count;
    },




    // ---------------------------------------------get allquestion data from db--------------------------------------------------------------------------------------------

    async getAllquestion(callback) {
        const q = query(collection(db, "fullquestion"))
        const querysnapshot = await getDocs(q);
        querysnapshot.forEach(docs => {
            callback({ ...docs.data(), id: docs.id }) // pass a printallquestion fn as a callaback in dashboard 
        });

    },
    // -----------------------------------------get single question by id ------------------------------------------------------------------------------
    async getQuestionbyId(questionid, callbackfn) {
        const docRef = doc(db, "fullquestion", questionid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            callbackfn(docSnap.data())
            console.log("Document data by id:", docSnap.data());
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
    }


}