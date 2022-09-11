const baseUrl = "https://rickandmortyapi.com/api/character";
const containerCharacters = document.querySelector('.characters')
const searchCharacter = document.querySelector('#searchCharacter')


let nextCharacters = "";
let prevCharacters = "";

async function callApi(url){
    const data = await fetch(url);
    const {info, results}= await data.json();
        nextCharacters = info.next;
        prevCharacters = info.prev;
       
        printCharacters(results)
        console.log(nextCharacters);
}


async function printCharacters(char){
    let html = "";

    char.forEach(async ({url}) => {
        const data = await fetch (url);
        const response = await data.json()

        html+= `
            <div>
                <img src="${response.image}" alt="${response.name}">
                <h2>${response.name}</h2>
            </div>  
        `;
       
        
        containerCharacters.innerHTML= html;
    });
    
    
    
}

callApi(baseUrl)

function getPrev(){
if(!prevCharacters) return alert("No hay mas Personajes")
    callApi(prevCharacters)
   
};
function getNext (){
    if(!nextCharacters) return alert("No hay mas Personajes")
    callApi(nextCharacters)
};
function getAll(){
    callApi(baseUrl)
};

searchCharacter.addEventListener('change', async (e)=>{
try {
     const search = e.target.value.trim();
    const searchUrl = `${baseUrl}/${search}`

    const data = await fetch(searchUrl);
    const response = await data.json();

    let html = "";
    html+= `
            <div>
                <img src="${response.image}" alt="${response.name}">
                <h2>${response.name}</h2>
            </div>  
        `;
       
        
        containerCharacters.innerHTML= html;
} catch (error) {
        
    
}

 
})