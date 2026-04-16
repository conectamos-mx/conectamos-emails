// templates v1
import { Section } from "@react-email/components";
import * as React from "react";
import { Layout } from "../_shared/layout";
import {
  EmailLabel,
  EmailTitle,
  EmailText,
  PrimaryButton,
} from "../_shared/components";

// ─── Props ────────────────────────────────────────────────────────────────────
export interface BienvenidaProps {
  nombre: string;
  empresa: string;
  urlPlataforma: string;
}

// ─── Valores por defecto (para preview en React Email) ───────────────────────
const defaults: BienvenidaProps = {
  nombre: "{{nombre}}",
  empresa: "{{empresa}}",
  urlPlataforma: "{{urlPlataforma}}",
};

// ─── Template ─────────────────────────────────────────────────────────────────
export default function Bienvenida(props: BienvenidaProps = defaults) {
  const { nombre, empresa, urlPlataforma } = props;

  return (
    <Layout preview={`Bienvenido a ConectamOS, ${empresa}. Tu cuenta está lista.`} badge="plataforma">
      <EmailLabel>Cuenta activada</EmailLabel>
      <EmailTitle>Bienvenido a ConectamOS,{"\n"}{empresa}</EmailTitle>
      <EmailText>
        Hola <strong style={{ color: "#0F2937", fontWeight: 500 }}>{nombre}</strong>, tu cuenta
        está lista. A partir de hoy puedes gestionar todas tus operaciones de WhatsApp y tu equipo
        desde un solo lugar.
      </EmailText>

      <Section style={{ margin: "22px 0" }}>
        <PrimaryButton href={urlPlataforma}>Entrar a la plataforma</PrimaryButton>
      </Section>

      <EmailText muted>
        ¿Dudas? Escríbenos a{" "}
        <a href="mailto:hola@conectamos.ai" style={{ color: "#66E2D0", textDecoration: "none" }}>
          hola@conectamos.ai
        </a>
      </EmailText>
    </Layout>
  );
}
