let reg = /harsh/g;
reg = /h[^xyz]rsh/;
reg = /h{0,2}rsh/;
reg = /ar*/g;
reg = /(har){2}([0-9]r){3}/
let str = `harhar1r5r8r ,harsh is the best programmer,anuj says`;
let result = str.match(reg);
console.log(result)
document.getElementById('regex').innerHTML = result;
// let result = reg.exec(str);
// result = reg.test(str)
// result = str.match(reg)
// result = str.search(reg)
// result = str.replace(reg,'anuj')
// console.log(reg);
// console.log(result);
console.log(typeof(result))


if(reg.test(str) == true){
    console.log(reg.exec(str))
    console.log(`${reg.source} is in ${str}`)
} else {
    console.log(`${reg.source} not in ${str}`)
}
                                                                                                           