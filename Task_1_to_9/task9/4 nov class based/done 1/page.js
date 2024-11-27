class page_change {
    constructor(){ }
    open_country(){ window.location.href="country.html"}
    open_state(){ window.location.href="state.html"    }
    open_register(){ window.location.href="register.html"    }
    open_form(){
      let form= document.getElementById("register_form");
      let btn= document.getElementById("user_btn");
      btn.onclick=function(){page.close_form();};
      btn.innerText="Close Form";
      form.className="flex justify-center items-center min-h-screen block";    }
    close_form(){
      let form= document.getElementById("register_form");
      let btn= document.getElementById("user_btn");
      btn.onclick=function(){page.open_form();};
      btn.innerText="Add User";
      form.className="flex justify-center items-center min-h-screen hidden";
      location.reload();}}
  
  const page = new page_change();