const $gifContainer = $('.gif_section_container');
const $searchInput = $('#form_input');
const $form = $('form');
const $deleteBtn = $('#delete');

$form.on('submit', async function(e){
    e.preventDefault();
    const searchTerm  = $searchInput.val()
    try {
    const response = await getGifData(searchTerm);
    makeNewDiv(response)
    }
    catch(e){
        alert('bad input try another one buddy')
    }
    $searchInput.val("");
})

function getGifData(searchTerm){
   const response = axios.get("https://api.giphy.com/v1/gifs/search",{params:{q:searchTerm,
    api_key:'MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym'}})
    return response
}
function randomNum(response){
   return Math.floor(Math.random() * response.data.data.length)
}
function makeNewDiv(response){
    const randomIndx = randomNum(response);

    const $newDiv  = $("<div>",{class:'gif_container'})
    const $newImg = $("<img>", {src: response.data.data[randomIndx].images.original.url}) 
    $newDiv.append($newImg)
    $gifContainer.append($newDiv);
}
$deleteBtn.on('click', e=> {
    $gifContainer.empty();
})