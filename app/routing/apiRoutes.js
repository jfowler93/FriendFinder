// Dependencies
var friends = require('../data/friends.js');

// Export the function
module.exports = function(app) {

    // Sets the get for the api/friends route
    app.get('/api/friends', function(req, res) {
        res.json(friends);
    });

    // Set the post for the api/friends route
    app.post('/api/friends', function(req, res) {
    
        var difference = 40;
        var matchName = '';
        var matchPhoto = '';

        // For-each loop to go through the data in friends.js to find a match
        friends.forEach(function(friend) {
        		// Variables for comparing matches
            var matchedScoresArr = [];
            var totalDifference = 40;

            // Function to assist in the addition reduce() below
            function add(total, num) {
                return total + num;
            }

            for (var i = 0; i < friend.scores.length; i++) {
                matchedScoresArr.push(Math.abs(parseInt(req.body.scores[i]) - parseInt(friend.scores[i])));

            }

            // This reduces the matched scores array into a single value in a variable
            totalDifference = matchedScoresArr.reduce(add, 0);

          
            if (totalDifference < difference) {
                difference = totalDifference;
                matchName = friend.name;
                matchPhoto = friend.photo;
            }
        });
        
        res.json({
            name: matchName,
            photo: matchPhoto
        });

        // This adds new user data object to friends json
        friends.push(req.body);
        res.json(true)
    });
}