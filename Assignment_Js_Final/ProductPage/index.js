

$(document).ready(function () {
    // <===========================Navigation start======================================>

    $('#searchIcon').on("click", function (e) {
        $('#searchBox').show(500);
    })

    // <===========================Navigation end======================================>

    // <===========================Product Page Start======================================>
    var products = [];
    var queryParams = location.search;
    if(queryParams.split('').length > 12){
        var queryParamsArray = queryParams.split("_");
        var productsString = queryParamsArray[0].split("?");
        var productsArray = productsString[1];
        products = productsArray.split(",")
        console.log(products);
        var productIdArray = queryParamsArray[1];
        var productId = productIdArray[productIdArray.length - 1]
    }else{
        queryParamsArray = queryParams.split("");
        productId = queryParamsArray[queryParamsArray.length - 1]
    }
    console.log(productId);

    $.ajax({
        url: "https://5d76bf96515d1a0014085cf9.mockapi.io/product/" + productId,
        method: "GET",
        success: function (productData) {
            // console.log(productData);

            $('#productPreview').attr('src', productData.preview)

            var productName = $('<div>').text(productData.name);

            var productBrand = $('<div>').text(productData.brand);

            var productPrice = $('<div>').text("Price: Rs ");

            productPrice.append($('<p>').text(productData.price));

            var productDescription = $('<h2>').text("Description");
            productDescription.append($('<p>').text(productData.description));

            var productPreview = $('<div>').text("Product Preview");
            var productPreviewPhotos = $('<div>').attr('id', 'productPreviewPhotos');

            for (var i = 0; i < productData.photos.length; i++) {
                productPreviewPhotos.append($('<img>').attr('src', productData.photos[i]).attr('id', i))
            }

            productPreview.append(productPreviewPhotos);

            var addToCart = $('<button>').text("Add to Cart");

            $('#productDetails').append(productName, productBrand, productPrice, productDescription, productPreview, addToCart)

            $('#0').css("border", "2px solid #009688");

            productPreviewPhotos.on("click", function (e) {
                for (var i = 0; i < productData.photos.length; i++) {
                    // console.log(e.target.id)
                    if (e.target.id !== "productPreviewPhotos") {
                        if (e.target.id != i) {
                            $('#' + i).css("border", "0px solid #009688")
                            // console.log("a")
                        } else {
                            $('#' + i).css("border", "2px solid #009688")
                            $('#productPreview').attr("src", productData.photos[i]);
                            // console.log("b")
                        }

                    }
                }
            })

            var totalItems = $('<span>').attr("id", "totalItems").text("0");
            $('body').append(totalItems);

            console.log(products.length)
            if(products.length === 0){
                totalItems.hide();
            }
            totalItems.text(products.length)
            $('#cartLogo').attr('href','/Assignment_Js_Final/CheckOut_Page/index.html?' + products.toString());

            addToCart.on("click", function (e) {

                addToCart.addClass("bigger");
                setTimeout(() => {
                    addToCart.removeClass("bigger");
                    
                }, 200);

                products.push(productId);
                console.log(products.length);
                totalItems.text(products.length)
                if(products.length != 0){
                    totalItems.show();
                }
                var productQuery = products.toString()
                $('#shoplaneLogo').attr('href','/Assignment_Js_Final/FrontPage/index.html?' + productQuery);
                $('#clothsCat').attr('href','/Assignment_Js_Final/FrontPage/index.html?' + productQuery);
                $('#accCat').attr('href','/Assignment_Js_Final/FrontPage/index.html?' + productQuery);
                $('#cartLogo').attr('href','/Assignment_Js_Final/CheckOut_Page/index.html?' + productQuery);
            })
        }
    })

    // <===========================Product Page End======================================>
})

