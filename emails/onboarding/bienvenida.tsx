import { Section } from "@react-email/components";
import * as React from "react";
import { Layout } from "../_shared/layout";
import {
  EmailLabel,
  EmailTitle,
  EmailText,
  InfoBox,
  MetaRow,
  PrimaryButton,
  GhostButton,
  EmailDivider,
} from "../_shared/components";

// ─── Props ────────────────────────────────────────────────────────────────────
export interface BienvenidaProps {
  nombre: string;
  empresa: string;
  plan: string;
  usuariosIncluidos: string;
  fechaPrueba: string;
  urlPlataforma: string;
  urlGuia: string;
}

// ─── Valores por defecto (para preview en React Email) ───────────────────────
const defaults: BienvenidaProps = {
  nombre: "Carlos",
  empresa: "Empresa XYZ",
  plan: "Starter",
  usuariosIncluidos: "5",
  fechaPrueba: "14 may 2025",
  urlPlataforma: "https://app.conectamos.ai",
  urlGuia: "https://docs.conectamos.ai/inicio",
};

// ─── Template ─────────────────────────────────────────────────────────────────
export default function Bienvenida(props: BienvenidaProps = defaults) {
  const { nombre, empresa, plan, usuariosIncluidos, fechaPrueba, urlPlataforma, urlGuia } = props;

  return (
    <Layout preview={`Bienvenido a ConectamOS, ${empresa}. Tu cuenta está lista.`} badge="plataforma">
      <EmailLabel>Cuenta activada</EmailLabel>
      <EmailTitle>Bienvenido a ConectamOS,{"\n"}{empresa}</EmailTitle>
      <EmailText>
        Hola <strong style={{ color: "#0F2937", fontWeight: 500 }}>{nombre}</strong>, tu cuenta
        está lista. A partir de hoy puedes gestionar todas tus operaciones de WhatsApp y tu equipo
        desde un solo lugar.
      </EmailText>

      <InfoBox>
        <strong style={{ color: "#0F2937", fontWeight: 500 }}>
          Estás en el plan {plan}.
        </strong>{" "}
        Tienes 30 días de prueba incluidos, sin necesidad de tarjeta de crédito.
      </InfoBox>

      <Section style={{ margin: "22px 0" }}>
        <PrimaryButton href={urlPlataforma}>Entrar a la plataforma</PrimaryButton>
        <GhostButton href={urlGuia}>Ver guía de inicio</GhostButton>
      </Section>

      <EmailDivider />

      <MetaRow
        items={[
          { label: "Plan", value: plan },
          { label: "Usuarios", value: usuariosIncluidos },
          { label: "Prueba hasta", value: fechaPrueba },
        ]}
      />

      <EmailText muted>
        ¿Dudas? Escríbenos a{" "}
        <a href="mailto:hola@conectamos.ai" style={{ color: "#66E2D0", textDecoration: "none" }}>
          hola@conectamos.ai
        </a>
      </EmailText>
    </Layout>
  );
}
