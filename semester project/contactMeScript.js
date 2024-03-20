$(function () {
    $("#submitBtn").click(btnClicked);
  });
  
  function btnClicked() {
    let email = $("#email").val();
  //   let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  
    let comments = $("#comment").val();
  
    // email validation
    if (!email) {
      $("#email").addClass("error");
      $("#email").attr("placeholder", "Email cannot be empty");
    } else if (!emailPattern.test(email)) {
      $("#email").addClass("error");
      $("#email").val(""); // Clear invalid email
      $("#email").attr("placeholder", "Invalid email format");
    } else {
      // Email is valid, remove error class and placeholder
      $("#email").removeClass("error");
      $("#email").attr("placeholder", "");
    }
  
    if (!comments) {
      $("#comment").addClass("error");
      $("#comment").attr("placeholder", "Leave some comment");
    }
    else{
      $("#comment").removeClass("error");
      $("#comment").attr('placeholder', '');
    }
    if (email && emailPattern.test(email) && comments) {
      $("#email").val("");
      $("#comment").val("");
      $("#submitBtn").hide();
      $("#responseSubmitted").html("Your response has been submitted");
  }
  }
  
  // window.onload = function () {
  //   let submitBtn = document.getElementById("submitBtn");
  //   submitBtn.addEventListener("click", function () {
  //     console.log("btn clicked");
  //   });
  // };
  