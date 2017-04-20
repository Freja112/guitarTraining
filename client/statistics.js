Template.statistics.helpers(
    {
        training: function() {
            return Training.find({"user._id": Meteor.user()._id}).fetch();
        }
    }
);

Template.statistics.rendered = function() {
    if(!this._rendered) {
        this._rendered = true;
        $('#menu_st').addClass('active');
        $('#menu_tr').removeClass('active');
    }
};