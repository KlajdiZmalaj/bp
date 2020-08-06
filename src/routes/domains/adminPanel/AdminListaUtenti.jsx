import React from "react";
import "./styles.css";
import AdminListaUtentiRow from "./AdminListaUtentiRow";
class AdminListaUtenti extends React.Component {
  render() {
    const list = [
      {
        user_id: "#00102",
        username: "MONTI VIRGILO",
        rag_sociale: "PK SOLUTION S.R.L",
        credito: "205.00",
        city: "Bologna",
        ultimo_deposit: "16-07-220 09:10:17",
        ultimo_login: "16-07-220 09:10:17",
        role: "agency",
        children: [
          {
            user_id: "#00103",
            role: "agent",
            username: "User",
            rag_sociale: "PK S.R.L",
            credito: "205.00",
            city: "Bologna",
            ultimo_deposit: "16-07-220 09:10:17",
            ultimo_login: "16-07-220 09:10:17",
            children: [],
          },
          {
            user_id: "#00104",
            role: "agent",
            username: "User",
            rag_sociale: "PK S.R.L",
            credito: "205.00",
            city: "Bologna",
            ultimo_deposit: "16-07-220 09:10:17",
            ultimo_login: "16-07-220 09:10:17",
            children: [],
          },
          {
            user_id: "#00105",
            role: "agent",
            username: "User",
            rag_sociale: "PK S.R.L",
            credito: "205.00",
            city: "Bologna",
            ultimo_deposit: "16-07-220 09:10:17",
            ultimo_login: "16-07-220 09:10:17",
            children: [
              {
                user_id: "#00106",
                username: "MONTI VIRGILO",
                rag_sociale: "PK SOLUTION S.R.L",
                credito: "205.00",
                city: "Bologna",
                ultimo_deposit: "16-07-220 09:10:17",
                ultimo_login: "16-07-220 09:10:17",
                children: [],
                role: "user",
              },
              {
                user_id: "#00107",
                username: "MONTI VIRGILO",
                rag_sociale: "PK SOLUTION S.R.L",
                credito: "205.00",
                city: "Bologna",
                ultimo_deposit: "16-07-220 09:10:17",
                ultimo_login: "16-07-220 09:10:17",
                children: [],
                role: "user",
              },
            ],
          },
          {
            user_id: "#00108",
            role: "agent",
            username: "User",
            rag_sociale: "PK S.R.L",
            credito: "205.00",
            city: "Bologna",
            ultimo_deposit: "16-07-220 09:10:17",
            ultimo_login: "16-07-220 09:10:17",
            children: [
              {
                user_id: "#00109",
                username: "MONTI VIRGILO",
                rag_sociale: "PK SOLUTION S.R.L",
                credito: "205.00",
                city: "Bologna",
                ultimo_deposit: "16-07-220 09:10:17",
                ultimo_login: "16-07-220 09:10:17",
                children: [],
                role: "user",
              },
              {
                user_id: "#00111",
                username: "MONTI VIRGILO",
                rag_sociale: "PK SOLUTION S.R.L",
                credito: "205.00",
                city: "Bologna",
                ultimo_deposit: "16-07-220 09:10:17",
                ultimo_login: "16-07-220 09:10:17",
                children: [],
                role: "user",
              },
            ],
          },
        ],
      },
      {
        user_id: "#00112",
        username: "MONTI VIRGILO",
        rag_sociale: "PK SOLUTION S.R.L",
        credito: "205.00",
        city: "Bologna",
        ultimo_deposit: "16-07-220 09:10:17",
        ultimo_login: "16-07-220 09:10:17",
        role: "agency",
        children: [
          {
            user_id: "#00103",
            role: "agent",
            username: "User",
            rag_sociale: "PK S.R.L",
            credito: "205.00",
            city: "Bologna",
            ultimo_deposit: "16-07-220 09:10:17",
            ultimo_login: "16-07-220 09:10:17",
            children: [],
          },
          {
            user_id: "#00113",
            role: "agent",
            username: "User",
            rag_sociale: "PK S.R.L",
            credito: "205.00",
            city: "Bologna",
            ultimo_deposit: "16-07-220 09:10:17",
            ultimo_login: "16-07-220 09:10:17",
            children: [
              {
                user_id: "#00114",
                username: "MONTI VIRGILO",
                rag_sociale: "PK SOLUTION S.R.L",
                credito: "205.00",
                city: "Bologna",
                ultimo_deposit: "16-07-220 09:10:17",
                ultimo_login: "16-07-220 09:10:17",
                children: [],
                role: "user",
              },
              {
                user_id: "#00115",
                username: "MONTI VIRGILO",
                rag_sociale: "PK SOLUTION S.R.L",
                credito: "205.00",
                city: "Bologna",
                ultimo_deposit: "16-07-220 09:10:17",
                ultimo_login: "16-07-220 09:10:17",
                children: [],
                role: "user",
              },
            ],
          },
        ],
      },
      {
        user_id: "#00116",
        role: "agency",
        username: "MONTI VIRGILO",
        rag_sociale: "PK SOLUTION S.R.L",
        credito: "205.00",
        city: "Bologna",
        ultimo_deposit: "16-07-220 09:10:17",
        ultimo_login: "16-07-220 09:10:17",
        children: [
          {
            role: "agent",

            user_id: "#00103",
            username: "User",
            rag_sociale: "PK S.R.L",
            credito: "205.00",
            city: "Bologna",
            ultimo_deposit: "16-07-220 09:10:17",
            ultimo_login: "16-07-220 09:10:17",
            children: [],
          },
        ],
      },
      {
        user_id: "#00117",
        role: "agency",
        username: "MONTI VIRGILO",
        rag_sociale: "PK SOLUTION S.R.L",
        credito: "205.00",
        city: "Bologna",
        ultimo_deposit: "16-07-220 09:10:17",
        ultimo_login: "16-07-220 09:10:17",
        children: [],
      },
      {
        user_id: "#00118",
        role: "agency",
        username: "MONTI VIRGILO",
        rag_sociale: "PK SOLUTION S.R.L",
        credito: "205.00",
        city: "Bologna",
        ultimo_deposit: "16-07-220 09:10:17",
        ultimo_login: "16-07-220 09:10:17",
        children: [],
      },
    ];
    return (
      <div className="AdminListaUtenti">
        <div className="AdminListaUtenti--Header">
          <span>USER ID</span>
          <span>USERNAME</span>
          <span>RAG SOCIALE</span>

          <span>CREDITO</span>
          <span>CITY</span>
          <span>ULTIMO DEPOSIT</span>
          <span>ULTIMO LOGIN</span>
          <span>AZIONI</span>
        </div>
        <div className="AdminListaUtentiRow">
          {list.map((itemList) => {
            return (
              <AdminListaUtentiRow itemList={itemList} key={itemList.user_id} />
            );
          })}
        </div>
      </div>
    );
  }
}
export default AdminListaUtenti;
