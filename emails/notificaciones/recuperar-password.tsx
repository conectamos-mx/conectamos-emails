import { Section } from "@react-email/components";
import * as React from "react";
import { Layout } from "../_shared/layout";
import {
  EmailLabel,
  EmailTitle,
  EmailText,
  WarnBox,
  PrimaryButton,
  EmailDivider,
  LinkFallback,
} from "../_shared/components";

export interface RecuperarPasswordProps {
  nombre: string;
  urlReset: string;
  minutosExpiracion: number;
}

export const defaults: RecuperarPasswordProps = {
  nombre: "{{nombre}}",
  urlReset: "{{urlReset}}",
  minutosExpiracion: "{{minutosExpiracion}}" as any,
};

export default function RecuperarPassword(props: RecuperarPasswordProps = defaults) {
  const { nombre, urlReset, minutosExpiracion } = props;

  return (
    <Layout preview="Solicitud para restablecer tu contraseña en ConectamOS." badge="seguridad">
      <EmailLabel>Solicitud de acceso</EmailLabel>
      <EmailTitle>Recupera tu contraseña</EmailTitle>
      <EmailText>
        Hola <strong style={{ color: "#0F2937", fontWeight: 500 }}>{nombre}</strong>, recibimos
        una solicitud para restablecer la contraseña de tu cuenta en ConectamOS. Si fuiste tú, usa
        el botón de abajo.
      </EmailText>

      <Section style={{ margin: "22px 0" }}>
        <PrimaryButton href={urlReset}>Crear nueva contraseña</PrimaryButton>
      </Section>

      <WarnBox>
        Este enlace es válido por{" "}
        <strong style={{ color: "#0F2937", fontWeight: 500 }}>{minutosExpiracion} minutos</strong>{" "}
        y solo puede usarse una vez. Si no solicitaste este cambio, puedes ignorar este correo —
        tu cuenta sigue segura.
      </WarnBox>

      <EmailDivider />

      <LinkFallback href={urlReset} label={urlReset} />
    </Layout>
  );
}
