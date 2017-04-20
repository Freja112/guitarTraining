Template.modal.helpers({
    duringTime: function () {
        var obj = Session.get('resultData') || {};
        return obj.duringTime;
    },
    correct: function() {
        var obj = Session.get('resultData') || {};
        return obj.correct;
    },
    correctRate: function() {
        var obj = Session.get('resultData') || {};
        return obj.correctRate;
    }
});