import { Link, Section, Row, Column, Text, Hr } from "@react-email/components";
import * as React from "react";
import { colors, fonts } from "./layout";

// ─── Label de categoría ───────────────────────────────────────────────────────
export function EmailLabel({ children }: { children: React.ReactNode }) {
  return (
    <Text style={labelStyle}>
      — {children}
    </Text>
  );
}

// ─── Título principal ─────────────────────────────────────────────────────────
export function EmailTitle({ children }: { children: React.ReactNode }) {
  return (
    <Text style={titleStyle}>{children}</Text>
  );
}

// ─── Párrafo de cuerpo ────────────────────────────────────────────────────────
export function EmailText({
  children,
  muted = false,
}: {
  children: React.ReactNode;
  muted?: boolean;
}) {
  return (
    <Text style={{ ...textStyle, color: muted ? colors.textSubtle : colors.textMuted }}>
      {children}
    </Text>
  );
}

// ─── Info box (teal) ──────────────────────────────────────────────────────────
export function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <Section style={infoBoxStyle}>
      <Text style={infoBoxTextStyle}>{children}</Text>
    </Section>
  );
}

// ─── Warn box (amarillo) ──────────────────────────────────────────────────────
export function WarnBox({ children }: { children: React.ReactNode }) {
  return (
    <Section style={warnBoxStyle}>
      <Text style={warnBoxTextStyle}>{children}</Text>
    </Section>
  );
}

// ─── Fila de métricas ─────────────────────────────────────────────────────────
export interface MetaItem {
  label: string;
  value: string;
}

export function MetaRow({ items }: { items: MetaItem[] }) {
  return (
    <Section style={metaRowStyle}>
      <Row>
        {items.map((item, i) => (
          <Column
            key={i}
            style={{
              ...metaCellStyle,
              borderRight: i < items.length - 1 ? `1px solid ${colors.border}` : "none",
            }}
          >
            <Text style={metaLabelStyle}>{item.label}</Text>
            <Text style={metaValueStyle}>{item.value}</Text>
          </Column>
        ))}
      </Row>
    </Section>
  );
}

// ─── Botón primario ───────────────────────────────────────────────────────────
export function PrimaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} style={primaryBtnStyle}>
      {children}
    </Link>
  );
}

// ─── Botón ghost ──────────────────────────────────────────────────────────────
export function GhostButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} style={ghostBtnStyle}>
      {children}
    </Link>
  );
}

// ─── Divisor ──────────────────────────────────────────────────────────────────
export function EmailDivider() {
  return <Hr style={dividerStyle} />;
}

// ─── Link fallback (para cuando el botón no carga) ───────────────────────────
export function LinkFallback({ href, label }: { href: string; label: string }) {
  return (
    <Text style={linkFallbackStyle}>
      Si el botón no funciona, copia este enlace en tu navegador:{"\n"}
      <Link href={href} style={{ color: colors.teal, textDecoration: "none", wordBreak: "break-all" }}>
        {label}
      </Link>
    </Text>
  );
}

// ─── Estilos ──────────────────────────────────────────────────────────────────
const labelStyle: React.CSSProperties = {
  fontFamily: fonts.sans,
  fontSize: "10px",
  fontWeight: 500,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: colors.teal,
  margin: "0 0 10px",
};

const titleStyle: React.CSSProperties = {
  fontFamily: fonts.display,
  fontSize: "24px",
  fontWeight: 500,
  color: colors.text,
  lineHeight: "1.25",
  letterSpacing: "-0.025em",
  margin: "0 0 14px",
};

const textStyle: React.CSSProperties = {
  fontFamily: fonts.sans,
  fontSize: "15px",
  lineHeight: "1.7",
  margin: "0 0 18px",
};

const infoBoxStyle: React.CSSProperties = {
  backgroundColor: colors.tealLight,
  border: `1px solid ${colors.tealBorder}`,
  borderRadius: "8px",
  padding: "13px 16px",
  margin: "18px 0",
};

const infoBoxTextStyle: React.CSSProperties = {
  fontFamily: fonts.sans,
  fontSize: "13px",
  color: "#3a5a5a",
  lineHeight: "1.65",
  margin: 0,
};

const warnBoxStyle: React.CSSProperties = {
  backgroundColor: colors.warnBg,
  border: `1px solid ${colors.warnBorder}`,
  borderRadius: "8px",
  padding: "13px 16px",
  margin: "18px 0",
};

const warnBoxTextStyle: React.CSSProperties = {
  fontFamily: fonts.sans,
  fontSize: "13px",
  color: colors.warnText,
  lineHeight: "1.65",
  margin: 0,
};

const metaRowStyle: React.CSSProperties = {
  border: `1px solid ${colors.border}`,
  borderRadius: "8px",
  overflow: "hidden",
  margin: "20px 0",
};

const metaCellStyle: React.CSSProperties = {
  padding: "12px 14px",
};

const metaLabelStyle: React.CSSProperties = {
  fontFamily: fonts.sans,
  fontSize: "10px",
  color: colors.textSubtle,
  textTransform: "uppercase",
  letterSpacing: "0.07em",
  margin: "0 0 3px",
};

const metaValueStyle: React.CSSProperties = {
  fontFamily: fonts.display,
  fontSize: "14px",
  color: colors.text,
  fontWeight: 500,
  margin: 0,
};

const primaryBtnStyle: React.CSSProperties = {
  display: "inline-block",
  backgroundColor: colors.teal,
  color: colors.navy,
  fontFamily: fonts.sans,
  fontSize: "13px",
  fontWeight: 500,
  padding: "11px 24px",
  borderRadius: "7px",
  textDecoration: "none",
  letterSpacing: "0.01em",
};

const ghostBtnStyle: React.CSSProperties = {
  display: "inline-block",
  backgroundColor: "transparent",
  color: colors.text,
  fontFamily: fonts.sans,
  fontSize: "13px",
  fontWeight: 400,
  padding: "11px 20px",
  borderRadius: "7px",
  textDecoration: "none",
  border: `1px solid ${colors.border}`,
  marginLeft: "8px",
};

const dividerStyle: React.CSSProperties = {
  borderTop: `1px solid ${colors.border}`,
  margin: "24px 0",
};

const linkFallbackStyle: React.CSSProperties = {
  fontFamily: fonts.sans,
  fontSize: "12px",
  color: colors.textSubtle,
  lineHeight: "1.6",
  marginTop: "10px",
  whiteSpace: "pre-line",
};
