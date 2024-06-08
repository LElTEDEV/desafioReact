import React, { useState } from "react";
import logo from "./assets/logo.svg";
import pasta from "./assets/Clipboard.svg";
import style from "./app.module.css";
import { Tarefa } from "./Tarefa";

interface Tarefas {
  concluida: boolean;
  texto: string;
}

function App() {
  const [tarefas, setTarefas] = useState<Tarefas[]>([]);

  const [concluidas, setConcluidas] = useState<number>(0);
  const [tarefa, setTarefa] = useState<string>("");

  function handleSetTarefa(event: React.ChangeEvent<HTMLInputElement>) {
    setTarefa(event.target.value);
  }

  function addTarefa() {
    setTarefas((atual) => [...atual, { concluida: false, texto: tarefa }]);
    setTarefa("");
  }

  function handleDeleteTask(task: string) {
    setTarefas((prevTarefas) =>
      prevTarefas.filter((tarefa) => tarefa.texto !== task)
    );
    setConcluidas((atual) => (atual -= 1));
  }

  function handleConcluida(taks: string) {
    const taksParaConcluir = tarefas.find((tarefa) => tarefa.texto === taks);
    const restantesDasTasks = tarefas.filter((tarefa) => tarefa.texto !== taks);
    setTarefas(() => [
      ...restantesDasTasks,
      { texto: taksParaConcluir.texto, concluida: true },
    ]);
    setConcluidas((atual) => (atual += 1));
  }

  return (
    <div className={style.container}>
      <img src={logo} alt="Logo" />

      <div className={style.addTask}>
        <input
          type="text"
          placeholder="Adicione uma nova tarefa"
          value={tarefa}
          onChange={handleSetTarefa}
        />
        <button onClick={addTarefa}>Criar +</button>
      </div>

      <div className={style.containerToDo}>
        <div className={style.containerToDoText}>
          <p id={style.criadas}>
            Tarefas criadas{" "}
            <span>{tarefas.length === 0 ? 0 : tarefas.length}</span>
          </p>
          <p id={style.concluidas}>
            Concluídas{" "}
            <span>
              {concluidas == 0 ? 0 : `${concluidas} de ${tarefas.length}`}
            </span>
          </p>
        </div>

        {tarefas.length === 0 ? (
          <div className={style.semTarefa}>
            <img src={pasta} alt="No tasks" />
            <p>
              <strong>Você ainda não tem tarefas cadastradas</strong>
            </p>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </div>
        ) : (
          <div className={style.containerTasks}>
            {tarefas.map((tarefa, index) => (
              <Tarefa
                key={tarefa.texto}
                concluida={tarefa.concluida}
                texto={tarefa.texto}
                onClickDelete={handleDeleteTask}
                onClickConcluir={handleConcluida}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
