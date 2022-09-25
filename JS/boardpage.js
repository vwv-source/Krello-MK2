//-----------------------Variables and imports---------------

var draggedcard = null;
var draggedlist = null;
var selectedlist = null;
var dragmode = null;
var bincontainer = document.querySelector('.bincontainer')
import 'https://code.jquery.com/jquery-3.6.0.min.js'



//--------------Bin stuff---------------------

bincontainer.addEventListener("dragenter", function binDragEnter(e){
    e.preventDefault()
    this.style.backgroundColor = 'rgb(221, 38, 38)'
})

bincontainer.addEventListener("dragleave", function binDragLeave(e){
    e.preventDefault()
    this.style.backgroundColor = 'transparent'
})

bincontainer.addEventListener("dragover", function binDragOver(e){
    e.preventDefault()
})

bincontainer.addEventListener("drop", function binDrop(e){
    e.preventDefault()
    draggedcard.remove()
    draggedcard = null;
    this.style.backgroundColor = 'transparent'
})

//--------------Bin stuff---------------------

//--------------Window/popup stuffs-------------



$(document).on('click','#cancelbutt', function(e){
    $('.popup').remove()
})

$(document).on('click', '.card', function(e){
    var selectedcard = $(this);
    $(document.body).append(`<div class="popup"><div class="window"><input type="text" class="textinput" value="${selectedcard.find('.cardtext').html()}"><br><input type="button" class="button" value="Save" id="savecardname"><input type="button" class="button" value="Cancel" id="cancelbutt"></div></div>`);
    $(document).on('click','#savecardname', function(e){
        selectedcard.find('.cardtext').text($('.textinput').val());
        $('.popup').remove()
        selectedcard = null;
        return;
    });
})

$(document).on('click', '.addcard', function(){
    $(document.body).append('<div class="popup"><div class="window"><input type="text" class="textinput" value="Card title."><br><input type="button" class="button" value="Create" id="createcardbutt"><input type="button" class="button" value="Cancel" id="cancelbutt"></div></div>');
    selectedlist = $(this).parent();
    $(document).on('keyup', function(e) {
        if(e.key == "Escape"){
            $('.popup').remove()
        }
    })
})

$(document).on('click', '#createcardbutt', function(e){
    e.preventDefault()
    $(selectedlist).find('.cardscontainer').append(`<div class="card" draggable="true"><p class="cardtext">${$(this).parent().find(".textinput").val()}</p></div>`);
})

//--------------Window/popup stuffs-------------

//--------------List Dragging--------------------

$(document).on('dragstart', '.list', function(e){
    if(dragmode == null){
        dragmode = 0;
        draggedlist = $(this);
    }
})

$(document).on('dragstart', '.card', function(e){ 
    if(dragmode == null){
        dragmode = 1;
        draggedcard = $(this);
    }
})

$(document).on('dragover', '.list', function(e){
    e.preventDefault();  
    if(dragmode == 0){
        if($(this).index() == 1){
            $(this).before(draggedlist);
        }else{
            $(this).after(draggedlist);
        }
    }else if(dragmode == 1){
        $(this).find('.cardscontainer').append(draggedcard)
    }
})

$(document).on('drop', '.list', function(e){
    e.preventDefault();
    if(dragmode == 0){
        if($(this).index() == 1){
            $(this).before(draggedlist);
        }else{
            $(this).after(draggedlist);
        }
        dragmode = null;
        draggedlist = null;
    }
    else if(dragmode == 1){
        $(this).find('.cardscontainer').append(draggedcard)
        dragmode = null;
        draggedcard = null;
    }
    
})

//--------------List Dragging--------------------

/* $(document).on('dragover', '.list', function(e){
    $(this).find('.cardscontainer').append(draggedcard)
}) */

/* $(document).on('drop', '.list', function(e){
    
})
 */

