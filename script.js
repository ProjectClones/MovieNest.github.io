document.addEventListener("DOMContentLoaded", function () {
    const movieForm = document.getElementById("movieForm");
    const tableBody = document.getElementById("movieTableBody");

    // Load saved movies from local storage
    function loadMovies() {
        const movies = JSON.parse(localStorage.getItem("movies")) || [];
        tableBody.innerHTML = ""; // Clear table before reloading
        movies.forEach(addMovieToTable);
    }

    // Save movies to local storage
    function saveMovies(movies) {
        localStorage.setItem("movies", JSON.stringify(movies));
    }

    // Function to add a movie to the table
    function addMovieToTable(movie) {
        const newRow = document.createElement("tr");
        newRow.dataset.id = movie.id; // Store movie ID in row for deletion

        newRow.innerHTML = `
            <td><img src="${movie.image}" alt="Movie Poster" width="50"></td>
            <td>${movie.title}</td>
            <td><button class="btn btn-danger btn-sm delete-btn">Delete</button></td>
        `;

        tableBody.appendChild(newRow);
    }

    // Handle form submission
    movieForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Read form values
        const imageInput = document.getElementById("imageInput").files[0];
        const title = document.getElementById("titleInput").value;
        const imdb = document.getElementById("imdbInput").value;
        const year = document.getElementById("yearInput").value;
        const language = document.getElementById("languageInput").value;
        const subtitle = document.getElementById("subtitleInput").value;
        const size = document.getElementById("sizeInput").value;
        const quality = document.getElementById("qualityInput").value;
        const format = document.getElementById("formatInput").value;
        const synopsis = document.getElementById("synopsisInput").value;
        const link480p = document.getElementById("download480pInput").value;
        const link720p = document.getElementById("download720pInput").value;
        const link1080p = document.getElementById("download1080pInput").value;

        if (!imageInput) {
            alert("Please upload an image!");
            return;
        }

        // Convert image to Base64 string
        const reader = new FileReader();
        reader.readAsDataURL(imageInput);
        reader.onload = function () {
            const imageUrl = reader.result;

            // Create movie object
            const movie = {
                id: Date.now(), // Unique ID for deletion
                image: imageUrl,
                title,
                imdb,
                year,
                language,
                subtitle,
                size,
                quality,
                format,
                synopsis,
                link480p,
                link720p,
                link1080p
            };

            // Get movies from localStorage, add new movie, save back
            const movies = JSON.parse(localStorage.getItem("movies")) || [];
            movies.push(movie);
            saveMovies(movies);

            // Add movie to table
            addMovieToTable(movie);

            // Reset form
            movieForm.reset();
        };
    });

    // Handle delete button click
    tableBody.addEventListener("click", function (event) {
        if (event.target.classList.contains("delete-btn")) {
            const row = event.target.closest("tr");
            const movieId = Number(row.dataset.id); // Ensure it's a number

            // Retrieve movies from localStorage
            let movies = JSON.parse(localStorage.getItem("movies")) || [];
            
            // Filter out the movie to be deleted
            movies = movies.filter(movie => Number(movie.id) !== movieId);
            
            // Save the updated list BEFORE removing from the table
            saveMovies(movies);

            // Remove row from table
            row.remove();
        }
    });

    // Load movies when page loads
    loadMovies();
});



document.getElementById("clearMovies").addEventListener("click", function () {
    localStorage.removeItem("movies"); // Delete all stored movies
    document.getElementById("movieTableBody").innerHTML = ""; // Clear the table
    alert("All movies have been deleted!");
});

