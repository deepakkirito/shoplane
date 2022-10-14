

$(document).ready(function () {
    // <===========================Navigation start======================================>

    $('#searchIcon').on("click", function (e) {
        $('#searchBox').show(500);
    })

    // <===========================Navigation end======================================>

    $.ajax({
        url: "https://5d76bf96515d1a0014085cf9.mockapi.io/product",
        method: "GET",
        success: function (cardData) {

            totalItems = $('<span>').attr("id", "totalItems").text("0");
            $('body').append(totalItems);

            var products = [];
            if (products.length === 0) {
                totalItems.hide()
            }
           

            console.log(cardData);
            for (var i = 0; i < cardData.length; i++) {
                cardImage = $('<img>').attr("src", cardData[i].preview);
                cardTitle = $('<h6>').text(cardData[i].name);
                cardBrand = $('<p>').text(cardData[i].brand);
                cardPrice = $('<div>').text("Rs " + cardData[i].price);
                j = i + 1;
                cardDetails = $('<div>').attr('class', 'card_details').append(cardTitle, cardBrand, cardPrice);
                cardBody = $('<a>').attr('class', 'card_body').append(cardImage, cardDetails);
                cardBody.attr("href", "/Assignment_Js_Final/ProductPage/index.html?productId=" + j)
                if(location.search != ""||location.search != '#'||location.search != '#clothsSection'||location.search != '#accSection'){
                    var queryParams = location.search;
                    var queryParamsArray = queryParams.split("?");
                    if(queryParamsArray.length != 1){
                        console.log(queryParamsArray)
                        products = queryParamsArray[1].split(",");
                        cardBody.attr('href',"/Assignment_Js_Final/ProductPage/index.html?" + queryParamsArray[1].toString() + "_productId=" + j)
                        $('#cartLogo').attr('href','/Assignment_Js_Final/CheckOut_Page/index.html?' + queryParamsArray[1].toString())
                    }
                    // console.log(cardBody);
                    totalItems.text(products.length);
                    if (products.length != 0) {
                        totalItems.show()
                    }
                }
                
                if (cardData[i].isAccessory == true) {
                    $('#accContainer').append(cardBody)
                } else {
                    $('#clothsContainer').append(cardBody)
                }

            }

            
           
        }
    })


    // $('#clothsContainer').on("click", function (e) {
    //     console.log(e)
    // }) " + queryParamsArray[1].toString() +"/


})
