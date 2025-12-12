"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Explore() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users");
        setUsers(response.data);
      } catch (err) {
        console.error("Error fetching users for Explore page:", err);
        setError("Failed to load users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.2rem",
        }}
      >
        Loading portfolios...
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "2rem 1rem",
        backgroundColor: "white",
        color: "#000",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "3.2rem",
          fontWeight: "800",
          marginBottom: "2.5rem",
          color: "#c2185b",
          textShadow: "2px 2px 4px rgba(255, 182, 193, 0.5)",
          WebkitTextStroke: "0.8px #f8bbd0",
          letterSpacing: "1px",
        }}
      >
        Explore Students
      </h1>

      {error && (
        <p style={{ color: "red", textAlign: "center", marginBottom: "1rem" }}>
          {error}
        </p>
      )}

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "2rem",
        }}
      >
        {users.map((user) => (
          <Link key={user._id} href={`/profile/${user._id}`} passHref>
            <div
              style={{
                background: "#ffe6f0",
                borderRadius: "1rem",
                height: "400px",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 0 15px 2px rgba(255, 105, 180, 0.3)",
                border: "1px solid #ffb6c1",
                cursor: "pointer",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.03)";
                e.currentTarget.style.boxShadow =
                  "0 0 20px 4px rgba(255, 105, 180, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 0 15px 2px rgba(255, 105, 180, 0.3)";
              }}
            >
              <div
                style={{
                  flex: "1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderBottom: "1px solid #f5c6d6",
                }}
              >
                <div
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    background: "#d966a8",
                    color: "white",
                    fontSize: "2.5rem",
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {user.name?.charAt(0).toUpperCase() || "?"}
                </div>
              </div>

              <div
                style={{
                  flex: "1",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "1rem",
                }}
              >
                <h2 style={{ fontSize: "1.6rem", marginBottom: "0.5rem" }}>
                  {user.name}
                </h2>
                <p
                  style={{
                    fontSize: "1rem",
                    textAlign: "center",
                    color: "#444",
                  }}
                >
                  {user.universityName}
                  <br />
                  {user.courseName}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
