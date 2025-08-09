let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let create = document.getElementById('create')
let mode = 'create'
let tmp
//get total
function getTotal()
{
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value)-discount.value
        total.innerHTML = result
        total.style.background = 'green'

    }else{
        total.style.background = 'red'
        total.innerHTML= ''
    }
}
//create product
let datapro
if(localStorage.datapro != null){
    datapro = JSON.parse(localStorage.datapro)
}else{
    datapro = []
}
create.onclick = function(){
    let newpro = {
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,
    }
    if(title.value != '' &&
         price.value != '' &&
          category.value != '' &&
        count.value < 100){
            if(mode === "create"){
    if(newpro.count > 1){
        for(i = 0; i < newpro.count ; i++){
            datapro.push(newpro)
        }
    }else{ 
        datapro.push(newpro)
    }

    }else{
        datapro[ tmp ] = newpro
        mode = 'create'
        count.style.display = 'block'
        create.innerHTML = 'Create'

    }
        clearData()
    }


    localStorage.setItem('datapro', JSON.stringify(datapro))

    read()
    
}
//Clear inputs
function clearData(){
    title.value = ''
    price.value = ''
    taxes.value = ''
    ads.value = ''
    discount.value = ''
    total.innerHTML = ''
    count.value = ''
    category.value = ''
    
}
//read
function read(){
    getTotal()
    let table = ''
    for(let i = 0;i < datapro.length;i++){
        table += `
                <tr>
                    <td>${i}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button id='update' onclick='update(${i})'>update</button></td>
                    <td><button id='delete' onclick='deleteData(${i})'>delete</button></td>
                    
                </tr>
        `
    }
     delbtn = document.getElementById('delbtn')
        if(datapro.length > 0){
            delbtn.innerHTML = `<button onclick="delAll()">deleteAll (${datapro.length})</button>`
        }else{
            delbtn.innerHTML = ''
        }
    document.getElementById('tbody').innerHTML = table
}
read()
//delete
function deleteData(i){
    datapro.splice(i,1)
    localStorage.datapro = JSON.stringify(datapro)
    read()
    
}
//DeleteAll
function delAll(){
    localStorage.clear()
    datapro.splice(0)
    read()
}
//update
function update(i){
    title.value = datapro[i].title
    price.value = datapro[i].price
    taxes.value = datapro[i].taxes
    ads.value = datapro[i].ads
    discount.value = datapro[i].discount
    category.value = datapro[i].category
    getTotal()
    count.style.display = 'none'
    create.innerHTML = 'Update'
    mode = "update"
    tmp = i
    scroll({
        top: 0,
        behavior: "smooth",
    })
    
    
    
}
//search
let searchMood = 'title'
function getSearchMood(id){
    let search = document.getElementById('search')
    if(id == 'searchtitle'){
        searchMood = 'title'
        search.placeholder= 'Search By Title'
    }else{
        searchMood = 'category'
        search.placeholder= 'Search By Category'
    }
    search.focus()
    search.value= ''

}

function searchData(value){
    value = value.toLowerCase();
    let table = '';

    for (let i = 0; i < datapro.length; i++) {
        let found = false;

        if (searchMood === 'title') {
            found = datapro[i].title.toLowerCase().includes(value);
        } else if (searchMood === 'category') {
            found = datapro[i].category.toLowerCase().includes(value);
        }

        if (found) {
            table += `
                <tr>
                    <td>${i}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button id='update' onclick='update(${i})'>update</button></td>
                    <td><button id='delete' onclick='deleteData(${i})'>delete</button></td>
                </tr>
            `;
        }
    }

    document.getElementById('tbody').innerHTML = table;
}