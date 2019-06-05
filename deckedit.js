var deck = {}

$(document).ready(function () {
    var cardsSource = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace("name"),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        identity: function (obj) { return obj.name },
        local: cards
    });

    var deckTotal = 0;
    var cardTemplate = _.template(`
        <div id="<%= cardId %>" class="row tcg-card">
            <div class="col-8">
                <button id="<%= cardId %>-close" type="button" class="close tcg-close mr-3" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <%= name %>
            </div>
            <div class="col">
                <button id="<%= cardId %>-decrement" class="btn btn-secondary btn-sm">-</button>
                <span id="<%= cardId %>-count" class="ml-2 mr-2">1</span>
                <button id="<%= cardId %>-increment" class="btn btn-secondary btn-sm">+</button>
            </div>
        </div>
    `);
    var nextCardId = 0;

    $('#tcg-card-input').typeahead({
        hint: true,
        highlight: true,
        minLength: 1
    },
        {
            name: 'cards',
            display: 'name',
            source: cardsSource
        });
    $('#tcg-add-card').click(function () {
        addCard($('#tcg-card-input').typeahead('val'));
    })
    $('#tcg-card-input').keypress(function (e) {
        if (e.which === 13) {
            $(this).attr("disabled", "disabled")

            addCard($('#tcg-card-input').typeahead('val'));

            $(this).removeAttr("disabled");
        }
    })

    function addCard(name) {
        if (deck[name] !== undefined || deckTotal >= 60) {
            return;
        }

        var card = _.findWhere(cards, { name: name });
        if (card == undefined) {
            return
        }

        deck[name] = {
            name: name,
            byte: card.byte,
            count: 1
        };
        deckTotal++;

        createCardElement(name);
        $('#deck-count').text(deckTotal);
    }

    function createCardElement(name) {
        var card = deck[name];
        if (card === undefined) {
            return;
        }

        var cardId = "tcg-card-" + getNextCardId();
        var cardHtml = cardTemplate({
            name: card.name,
            cardId: cardId
        });

        $('#deck-edit-cards').append(cardHtml);

        var cardSelector = "#" + cardId;
        $(cardSelector + '-close').click(function () {
            deckTotal -= deck[card.name].count;
            deck[card.name] = undefined;
            $(cardSelector).detach();
            $('#deck-count').text(deckTotal);
        });
        $(cardSelector + '-decrement').click(function () {
            deck[card.name].count--;
            deckTotal--;
            if (deck[card.name].count <= 0) {
                deck[card.name] = undefined;
                $(cardSelector).detach();
            } else {
                $(cardSelector + '-count').text(deck[card.name].count);
                $('#deck-count').text(deckTotal);
            }
        });
        $(cardSelector + '-increment').click(function () {
            if (deckTotal >= 60) {
                return;
            }
            deck[card.name].count++;
            deckTotal++;
            $(cardSelector + '-count').text(deck[card.name].count);
            $('#deck-count').text(deckTotal);
        });
    }

    function getNextCardId() {
        return nextCardId++;
    }
});
