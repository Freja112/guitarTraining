Template.navbar.events(
    {
        "click #menu_br": function(evt, tmpl) {
            $('#menu_tr').addClass('active');
            $('#menu_st').removeClass('active');
        },
        "click #menu_tr": function(evt, tmpl) {
            $('#menu_tr').addClass('active');
            $('#menu_st').removeClass('active');
        },
        "click #menu_st": function(evt, tmpl) {
            $('#menu_st').addClass('active');
            $('#menu_tr').removeClass('active');
        }
    }
);