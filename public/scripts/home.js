window.addEventListener('load', function(){
    var form= document.querySelector('.form');
    var text = document.querySelector('.text');
    var tires = document.querySelector('.tires');
    var colorpicker = document.querySelector('.color');
    
    
    function displayList() {
        fetch('/api/dinosaurs')
        .then(function(response) {
            return response.json();
        })
        .then(function(listItems) {
            var container = document.querySelector('.container');
            
            container.innerHTML = "";
            
            listItems.forEach(element => {
                var vehicle = document.createElement('ul');
                vehicle.innerHTML = '<li><span>'+"nombre:"+element.name+'</span></li><li><span>'+"Altura:"+element.height+'</span></li><li><span>'+"Ancho:"+element.width+'</span></li></li><li><span>'+"Peso:"+element.weight+'</span></li><li><span>'+"Fecha de descubrimiento:"+element.discovery_date+'</span></li><li><span>'+"Dieta:"+element.diet+'</span></li><button class="btnDelete">X</button><button class="btnEdit">Editar información</button>';
                container.appendChild(vehicle);
            });
            console.log(listItems);
            
            var btns = container.querySelectorAll('.btnDelete');
            
            btns.forEach(function(elem,index) {
                elem.addEventListener('click',function () {
                    listItems[index];
                    console.log(listItems[index]._id);
                    var data= new URLSearchParams();
                    data.append('indexToDelete',listItems[index]._id);
                    
                    var promise = fetch('/api/carItems', {
                        method: 'DELETE',
                        body: data
                    });
                    
                    promise.then(function(response) {
                        return response.json();
                    }).then(function(info) {
                        console.log(info);
                        displayList();
                    });
                });
            });

            var btnsEdit = container.querySelectorAll('.btnEdit');
            
            btnsEdit.forEach(function(elem,index) {
                elem.addEventListener('click',function () {
                    var span = elem.parentElement.querySelectorAll('span');
                    
                    var inputColor = document.createElement('input');
                    inputColor.setAttribute('type','color');
                    elem.parentElement.appendChild(inputColor);

                    span.forEach(function(elemSpan){
                        elemSpan.setAttribute('contenteditable',true);
                        elemSpan.focus();
                    });
                    
                });
            });




        });
    }
    
    displayList();
    
    form.addEventListener('submit',function(event){
        event.preventDefault();
        
        var formInfo= new FormData(form);
        var data= new URLSearchParams(formInfo);
        
        var promise = fetch('/api/carItems', {
            method : 'POST', 
            body : data
        });
        
        promise.then((raw) => {
            return raw.json();
        }).then((info) => {
            displayList();
            form.reset();
            console.log(info);
        });
        
    });
    
    
});