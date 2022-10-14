

$(document).ready(function () {
    // <===========================Navigation start======================================>

    $('#searchIcon').on("click", function (e) {
        $('#searchBox').show(500);
    })
    
    // <===========================Navigation end======================================>
    
    totalItems = $('<span>').attr("id", "totalItemsLogo").text("0");
    $('body').append(totalItems);
    
    checkoutDetails = $('#checkoutDetails');
    checkoutLeft = $('<div>').attr('id','checkoutLeft');
    checkoutRight = $('<div>').attr('id','checkoutRight');
    
    url = location.search;
    if (url.split('').length > 1) {
        queryParams = url.split('?');
        productsString = queryParams[1];
        productsArray = productsString.split(',');
        totalItems.text(productsArray.length);
        $('#totalItems').text("Total items: " + productsArray.length);
        $('#shoplaneLogo').attr('href', '/Assignment_Js_Final/FrontPage/index.html?' + productsString)
        $('#clothsCat').attr('href', '/Assignment_Js_Final/FrontPage/index.html?' + productsString)
        $('#accCat').attr('href', '/Assignment_Js_Final/FrontPage/index.html?' + productsString)
        
        var unique = productsArray.filter(function (itm, i, a) {
            return i == a.indexOf(itm);
        });
        console.log(unique);
    
        var count = {}
        productsArray.forEach(element => {
            count[element] = (count[element] || 0) + 1;
        });
        
        // console.log(productsArray);
        // console.log(count);

        $.ajax({
            url: "https://5d76bf96515d1a0014085cf9.mockapi.io/product",
            method: "GET",
            success: function(checkoutData){
                console.log(checkoutData);
    
                for (var i = 0; i < checkoutData.length; i++) {
                    for(var j = 0;j < unique.length;j++){
                        if(checkoutData[i].id == unique[j]){
                            productImage = $('<img>').attr('src',checkoutData[i].preview);
                            productTitle = $('<h3>').text(checkoutData[i].name);
                            z = Object.values(count)
                            productCount = $('<p>').text("x " + z[j]);
                            price = checkoutData[j].price * z[j];
                            totalAmount = totalAmount + price;
                            // console.log(price)
                            productPrice = $('<p>').text("Amount : Rs " + price);
                            checkoutItemsDetails = $('<div>').addClass('checkout_items_details').append(productTitle, productCount, productPrice)
                            checkoutItems = $('<div>').append(productImage, checkoutItemsDetails).addClass('checkout_items');
                            checkoutLeft.append(checkoutItems);
                        }
                        // y = count.values(count)
                        // var price = checkoutData[j].price * count.z;
                        // console.log(price)
                    }
            
                }
    
                checkoutDetails.append(checkoutLeft, checkoutRight);
    
                checkoutTAHead = $('<h2>').text('Total Amount');
                checkoutTA = $('<p>').text('Amount : Rs ').append($('<span>').text(totalAmount));
                placeOrder = $('<button>').append($('<a>').text('Place Order').attr('href','/Assignment_Js_Final/OrderSuccesPage/index.html'));
                checkoutRight.append(checkoutTAHead, checkoutTA, placeOrder)
    
                // placeOrder.on('click', function())
            }
        })
    }else{
        checkoutDetails.append('<div>').text("Cart is Empty").css("font-size","30px").css("text-align","center").css("display","block").css("padding-bottom","5%")
    }

    // console.log(productsString)


    
    totalAmount =0;



})
