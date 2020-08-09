const students = [
    {name:'harsh',subject:'python'},
    {name:'anuj',subject:'java'}
]

function addStudents(student,callback){
    setTimeout(function() {
        students.push(student)
        console.log('Student Added')
        callback();
    }, 2000);
}

function getStudents(){
    setTimeout(function() {
        let str = "";
        students.forEach(function(student){
            str += `<li>${student.name} and ${student.subject}</li>`
        })
        document.getElementById('studentList').innerHTML=str;
        console.log('students fetched')
        
    }, 10000);
}

let newStudent = {name:"sunny",subject:"HTML"};
addStudents(newStudent,getStudents)
