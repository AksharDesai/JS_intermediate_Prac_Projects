const container = document.querySelector('.container')
const h1 = document.querySelector('h1')

let exitcount  = localStorage.getItem('exitCount') || 0;

h1.innerHTML = `ExitCount = ${exitcount}`

h1.addEventListener('click',function(e){
    console.log(e.currentTarget);
})

window.addEventListener('beforeunload',function(e){
    exitcount ++ ;
    
    localStorage.setItem("exitcount",exitcount)
})