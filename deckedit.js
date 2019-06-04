$(document).ready(function() {
    var cardsSource = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace("name"),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        identity: function(obj) { return obj.name },
        local: cards
    });

    $('#card').typeahead({
        hint: true,
        highlight: true,
        minLength: 1
    },
    {
        name: 'cards',
        display: 'name',
        source: cardsSource
    });
});
