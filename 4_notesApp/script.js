import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";



const noteType = document.querySelector('.home-page__right__top__bottom')
const notesContainer = document.querySelector('.home-page__right_bottom__bottom')

//****************** Saved NOtes *******************/

const SavedNotes = JSON.parse(localStorage.getItem('note')) || [];

console.log(SavedNotes);

document.addEventListener('DOMContentLoaded',function(e){

    SavedNotes.forEach(note => {
      console.log(note);


      const noteText = note.text
      const noteColor = note.color
      const hour = note.hour
      const minute = note.minute
      const day = note.day


      // const noteHour = note.hour
      // const noteMinute = note.minute
      // const noteDay = note.day
      
      createElement(noteText,noteColor,hour,minute,day)
    }); 
})


//****************** Event Listeners *******************/


noteType.addEventListener('click',function(e){

      
  let el;


  if (e.target==notesContainer) {
       el = e.target
  } else {
       el = e.target.closest('.home-page__right__top__bottom__note')
  }

   console.log(el);

   const attribute = el.getAttribute('colorType') 

   const hour = new Date().getHours()
    const minute = new Date().getMinutes()
    const day = new Date().getDay()


   createElement('',attribute,hour,minute,day)

   
})


// ************_____Functions_____************

//create element function start ------->

function createElement(noteText,noteColor,hour,minute,day){

  
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const note=document.createElement('div')

  note.classList.add('home-page__right_bottom_bottom_note')
  
  note.style.backgroundColor=noteColor

  note.innerHTML = `

              <div class="note__top">
                <p></p>
                <i id="edit" class="ri-quill-pen-fill"></i>
              </div>
              <div class="note__center ">
              ${marked(noteText)}
              </div>
              <textarea class="hidden">${noteText}</textarea>
              <div class="note__bottom">
                <i class="ri-delete-bin-4-fill"></i>
                <p>${hour}:${minute} PM,${daysOfWeek[day]}</p>
              </div>
            `



 //inside note element functionalities
  const editBtn = note.querySelector('#edit')
  const textArea = note.querySelector('textarea') 
  const noteCenter = note.querySelector('.note__center') 

  const deleteBtn = note.querySelector('.ri-delete-bin-4-fill')
  

  //switch between text area and div
  editBtn.addEventListener('click',function(e){

      console.log('clicked');
      

    
      textArea.classList.toggle('hidden');
      noteCenter.classList.toggle('hidden');

      

  })
  


  
  //inserting text area value into notecenter div 
  textArea.addEventListener('input',function(e){
    const  {value}=e.target
  
    noteCenter.innerHTML=marked(value)

    
   storeTextLocalStorage(hour,minute,day)

     
  })

  notesContainer.appendChild(note)



  //delete note 
  deleteBtn.addEventListener('click',function(e){
    note.remove()
    storeTextLocalStorage();
  });

  
  storeTextLocalStorage(hour,minute,day);


}





//random id function start ------->

function randomID(){
  return new Date().getTime()

}


//random id function end -------<



//store to local storage function start ------->
function storeTextLocalStorage(hour,minute,day){

  
  

  const allNotes = document.querySelectorAll('.home-page__right_bottom_bottom_note')

  const noteTexts =[]

  allNotes.forEach( note => {
    
    const id  = randomID()

    const textarea = note.querySelector('textarea')
    


    
    
    

    noteTexts.push({
      id:id,
      text:textarea.value,
      color:note.style.backgroundColor,
      hour : hour,
      minute : minute,
      day : day
      
    })
    
  });
  

  localStorage.setItem('note',JSON.stringify(noteTexts))
  
}





