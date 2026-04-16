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

export interface VerificarEmailProps {
  nombre: string;
  urlVerificacion: string;
  minutosExpiracion: number;
}

const defaults: VerificarEmailProps = {
  nombre: "{{nombre}}",
  urlVerificacion: "{{urlVerificacion}}",
  minutosExpiracion: "{{minutosExpiracion}}" as any,
};

export default function VerificarEmail(props: VerificarEmailProps = defaults) {
  const { nombre, urlVerificacion, minutosExpiracion } = props;

  return (
    <Layout preview="Verifica tu correo electrónico para activar tu cuenta en ConectamOS." badge="seguridad">
      <EmailLabel>Verificación de cuenta</EmailLabel>
      <EmailTitle>Confirma tu correo electrónico</EmailTitle>
      <EmailText>
        Hola <strong style={{ color: "#0F2937", fontWeight: 500 }}>{nombre}</strong>, para
        completar el registro de tu cuenta en ConectamOS necesitamos verificar tu dirección de
        correo. Solo toma un clic.
      </EmailText>

      <Section style={{ margin: "22px 0" }}>
        <PrimaryButton href={urlVerificacion}>Verificar correo</PrimaryButton>
      </Section>

      <WarnBox>
        Este enlace es válido por{" "}
        <strong style={{ color: "#0F2937", fontWeight: 500 }}>{minutosExpiracion} minutos</strong>{" "}
        y solo puede usarse una vez. Si no creaste una cuenta en ConectamOS, puedes ignorar este
        correo.
      </WarnBox>

      <EmailDivider />

      <LinkFallback
        href={urlVerificacion}
        label={urlVerificacion}
      />
    </Layout>
  );
}
