const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const allToysURL = 'http://localhost:3000/toys'
const toyCollectionDiv = document.querySelector('#toy-collection')


document.addEventListener('DOMContentLoaded',function(){

 function newElement(element){
   return document.createElement(element);
  }
  function addAttributes(element, attr){
    for(var key in attr) {
      element.setAttribute(key, attr[key]);
    }
  }
  
  //    Making the elements for the page and displaying data on from the //    Fetch call
  //

  fetch(allToysURL)
    .then(function(response){
        return response.json()
    })
    .then(function(toys){
        toys.forEach(toy => {

          let cards = newElement('div')
          addAttributes(cards,{'class': 'card'})         
          toyCollectionDiv.append(cards)

          let cardHeading = newElement('h2')
          addAttributes(cardHeading, {'id': `${toy.id}`})
          cardHeading.innerText= `${toy.name}`
          cards.append(cardHeading)

          let picture = newElement('img')
          addAttributes(picture, {'src': `${toy.image}`, 'class': 'toy-avatar'})
          cards.append(picture)
          
          let likes = newElement('p')
          addAttributes(likes, {'class': 'like-count'})
          likes.innerText = `👍${toy.likes}`
          cards.append(likes)

          let likeButton = newElement('button')
          addAttributes(likeButton, {'class': 'like-btn'})
          likeButton.innerText = 'Like'
          cards.append(likeButton)

          likeButtonListener(likeButton, toy)
          
        });
       
    })

// Below this line are the functions for adding a new toy
//
//

  function newToy(name, image) {
     fetch(allToysURL, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
        body: JSON.stringify( {
          "name": name,
          "image": image,
          "likes": 0
        })
    })
  }
        
let submitButton = document.querySelector('.submit')

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // event listener for the submit btn on the create a new character form
    submitButton.addEventListener('click', event => {
      event.preventDefault()
      let nameField = document.querySelectorAll('.input-text')[0].value
      let imageField = document.querySelectorAll('.input-text')[1].value
      newToy(nameField, imageField)
    })
  } else {
    toyForm.style.display = 'none'
  }
})

//Below this line is the Patch for adding likes to the Toys
//
//

  function likeButtonListener(button, toy) {
    button.addEventListener('click', event => {
      console.log(toy.likes)
      console.log(toy.id)
      toy.likes = (toy.likes += 1)
      addLikes(toy.id, toy.likes)
    })

  }

  function addLikes(toyId, likes) {
    fetch(`http://localhost:3000/toys/${toyId}`, {
    method: 'PATCH',
    headers:{
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
      body: JSON.stringify( {
        "likes": likes
      })
    })
  }



})