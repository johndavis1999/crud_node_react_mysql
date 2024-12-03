import { useState, useEffect } from "react";
import axios from "axios";
import GlobalStyle from "./styles/global";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import Form from "./components/Form";
import Grid from "./components/Grid";
import { API_URL } from "./config/config";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

function App() {

  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getUsers = async () => {
    try {
      const res = await axios.get(API_URL);
      setUsers(res.data.sort((a, b) => (a.nombre > b.nombre ? 1 : -1)));
    } catch(error){
      toast.error(error);
    }
  }

  useEffect(() => {
    getUsers();
  }, [setUsers])

  return (
    <>
      <Container>
        <Title>Usuarios</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
        <Grid users={users} setUsers={setUsers} setOnEdit={setOnEdit} />
      </Container>
      <ToastContainer autoClose={3000} position="bottom-left" />
      <GlobalStyle />
    </>
  );
}

export default App;
