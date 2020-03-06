new Vivus(
    'svg-icon',
    {
      type: 'delayed',
      duration: 100
    }
);

function myFunction() {
  let inputs = document.querySelectorAll("[data-rule]");

  for (let i = 0; i < inputs.length; i++) {
    let rule = inputs[i].dataset.rule;
    let elem = inputs[i];
    if (rule == "gender" && !inputs[i].checked) {
      $(".cell").has("[data-rule=gender]").addClass("nevalid");
    }
    else if (!elem.checkValidity()) {
      elem.classList.add('nevalid');
    }
  }
}

$(document).ready(function () {
  let inputs = document.querySelectorAll("[data-rule]");

  for (let i = 0; i < inputs.length; i++) {
    let rule = inputs[i].dataset.rule;
    let elem = inputs[i];
    if (rule == "gender") {
      elem.addEventListener("click", function () {
        $(".cell").has("[data-rule=gender]").removeClass("nevalid");
      })
    } else {
      elem.addEventListener("blur", function () {
        if (this.checkValidity()) {
          if (this.getAttribute("data-rule") == 'email') {
            this.classList.add('valid');
          }
          this.classList.remove('nevalid');
          this.setCustomValidity("");
          if (this.getAttribute("data-rule") == 'password2') {
            if (this.value !== document.getElementById("password1").value) {
              this.setCustomValidity('Пароли не совпадают!');
              this.classList.add('nevalid');
            }
          }
        } else if (this.getAttribute("data-rule") == 'email') {
          this.classList.remove('valid');
          this.classList.add('nevalid');
        } else if (this.getAttribute("data-rule") == 'password1') {
          this.classList.add('nevalid');
          this.setCustomValidity("Пароль должен содержать от 8 символов, заглавные и строчные буквы, а также цифры");
        }
        else
          this.classList.add('nevalid');
      })
      elem.addEventListener("input", function () {
        this.classList.remove('nevalid');
        this.setCustomValidity("");
      })
    }
  }
  $('form').submit(function (e) {
    e.preventDefault();

    $.ajax(
        {
          type: "POST",
          url: "./form.php",
          data: $(this).serialize(),
          success: function (data) {
            document.getElementById("elem").style.display = "none";
            document.getElementById("svg-icon").style.display = "none";
            document.getElementById("wrap-modal").style.display = "block";
            document.getElementById("form").reset();
          },
          error: ErrorHandler
        }
    )

    function ErrorHandler(StatusStr, ErrorStr) {
      console.log(StatusStr + ' ' + ErrorStr);
      let batton = document.getElementById("move");
      batton.classList.toggle("move");
      setTimeout(function () {
        batton.classList.toggle("move");
      }, 1000)
    }
  });
});


