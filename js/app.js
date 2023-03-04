
const toggleSpinner=isLoading=>{
    const loader=document.getElementById('spinner');
    if(isLoading){
  loader.classList.remove("d-none")
    }
    else{
        loader.classList.add('d-none')
    }
}
const loadCards=(dataLimit)=>{
    toggleSpinner(true)
    fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(res=>res.json())
    .then(data=>displayCards(data.data.tools,dataLimit))
}
const displayCards=(cards,dataLimit)=>{
    
    toggleSpinner(true);
    const mainContainer=document.getElementById('main-container');
    mainContainer.innerText='';
    const seeMore=document.getElementById('see-more');
    if(dataLimit && cards.length>6){
       
        
        cards=cards.slice(0,6);
        seeMore.classList.remove('d-none')
    }
    else{
        seeMore.classList.add('d-none');
    }
    
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
        <div class="card-footer d-flex justify-content-between">
         <div><h3><b>${card.name}</b></h3>
         <p><i class="fa-solid fa-calendar-days"></i><span>${card.published_in}</span></p>

         </div>
         <div>
        <button data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="loadCardDetails('${card.id}')"> <i class="fa-solid fa-arrow-right"></i></button>
         </div>

        </div>
      </div>`
      mainContainer.appendChild(cardDiv);
      toggleSpinner(false)
    });
  
}

const processSearch=dataLimit=>{
    loadCards(dataLimit)
}
document.getElementById('see-more').addEventListener('click',function(){
    processSearch()
})
processSearch(1)


const loadCardDetails=id=>{
fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
.then(res=>res.json())
.then(data=>displayCardDetails(data))
}
const displayCardDetails=data=>{
console.log(data.data);
const modalBody=document.getElementById('modal-body');
modalBody.innerHTML=`<div class="row">
<div class="col-md-6 col-12 border">
 <h6><b>${data.data.description}</b></h6>
 <div class="d-flex">
     <div class="bg-white m-2">
     <p>${data.data.pricing[0].price ?data.data.pricing[0].price:"Free of cost" }</p>
     <p>${data.data.pricing[0].plan ? data.data.pricing[0].plan : "Free" }</p>
     </div>
     <div class="bg-white m-2">
     <p>${data.data.pricing[1].price ?data.data.pricing[1].price:"Free of cost" }</p>
     <p>${data.data.pricing[1].plan ? data.data.pricing[1].plan : "Free" }</p>
     </div>
     <div class="bg-white m-2">
     <p>${data.data.pricing[2].price ?data.data.pricing[2].price:"Free of cost" }</p>
     <p>${data.data.pricing[2].plan ? data.data.pricing[2].plan : "Free" }</p>
     </div>
 </div>
 <div class="d-flex">
    <div class="m-2">
        <h3>Features</h3>
        <p>${data.data.features[1].feature_name}</p>
        <p>${data.data.features[2].feature_name}</p>
        <p>${data.data.features[3].feature_name}</p>
       
    </div>
    <div class="m-2">
        <h3>Integrations</h3>
        <p>${data.data.integrations[0] ? data.data.integrations[0]:"No data found"}</p>
        <p>${data.data.integrations[1] ? data.data.integrations[1]:"No data found"}</p>
        <p>${data.data.integrations[2] ? data.data.integrations[2]:"No data found"}</p>
    </div>
 </div>

</div>
<div class="col-md-6 col-12 border">
    <img class="img-fluid" src="${data.data.image_link[0]?data.data.image_link[0]:''}" alt="">
    <h3>Hi hi hi</h3>
    <p>Hi hi hi</p>
</div>
</div>`
}

