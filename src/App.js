import { useState, useRef, useEffect, useMemo } from "react";

const T = {
  bg: "#0a0a0b",
  card: "#141416",
  border: "#232326",
  borderLight: "#2a2a2e",
  text: "#d4d4d8",
  textMuted: "#71717a",
  textDim: "#52525b",
  accent: "#d4a843",
  gold: "#d4a843",
  goldDim: "#b8922e",
  white: "#fafafa",
  green: "#6ee7b7",
  red: "#ef6b6b",
  redSoft: "#fca5a5",
  yellow: "#fde68a",
  blue: "#60a5fa",
  blueSoft: "#93c5fd",
  positive: "#60a5fa",
  negative: "#ef6b6b",
  mono: "'JetBrains Mono', 'SF Mono', monospace",
  sans: "'Inter', -apple-system, system-ui, sans-serif",
};

function EC({ value, onChange, format = "currency", style = {} }) {
  const [editing, setEditing] = useState(false);
  const [temp, setTemp] = useState("");
  const ref = useRef(null);
  const f = (v) => {
    if (format === "currency")
      return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    if (format === "number") return v.toLocaleString("pt-BR");
    if (format === "percent") return `${v.toFixed(1)}%`;
    return v;
  };
  useEffect(() => {
    if (editing && ref.current) {
      ref.current.focus();
      ref.current.select();
    }
  }, [editing]);
  const commit = () => {
    setEditing(false);
    const p = parseFloat(temp.replace(/[^\d.,-]/g, "").replace(",", "."));
    if (!isNaN(p)) onChange(p);
  };
  if (editing)
    return (
      <input
        ref={ref}
        value={temp}
        onChange={(e) => setTemp(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") commit();
          if (e.key === "Escape") setEditing(false);
        }}
        style={{
          background: T.bg,
          border: `1px solid ${T.gold}`,
          borderRadius: 4,
          color: T.white,
          padding: "3px 6px",
          fontSize: "inherit",
          fontFamily: T.mono,
          fontWeight: 600,
          width: "100%",
          outline: "none",
          ...style,
        }}
      />
    );
  return (
    <span
      onClick={() => {
        setEditing(true);
        setTemp(String(typeof value === "number" ? value : 0));
      }}
      title="Editar"
      style={{
        cursor: "pointer",
        borderBottom: `1px dashed ${T.border}`,
        fontFamily: T.mono,
        fontWeight: 600,
        color: T.text,
        ...style,
      }}
      onMouseEnter={(e) => (e.target.style.borderBottomColor = T.gold)}
      onMouseLeave={(e) => (e.target.style.borderBottomColor = T.border)}
    >
      {f(value)}
    </span>
  );
}

function ET({ value, onChange, style = {} }) {
  const [editing, setEditing] = useState(false);
  const [temp, setTemp] = useState(value);
  const ref = useRef(null);
  useEffect(() => {
    if (editing && ref.current) {
      ref.current.focus();
      ref.current.select();
    }
  }, [editing]);
  const commit = () => {
    setEditing(false);
    if (temp.trim()) onChange(temp.trim());
  };
  if (editing)
    return (
      <input
        ref={ref}
        value={temp}
        onChange={(e) => setTemp(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") commit();
          if (e.key === "Escape") setEditing(false);
        }}
        style={{
          background: T.bg,
          border: `1px solid ${T.gold}`,
          borderRadius: 4,
          color: T.white,
          padding: "3px 6px",
          fontSize: "inherit",
          fontWeight: 500,
          width: "100%",
          outline: "none",
          ...style,
        }}
      />
    );
  return (
    <span
      onClick={() => {
        setEditing(true);
        setTemp(value);
      }}
      title="Editar"
      style={{
        cursor: "pointer",
        borderBottom: `1px dashed ${T.border}`,
        ...style,
      }}
      onMouseEnter={(e) => (e.target.style.borderBottomColor = T.gold)}
      onMouseLeave={(e) => (e.target.style.borderBottomColor = T.border)}
    >
      {value}
    </span>
  );
}

function Badge({ text, onClick }) {
  const m = {
    Protestado: T.red,
    "Em cobrança": T.yellow,
    Atrasado: T.blue,
    Pago: T.green,
    "A vencer": T.textMuted,
    Ativo: T.green,
    Experiência: T.blue,
    Vencido: T.red,
    Recebido: T.green,
    "Cancelado pelo cliente": T.red,
    "Cancelado pela empresa": T.yellow,
    "Rescisão contratual": T.red,
    "Pedido de demissão": T.yellow,
    "Demissão sem justa causa": T.red,
    "Demissão por justa causa": T.red,
    "Término de contrato": T.textMuted,
  };
  const c = m[text] || T.textMuted;
  return (
    <span
      onClick={onClick}
      style={{
        fontSize: 10,
        fontWeight: 600,
        padding: "2px 8px",
        borderRadius: 4,
        border: `1px solid ${c}40`,
        color: c,
        cursor: onClick ? "pointer" : "default",
        whiteSpace: "nowrap",
        letterSpacing: 0.3,
      }}
    >
      {text}
    </span>
  );
}

function Sec({ title, children, action }) {
  return (
    <div
      style={{
        background: T.card,
        border: `1px solid ${T.border}`,
        borderRadius: 10,
        padding: "18px 20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 14,
          paddingBottom: 8,
          borderBottom: `1px solid ${T.border}`,
          flexWrap: "wrap",
          gap: 6,
        }}
      >
        <h3
          style={{
            fontSize: 12,
            color: T.gold,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 1.5,
            margin: 0,
          }}
        >
          {title}
        </h3>
        {action}
      </div>
      {children}
    </div>
  );
}

function Btn({ onClick, label }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "none",
        border: `1px solid ${T.border}`,
        borderRadius: 4,
        color: T.textMuted,
        fontSize: 10,
        padding: "3px 8px",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => (e.target.style.color = T.white)}
      onMouseLeave={(e) => (e.target.style.color = T.textMuted)}
    >
      {label}
    </button>
  );
}

function Rm({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "none",
        border: "none",
        color: T.textDim,
        fontSize: 13,
        cursor: "pointer",
        padding: "2px 5px",
      }}
      onMouseEnter={(e) => (e.target.style.color = T.red)}
      onMouseLeave={(e) => (e.target.style.color = T.textDim)}
    >
      ✕
    </button>
  );
}

function Kpi({ title, value, sub }) {
  return (
    <div
      style={{
        background: T.card,
        border: `1px solid ${T.border}`,
        borderRadius: 10,
        padding: "16px 18px",
      }}
    >
      <div
        style={{
          fontSize: 10,
          color: T.goldDim,
          fontWeight: 600,
          letterSpacing: 1,
          marginBottom: 6,
          textTransform: "uppercase",
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: 20,
          fontFamily: T.mono,
          fontWeight: 700,
          color: T.white,
        }}
      >
        {value}
      </div>
      {sub && (
        <div style={{ fontSize: 10, color: T.textDim, marginTop: 4 }}>
          {sub}
        </div>
      )}
    </div>
  );
}

function Gauge({ pct: p, label, warn }) {
  const circ = 2 * Math.PI * 50;
  const cl = Math.min(Math.max(p, 0), 100);
  const color = warn
    ? p > warn[1]
      ? T.red
      : p > warn[0]
      ? T.yellow
      : T.blue
    : p >= 80
    ? T.blue
    : p >= 50
    ? T.gold
    : T.red;
  return (
    <svg width="120" height="120" viewBox="0 0 120 120">
      <circle
        cx="60"
        cy="60"
        r="50"
        fill="none"
        stroke={T.border}
        strokeWidth="6"
      />
      <circle
        cx="60"
        cy="60"
        r="50"
        fill="none"
        stroke={color}
        strokeWidth="6"
        strokeDasharray={circ}
        strokeDashoffset={circ - (cl / 100) * circ}
        strokeLinecap="round"
        transform="rotate(-90 60 60)"
        style={{ transition: "stroke-dashoffset 0.6s ease", opacity: 0.7 }}
      />
      <text
        x="60"
        y="58"
        textAnchor="middle"
        fill={T.white}
        fontSize="18"
        fontWeight="700"
        fontFamily={T.mono}
      >
        {p.toFixed(1)}%
      </text>
      <text
        x="60"
        y="74"
        textAnchor="middle"
        fill={T.textDim}
        fontSize="9"
        fontWeight="500"
      >
        {label}
      </text>
    </svg>
  );
}

// Donut chart component
function Donut({ segments, size = 180, thickness = 24, children }) {
  const r = (size - thickness) / 2;
  const circ = 2 * Math.PI * r;
  let offset = 0;
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={T.border}
          strokeWidth={thickness}
        />
        {segments.map((seg, i) => {
          const dash = (seg.pct / 100) * circ;
          const o = offset;
          offset += dash;
          return (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth={thickness}
              strokeDasharray={`${dash} ${circ - dash}`}
              strokeDashoffset={-o}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
              style={{
                transition:
                  "stroke-dasharray 0.6s ease, stroke-dashoffset 0.6s ease",
                opacity: 0.75,
              }}
            />
          );
        })}
      </svg>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function HBar({ label, value, max, display }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 11,
          marginBottom: 2,
          color: T.text,
        }}
      >
        <span>{label}</span>
        <span style={{ fontFamily: T.mono, fontWeight: 600 }}>{display}</span>
      </div>
      <div
        style={{
          height: 5,
          background: T.border,
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${max > 0 ? (value / max) * 100 : 0}%`,
            background: T.gold,
            borderRadius: 3,
            transition: "width 0.5s ease",
            opacity: 0.5,
          }}
        />
      </div>
    </div>
  );
}

const TH = ({ children }) => (
  <th
    style={{
      textAlign: "left",
      padding: "6px 8px",
      color: T.textDim,
      fontWeight: 600,
      fontSize: 9,
      textTransform: "uppercase",
      letterSpacing: 1,
    }}
  >
    {children}
  </th>
);
const fmt = (v) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const pct = (v, t) => (t > 0 ? (v / t) * 100 : 0);

const scInad = ["Atrasado", "Em cobrança", "Protestado"];
const scConta = ["A vencer", "Pago"];
const scDist = [
  "Cancelado pelo cliente",
  "Cancelado pela empresa",
  "Rescisão contratual",
];
const scEnt = ["Experiência", "Ativo"];
const scSai = [
  "Pedido de demissão",
  "Demissão sem justa causa",
  "Demissão por justa causa",
  "Término de contrato",
];

function useLS(key, defaultVal) {
  const [val, setVal] = useState(() => {
    try {
      const s = localStorage.getItem("pf_" + key);
      return s ? JSON.parse(s) : defaultVal;
    } catch {
      return defaultVal;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem("pf_" + key, JSON.stringify(val));
    } catch {}
  }, [val, key]);
  return [val, setVal];
}

export default function Dashboard() {
  const [tab, setTab] = useState("visao");
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => setLoaded(true), 60);
  }, []);

  const [metaVendas, setMetaVendas] = useLS("metaVendas", 250000);
  const [saldoCaixa, setSaldoCaixa] = useLS("saldoCaixa", 284750);
  const [metaFatAnual, setMetaFatAnual] = useLS("metaFatAnual", 2400000);
  const [metaCaixaAnual, setMetaCaixaAnual] = useLS("metaCaixaAnual", 500000);

  const [metasMensais, setMetasMensais] = useLS("metasMensais", [
    {
      mes: "Jan",
      metaFat: 180000,
      realFat: 165000,
      metaCaixa: 30000,
      realCaixa: 28000,
    },
    {
      mes: "Fev",
      metaFat: 185000,
      realFat: 172000,
      metaCaixa: 35000,
      realCaixa: 31000,
    },
    {
      mes: "Mar",
      metaFat: 190000,
      realFat: 158000,
      metaCaixa: 38000,
      realCaixa: 13000,
    },
    {
      mes: "Abr",
      metaFat: 200000,
      realFat: 181000,
      metaCaixa: 42000,
      realCaixa: 42000,
    },
    {
      mes: "Mai",
      metaFat: 210000,
      realFat: 189420,
      metaCaixa: 45000,
      realCaixa: 47120,
    },
    { mes: "Jun", metaFat: 210000, realFat: 0, metaCaixa: 45000, realCaixa: 0 },
    { mes: "Jul", metaFat: 200000, realFat: 0, metaCaixa: 42000, realCaixa: 0 },
    { mes: "Ago", metaFat: 205000, realFat: 0, metaCaixa: 43000, realCaixa: 0 },
    { mes: "Set", metaFat: 210000, realFat: 0, metaCaixa: 45000, realCaixa: 0 },
    { mes: "Out", metaFat: 215000, realFat: 0, metaCaixa: 45000, realCaixa: 0 },
    { mes: "Nov", metaFat: 220000, realFat: 0, metaCaixa: 45000, realCaixa: 0 },
    { mes: "Dez", metaFat: 175000, realFat: 0, metaCaixa: 45000, realCaixa: 0 },
  ]);
  const updMeta = (i, k, v) =>
    setMetasMensais((a) => a.map((r, j) => (j === i ? { ...r, [k]: v } : r)));

  const [fluxo, setFluxo] = useLS("fluxo", [
    { mes: "Jan", entrada: 165000, saida: 138000 },
    { mes: "Fev", entrada: 172000, saida: 141000 },
    { mes: "Mar", entrada: 158000, saida: 145000 },
    { mes: "Abr", entrada: 181000, saida: 139000 },
    { mes: "Mai", entrada: 189420, saida: 142300 },
  ]);

  const [inadimplentes, setInadimplentes] = useLS("inadimplentes", [
    {
      id: 1,
      cliente: "Madeiras Sul Ltda",
      valor: 12500,
      dias: 45,
      status: "Protestado",
    },
    {
      id: 2,
      cliente: "Comercial Norte ME",
      valor: 8900,
      dias: 32,
      status: "Em cobrança",
    },
    {
      id: 3,
      cliente: "Tech Solutions SA",
      valor: 7200,
      dias: 28,
      status: "Em cobrança",
    },
    {
      id: 4,
      cliente: "Posto Central",
      valor: 6800,
      dias: 60,
      status: "Protestado",
    },
    {
      id: 5,
      cliente: "Restaurante Beira Mar",
      valor: 4990,
      dias: 15,
      status: "Atrasado",
    },
    {
      id: 6,
      cliente: "Auto Peças JP",
      valor: 4200,
      dias: 90,
      status: "Protestado",
    },
    {
      id: 7,
      cliente: "Farmácia Vida",
      valor: 3300,
      dias: 22,
      status: "Atrasado",
    },
  ]);

  const [contas, setContas] = useLS("contas", [
    {
      id: 1,
      conta: "Aluguel",
      valor: 18000,
      venc: "10/06",
      status: "A vencer",
    },
    {
      id: 2,
      conta: "Folha de Pagamento",
      valor: 32000,
      venc: "05/06",
      status: "A vencer",
    },
    {
      id: 3,
      conta: "Energia Elétrica",
      valor: 4200,
      venc: "15/06",
      status: "A vencer",
    },
    {
      id: 4,
      conta: "Internet / Telecom",
      valor: 1800,
      venc: "20/06",
      status: "A vencer",
    },
    {
      id: 5,
      conta: "Contador",
      valor: 3500,
      venc: "10/06",
      status: "A vencer",
    },
    { id: 6, conta: "Seguros", valor: 2950, venc: "01/06", status: "Pago" },
    {
      id: 7,
      conta: "Software / SaaS",
      valor: 4200,
      venc: "05/06",
      status: "Pago",
    },
    { id: 8, conta: "Água", valor: 1800, venc: "12/06", status: "A vencer" },
  ]);

  const [vendedores, setVendedores] = useLS("vendedores", [
    { id: 1, nome: "Carlos", meta: 60000, realizado: 52000 },
    { id: 2, nome: "Ana", meta: 55000, realizado: 58200 },
    { id: 3, nome: "Roberto", meta: 50000, realizado: 34500 },
    { id: 4, nome: "Juliana", meta: 45000, realizado: 28700 },
    { id: 5, nome: "Marcos", meta: 40000, realizado: 16020 },
  ]);

  const [distratos, setDistratos] = useLS("distratos", [
    {
      id: 1,
      cliente: "Indústria ABC",
      contrato: "CT-2024-088",
      valor: 36000,
      motivo: "Cancelado pelo cliente",
      data: "03/05/2026",
      multa: 5400,
    },
    {
      id: 2,
      cliente: "Loja do Pedro",
      contrato: "CT-2024-112",
      valor: 18500,
      motivo: "Cancelado pela empresa",
      data: "10/05/2026",
      multa: 2775,
    },
    {
      id: 3,
      cliente: "Transportes Rápido",
      contrato: "CT-2023-045",
      valor: 72000,
      motivo: "Rescisão contratual",
      data: "15/04/2026",
      multa: 10800,
    },
    {
      id: 4,
      cliente: "Clínica Saúde+",
      contrato: "CT-2025-003",
      valor: 24000,
      motivo: "Cancelado pelo cliente",
      data: "22/04/2026",
      multa: 3600,
    },
  ]);

  const [entradas, setEntradas] = useLS("entradas", [
    {
      id: 1,
      nome: "Lucas Ferreira",
      cargo: "Analista Financeiro",
      setor: "Financeiro",
      dataAdm: "02/05/2026",
      salario: 4500,
      status: "Experiência",
    },
    {
      id: 2,
      nome: "Mariana Costa",
      cargo: "Vendedora",
      setor: "Comercial",
      dataAdm: "05/05/2026",
      salario: 3200,
      status: "Experiência",
    },
    {
      id: 3,
      nome: "Rafael Souza",
      cargo: "Desenvolvedor",
      setor: "TI",
      dataAdm: "10/04/2026",
      salario: 7800,
      status: "Ativo",
    },
    {
      id: 4,
      nome: "Patrícia Lima",
      cargo: "Assistente Admin",
      setor: "Administrativo",
      dataAdm: "15/03/2026",
      salario: 2800,
      status: "Ativo",
    },
  ]);

  const [saidas, setSaidas] = useLS("saidas", [
    {
      id: 1,
      nome: "João Oliveira",
      cargo: "Vendedor Sênior",
      setor: "Comercial",
      dataDeslig: "01/05/2026",
      salario: 5200,
      motivo: "Pedido de demissão",
      custoRescisao: 12400,
    },
    {
      id: 2,
      nome: "Fernanda Alves",
      cargo: "Recepcionista",
      setor: "Administrativo",
      dataDeslig: "20/04/2026",
      salario: 2400,
      motivo: "Demissão sem justa causa",
      custoRescisao: 8900,
    },
    {
      id: 3,
      nome: "Diego Santos",
      cargo: "Motorista",
      setor: "Logística",
      dataDeslig: "12/04/2026",
      salario: 3100,
      motivo: "Término de contrato",
      custoRescisao: 3100,
    },
  ]);

  // ── COMERCIAL + RECEBIDOS (merged) ──
  const [recebidoOuro, setRecebidoOuro] = useLS("recebidoOuro", 112000);
  const [recebidoVFF, setRecebidoVFF] = useLS("recebidoVFF", 77420);

  const [quadroTotal, setQuadroTotal] = useLS("quadroTotal", 42);
  const [folhaMensal, setFolhaMensal] = useLS("folhaMensal", 148000);
  const [absenteismo, setAbsenteismo] = useLS("absenteismo", 4.2);
  const [rhMeses, setRhMeses] = useLS("rhMeses", [
    { mes: "Jan", entradas: 2, saidas: 1, folha: 142000 },
    { mes: "Fev", entradas: 1, saidas: 0, folha: 143500 },
    { mes: "Mar", entradas: 3, saidas: 2, folha: 145000 },
    { mes: "Abr", entradas: 1, saidas: 1, folha: 146000 },
    { mes: "Mai", entradas: 4, saidas: 3, folha: 148000 },
  ]);

  /* ── DERIVED ── */
  const receitaMes = fluxo.length > 0 ? fluxo[fluxo.length - 1].entrada : 0;
  const despesasMes = fluxo.length > 0 ? fluxo[fluxo.length - 1].saida : 0;
  const totalInad = inadimplentes.reduce((s, c) => s + c.valor, 0);
  const totalContas = contas.reduce((s, c) => s + c.valor, 0);
  const realizadoVendas = recebidoOuro + recebidoVFF;
  const metaPctV = pct(realizadoVendas, metaVendas);
  const gapMeta = metaVendas - realizadoVendas;
  const protestados = inadimplentes.filter(
    (c) => c.status === "Protestado"
  ).length;
  const totalDist = distratos.reduce((s, d) => s + d.valor, 0);
  const totalMultas = distratos.reduce((s, d) => s + d.multa, 0);
  const totalCustoResc = saidas.reduce((s, x) => s + x.custoRescisao, 0);
  const turnover = quadroTotal > 0 ? (saidas.length / quadroTotal) * 100 : 0;
  const folhaRec = receitaMes > 0 ? (folhaMensal / receitaMes) * 100 : 0;
  const custoMedio = quadroTotal > 0 ? folhaMensal / quadroTotal : 0;
  const totalRealFat = metasMensais.reduce((s, m) => s + m.realFat, 0);
  const totalRealCaixa = metasMensais.reduce((s, m) => s + m.realCaixa, 0);
  const pctFatA = pct(totalRealFat, metaFatAnual);
  const pctCaixaA = pct(totalRealCaixa, metaCaixaAnual);
  const mesesP = metasMensais.filter((m) => m.realFat > 0).length;
  const projFat = mesesP > 0 ? (totalRealFat / mesesP) * 12 : 0;
  const totalEnt12 = rhMeses.reduce((s, m) => s + m.entradas, 0);
  const totalSai12 = rhMeses.reduce((s, m) => s + m.saidas, 0);

  // Donut segments for comercial
  const pctOuro = metaVendas > 0 ? (recebidoOuro / metaVendas) * 100 : 0;
  const pctVFF = metaVendas > 0 ? (recebidoVFF / metaVendas) * 100 : 0;
  const pctGap = Math.max(0, 100 - pctOuro - pctVFF);

  const barMax = Math.max(...fluxo.map((d) => Math.max(d.entrada, d.saida)), 1);
  const nid = useRef(200);
  const nn = () => ++nid.current;

  const uf = (i, k, v) =>
    setFluxo((a) => a.map((r, j) => (j === i ? { ...r, [k]: v } : r)));
  const ui = (id, k, v) =>
    setInadimplentes((a) => a.map((r) => (r.id === id ? { ...r, [k]: v } : r)));
  const uc = (id, k, v) =>
    setContas((a) => a.map((r) => (r.id === id ? { ...r, [k]: v } : r)));
  const ud = (id, k, v) =>
    setDistratos((a) => a.map((r) => (r.id === id ? { ...r, [k]: v } : r)));
  const ue = (id, k, v) =>
    setEntradas((a) => a.map((r) => (r.id === id ? { ...r, [k]: v } : r)));
  const us = (id, k, v) =>
    setSaidas((a) => a.map((r) => (r.id === id ? { ...r, [k]: v } : r)));
  const urh = (i, k, v) =>
    setRhMeses((a) => a.map((r, j) => (j === i ? { ...r, [k]: v } : r)));

  const ded = receitaMes * 0.1;
  const recLiq = receitaMes - ded;
  const cmv = receitaMes * 0.45;
  const lb = recLiq - cmv;
  const dop = receitaMes * 0.3;
  const ebitda = lb - dop;
  const dep = 3200;
  const lop = ebitda - dep;
  const dre = [
    { item: "Receita Bruta", v: receitaMes, h: false },
    { item: "(-) Deduções 10%", v: -ded, h: false },
    { item: "Receita Líquida", v: recLiq, h: true },
    { item: "(-) CMV 45%", v: -cmv, h: false },
    { item: "Lucro Bruto", v: lb, h: true },
    { item: "(-) Desp. Op. 30%", v: -dop, h: false },
    { item: "EBITDA", v: ebitda, h: true },
    { item: "(-) Depreciação", v: -dep, h: false },
    { item: "Lucro Operacional", v: lop, h: true },
  ];

  const tabs = [
    { id: "visao", label: "Visão Geral" },
    { id: "metas", label: "Metas Anuais" },
    { id: "comercial", label: "Comercial" },
    { id: "inadimplencia", label: "Inadimplência" },
    { id: "contas", label: "Contas Fixas" },
    { id: "dre", label: "DRE" },
    { id: "distratos", label: "Distratos" },
    { id: "rh", label: "RH" },
  ];

  const grid = (cols) => ({
    display: "grid",
    gridTemplateColumns: cols,
    gap: 12,
  });
  const col = { display: "flex", flexDirection: "column", gap: 14 };
  const tr1 = { borderBottom: `1px solid ${T.border}` };
  const td1 = { padding: "8px 8px" };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: T.bg,
        fontFamily: T.sans,
        color: T.text,
        opacity: loaded ? 1 : 0,
        transition: "opacity 0.3s",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600;700&display=swap"
        rel="stylesheet"
      />

      <div
        style={{
          padding: "20px 24px 16px",
          borderBottom: `1px solid ${T.border}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div>
          <h1
            style={{
              fontSize: 20,
              fontWeight: 700,
              margin: 0,
              color: T.gold,
              letterSpacing: -0.3,
            }}
          >
            Painel Financeiro
          </h1>
          <p style={{ fontSize: 10, color: T.textDim, margin: "2px 0 0" }}>
            Clique em qualquer valor para editar
          </p>
        </div>
        <div style={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                padding: "6px 12px",
                borderRadius: 4,
                border: "none",
                cursor: "pointer",
                fontSize: 12,
                fontWeight: 600,
                background: tab === t.id ? `${T.gold}22` : "transparent",
                color: tab === t.id ? T.gold : T.textMuted,
                transition: "all 0.15s",
                borderBottom:
                  tab === t.id
                    ? `2px solid ${T.gold}`
                    : "2px solid transparent",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: "16px 24px", maxWidth: 1100, margin: "0 auto" }}>
        {/* ═══ VISÃO GERAL ═══ */}
        {tab === "visao" && (
          <div style={col}>
            <div style={grid("repeat(auto-fit, minmax(180px, 1fr))")}>
              <div
                style={{
                  background: T.card,
                  border: `1px solid ${T.border}`,
                  borderRadius: 10,
                  padding: "16px 18px",
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    color: T.goldDim,
                    fontWeight: 600,
                    letterSpacing: 1,
                    marginBottom: 6,
                    textTransform: "uppercase",
                  }}
                >
                  Saldo em Caixa
                </div>
                <EC
                  value={saldoCaixa}
                  onChange={setSaldoCaixa}
                  style={{ fontSize: 20 }}
                />
              </div>
              <Kpi
                title="Receita do Mês"
                value={fmt(receitaMes)}
                sub="do fluxo"
              />
              <Kpi
                title="Despesas do Mês"
                value={fmt(despesasMes)}
                sub="do fluxo"
              />
              <Kpi
                title="Inadimplência"
                value={fmt(totalInad)}
                sub={`${inadimplentes.length} clientes`}
              />
              <Kpi
                title="Distratos"
                value={fmt(totalDist)}
                sub={`${distratos.length} contratos`}
              />
              <Kpi
                title="Turnover RH"
                value={`${entradas.length} ent / ${saidas.length} saí`}
                sub={`Rescisões: ${fmt(totalCustoResc)}`}
              />
            </div>
            <div style={grid("2fr 1fr")}>
              <Sec
                title="Fluxo de Caixa"
                action={
                  <Btn
                    onClick={() =>
                      setFluxo((f) => [
                        ...f,
                        {
                          mes: [
                            "Jan",
                            "Fev",
                            "Mar",
                            "Abr",
                            "Mai",
                            "Jun",
                            "Jul",
                            "Ago",
                            "Set",
                            "Out",
                            "Nov",
                            "Dez",
                          ][f.length % 12],
                          entrada: 0,
                          saida: 0,
                        },
                      ])
                    }
                    label="+ Mês"
                  />
                }
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: 4,
                    height: 120,
                    marginBottom: 8,
                  }}
                >
                  {fluxo.map((d, i) => (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          gap: 1,
                          alignItems: "flex-end",
                          height: 95,
                          width: "100%",
                        }}
                      >
                        <div
                          style={{
                            flex: 1,
                            background: T.gold,
                            opacity: 0.4,
                            borderRadius: "2px 2px 0 0",
                            height: `${(d.entrada / barMax) * 100}%`,
                            minHeight: d.entrada > 0 ? 2 : 0,
                            transition: "height 0.4s ease",
                          }}
                        />
                        <div
                          style={{
                            flex: 1,
                            background: T.gold,
                            opacity: 0.15,
                            borderRadius: "2px 2px 0 0",
                            height: `${(d.saida / barMax) * 100}%`,
                            minHeight: d.saida > 0 ? 2 : 0,
                            transition: "height 0.4s ease",
                          }}
                        />
                      </div>
                      <span style={{ fontSize: 9, color: T.textDim }}>
                        {d.mes}
                      </span>
                    </div>
                  ))}
                </div>
                <div style={{ maxHeight: 100, overflowY: "auto" }}>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      fontSize: 11,
                    }}
                  >
                    <thead>
                      <tr style={tr1}>
                        <TH>Mês</TH>
                        <TH>Entrada</TH>
                        <TH>Saída</TH>
                        <th style={{ width: 24 }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {fluxo.map((d, i) => (
                        <tr key={i} style={tr1}>
                          <td style={td1}>{d.mes}</td>
                          <td style={td1}>
                            <EC
                              value={d.entrada}
                              onChange={(v) => uf(i, "entrada", v)}
                              style={{ fontSize: 11 }}
                            />
                          </td>
                          <td style={td1}>
                            <EC
                              value={d.saida}
                              onChange={(v) => uf(i, "saida", v)}
                              style={{ fontSize: 11 }}
                            />
                          </td>
                          <td>
                            <Rm
                              onClick={() =>
                                setFluxo((f) => f.filter((_, j) => j !== i))
                              }
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Sec>
              <Sec title="Meta Comercial">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: 8,
                  }}
                >
                  <Gauge pct={metaPctV} label="da meta" />
                </div>
                <div
                  style={{
                    textAlign: "center",
                    fontSize: 12,
                    color: T.textMuted,
                    lineHeight: 2,
                  }}
                >
                  Realizado:{" "}
                  <span
                    style={{
                      color: T.white,
                      fontFamily: T.mono,
                      fontWeight: 600,
                    }}
                  >
                    {fmt(realizadoVendas)}
                  </span>
                  <br />
                  Meta:{" "}
                  <EC
                    value={metaVendas}
                    onChange={setMetaVendas}
                    style={{ fontSize: 12 }}
                  />
                </div>
              </Sec>
            </div>
          </div>
        )}

        {/* ═══ METAS ANUAIS ═══ */}
        {tab === "metas" && (
          <div style={col}>
            <div style={grid("repeat(auto-fit, minmax(200px, 1fr))")}>
              <div
                style={{
                  background: T.card,
                  border: `1px solid ${T.border}`,
                  borderRadius: 10,
                  padding: "16px 18px",
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    color: T.goldDim,
                    fontWeight: 600,
                    letterSpacing: 1,
                    marginBottom: 6,
                    textTransform: "uppercase",
                  }}
                >
                  Meta Fat. Anual
                </div>
                <EC
                  value={metaFatAnual}
                  onChange={setMetaFatAnual}
                  style={{ fontSize: 20 }}
                />
                <div style={{ fontSize: 10, color: T.textDim, marginTop: 4 }}>
                  Realizado: {fmt(totalRealFat)}
                </div>
              </div>
              <div
                style={{
                  background: T.card,
                  border: `1px solid ${T.border}`,
                  borderRadius: 10,
                  padding: "16px 18px",
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    color: T.goldDim,
                    fontWeight: 600,
                    letterSpacing: 1,
                    marginBottom: 6,
                    textTransform: "uppercase",
                  }}
                >
                  Meta Caixa Anual
                </div>
                <EC
                  value={metaCaixaAnual}
                  onChange={setMetaCaixaAnual}
                  style={{ fontSize: 20 }}
                />
                <div style={{ fontSize: 10, color: T.textDim, marginTop: 4 }}>
                  Acumulado: {fmt(totalRealCaixa)}
                </div>
              </div>
              <Kpi
                title="Projeção Fat."
                value={fmt(projFat)}
                sub={
                  projFat >= metaFatAnual
                    ? "Acima da meta"
                    : `Faltam ${fmt(metaFatAnual - projFat)}`
                }
              />
            </div>
            <div style={grid("1fr 1fr")}>
              <Sec title="Progresso Faturamento">
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Gauge pct={pctFatA} label="da meta" />
                </div>
                <div
                  style={{
                    textAlign: "center",
                    fontSize: 11,
                    color: T.textDim,
                    marginTop: 6,
                  }}
                >
                  {mesesP}/12 meses • Média:{" "}
                  {fmt(mesesP > 0 ? totalRealFat / mesesP : 0)}/mês
                </div>
              </Sec>
              <Sec title="Progresso Caixa">
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Gauge pct={pctCaixaA} label="da meta" />
                </div>
                <div
                  style={{
                    textAlign: "center",
                    fontSize: 11,
                    color: T.textDim,
                    marginTop: 6,
                  }}
                >
                  Média: {fmt(mesesP > 0 ? totalRealCaixa / mesesP : 0)}/mês
                </div>
              </Sec>
            </div>
            <Sec title="Detalhamento Mensal">
              <div style={{ overflowX: "auto" }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: 11,
                    minWidth: 600,
                  }}
                >
                  <thead>
                    <tr style={tr1}>
                      <TH>Mês</TH>
                      <TH>Meta Fat.</TH>
                      <TH>Real Fat.</TH>
                      <TH>%</TH>
                      <TH>Meta Caixa</TH>
                      <TH>Real Caixa</TH>
                      <TH>%</TH>
                    </tr>
                  </thead>
                  <tbody>
                    {metasMensais.map((m, i) => {
                      const pF =
                        m.metaFat > 0 ? (m.realFat / m.metaFat) * 100 : 0;
                      const pC =
                        m.metaCaixa > 0 ? (m.realCaixa / m.metaCaixa) * 100 : 0;
                      return (
                        <tr
                          key={i}
                          style={{ ...tr1, opacity: m.realFat > 0 ? 1 : 0.35 }}
                        >
                          <td style={{ ...td1, fontWeight: 600 }}>{m.mes}</td>
                          <td style={td1}>
                            <EC
                              value={m.metaFat}
                              onChange={(v) => updMeta(i, "metaFat", v)}
                              style={{ fontSize: 11 }}
                            />
                          </td>
                          <td style={td1}>
                            <EC
                              value={m.realFat}
                              onChange={(v) => updMeta(i, "realFat", v)}
                              style={{
                                fontSize: 11,
                                color:
                                  pF >= 100
                                    ? T.positive
                                    : pF > 0
                                    ? T.negative
                                    : undefined,
                              }}
                            />
                          </td>
                          <td
                            style={{
                              ...td1,
                              fontFamily: T.mono,
                              fontWeight: 600,
                              fontSize: 10,
                              color:
                                pF >= 100
                                  ? T.positive
                                  : pF > 0
                                  ? T.negative
                                  : T.textDim,
                            }}
                          >
                            {pF > 0 ? `${pF.toFixed(0)}%` : "—"}
                          </td>
                          <td style={td1}>
                            <EC
                              value={m.metaCaixa}
                              onChange={(v) => updMeta(i, "metaCaixa", v)}
                              style={{ fontSize: 11 }}
                            />
                          </td>
                          <td style={td1}>
                            <EC
                              value={m.realCaixa}
                              onChange={(v) => updMeta(i, "realCaixa", v)}
                              style={{
                                fontSize: 11,
                                color:
                                  pC >= 100
                                    ? T.positive
                                    : pC > 0
                                    ? T.negative
                                    : undefined,
                              }}
                            />
                          </td>
                          <td
                            style={{
                              ...td1,
                              fontFamily: T.mono,
                              fontWeight: 600,
                              fontSize: 10,
                              color:
                                pC >= 100
                                  ? T.positive
                                  : pC > 0
                                  ? T.negative
                                  : T.textDim,
                            }}
                          >
                            {pC > 0 ? `${pC.toFixed(0)}%` : "—"}
                          </td>
                        </tr>
                      );
                    })}
                    <tr
                      style={{
                        borderTop: `2px solid ${T.borderLight}`,
                        background: T.card,
                      }}
                    >
                      <td style={{ ...td1, fontWeight: 700, color: T.white }}>
                        TOTAL
                      </td>
                      <td
                        style={{ ...td1, fontFamily: T.mono, fontWeight: 600 }}
                      >
                        {fmt(metasMensais.reduce((s, m) => s + m.metaFat, 0))}
                      </td>
                      <td
                        style={{
                          ...td1,
                          fontFamily: T.mono,
                          fontWeight: 700,
                          color: T.positive,
                        }}
                      >
                        {fmt(totalRealFat)}
                      </td>
                      <td
                        style={{
                          ...td1,
                          fontFamily: T.mono,
                          fontWeight: 700,
                          color: pctFatA >= 100 ? T.positive : T.negative,
                        }}
                      >
                        {pctFatA.toFixed(0)}%
                      </td>
                      <td
                        style={{ ...td1, fontFamily: T.mono, fontWeight: 600 }}
                      >
                        {fmt(metasMensais.reduce((s, m) => s + m.metaCaixa, 0))}
                      </td>
                      <td
                        style={{
                          ...td1,
                          fontFamily: T.mono,
                          fontWeight: 700,
                          color: T.positive,
                        }}
                      >
                        {fmt(totalRealCaixa)}
                      </td>
                      <td
                        style={{
                          ...td1,
                          fontFamily: T.mono,
                          fontWeight: 700,
                          color: pctCaixaA >= 100 ? T.positive : T.negative,
                        }}
                      >
                        {pctCaixaA.toFixed(0)}%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Sec>
          </div>
        )}

        {/* ═══ COMERCIAL (merged with A Receber) ═══ */}
        {tab === "comercial" && (
          <div style={col}>
            <div style={grid("repeat(auto-fit, minmax(180px, 1fr))")}>
              <div
                style={{
                  background: T.card,
                  border: `1px solid ${T.border}`,
                  borderRadius: 10,
                  padding: "16px 18px",
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    color: T.goldDim,
                    fontWeight: 600,
                    letterSpacing: 1,
                    marginBottom: 6,
                    textTransform: "uppercase",
                  }}
                >
                  Meta de Vendas
                </div>
                <EC
                  value={metaVendas}
                  onChange={setMetaVendas}
                  style={{ fontSize: 20 }}
                />
              </div>
              <Kpi
                title="Total Recebido"
                value={fmt(realizadoVendas)}
                sub={`${metaPctV.toFixed(1)}% da meta`}
              />
              <Kpi
                title="Gap da Meta"
                value={fmt(Math.max(gapMeta, 0))}
                sub={gapMeta <= 0 ? "Meta atingida!" : "falta vender"}
              />
            </div>

            <div style={grid("1fr 1fr")}>
              {/* DONUT */}
              <Sec title="Meta vs Recebido">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: 16,
                  }}
                >
                  <Donut
                    segments={[
                      { pct: pctOuro, color: T.gold },
                      { pct: pctVFF, color: T.blue },
                      { pct: pctGap, color: T.border },
                    ]}
                    size={200}
                    thickness={28}
                  >
                    <span
                      style={{
                        fontFamily: T.mono,
                        fontWeight: 700,
                        fontSize: 22,
                        color: T.white,
                      }}
                    >
                      {metaPctV.toFixed(1)}%
                    </span>
                    <span
                      style={{ fontSize: 9, color: T.textDim, marginTop: 2 }}
                    >
                      da meta
                    </span>
                  </Donut>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 20,
                    fontSize: 11,
                  }}
                >
                  <span
                    style={{ display: "flex", alignItems: "center", gap: 5 }}
                  >
                    <span
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 2,
                        background: T.gold,
                        opacity: 0.75,
                      }}
                    ></span>{" "}
                    Padrão Ouro
                  </span>
                  <span
                    style={{ display: "flex", alignItems: "center", gap: 5 }}
                  >
                    <span
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 2,
                        background: T.blue,
                        opacity: 0.75,
                      }}
                    ></span>{" "}
                    VFF
                  </span>
                  <span
                    style={{ display: "flex", alignItems: "center", gap: 5 }}
                  >
                    <span
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 2,
                        background: T.border,
                      }}
                    ></span>{" "}
                    Gap
                  </span>
                </div>
              </Sec>

              {/* VALORES POR PRODUTO */}
              <Sec title="Recebido por Produto">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 20,
                    marginTop: 8,
                  }}
                >
                  <div
                    style={{
                      background: T.bg,
                      borderRadius: 8,
                      padding: 16,
                      border: `1px solid ${T.border}`,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 10,
                      }}
                    >
                      <span
                        style={{ fontSize: 12, fontWeight: 700, color: T.gold }}
                      >
                        Padrão Ouro
                      </span>
                      <span style={{ fontSize: 10, color: T.textDim }}>
                        {metaVendas > 0
                          ? ((recebidoOuro / metaVendas) * 100).toFixed(1)
                          : 0}
                        % da meta
                      </span>
                    </div>
                    <EC
                      value={recebidoOuro}
                      onChange={setRecebidoOuro}
                      style={{ fontSize: 20 }}
                    />
                    <div
                      style={{
                        height: 4,
                        background: T.border,
                        borderRadius: 2,
                        marginTop: 10,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${
                            metaVendas > 0
                              ? Math.min((recebidoOuro / metaVendas) * 100, 100)
                              : 0
                          }%`,
                          background: T.gold,
                          opacity: 0.6,
                          borderRadius: 2,
                          transition: "width 0.5s ease",
                        }}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      background: T.bg,
                      borderRadius: 8,
                      padding: 16,
                      border: `1px solid ${T.border}`,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 10,
                      }}
                    >
                      <span
                        style={{ fontSize: 12, fontWeight: 700, color: T.blue }}
                      >
                        VFF
                      </span>
                      <span style={{ fontSize: 10, color: T.textDim }}>
                        {metaVendas > 0
                          ? ((recebidoVFF / metaVendas) * 100).toFixed(1)
                          : 0}
                        % da meta
                      </span>
                    </div>
                    <EC
                      value={recebidoVFF}
                      onChange={setRecebidoVFF}
                      style={{ fontSize: 20 }}
                    />
                    <div
                      style={{
                        height: 4,
                        background: T.border,
                        borderRadius: 2,
                        marginTop: 10,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${
                            metaVendas > 0
                              ? Math.min((recebidoVFF / metaVendas) * 100, 100)
                              : 0
                          }%`,
                          background: T.blue,
                          opacity: 0.6,
                          borderRadius: 2,
                          transition: "width 0.5s ease",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </Sec>
            </div>

            {/* GAP DETAIL */}
            <Sec title="Resumo">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: 16,
                  textAlign: "center",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 10,
                      color: T.textDim,
                      marginBottom: 4,
                      textTransform: "uppercase",
                      letterSpacing: 1,
                    }}
                  >
                    Meta
                  </div>
                  <div
                    style={{
                      fontSize: 20,
                      fontFamily: T.mono,
                      fontWeight: 700,
                      color: T.white,
                    }}
                  >
                    {fmt(metaVendas)}
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 10,
                      color: T.textDim,
                      marginBottom: 4,
                      textTransform: "uppercase",
                      letterSpacing: 1,
                    }}
                  >
                    Recebido
                  </div>
                  <div
                    style={{
                      fontSize: 20,
                      fontFamily: T.mono,
                      fontWeight: 700,
                      color: T.positive,
                    }}
                  >
                    {fmt(realizadoVendas)}
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 10,
                      color: T.textDim,
                      marginBottom: 4,
                      textTransform: "uppercase",
                      letterSpacing: 1,
                    }}
                  >
                    Gap
                  </div>
                  <div
                    style={{
                      fontSize: 20,
                      fontFamily: T.mono,
                      fontWeight: 700,
                      color: gapMeta > 0 ? T.negative : T.positive,
                    }}
                  >
                    {gapMeta > 0 ? fmt(gapMeta) : "Meta batida!"}
                  </div>
                </div>
              </div>
            </Sec>
          </div>
        )}

        {/* ═══ INADIMPLÊNCIA ═══ */}
        {tab === "inadimplencia" && (
          <div style={col}>
            <div style={grid("repeat(3, 1fr)")}>
              <Kpi title="Total Inadimplente" value={fmt(totalInad)} />
              <Kpi title="Protestados" value={`${protestados} clientes`} />
              <Kpi
                title="Ticket Médio"
                value={fmt(
                  inadimplentes.length > 0
                    ? totalInad / inadimplentes.length
                    : 0
                )}
              />
            </div>
            <Sec
              title="Inadimplentes"
              action={
                <Btn
                  onClick={() =>
                    setInadimplentes((a) => [
                      ...a,
                      {
                        id: nn(),
                        cliente: "Novo",
                        valor: 0,
                        dias: 0,
                        status: "Atrasado",
                      },
                    ])
                  }
                  label="+ Adicionar"
                />
              }
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: 12,
                }}
              >
                <thead>
                  <tr style={tr1}>
                    <TH>Cliente</TH>
                    <TH>Valor</TH>
                    <TH>Dias</TH>
                    <TH>Status</TH>
                    <th style={{ width: 24 }}></th>
                  </tr>
                </thead>
                <tbody>
                  {inadimplentes.map((c) => (
                    <tr key={c.id} style={tr1}>
                      <td style={td1}>
                        <ET
                          value={c.cliente}
                          onChange={(v) => ui(c.id, "cliente", v)}
                          style={{ fontWeight: 500 }}
                        />
                      </td>
                      <td style={td1}>
                        <EC
                          value={c.valor}
                          onChange={(v) => ui(c.id, "valor", v)}
                          style={{ fontSize: 12 }}
                        />
                      </td>
                      <td style={td1}>
                        <EC
                          value={c.dias}
                          onChange={(v) => ui(c.id, "dias", v)}
                          format="number"
                          style={{ fontSize: 12 }}
                        />
                      </td>
                      <td style={td1}>
                        <Badge
                          text={c.status}
                          onClick={() => {
                            const x = scInad.indexOf(c.status);
                            ui(c.id, "status", scInad[(x + 1) % scInad.length]);
                          }}
                        />
                      </td>
                      <td>
                        <Rm
                          onClick={() =>
                            setInadimplentes((a) =>
                              a.filter((r) => r.id !== c.id)
                            )
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Sec>
            <Sec title="Aging">
              {[
                { f: "1–15d", fn: (c) => c.dias <= 15 },
                { f: "16–30d", fn: (c) => c.dias > 15 && c.dias <= 30 },
                { f: "31–60d", fn: (c) => c.dias > 30 && c.dias <= 60 },
                { f: "60d+", fn: (c) => c.dias > 60 },
              ].map((g, i) => {
                const l = inadimplentes.filter(g.fn);
                const t = l.reduce((s, c) => s + c.valor, 0);
                return (
                  <HBar
                    key={i}
                    label={`${g.f} (${l.length})`}
                    value={t}
                    max={totalInad || 1}
                    display={fmt(t)}
                  />
                );
              })}
            </Sec>
          </div>
        )}

        {/* ═══ CONTAS FIXAS ═══ */}
        {tab === "contas" && (
          <div style={col}>
            <div style={grid("repeat(3, 1fr)")}>
              <Kpi title="Total" value={fmt(totalContas)} />
              <Kpi
                title="Pagas"
                value={fmt(
                  contas
                    .filter((c) => c.status === "Pago")
                    .reduce((s, c) => s + c.valor, 0)
                )}
              />
              <Kpi
                title="A Vencer"
                value={fmt(
                  contas
                    .filter((c) => c.status === "A vencer")
                    .reduce((s, c) => s + c.valor, 0)
                )}
              />
            </div>
            <Sec
              title="Contas"
              action={
                <Btn
                  onClick={() =>
                    setContas((a) => [
                      ...a,
                      {
                        id: nn(),
                        conta: "Nova",
                        valor: 0,
                        venc: "--/--",
                        status: "A vencer",
                      },
                    ])
                  }
                  label="+ Conta"
                />
              }
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: 12,
                }}
              >
                <thead>
                  <tr style={tr1}>
                    <TH>Conta</TH>
                    <TH>Valor</TH>
                    <TH>Venc.</TH>
                    <TH>Status</TH>
                    <th style={{ width: 24 }}></th>
                  </tr>
                </thead>
                <tbody>
                  {contas.map((c) => (
                    <tr key={c.id} style={tr1}>
                      <td style={td1}>
                        <ET
                          value={c.conta}
                          onChange={(v) => uc(c.id, "conta", v)}
                          style={{ fontWeight: 500 }}
                        />
                      </td>
                      <td style={td1}>
                        <EC
                          value={c.valor}
                          onChange={(v) => uc(c.id, "valor", v)}
                          style={{ fontSize: 12 }}
                        />
                      </td>
                      <td style={td1}>
                        <ET
                          value={c.venc}
                          onChange={(v) => uc(c.id, "venc", v)}
                          style={{
                            fontFamily: T.mono,
                            fontSize: 10,
                            color: T.textMuted,
                          }}
                        />
                      </td>
                      <td style={td1}>
                        <Badge
                          text={c.status}
                          onClick={() => {
                            const x = scConta.indexOf(c.status);
                            uc(
                              c.id,
                              "status",
                              scConta[(x + 1) % scConta.length]
                            );
                          }}
                        />
                      </td>
                      <td>
                        <Rm
                          onClick={() =>
                            setContas((a) => a.filter((r) => r.id !== c.id))
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Sec>
          </div>
        )}

        {/* ═══ DRE ═══ */}
        {tab === "dre" && (
          <Sec title="DRE Simplificado">
            <p style={{ fontSize: 11, color: T.textDim, marginBottom: 12 }}>
              Calculado a partir do fluxo de caixa.
            </p>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 13,
              }}
            >
              <tbody>
                {dre.map((d, i) => (
                  <tr
                    key={i}
                    style={{
                      borderBottom: d.h
                        ? `2px solid ${T.borderLight}`
                        : `1px solid ${T.border}`,
                      background: d.h ? T.card : "transparent",
                    }}
                  >
                    <td
                      style={{
                        padding: "12px 14px",
                        fontWeight: d.h ? 700 : 400,
                        color: d.h ? T.white : T.text,
                        paddingLeft: d.v < 0 ? 28 : 14,
                      }}
                    >
                      {d.item}
                    </td>
                    <td
                      style={{
                        padding: "12px 14px",
                        textAlign: "right",
                        fontFamily: T.mono,
                        fontWeight: d.h ? 700 : 500,
                        color: d.h
                          ? d.v >= 0
                            ? T.positive
                            : T.negative
                          : d.v < 0
                          ? T.negative
                          : T.text,
                      }}
                    >
                      {fmt(d.v)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div
              style={{
                marginTop: 16,
                padding: 14,
                background: T.bg,
                borderRadius: 8,
                border: `1px solid ${T.border}`,
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  color: T.textDim,
                  marginBottom: 4,
                  fontWeight: 600,
                }}
              >
                MARGEM OPERACIONAL
              </div>
              <span
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  fontFamily: T.mono,
                  color: lop >= 0 ? T.positive : T.negative,
                }}
              >
                {receitaMes > 0 ? ((lop / receitaMes) * 100).toFixed(1) : "0.0"}
                %
              </span>
            </div>
          </Sec>
        )}

        {/* ═══ DISTRATOS ═══ */}
        {tab === "distratos" && (
          <div style={col}>
            <div style={grid("repeat(3, 1fr)")}>
              <Kpi
                title="Total Distratos"
                value={fmt(totalDist)}
                sub={`${distratos.length} contratos`}
              />
              <Kpi title="Multas" value={fmt(totalMultas)} />
              <Kpi title="Perda Líquida" value={fmt(totalDist - totalMultas)} />
            </div>
            <Sec
              title="Distratos"
              action={
                <Btn
                  onClick={() =>
                    setDistratos((a) => [
                      ...a,
                      {
                        id: nn(),
                        cliente: "Novo",
                        contrato: "CT-0000",
                        valor: 0,
                        motivo: "Cancelado pelo cliente",
                        data: "--/--/----",
                        multa: 0,
                      },
                    ])
                  }
                  label="+ Distrato"
                />
              }
            >
              <div style={{ overflowX: "auto" }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: 12,
                    minWidth: 600,
                  }}
                >
                  <thead>
                    <tr style={tr1}>
                      <TH>Cliente</TH>
                      <TH>Contrato</TH>
                      <TH>Valor</TH>
                      <TH>Multa</TH>
                      <TH>Data</TH>
                      <TH>Motivo</TH>
                      <th style={{ width: 24 }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {distratos.map((d) => (
                      <tr key={d.id} style={tr1}>
                        <td style={td1}>
                          <ET
                            value={d.cliente}
                            onChange={(v) => ud(d.id, "cliente", v)}
                            style={{ fontWeight: 500 }}
                          />
                        </td>
                        <td style={td1}>
                          <ET
                            value={d.contrato}
                            onChange={(v) => ud(d.id, "contrato", v)}
                            style={{
                              fontFamily: T.mono,
                              fontSize: 10,
                              color: T.textDim,
                            }}
                          />
                        </td>
                        <td style={td1}>
                          <EC
                            value={d.valor}
                            onChange={(v) => ud(d.id, "valor", v)}
                            style={{ fontSize: 12 }}
                          />
                        </td>
                        <td style={td1}>
                          <EC
                            value={d.multa}
                            onChange={(v) => ud(d.id, "multa", v)}
                            style={{ fontSize: 12 }}
                          />
                        </td>
                        <td style={td1}>
                          <ET
                            value={d.data}
                            onChange={(v) => ud(d.id, "data", v)}
                            style={{
                              fontFamily: T.mono,
                              fontSize: 10,
                              color: T.textMuted,
                            }}
                          />
                        </td>
                        <td style={td1}>
                          <Badge
                            text={d.motivo}
                            onClick={() => {
                              const x = scDist.indexOf(d.motivo);
                              ud(
                                d.id,
                                "motivo",
                                scDist[(x + 1) % scDist.length]
                              );
                            }}
                          />
                        </td>
                        <td>
                          <Rm
                            onClick={() =>
                              setDistratos((a) =>
                                a.filter((r) => r.id !== d.id)
                              )
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Sec>
          </div>
        )}

        {/* ═══ RH ═══ */}
        {tab === "rh" && (
          <div style={col}>
            <div style={grid("repeat(auto-fit, minmax(160px, 1fr))")}>
              <div
                style={{
                  background: T.card,
                  border: `1px solid ${T.border}`,
                  borderRadius: 10,
                  padding: "16px 18px",
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    color: T.goldDim,
                    fontWeight: 600,
                    letterSpacing: 1,
                    marginBottom: 6,
                    textTransform: "uppercase",
                  }}
                >
                  Quadro Total
                </div>
                <EC
                  value={quadroTotal}
                  onChange={setQuadroTotal}
                  format="number"
                  style={{ fontSize: 20 }}
                />
              </div>
              <div
                style={{
                  background: T.card,
                  border: `1px solid ${T.border}`,
                  borderRadius: 10,
                  padding: "16px 18px",
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    color: T.goldDim,
                    fontWeight: 600,
                    letterSpacing: 1,
                    marginBottom: 6,
                    textTransform: "uppercase",
                  }}
                >
                  Folha Mensal
                </div>
                <EC
                  value={folhaMensal}
                  onChange={setFolhaMensal}
                  style={{ fontSize: 20 }}
                />
              </div>
              <Kpi
                title="Turnover"
                value={`${turnover.toFixed(1)}%`}
                sub={turnover > 5 ? "Acima do ideal" : "Normal"}
              />
              <Kpi
                title="Folha / Receita"
                value={`${folhaRec.toFixed(1)}%`}
                sub={folhaRec > 40 ? "Atenção" : "Saudável"}
              />
              <Kpi
                title="Custo Médio"
                value={fmt(custoMedio)}
                sub="por colaborador"
              />
              <div
                style={{
                  background: T.card,
                  border: `1px solid ${T.border}`,
                  borderRadius: 10,
                  padding: "16px 18px",
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    color: T.goldDim,
                    fontWeight: 600,
                    letterSpacing: 1,
                    marginBottom: 6,
                    textTransform: "uppercase",
                  }}
                >
                  Absenteísmo
                </div>
                <EC
                  value={absenteismo}
                  onChange={setAbsenteismo}
                  format="percent"
                  style={{ fontSize: 20 }}
                />
              </div>
            </div>
            <div style={grid("1fr 1fr 1fr")}>
              <Sec title="Turnover">
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Gauge pct={turnover} label="turnover" warn={[5, 10]} />
                </div>
                <div
                  style={{
                    textAlign: "center",
                    fontSize: 10,
                    color: T.textDim,
                    marginTop: 6,
                  }}
                >
                  {saidas.length} saídas / {quadroTotal} ativos
                </div>
              </Sec>
              <Sec title="Folha vs Receita">
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Gauge pct={folhaRec} label="da receita" warn={[35, 50]} />
                </div>
                <div
                  style={{
                    textAlign: "center",
                    fontSize: 10,
                    color: T.textDim,
                    marginTop: 6,
                  }}
                >
                  {fmt(folhaMensal)} / {fmt(receitaMes)}
                </div>
              </Sec>
              <Sec title="Absenteísmo">
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Gauge pct={absenteismo} label="ausências" warn={[4, 8]} />
                </div>
                <div
                  style={{
                    textAlign: "center",
                    fontSize: 10,
                    color: T.textDim,
                    marginTop: 6,
                  }}
                >
                  Meta: abaixo de 4%
                </div>
              </Sec>
            </div>
            <Sec
              title="Evolução Mensal"
              action={
                <Btn
                  onClick={() =>
                    setRhMeses((a) => [
                      ...a,
                      {
                        mes: [
                          "Jan",
                          "Fev",
                          "Mar",
                          "Abr",
                          "Mai",
                          "Jun",
                          "Jul",
                          "Ago",
                          "Set",
                          "Out",
                          "Nov",
                          "Dez",
                        ][a.length % 12],
                        entradas: 0,
                        saidas: 0,
                        folha: 0,
                      },
                    ])
                  }
                  label="+ Mês"
                />
              }
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: 11,
                }}
              >
                <thead>
                  <tr style={tr1}>
                    <TH>Mês</TH>
                    <TH>Entradas</TH>
                    <TH>Saídas</TH>
                    <TH>Saldo</TH>
                    <TH>Folha</TH>
                    <th style={{ width: 24 }}></th>
                  </tr>
                </thead>
                <tbody>
                  {rhMeses.map((m, i) => {
                    const sl = m.entradas - m.saidas;
                    return (
                      <tr key={i} style={tr1}>
                        <td style={{ ...td1, fontWeight: 600 }}>{m.mes}</td>
                        <td style={td1}>
                          <EC
                            value={m.entradas}
                            onChange={(v) => urh(i, "entradas", v)}
                            format="number"
                            style={{ fontSize: 11 }}
                          />
                        </td>
                        <td style={td1}>
                          <EC
                            value={m.saidas}
                            onChange={(v) => urh(i, "saidas", v)}
                            format="number"
                            style={{ fontSize: 11 }}
                          />
                        </td>
                        <td
                          style={{
                            ...td1,
                            fontFamily: T.mono,
                            fontWeight: 600,
                            color: sl >= 0 ? T.positive : T.negative,
                          }}
                        >
                          {sl >= 0 ? "+" : ""}
                          {sl}
                        </td>
                        <td style={td1}>
                          <EC
                            value={m.folha}
                            onChange={(v) => urh(i, "folha", v)}
                            style={{ fontSize: 11 }}
                          />
                        </td>
                        <td>
                          <Rm
                            onClick={() =>
                              setRhMeses((a) => a.filter((_, j) => j !== i))
                            }
                          />
                        </td>
                      </tr>
                    );
                  })}
                  <tr style={{ borderTop: `2px solid ${T.borderLight}` }}>
                    <td style={{ ...td1, fontWeight: 700 }}>TOTAL</td>
                    <td style={{ ...td1, fontFamily: T.mono, fontWeight: 700 }}>
                      {totalEnt12}
                    </td>
                    <td style={{ ...td1, fontFamily: T.mono, fontWeight: 700 }}>
                      {totalSai12}
                    </td>
                    <td
                      style={{
                        ...td1,
                        fontFamily: T.mono,
                        fontWeight: 700,
                        color:
                          totalEnt12 - totalSai12 >= 0
                            ? T.positive
                            : T.negative,
                      }}
                    >
                      {totalEnt12 - totalSai12 >= 0 ? "+" : ""}
                      {totalEnt12 - totalSai12}
                    </td>
                    <td style={{ ...td1, color: T.textDim }}>—</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </Sec>
            <Sec
              title="Entrada de Colaboradores"
              action={
                <Btn
                  onClick={() =>
                    setEntradas((a) => [
                      ...a,
                      {
                        id: nn(),
                        nome: "Novo",
                        cargo: "Cargo",
                        setor: "Setor",
                        dataAdm: "--/--/----",
                        salario: 0,
                        status: "Experiência",
                      },
                    ])
                  }
                  label="+ Colaborador"
                />
              }
            >
              <div style={{ overflowX: "auto" }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: 12,
                    minWidth: 600,
                  }}
                >
                  <thead>
                    <tr style={tr1}>
                      <TH>Nome</TH>
                      <TH>Cargo</TH>
                      <TH>Setor</TH>
                      <TH>Admissão</TH>
                      <TH>Salário</TH>
                      <TH>Status</TH>
                      <th style={{ width: 24 }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {entradas.map((e) => (
                      <tr key={e.id} style={tr1}>
                        <td style={td1}>
                          <ET
                            value={e.nome}
                            onChange={(v) => ue(e.id, "nome", v)}
                            style={{ fontWeight: 500 }}
                          />
                        </td>
                        <td style={td1}>
                          <ET
                            value={e.cargo}
                            onChange={(v) => ue(e.id, "cargo", v)}
                            style={{ color: T.textMuted }}
                          />
                        </td>
                        <td style={td1}>
                          <ET
                            value={e.setor}
                            onChange={(v) => ue(e.id, "setor", v)}
                            style={{ color: T.textDim }}
                          />
                        </td>
                        <td style={td1}>
                          <ET
                            value={e.dataAdm}
                            onChange={(v) => ue(e.id, "dataAdm", v)}
                            style={{
                              fontFamily: T.mono,
                              fontSize: 10,
                              color: T.textMuted,
                            }}
                          />
                        </td>
                        <td style={td1}>
                          <EC
                            value={e.salario}
                            onChange={(v) => ue(e.id, "salario", v)}
                            style={{ fontSize: 12 }}
                          />
                        </td>
                        <td style={td1}>
                          <Badge
                            text={e.status}
                            onClick={() => {
                              const x = scEnt.indexOf(e.status);
                              ue(e.id, "status", scEnt[(x + 1) % scEnt.length]);
                            }}
                          />
                        </td>
                        <td>
                          <Rm
                            onClick={() =>
                              setEntradas((a) => a.filter((r) => r.id !== e.id))
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Sec>
            <Sec
              title="Saída de Colaboradores"
              action={
                <Btn
                  onClick={() =>
                    setSaidas((a) => [
                      ...a,
                      {
                        id: nn(),
                        nome: "Ex-Colab",
                        cargo: "Cargo",
                        setor: "Setor",
                        dataDeslig: "--/--/----",
                        salario: 0,
                        motivo: "Pedido de demissão",
                        custoRescisao: 0,
                      },
                    ])
                  }
                  label="+ Desligamento"
                />
              }
            >
              <div style={{ overflowX: "auto" }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: 12,
                    minWidth: 700,
                  }}
                >
                  <thead>
                    <tr style={tr1}>
                      <TH>Nome</TH>
                      <TH>Cargo</TH>
                      <TH>Setor</TH>
                      <TH>Deslig.</TH>
                      <TH>Salário</TH>
                      <TH>Rescisão</TH>
                      <TH>Motivo</TH>
                      <th style={{ width: 24 }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {saidas.map((s) => (
                      <tr key={s.id} style={tr1}>
                        <td style={td1}>
                          <ET
                            value={s.nome}
                            onChange={(v) => us(s.id, "nome", v)}
                            style={{ fontWeight: 500 }}
                          />
                        </td>
                        <td style={td1}>
                          <ET
                            value={s.cargo}
                            onChange={(v) => us(s.id, "cargo", v)}
                            style={{ color: T.textMuted }}
                          />
                        </td>
                        <td style={td1}>
                          <ET
                            value={s.setor}
                            onChange={(v) => us(s.id, "setor", v)}
                            style={{ color: T.textDim }}
                          />
                        </td>
                        <td style={td1}>
                          <ET
                            value={s.dataDeslig}
                            onChange={(v) => us(s.id, "dataDeslig", v)}
                            style={{
                              fontFamily: T.mono,
                              fontSize: 10,
                              color: T.textMuted,
                            }}
                          />
                        </td>
                        <td style={td1}>
                          <EC
                            value={s.salario}
                            onChange={(v) => us(s.id, "salario", v)}
                            style={{ fontSize: 12 }}
                          />
                        </td>
                        <td style={td1}>
                          <EC
                            value={s.custoRescisao}
                            onChange={(v) => us(s.id, "custoRescisao", v)}
                            style={{ fontSize: 12 }}
                          />
                        </td>
                        <td style={td1}>
                          <Badge
                            text={s.motivo}
                            onClick={() => {
                              const x = scSai.indexOf(s.motivo);
                              us(s.id, "motivo", scSai[(x + 1) % scSai.length]);
                            }}
                          />
                        </td>
                        <td>
                          <Rm
                            onClick={() =>
                              setSaidas((a) => a.filter((r) => r.id !== s.id))
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Sec>
            <Sec title="Desligamentos por Motivo">
              {scSai.map((mot, i) => {
                const l = saidas.filter((s) => s.motivo === mot);
                const t = l.reduce((s, x) => s + x.custoRescisao, 0);
                return (
                  <HBar
                    key={i}
                    label={`${mot} (${l.length})`}
                    value={t}
                    max={totalCustoResc || 1}
                    display={fmt(t)}
                  />
                );
              })}
            </Sec>
          </div>
        )}
      </div>
      <div
        style={{
          padding: "16px 24px",
          borderTop: `1px solid ${T.border}`,
          textAlign: "center",
          fontSize: 10,
          color: T.textDim,
          marginTop: 32,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 16,
        }}
      >
        <span>Dados salvos automaticamente no navegador</span>
        <button
          onClick={() => {
            if (confirm("Apagar todos os dados e voltar ao padrão?")) {
              Object.keys(localStorage)
                .filter((k) => k.startsWith("pf_"))
                .forEach((k) => localStorage.removeItem(k));
              location.reload();
            }
          }}
          style={{
            background: "none",
            border: `1px solid ${T.border}`,
            borderRadius: 4,
            color: T.textDim,
            fontSize: 10,
            padding: "3px 10px",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.target.style.borderColor = T.red;
            e.target.style.color = T.red;
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = T.border;
            e.target.style.color = T.textDim;
          }}
        >
          Resetar Dados
        </button>
      </div>
    </div>
  );
}
