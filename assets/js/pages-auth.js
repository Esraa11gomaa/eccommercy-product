/**
 *  Pages Authentication
 */

'use strict';
const formAuthentication = document.querySelector('#formAuthentication');

document.addEventListener('DOMContentLoaded', function (e) {
  (function () {
    // Form validation for Add new record
    if (formAuthentication) {
      const fv = FormValidation.formValidation(formAuthentication, {
        fields: {
          username: {
            validators: {
              notEmpty: {
                message: 'Please enter username '
              },
              stringLength: {
                min: 6,
                message: 'Username must be more than 6 characters'
              }
            }
          },
          email: {
            validators: {
              notEmpty: {
                message: 'Please enter your email'
              },
              emailAddress: {
                message: 'Please enter valid email address'
              }
            }
          },
          'email-username': {
            validators: {
              notEmpty: {
                message: 'Please enter email / username'
              },
              stringLength: {
                min: 6,
                message: 'Username must be more than 6 characters'
              }
            }
          },
          password: {
            validators: {
              notEmpty: {
                message: 'Please enter your password'
              },
              stringLength: {
                min: 6,
                message: 'Password must be more than 6 characters'
              }
            }
          },
          'confirm-password': {
            validators: {
              notEmpty: {
                message: 'Please confirm password'
              },
              identical: {
                compare: function () {
                  return formAuthentication.querySelector('[name="password"]').value;
                },
                message: 'The password and its confirm are not the same'
              },
              stringLength: {
                min: 6,
                message: 'Password must be more than 6 characters'
              }
            }
          },
          terms: {
            validators: {
              notEmpty: {
                message: 'Please agree terms & conditions'
              }
            }
          }
        },
        plugins: {
          trigger: new FormValidation.plugins.Trigger(),
          bootstrap5: new FormValidation.plugins.Bootstrap5({
            eleValidClass: '',
            rowSelector: '.mb-6'
          }),
          submitButton: new FormValidation.plugins.SubmitButton(),

          defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
          autoFocus: new FormValidation.plugins.AutoFocus()
        },
        init: instance => {
          instance.on('plugins.message.placed', function (e) {
            if (e.element.parentElement.classList.contains('input-group')) {
              e.element.parentElement.insertAdjacentElement('afterend', e.messageElement);
            }
          });
        }
      });

      const user = {
        username: formAuthentication.elements['username'],
        password: formAuthentication.elements['password'],
        email:    formAuthentication.elements['email']
      }
    

      function getCookie(name){
        const cookies = document.cookie.split(';')
        for(const cookie of cookies){
          const[key, value] = cookie.split('=')
          if(key === name){
            return JSON.parse(decodeURIComponent(value))
          }
        }
        return null
      }
      // إضافة حدث عند تقديم النموذج (submit)
      formAuthentication.addEventListener('submit', function (e) {
        e.preventDefault();  // إلغاء إرسال النموذج الافتراضي
        // تحقق من صحة البيانات
        fv.validate().then(function (status) {
          if (status === 'Valid') {
            document.cookie = `user=${encodeURIComponent(JSON.stringify(user))}; path=/; max-age=2592000`;
            window.location.href= './app-ecommerce-product-list.html'
          } else {
            // إذا كانت البيانات غير صحيحة، يمكنك هنا إظهار رسالة للمستخدم
            console.log('Form is invalid');
          }
        });
        
        const storedUser= getCookie('user')
          if (storedUser && storedUser.username === formAuthentication.elements['username'] && storedUser.password === formAuthentication.elements['passward'] && storedUser.emil === formAuthentication.elements['email'] )
          {
            alert('login success')
          window.location.href= './app-ecommerce-product-list.html'
          }else{
            window.location.href = 'index.html'
          }
      });
    }

    //  Two Steps Verification
    const numeralMask = document.querySelectorAll('.numeral-mask');

    // Verification masking
    if (numeralMask.length) {
      numeralMask.forEach(e => {
        new Cleave(e, {
          numeral: true
        });
      });
    }
  })();
});
