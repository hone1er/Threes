import React, { useContext, useState } from "react";
import { GameContext } from "./GameProvider";
import { SignInDiv } from "./styledComponents/SignInDiv";
import Modal from "./Modal";
import { Link } from "react-router-dom";
import { PrimaryBtn } from "./styledComponents/PrimaryBtn";
export default function SignIn() {
  const { sock, player, setPlayer, game } = useContext(GameContext);
  const [room, setRoom] = useState("");
  const [roomList, setRoomList] = useState([1,2,3,4,5,"benal"]);
  function handleUser(e) {
    setPlayer(e.target.value);
  }
  function handleRoom(e) {
    setRoom(e.target.value);
  }

  function checkNameTaken() {
    return game.names.filter((name) => name === player).length > 0;
  }

  function checkRoomTaken() {
    return roomList.filter((rom) => rom === room).length > 0;
  }

  function handleJoinRoom() {
    sock.emit("joinRoom", { room: room, player: player });
    localStorage.setItem("player", JSON.stringify(player));
  }

  function handleNewRoom() {
    sock.emit("newRoom", ({room: room, player: player}));
    let tempGame = game;
    tempGame.names.push(player);
    tempGame.scores.push(0);

    localStorage.setItem("player", JSON.stringify(player));
  }
  function roomExist() {
    alert(`${room} is already taken.`);
  }
  function alertUser() {
    alert(`${player} is taken`);
  }
  function roomDoesNotExist() {
    alert(`There is no room: '${room}'. Check the name and try again, or create a new room`);
  }

  let taken = checkNameTaken();
  let roomTaken = checkRoomTaken();

  sock.on("setRooms", (rooms) => {
    setRoomList(rooms);
  });


  return (
    <SignInDiv player={player}>
      <input
        value={player}
        onChange={handleUser}
        placeholder="Enter your username"
      />
      <input id="enter-room" value={room} onChange={handleRoom} placeholder="Enter room" />
      {/* <select onChange={handleRoom}>
        <option select>select a room</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="benal">benal</option>
        <option value="osos">osos</option>
      </select> */}
      <Link
        to={taken ?  "/" : !roomTaken ? "/" : "/game"}
        id="join"
        onClick={
          taken ? alertUser : !roomTaken ? roomDoesNotExist : handleJoinRoom
        }
      >
        <PrimaryBtn>Join Game</PrimaryBtn>
      </Link>
      <Link
        to={roomTaken || taken ? "/" : "/game"}
        id="new"
        onClick={taken ? alertUser : roomTaken ? roomExist : handleNewRoom}
      >
        <PrimaryBtn>New Game</PrimaryBtn>
      </Link>
      <Modal />
    </SignInDiv>
  );
}
