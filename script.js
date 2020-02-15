let fieldsCheck;

// checks secrets for the name jihaan
function checkSecret(strVal){
    let pat = /^[jJ]{1}[iI]{1}[hH]{1}[aA]{1}[aA]{1}[nN]{1}$/;
    if (pat.test(strVal)) {
        return true;
    } 
    return false;
}

// checks secrets for all the game characters
/**
 * names which are already used for characters
 * 
 * akuma, alex, balrog, birdie, bison, cammy, chunli, dhalsim, fang, guile, ibuki, juri, karin, ken, kolin, laura, mika, nash, necalli, rashid, ryu, urien, vega, zangief
 */
function checkGameChar(strVal){
    let pat = /^[rRaAbBcCdDfFgGiIjJkKlLmMnNuUvVzZ]{0,1}[yYkKlLaAiIhHuUbBeEoOrR]{0,1}[uUeElLrRsSmMaAnNiIkKcCgG]{0,1}[mMxXrRdDoOnNlLgGkKiIaAhHeE]{0,1}[aAoOiInNyYlLsSeE]{0,1}[gGeEnNiIlLdD]{0,1}[mMiIfF]{0,1}$/;
    if (pat.test(strVal)) {
        return true;
    } 
    return false;
}

// checks name
function checkChars(strVal){
    let pat = /^[a-zA-Z]+$/;
    if (pat.test(strVal)) {
        return true;
    } 
    return false;
}

// check gender dropdown
function checkGen(strVal) {
    let pat = /^[0-1]{1}$/;
    if (pat.test(strVal)) {
        return true;
    } 
    return false;
}

// checks age
function checkNums(strVal){
    let pat = /^[0-9]{1,3}$/;
    if (pat.test(strVal)) {
        return true;
    } 
    return false;
}

// checks username
function checkUserName(strVal){
    let pat = /^[a-zA-Z0-9]+$/;
    if (pat.test(strVal)) {
        return true;
    } 
    return false;
}

// checks password
function checkPassword(strVal){
    let pat = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
    if (pat.test(strVal)) {
        return true;
    } 
    return false;
}

// reset fields
function errorReset() {
    fieldsCheck.forEach(inputField => {
        inputField.error.innerText = "";
    });
}

// formChecker to check the inputfields
function formChecker(e) {
    e.preventDefault();
    errorReset();
    let errorDetected = 0;
    let jihaanSecret = document.querySelector("#secretMessageForJihaan");
    let container = document.querySelector(".container");
    let displayMessages = document.querySelector("#displayMessages");
    let welcome = document.querySelector("#welcome");
    let holdAudio = document.querySelector("#hold");
    let body = document.querySelector("body");

    function hideContainer() {
        container.style.display = "none";
        displayMessages.style.display = "block";
    }

    fieldsCheck.forEach(inputField => {
        if(inputField.checker(inputField.field.value)==false){
            inputField.error.innerText = inputField.msg;
            errorDetected +=1;
        }
    });
    if(errorDetected>0){
        console.log(`Hey Friend! Correct those errors! :D `);
    }else{
        let showSecretTrue = checkSecret(document.querySelector("#firstName").value);
        let charSecret = checkGameChar(document.querySelector("#firstName").value);

        if (showSecretTrue) {
            // container.style.display = "none";

            TweenMax.fromTo(container, 1, {
                opacity: 1,
                scale: 1
            },{
                opacity:0,
                scale: 0,
                yoyo: true,
                ease: "elastic.Out"
            });
            
            TweenMax.fromTo(jihaanSecret, 1, {
                opacity: 0,
            },{
                opacity:1,
                delay: 2,
            });

            body.style.backgroundImage = "url('./images/birthdayBg.jpg')";
            displayMessages.style.display = "block";
            let birthdayAudio = document.querySelector("#birthdayAudio");
            birthdayAudio.play();
            console.log("Hey Jihaan... Welcome to Street Figher and Your Uncle wants to wish you Happy Birthday!!!");
        }else{
            if(charSecret) {
                let ryu = document.querySelector("#ryu");
                hideContainer();
                ryu.style.display = "block";
                holdAudio.play();
            }else{
                hideContainer();
                welcome.style.opacity = "1";
                welcome.style.display = "block";
                console.log("You are from planet EARTH!");
            }
        }
    }
    // if(checkAkuma){
    //     let akuma = document.querySelector("#akuma");
    //     hideContainer();
    //     akuma.style.display = "block";
    //     holdAudio.play();
    // }
}

function initForm() {
    
    // reference to all the fields
    let firstName = document.querySelector("#firstName");
    let firstNameError = document.querySelector("#firstNameError");
    let lastName = document.querySelector("#lastName");
    let lastNameError = document.querySelector("#lastNameError");
    let gender = document.querySelector("#gender");
    let genderError = document.querySelector("#genderError");
    let age = document.querySelector("#age");
    let ageError = document.querySelector("#ageError");
    let userName = document.querySelector("#userName");
    let userNameError = document.querySelector("#userNameError");
    let createPassword = document.querySelector("#createPassword");
    let createPasswordError = document.querySelector("#createPasswordError");
    let confirmPassword = document.querySelector("#confirmPassword");
    let confirmPasswordError = document.querySelector("#confirmPasswordError");
    let formSubmit = document.querySelector("#formSubmit");

    // confirm password checker
    function checkConfirmPass(strVal) {
        if (createPassword.value == confirmPassword.value) {
            return true;
        } else {
            return false;
        }
    }

    // array of objects
    fieldsCheck = [
        {field:firstName,checker:checkChars,error:firstNameError,msg:`▲ Please enter your first name! ▲`},
        {field:lastName,checker:checkChars,error:lastNameError,msg:`▲ Please enter your last name! ▲`},
        {field:gender,checker:checkGen,error:genderError,msg:`▲ Please select your gender! ▲`},
        {field:age,checker:checkNums,error:ageError,msg:`▲ Please enter your age. ▲`},
        {field:userName,checker:checkUserName,error:userNameError,msg:`▲ Please enter your user name. ▲`},
        {field:createPassword,checker:checkPassword,error:createPasswordError,msg:`▲ Please enter Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character ▲`},
        {field:confirmPassword,checker:checkConfirmPass,error:confirmPasswordError,msg:`▲ Passwords are not matching. Please fix it. ▲`}
    ];

    formSubmit.addEventListener("click", formChecker);
}

document.addEventListener("DOMContentLoaded", function(){
    console.log("BORK!");
    initForm();
});