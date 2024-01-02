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

        },
        start: function () {

        },

          _onchangeCountry: function(ev) {
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
        debugger
            var stateID = $(ev.currentTarget).val();
            var Country = $(ev.currentTarget).find(":selected").attr('country');
            if (Country)
                $('#country_id').val(Country);
        },


        _validemail: function (ev) {
            debugger
           const enteredEmail = $('.email_list').val();
           const emailList = $('.email_list');

//           let emailExists = $('.email_list').val();
           let emailExists = false;

            emailList.each(function () {
            if ($(this).text() === enteredEmail) {
            emailExists = true;
            return false;
            }
        });

            if (emailExists) {
                alert('Email already exists!');
            } else  {
                alert('Email does not exist!');
            }
        },


    });


});

