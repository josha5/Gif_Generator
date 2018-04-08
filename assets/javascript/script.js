$(document).ready(function() {

    let topics = ["conor mcgregor", "floyd mayweather", "brock lesnar", "sage northcutt", "robbie lawler",
    "carlos condit", "rory macdonald", "tyron woodley", "stephen thompson", "jon jones", "eddie alvarez"];
 
    
    const makeButtons = function() {
        $("#fighterButtons").empty();
        for(var i = 0; i < topics.length; i++) {
            let a = $("<button>");
            $(a).attr("id", "fighterBtn");
            $(a).addClass("btn btn-primary");
            $(a).attr("data-name", topics[i]);
            $(a).text(topics[i]);
            $("#fighterButtons").append(a);

            $(a).on("click", function() { 
                let fighter = $(this).text();
                console.log(fighter);
                let queryUrl =  "https://api.giphy.com/v1/gifs/search?q=" 
                + fighter + "&api_key=gkP8twXyLGmS0U6sa82mQ1ZfjNgaeeoW&limit=10";
                console.log(queryUrl);
                $.ajax({
                    url: queryUrl,
                    method: "GET"
                }).done(function(response) {
                    let results = response.data;
                    console.log(results);
                    for(var i = 0; i < results.length; i++) {
                        let fighterDiv = $("<div class='col-md-4 mt-4'>");
                        let gifImage = $("<img>");
                        let defaultAnimatedSrc = results[i].images.fixed_height.url;
                        let staticSrc = results[i].images.fixed_height_still.url;
                        let rating = results[i].rating;
                        gifImage.attr("src", staticSrc);
                        gifImage.attr("data-animate", defaultAnimatedSrc);
                        fighterDiv.prepend(gifImage);
                        $("#gifArea").prepend(fighterDiv);
                    }
                });
            });
        }
        
    }
    makeButtons();
    
    
       
    $("#addFighter").on("click", function(e) {
        e.preventDefault();
        let addedFighter = topics.push($("#fighterInput").val());
        console.log(topics);
        makeButtons();
    });


});