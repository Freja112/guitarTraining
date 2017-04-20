Router.configure(
    {
        layoutTemplate: 'layout'
    }
);

Router.route('/', function() {
    this.render('fretboard', {
        data: function() {return ; }
    });
});

Router.route('/training', function() {
    this.render('fretboard', {
        data: function() {return ; }
    });
});

Router.route('/statistics', function() {
    this.render('statistics', {
        data: function() {return ; }
    });
});