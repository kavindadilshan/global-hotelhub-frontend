


/**
 * make new user registration
 */

function registerNewUser() {

    let name = document.getElementById("fullname").value.trim();
    let email = document.getElementById("email").value.trim();
    let contact = document.getElementById("contactnumber").value.trim();
    let password = document.getElementById("password").value.trim();


    if (name === "") {
        studentRegistrationCommonErrorAler('please enter full name');
    } else if (contact === "") {
        studentRegistrationCommonErrorAler('please enter contact number');
    } else if (email === "") {
        studentRegistrationCommonErrorAler('please enter email');
    } else if (password === "") {
        studentRegistrationCommonErrorAler('please enter password');
    } else {
        let ajaxConfig = {
            method: "POST",
            url: Server + "/v1/user",
            async: true,
            crossDomain: true,
            processData: false,
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify({
                "fullName": name,
                "userName": name,
                "mobileNumber": contact,
                "email": email,
                "password": password

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


            if (response.success === true) {
                setTimeout(function () {
                    swal({
                        title: "Success",
                        text: "Registration Successfully!",
                        type: "success"
                    }, function () {
                        swal.close();
                        window.location.href="login.html";
                    });
                });

            } else {
                setTimeout(function () {
                    swal({
                        title: "Sorry",
                        text: "Registration Fail!",
                        type: "error"
                    }, function () {
                        swal.close();
                    });
                }, 100);
            }

        });
    }


}

/**
 * update profile details
 */

function updateProfile() {

    let name = document.getElementById("fullname").value.trim();
    let contact = document.getElementById("contactnumber").value.trim();
    let email = document.getElementById("email").value.trim();

    let token=Cookies.get('token');
    let userId=Cookies.get('id');


    if (name === "") {
        studentRegistrationCommonErrorAler('please enter full name');
    } else if (contact === "") {
        studentRegistrationCommonErrorAler('please enter contact number');
    } else if (email === "") {
        studentRegistrationCommonErrorAler('please enter email');
    } else {
        let ajaxConfig = {
            method: "PUT",
            url: Server + "/v1/user/edit",
            async: true,
            crossDomain: true,
            processData: false,
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer' + ' ' + token,
            },
            data: JSON.stringify({
                "id":userId,
                "fullName": name,
                "mobileNumber": contact,
                "email": email

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


            if (response.success === true) {

                let now = new Date();
                let time = now.getTime();
                let expireTime = time + 1000 * 1800;
                now.setTime(expireTime);
                let x= now;
                //

                Cookies.set('fullName', name,{expires:x});
                Cookies.set('mobileNumber', contact,{expires:x});
                Cookies.set('email',email,{expires:x});

                setTimeout(function () {
                    swal({
                        title: "Success",
                        text: "Profile details has been updated successfully!",
                        type: "success"
                    }, function () {
                        swal.close();
                        window.location.href="index.html";
                    });
                });

            } else {
                setTimeout(function () {
                    swal({
                        title: "Sorry",
                        text: "Profile update fail!",
                        type: "error"
                    }, function () {
                        swal.close();
                    });
                }, 100);
            }

        });
    }


}

/**
 * Oauth by user
 */
// .....................login Handler..........

function login() {

    let username = document.getElementById('email').value.trim();
    let password = document.getElementById('pass').value.trim();

    if (username === "" && password === "") {

        setTimeout(function () {

            swal({
                title: "Sorry",
                text: "Please Enter Your Username and Password !",
                type: "error"
            }, function () {
                window.location = "index.html";
            });
        }, 800);

    } else{
        var ajaxConfig={
            method:"POST",
            contentType:'application/json; charset=utf-8',
            url:Server+"/api/v1/authorize",
            async:true,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: "Basic UHVibGljX3VzZXI6",
            },
            data: $.param({username: username, password: password, grant_type: 'password'
            })
        }
        $.ajax(ajaxConfig).done(function (response) {

            let now = new Date();
            let time = now.getTime();
            let expireTime = time + 1000 * 1800;
            now.setTime(expireTime);
            let x= now;
            //

            Cookies.set('token', response.access_token,{expires:x});
            Cookies.set('id', response.id,{expires:x});
            Cookies.set('fullName', response.fullName,{expires:x});
            Cookies.set('mobileNumber', response.mobileNumber,{expires:x});
            Cookies.set('email',response.email,{expires:x});

            console.log(response.access_token);
            console.log(Cookies.get('token'));

            window.location.href="index.html";
            swal.close();

        }).fail(function (text) {

            swal({
                title: "Sorry",
                text: "Please Check Your Username and Password !",
                type: "error"
            }, function () {
                window.location = "login.html";
            });
        }, 800);
    }
}

/**
 * common error alert
 * @param x
 */
// .................................................................................

function studentRegistrationCommonErrorAler(x) {
    setTimeout(function () {
        swal({
            title: "Sorry",
            text: x,
            type: "error"
        }, function () {
            swal.close();
        });
    }, 100);

}

function checktimout() {

    let token=Cookies.get('token');

    if(token === undefined ) {
        window.location.href = "login.html"
    }
}