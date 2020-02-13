/* Step 1: using axios, send a GET request to the following URL 
           (replacing the placeholder with your Github name):
           https://api.github.com/users/<your name>
*/

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

/* Step 3: Create a function that accepts a single object as its only argument,
Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

function createCard(object) {
  const card = document.createElement("div"), 
    cardImage = document.createElement("img"), 
    cardInfo = document.createElement("div"),
    cardName = document.createElement("h3");
    cardUserName = document.createElement("p"),
    cardLocation = document.createElement("p"),
    cardProfile = document.createElement("p"),
    cardProfileLink = document.createElement("a");
    cardFollowers = document.createElement("p"),
    cardFollowing = document.createElement("p"),
    cardBio = document.createElement("p");

  card.append(cardImage, cardInfo);
  cardInfo.append(cardName, cardUserName, cardLocation, cardProfile, cardFollowers, cardFollowing, cardBio);
  cardProfile.append(cardProfileLink);

  card.classList.add("card");
  cardInfo.classList.add("card-info");
  cardName.classList.add("name");
  cardUserName.classList.add("username");

  cardImage.src = object.avatar_url;
  cardName.textContent = object.name;
  cardUserName.textContent = object.login;
  cardLocation.textContent = `Location: ${object.location}`;
  cardProfileLink.href = object.html_url;
  cardProfileLink.textContent = object.html_url;
  cardProfile.textContent = `Profile: ${cardProfileLink}`;
  cardFollowers.textContent = `Followers: ${object.followers}`;
  cardFollowing.textContent = `Following: ${object.following}`;
  cardBio.textContent = `Bio: ${object.bio}`;

  return card;

}

const followersArray = ["cgiroux86", "teaguehannam", "dakoriah", "NataliaBeckstead", "benjberg"];

const cardsEntry = document.querySelector(".cards");

axios.get("https://api.github.com/users/zahidkhawaja")
  .then(response => {
    return cardsEntry.append(createCard(response.data));
  })
  .catch(error => {
    console.log("The data was not returned", error)
  })

followersArray.forEach(person => {
  axios.get(`https://api.github.com/users/${person}`)
    .then(response => {
      return cardsEntry.append(createCard(response.data));
    })
    .catch(error => {
      console.log("The data was not returned", error);
    })
})
