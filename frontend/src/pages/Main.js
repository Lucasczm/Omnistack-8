import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { Link } from "react-router-dom";
import "./Main.css";
import logo from "../assets/logo.svg";
import like from "../assets/like.svg";
import dislike from "../assets/dislike.svg";
import itsmatch from "../assets/itsamatch.png";

import api from "../services/api";

export default function Main({ match }) {
  const loggedid = match.params.id;
  const [users, setUsers] = useState([]);
  const [matchDev, setMatchDev] = useState();
  useEffect(() => {
    const socket = io("http://192.168.1.123:3137", {
      query: { user: loggedid }
    });
    socket.on("match", dev => {
      setMatchDev(dev);
    });
  }, [loggedid]);
  useEffect(() => {
    async function loadUsers() {
      const response = await api.get("/user", { headers: { loggedid } });
      setUsers(response.data);
    }
    loadUsers();
  }, [loggedid]);
  async function handleLike(id) {
    const response = await api.post(
      `/user/${id}/likes`,
      {},
      { headers: { loggedid } }
    );

    setUsers(users.filter(user => user._id !== id));
  }
  async function handleDislike(id) {
    const response = await api.post(
      `/user/${id}/unlikes`,
      {},
      { headers: { loggedid } }
    );
    setUsers(users.filter(user => user._id !== id));
  }
  return (
    <div className="main-container">
      <Link to="/">
        <img src={logo} alt="tindev" />
      </Link>
      {users.length > 0 ? (
        <ul>
          {users.map(user => (
            <li key={user._id}>
              <img src={user.photo} alt="" />
              <footer>
                <strong>{user.name}</strong>
                <p>{user.username}</p>
              </footer>
              <div className="buttons">
                <button type="button">
                  <img
                    src={dislike}
                    alt="unlike"
                    onClick={() => handleDislike(user._id)}
                  />
                </button>
                <button
                  type="button"
                  alt="Like"
                  onClick={() => handleLike(user._id)}
                >
                  <img src={like} alt="like" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty">Nada aqui :(</div>
      )}
      {matchDev && (
        <div className="match-container">
          <img src={itsmatch} alt="Matched" />
          <img className="avatar" src={matchDev.photo} alt="" />
          <strong>{matchDev.name}</strong>
          <p>{matchDev.username}</p>
          <button type="button" onClick={() => setMatchDev(null)}>
            FECHAR
          </button>
        </div>
      )}
    </div>
  );
}
