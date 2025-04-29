import React, { useEffect, useState } from "react";

// Main App component
export default function App() {
  // Store list of jokes
  const [jokes, setJokes] = useState([]);

  // Fetch jokes from the API
  const fetchJokes = async () => {
    try {
      const response = await fetch(
        "https://official-joke-api.appspot.com/random_ten"
      );
      const data = await response.json();
      setJokes(data.slice(0, 4)); // Show only 4 jokes
    } catch (error) {
      console.log("Error fetching jokes:", error);
    }
  };

  // Fetch jokes when the page loads
  useEffect(() => {
    fetchJokes();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Jokes App</h1>
      <button onClick={fetchJokes}>Refresh Jokes</button>

      {/* Display each joke */}
      {jokes.map((joke) => (
        <JokeItem key={joke.id} setup={joke.setup} punchline={joke.punchline} />
      ))}
    </div>
  );
}

// Component to display a single joke
function JokeItem({ setup, punchline }) {
  // Control whether the punchline is shown
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "10px",
        marginTop: "10px",
      }}
    >
      <p>
        <strong>{setup}</strong>
      </p>

      {/* Show the punchline if toggled */}
      {showAnswer && <p>{punchline}</p>}

      {/* Button to show/hide the punchline */}
      <button onClick={() => setShowAnswer(!showAnswer)}>
        {showAnswer ? "Hide" : "Show"} Answer
      </button>
    </div>
  );
}
