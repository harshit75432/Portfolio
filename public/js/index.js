// -------------------- About -----------------------
var tabLinks = document.getElementsByClassName('tab-links');
var tabContents = document.getElementsByClassName('tab-contents');
let contactForm = document.getElementById('contact-form')
let name = document.getElementById('full-name')
let email = document.getElementById('email')
let message = document.getElementById('message') 
let alert = document.getElementById('alert')
function openTab(tabName) {
    
    for(let tabLink of tabLinks) {
        tabLink.classList.remove("active-link");
    }

    for(let tabContent of tabContents) {
        tabContent.classList.remove("active-tab");
    }

    event.currentTarget.classList.add('active-link');
    document.getElementById(tabName).classList.add('active-tab');
}

// ---------------- JS for Mobile Menu ------------------
var mobileMenu = document.getElementById("mobile-menu");
function openMenu() {
    mobileMenu.style.right = "0px";
}

function closeMenu() {
    mobileMenu.style.right = "-400px";
}

contactForm.onsubmit=(e)=>{
    e.preventDefault()
    let params = {
        from_name : name.value,
        email_id : email.value,
        message : message.value,
        reply_to : email.value
    }

    emailjs.send("service_x7fivbr","template_v34m0wa",params)
    .then(function(){
        console.log('SUCCESS!');
    }, function(error) {
        console.log('FAILED...', error);
    });
    
    const xhr = new XMLHttpRequest();
    xhr.open("POST",'', true);
    
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    
    xhr.onreadystatechange = () => {
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            let res = JSON.parse(xhr.response)
            if(res.status){
                name.value = ''
                email.value = ''
                message.value = ''
                alert.style.display = 'block'
                setTimeout(()=>{
                    alert.style.display = 'none'
                },5000)
            }
        }
    }

    let json = JSON.stringify({
        name : name.value,
        email : email.value,
        message : message.value  
   });
  
    xhr.send(json);
}