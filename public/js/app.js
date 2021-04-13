

// fetch('http://localhost:2000/weather?address=Noida').then((response) => {
//     response.json().then((data)=>{
//         if(data.error)
//         console.log(data.error)
//         else
//         {
//             console.log(data.forecast)
//             console.log(data.Address)
//         }
//     })
// })

const weatherForm=document.querySelector('form')
const Search=document.querySelector('input')
const message_1=document.querySelector('#messageone')
const message_2=document.querySelector('#messagetwo')
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=Search.value
    message_1.textContent='Loading, please wait..'
    message_2.textContent=''
    fetch('/weather?address='+location).then((response) => {
    response.json().then((data)=>{
        if(data.error)
        message_1.textContent=data.error
        else
        {
            message_1.textContent=data.forecast
            message_2.textContent=data.Address
        }
    })
})


})