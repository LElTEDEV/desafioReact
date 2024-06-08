import style from "./tarefa.module.css";
import trash from "./assets/trash.svg";
import { useState } from "react";

export function Tarefa({ concluida, texto, onClickDelete, onClickConcluir }) {
  function handleDeleteTask() {
    onClickDelete(texto);
  }

  function handleConcluirTaks() {
    onClickConcluir(texto);
  }

  return (
    <div className={style.task}>
      <input type="radio" onClick={handleConcluirTaks} />
      <p className={concluida ? style.concluida : undefined}>{texto}</p>
      <button onClick={handleDeleteTask}>
        <img src={trash} />
      </button>
    </div>
  );
}
