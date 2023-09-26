const exploreTable = document.querySelector('main div[role=table][aria-label="Explore Table"]');

// handle all clicks on the explore table, since rows are dynamically added and removed
exploreTable.addEventListener('dblclick', function(event) {
    // search parent nodes to try and find a cell that was clicked
    let currentEl = event.target
    let stillSearching = true;
    while (stillSearching && currentEl != exploreTable && currentEl != document.body) {
        if (currentEl.getAttribute('role') == "cell") {
            // we've found the cell, let's print the contents to the console
            stillSearching = false;
            const rawContent = currentEl.textContent;
            try {
                // if it's JSON, we can display it nicely
                const json = JSON.parse(rawContent);
                // const formatted = JSON.stringify(json, null, 2);
                console.log(json);
            } catch (e) {
                // we can also try and see if it is a date
                // yyyy-mm-dd hh:mm:ss
                const dateTimeTest = /\d{4}-[01]\d-[0-3]\d [0-1]\d:[0-5]\d:[0-5]\d/
                if (dateTimeTest.test(rawContent)) {
                    console.log(rawContent, " = ", new Date(rawContent));
                } else {
                    console.log(currentEl.textContent);
                }
            }
        }
        currentEl = currentEl.parentElement;
    }
});