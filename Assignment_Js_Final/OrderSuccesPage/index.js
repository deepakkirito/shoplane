
// <===========================Navigation start======================================>

$(document).ready(function(){
    
    $('#searchIcon').on("click", function(e){
        $('#searchBox').show(500);
    })

    // <===========================Navigation end======================================>
    
    orderPlaced = $('#orderPlaced');
    
    setInterval(function () {
       
        orderPlaced.toggleClass('bigger')
    }, 1000);

    

})
