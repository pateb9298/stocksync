import React, { useState, useEffect } from "react";
import axios from "axios";
import "./messages.css";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      // Replace with your backend messages endpoint
      const res = await axios.get("http://localhost:5000/messages", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessages(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching messages:", err);
      setMessages([]);
    }
  };

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    try {
      const res = await axios.post(
        "http://localhost:5000/messages",
        { content: newMessage },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessages((prev) => [...prev, res.data]);
      setNewMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div className="messages-container">
      <h1>Messages</h1>
      <div className="messages-list">
        {messages.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className="message-item">
              <strong>{msg.sender || "User"}:</strong> {msg.content}
              <span className="message-date">{msg.date ? new Date(msg.date).toLocaleString() : ""}</span>
            </div>
          ))
        )}
      </div>
      <div className="new-message">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}
