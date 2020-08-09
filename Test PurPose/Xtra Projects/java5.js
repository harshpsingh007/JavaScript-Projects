// console.log('hello from javascript 5')

class Employee {
    constructor(name, salary, experience) {
        this.name = name;
        this.salary = salary;
        this.experience = experience;
    }
    slogan(){
        return `i m ${this.name} and i m loving it`;
    }
    joiningyear(){
        return 2020-this.experience;
    }
    static add(a,b){
        return a+b;
    }
}


class Programmer extends Employee{
    constructor(name,salary,experience,language,github){
        super(name,salary,experience);
        this.language=language;
        this.github=github;
    }
    favoritelanguage(){
        if(this.language == 'python'){
            return "Python";
        }
        else{
            return "javascript";
        }
    }
    static multiply(a,b){
        return a*b;
    }
}

let drum = new Employee('harsh',200000,17);
console.log(drum)
console.log(drum.slogan())
console.log(drum.joiningyear())
console.log(Employee.add(2,3))

let piano = new Programmer("anuj",2000,10,"java","anuj6565");
console.log(piano)
console.log(piano.joiningyear())

class library{
    constructor(booksname){
        this.booksname = booksname;
    }
    getbooklist(){
        return this.booksname
    }
    issuebook(bookname,user){
        if(this.booksname.includes(bookname)){
        return `${user} has issued the book :- ${bookname}`
        } else {
            return `The requested book ${bookname} is not available`
        }
    }
    returnbook(bookname){
        return `Thank you for returning ${bookname}`
    }
}
let books = new library('champak , akbar virbal , python , c++ , java')
console.log(books)
console.log(books.issuebook('champak','harsh'))
console.log(books.returnbook('champak'))