const students = [
    {name:'harsh',subject:'python'},
    {name:'anuj',subject:'java'}
]

function addStudents(student){
    return new Promise(function(resolve,reject){
        setTimeout(function() {
        students.push(student)
        // console.log('Student Added')
        let error = false;
        if(!error){
            resolve('Student Added');
        } else {
            reject(`Can't Add Student`);
        }
    }, 2000);
    })
    
}

function getStudents(){
    setTimeout(function() {
        let str = "";
        students.forEach(function(student,index){
            str += `<tr>
                    <th scope="row">${index + 1}</th>
                    <td>${student.name}</td>
                    <td>${student.subject}</td>
                    </tr>`
        })
        document.getElementById('studentList').innerHTML=str;
        console.log('Student Added')
        
    }, 5000);
}

let newStudent = {name:"sunny",subject:"HTML"};
addStudents(newStudent).then(getStudents).catch(function(error){
    console.log('Sorry : '+error)
})