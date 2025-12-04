import React, { useState, useEffect } from "react";

// The URL for the API endpoint running locally
const API_URL = "http://localhost:5000/api/users";

/**
 * Main application component to fetch and display the user list simply.
 * NOTE: This requires the Express server from the previous step to be running on http://localhost:3000.
 */
const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simplified function to fetch data directly
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        // Attempt the fetch call
        const response = await fetch(API_URL);

        if (!response.ok) {
          // Handle HTTP errors (e.g., 404, 500)
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Assuming the API response structure is { message: string, users: array }
        setUsers(data.users || []);
        setLoading(false);
      } catch (err) {
        // Handle network errors (like the "Failed to fetch" error you saw)
        console.error("User data fetch failed:", err.message);
        setError(`Failed to connect to the API at ${API_URL}.`);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // --- Render Logic ---

  if (loading) {
    return (
      <div>
        <p>Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>
          Error: {error}
          <br />
          <span>
            Please ensure your Express server is running on port 3000 and is
            accessible.
          </span>
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1>Simple User Directory</h1>

      {users.length === 0 ? (
        <div>
          <p>No users found.</p>
        </div>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <div>{user.name}</div>
              <div>
                <span>Role:</span> {user.role} |<span>Email:</span> {user.email}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
