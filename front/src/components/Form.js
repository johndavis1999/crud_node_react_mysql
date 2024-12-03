import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../config/config";

const FormContainer = styled.form`
    display: flex;
    align-items: flex-end;
    gap: 10px;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
`;

const InputArea = styled.div`
    display: flex;
    flex-direction: column;
`;

const Label = styled.label``;

const Input = styled.input`
    width: 120px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 5px;
    height: 40px;
`;

const Button = styled.button`
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #2c73d2;
    color: white;
    height: 42px;
`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
    const ref = useRef();

    useEffect(() => {
        if(onEdit) {
            const user = ref.current;

            user.nombre.value = onEdit.nombre;
            user.correo.value = onEdit.correo;
            user.telefono.value = onEdit.telefono;
            user.fecha_nacimiento.value = onEdit.fecha_nacimiento;
        }
    }, [onEdit])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = ref.current;

        if (
            !user.nombre.value ||
            !user.correo.value ||
            !user.telefono.value ||
            !user.fecha_nacimiento.value
        ) {
            return toast.warn("Completar todos los campos")
        }

        if (onEdit) {
            await axios
                .put(`${API_URL}${onEdit.id}`,{
                    nombre: user.nombre.value,
                    correo: user.correo.value,
                    telefono: user.telefono.value,
                    fecha_nacimiento: user.fecha_nacimiento.value,
                })
                .then(({data}) => toast.success(data))
                .catch(({data}) => toast.error(data));
        }else {
            await axios
                .post(`${API_URL}`,{
                    nombre: user.nombre.value,
                    correo: user.correo.value,
                    telefono: user.telefono.value,
                    fecha_nacimiento: user.fecha_nacimiento.value,
                })
                .then(({data}) => toast.success(data))
                .catch(({data}) => toast.error(data));
        }

        user.nombre.value = "";
        user.correo.value = "";
        user.telefono.value = "";
        user.fecha_nacimiento.value = "";

        setOnEdit(null);
        getUsers();
    }

    return (
        <>
            <FormContainer ref={ref} onSubmit={handleSubmit}>
                <InputArea>
                    <Label>Nombre</Label>
                    <Input name="nombre" />
                </InputArea>
                <InputArea>
                    <Label>Correo</Label>
                    <Input name="correo" type="email" />
                </InputArea>
                <InputArea>
                    <Label>Telefono</Label>
                    <Input name="telefono" type="number" />
                </InputArea>
                <InputArea>
                    <Label>Fecha de nacimiento</Label>
                    <Input name="fecha_nacimiento" type="date" />
                </InputArea>
                <Button type="submite">Guardar</Button>
            </FormContainer>
        </>
    );
}

export default Form;