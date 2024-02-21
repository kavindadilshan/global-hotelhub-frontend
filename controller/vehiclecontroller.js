
function filterResult() {

    console.log(Cookies.get('token'));

    let location = document.getElementById("location").value.trim();
    let brand = document.getElementById("brand").value.trim();
    let condition = document.getElementById("condition").value.trim();
    let fuelType = document.getElementById("fuelType").value.trim();
    let year = document.getElementById("year").value.trim();

    let token=Cookies.get('token');
    let userId=Cookies.get('id');

    let ajaxConfig = {
        method: "POST",
        url: Server + "/v1/vehicle/filter",
        async: true,
        crossDomain: true,
        processData: false,
        headers: {
            Authorization: 'Bearer' + ' ' + token,
            "Content-Type": "application/json",
        },
        data: JSON.stringify({
            "userId": userId,
            "location": location.toLowerCase(),
            "brand": brand.toLowerCase(),
            "condition": condition.toLowerCase(),
            "fuelType": fuelType.toLowerCase(),
            "year": year

        })
    }
    window.swal({
        title: "Loading...",
        text: "Please wait",
        imageUrl: "images/loading.gif",
        showConfirmButton: false,
        allowOutsideClick: false
    });


    $.ajax(ajaxConfig).done(function (response) {

        $("#grid").empty();

        if (response.success === true) {

            swal.close();

            if(response.body.length === 0){

                let x = "<div style='text-align: center'><h2>Results Not Found</h2></div>";


                $("#grid").append(x);
            }

            for (let i = 0; i < response.body.length; i++) {


               var x =" <li class=\"item col-lg-4 col-md-3 col-sm-4 col-xs-6\">\n" +
                     "                                        <div class=\"item-inner\">\n" +
                     "                                            <div class=\"item-img\">\n" +
                     "                                                <div class=\"item-img-info\">\n" +
                     "                                                    <img\n" +
                     "                                                            src="+response.body[i].image+" alt=\"Retis lapen casen\">\n" +
                     "                                                    <div class=\"item-box-hover\">\n" +
                     "                                                    </div>\n" +
                     "                                                </div>\n" +
                     "                                            </div>\n" +
                     "                                            <div class=\"item-info\">\n" +
                     "                                                <div class=\"info-inner\">\n" +
                     "                                                    <div class=\"item-title\">\n" +
                     "\n" +
                     "                                                        <a title=\"Retis lapen casen\">"+response.body[i].title+"</a></div>\n" +
                     "                                                    <div class=\"item-content\">\n" +
                     "                                                        <div class=\"item-price\">\n" +
                     "                                                            <div class=\"price-box\"><span class=\"regular-price\"><span\n" +
                     "                                                                    class=\"price\">"+response.body[i].price+"</span> </span></div>\n" +
                     "                                                        </div>\n" +
                     "                                                        <div class=\"other-info\">\n" +
                     "                                                            <div class=\"col-km\"><i class=\"fa fa-location-arrow\"></i> "+response.body[i].address+"n" +
                     "                                                            </div>\n" +
                     "                                                            <div class=\"col-engine\"><i class=\"fa fa-calendar-times-o\"></i> "+response.body[i].dateTime+"\n" +
                     "                                                            </div>\n" +
                     "                                                            <div class=\"col-date\"><i class=\"fa fa-chrome\"\n" +
                     "                                                                                     aria-hidden=\"true\"></i> "+response.body[i].publishSite+"\n" +
                     "                                                            </div>\n" +
                     "                                                        </div>\n" +
                     "                                                    </div>\n" +
                     "                                                </div>\n" +
                     "                                            </div>\n" +
                     "                                        </div>\n" +
                     "                                    </li>";


                $('#grid').append(x);

            }

        }

    }).fail(function (text) {
        swal({
            title: "Sorry",
            text: "Something went to wrong !",
            type: "error"
        }, function () {
            window.location = "login.html";
        });
    }, 800);


}