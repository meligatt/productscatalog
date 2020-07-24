import React from "react";
import { graphql } from "babel-plugin-relay/macro";
import { fetchQuery } from "react-relay";
import environment from "../../environment";
import {
  InputField,
  Button,
  Box,
  TextareaField,
  Heading,
  Alert,
  Spinner,
  styled,
  Columns,
  Column,
  Paragraph,
} from "fannypack";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import emailImage from "../../assets/correo-ventas-comercial-gattoni.png";

const ListItem = styled.li`
  list-style: circle;
`;
const SendQuoteLink = styled(Link)`
  display: block;
  text-align: right;
  color: black;
  font-weight: 600;
  font-size: 1.2rem;
  white-space: nowrap;
  padding: 1rem;
  transition: color 0.2s;
  text-decoration: underline;
  border-radius: 4px;
  color: #000000;
  &:hover {
    color: #ff0000;
    text-decoration: underline;
  }
`;

const query = graphql`
  query ContactFormQuery(
    $personalIdNumber: String!
    $emailAddress: String!
    $message: String!
    $name: String
    $phoneNumber: String
  ) {
    sendContactMessage(
      personalIdNumber: $personalIdNumber
      emailAddress: $emailAddress
      message: $message
      name: $name
      phoneNumber: $phoneNumber
    ) {
      status
      message
    }
  }
`;

const ContactForm: React.FunctionComponent = () => {
  const formik = useFormik({
    initialValues: {
      nombre: "",
      empresa: "",
      email: "",
      mensaje: "",
      telefono: "",
    },
    validate: ({ nombre, empresa, email, mensaje }) => {
      const errors: any = {};
      if (!nombre) {
        errors["nombre"] = "Nombre es requerido";
      }
      if (!empresa) {
        errors["empresa"] = "Empresa es requerido";
      }
      if (!email) {
        errors["email"] = "Email es requerido";
      }
      if (!mensaje) {
        errors["mensaje"] = "Mensaje es requerido";
      }

      return errors;
    },
    onSubmit: (values, actions) => {
      const variables = {
        personalIdNumber: values.email,
        emailAddress: values.email,
        message: values.mensaje,
        name: values.nombre,
        phoneNumber: values.telefono,
      };

      fetchQuery(environment, query, variables).then(
        ({ sendContactMessage }: any) => {
          if (sendContactMessage.status === "FAILURE") {
            actions.setStatus({
              message: "Se ha producido un error, intente nuevamente.",
              error: true,
            });
            return;
          }
          actions.setStatus({
            message:
              "Su consulta ha sido enviada con exito a Comercial Gattoni. Responderemos a la brevedad, Gracias.",
          });
        }
      );
    },
  });

  return (
    <Box>
      <Heading>Ingrese su consulta</Heading>
      <Columns>
        <Column>
          <Box padding="major-3">
            <Heading use="h2" id="heading-direccion">
              Visítenos en:
            </Heading>
            <Paragraph>
              Rodriguez # 757 Local A Copiapó, Chile.{" "}
              <a
                href="https://goo.gl/maps/T8kEzuyJijXt6iy66"
                target="_blank"
                rel="noopener noreferrer"
              >
                (Ver mapa)
              </a>
            </Paragraph>
            <Heading use="h2" id="heading-telefono">
              Telefono:
            </Heading>
            <ul>
              <ListItem>Fono Fax: (52) 2 218056</ListItem>
              <ListItem>Fono: (52) 2 216257</ListItem>
            </ul>
            <Heading use="h2" id="heading-telefono">
              Correo ventas:
            </Heading>
            <ul>
              <ListItem>
                <img
                  style={{ filter: "invert(1)" }}
                  src={emailImage}
                  width="175"
                  height="15"
                  alt="Ventas Comercial Gattoni"
                />
              </ListItem>
            </ul>
            <Heading use="h2" id="heading-horarios">
              Horarios:
            </Heading>
            <ul>
              <ListItem>
                Lunes a Viernes de 9:30 a 13:30 y 15:30 a 18:30
              </ListItem>
            </ul>
          </Box>
        </Column>
        <Column spread={8}>
          <Box padding="major-3">
            <form onSubmit={formik.handleSubmit}>
              <InputField
                padding="major-2"
                id="nombre"
                name="nombre"
                isRequired
                type="text"
                label="Nombre o Razon social"
                placeholder="nombre"
                value={formik.values.nombre}
                onChange={formik.handleChange}
                validationText={formik.errors.nombre}
                state={formik.errors.nombre ? "danger" : ""}
                size="medium"
              />
              <InputField
                padding="major-2"
                id="empresa"
                name="empresa"
                isRequired
                type="text"
                label="Empresa"
                placeholder="Empresa"
                value={formik.values.empresa}
                onChange={formik.handleChange}
                validationText={formik.errors.empresa}
                state={formik.errors.empresa ? "danger" : ""}
                size="medium"
              />
              <InputField
                padding="major-2"
                id="email"
                name="email"
                isRequired
                type="email"
                label="E-mail"
                placeholder="example@email.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                validationText={formik.errors.email}
                state={formik.errors.email ? "danger" : ""}
                size="medium"
              />
              <InputField
                padding="major-2"
                id="telefono"
                name="telefono"
                type="text"
                label="Telefono"
                placeholder="Telefono"
                value={formik.values.telefono}
                onChange={formik.handleChange}
                validationText={formik.errors.telefono}
                state={formik.errors.telefono ? "danger" : ""}
                size="medium"
              />
              <TextareaField
                padding="major-2"
                name="mensaje"
                label="Comentario"
                isRequired
                value={formik.values.mensaje}
                onChange={formik.handleChange}
                validationText={formik.errors.mensaje}
                state={formik.errors.mensaje ? "danger" : ""}
              />
              <Button margin="major-2" padding="major-1" type="submit">
                Enviar
              </Button>
              {formik.isSubmitting && !formik.status && (
                <Alert display="inline-block" hasTint type="warning">
                  <Spinner size="small" /> Enviando...
                </Alert>
              )}
              {formik.status && formik.status.message && (
                <Alert
                  display="inline-block"
                  hasTint
                  type={formik.status.error ? "danger" : "success"}
                >
                  {formik.status.message}
                  <SendQuoteLink to="/">Volver al inicio</SendQuoteLink>
                </Alert>
              )}
            </form>
          </Box>
        </Column>
      </Columns>
    </Box>
  );
};

export default ContactForm;
