console.log('Promise()')

function func1(){
    return new Promise(function(resolve,reject){
        setTimeout(() => {
            const error = true;
            if(!error){
                console.log('resolved')
                resolve('Promise Resolved');
            } else {
                console.log('rejected')
                reject('Promise Rejected');
            }
        }, 2000);
    })
}
func1().then(function(error){
    console.log('harsh resolved : ' + error)
}).catch(function(error){
    console.log('rejected harsh : ' + error)
})
