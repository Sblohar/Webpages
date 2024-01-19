odoo.define('website_rdc.Register_form', function (require) {
    'use strict';

    const dom = require('web.dom');
    const publicWidget = require('web.public.widget');


    publicWidget.registry.register_form1 = publicWidget.Widget.extend({
        selector: '.register_form1',
        events: {
            'change #country_id': '_onchangeCountry',
            'change #state_id': '_onchangeState',
            'focusout #email_id': '_validemail',
            'focusout #password_id': '_validatePassword',
            'keyup #confirmPassword': '_matchPasswords',
            'click .create_user_btn-test': '_onclick_create_user'

        },

        start: function () {
            debugger
            console.log("TEST")
        },

          _onchangeCountry: function(ev) {

          debugger
               const country_id =  parseInt($(ev.currentTarget).val());
               $('#state_id option').each(function(){
                   var countryID = parseInt($(this).attr('country'));
                   if(country_id !== countryID){
                     $(this).addClass('d-none');
                   }
                   if(country_id === countryID){
                     $(this).removeClass('d-none');
                   }

               })

          },

        _onchangeState: function(ev) {
            var stateID = $(ev.currentTarget).val();
            var Country = $(ev.currentTarget).find(":selected").attr('country');
            if (Country)
                $('#country_id').val(Country);
        },


          _validemail: function (ev) {
              const enteredEmail = $('.email_list').val();
                const emailList = [];

                let emailExists = $('.email_list').val().includes(ev.currentTarget.value);

                if (emailExists) {
                         document.getElementById("email-warning-already-exist").classList.remove("d-none");
                         document.getElementById("email-already").classList.add("d-none");

                 } else {
                        document.getElementById("email-already").classList.remove("d-none");
                        document.getElementById("email-warning-already-exist").classList.add("d-none");
                 }
            },

           _validatePassword: function (ev) {
             const password = ev.currentTarget.value;

                const passwordPattern = /^(?=.*\d)(?=.*[$&+,:;=?@#|'<>.^*()%!-])(?=.*[A-Z])(?=.*[a-z]).{8,}$/;

                if (passwordPattern.test(password)) {
                      document.getElementById('passwordError').style.color = 'green';
                      document.getElementById('passwordError').innerHTML
                                    = 'Password is valid';
                } else {
                     document.getElementById('passwordError').style.color = 'red';
                     document.getElementById('passwordError').innerHTML
                                    = 'Please enter a valid password';
                }

           },

            _matchPasswords: function (ev) {

                const confirmPassword = ev.currentTarget.value;
                const password = document.getElementById('password_id').value;

                if (password !== confirmPassword) {
                    document.getElementById('confirmPasswordMessage').style.color = 'red';
                    document.getElementById('confirmPasswordMessage').innerHTML
                            = 'Use same password';

                } else {
                        document.getElementById('confirmPasswordMessage').style.color = 'green';
                        document.getElementById('confirmPasswordMessage').innerHTML =
                         'Password Matched';

                }
            },

            _onclick_create_user: function (){

                     let record = this._record_data_value();
                        $.ajax("/create_record", {
                                data: record,
                                type: 'POST',
                                dataType: 'json',
                                success: function (data) {

                                },
                                error: function (error) {
                                }
                        })
                  },

             _record_data_value: function () {
                  debugger

                      let record_data = {};
                    record_data['first_name'] = $('#first_name').val();
                    record_data['last_name'] = $('#last_name').val();

                    return record_data;
                },

    })


});



