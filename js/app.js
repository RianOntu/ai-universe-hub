const loadCards=()=>{
    fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(res=>res.json())
    .then(data=>displayCards(data.data.tools))
}
const displayCards=cards=>{
    const mainContainer=document.getElementById('main-container');
    console.log(cards);
    cards.forEach(card => {
        const cardDiv=document.createElement('div');
        cardDiv.classList.add("col");
        cardDiv.innerHTML=`<div class="card">
        <img src="${card.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Features</h5>
          <p class="card-text">1.Natural language processing</p>
          <p class="card-text">2.Contextual understanding</p>
          <p class="card-text">3.Text generation</p>
        </div>
        <div class="card-footer">
         <div><h3><b>${card.name}</b></h3>
         <p><i class="fa-solid fa-calendar-days"></i>${card.published_in}</p>

         </div>

        </div>
      </div>`
      mainContainer.appendChild(cardDiv);
    });
  
}

loadCards()