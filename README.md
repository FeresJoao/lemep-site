# LEMEP — site institucional (protótipo)

Site do **LEMEP — Laboratório de Estudos de Mídia e Esfera Pública** (IESP-UERJ).

**Estado: protótipo v1 para revisão do grupo.** Os textos vêm da proposta de
reformulação (`LEMEP__4.DOC`) e da equipe atual do laboratório; os dados que
ainda não foram fornecidos aparecem no site como **pendências editoriais**
(painel amarelo na página inicial), nunca como conteúdo inventado.

- Visualizar: **https://feresjoao.github.io/lemep-site/**
- Abrir local: descompacte o pacote e dê duplo clique em `index.html`
  (funciona 100% offline — fontes e logos são locais).
- Publicação oficial futura: `lemep.iesp.uerj.br` (WordPress ou estático,
  conforme decisão do laboratório). O protótipo está com `robots noindex`.

## Estrutura

| Arquivo | Conteúdo |
|---|---|
| `index.html` | Home — quem somos, objetivos, números, projetos, áreas, publicação, equipe, OLB |
| `pesquisas.html` | Manchetômetro, MNDE, POMT, MDP, PROBRAL, DONI, PNR, estudos temáticos |
| `publicacoes.html` | Produção científica |
| `equipe.html` | Equipe atual + pesquisadores que já colaboraram |
| `styles.css` | Design system (tokens da identidade visual LEMEP) |
| `app.js` | Tema claro/escuro, menu mobile, contador de pendências |
| `tokens.json` | Tokens de design documentados (fontes: kit de identidade + especificação técnica) |
| `assets/` | Logos oficiais (SVG), fontes WOFF2 autohospedadas (OFL), OG image |

## Identidade visual

Aplicada integralmente do kit `Identidade_Visual_LEMEP` (out/2026): paleta,
stripe de marca, assinaturas compacta/completa em SVG, trama decorativa e
tipografia (Source Sans 3 + Source Serif 4, substitutos digitais do Myriad Pro
previstos na especificação técnica de ago/2026).

## Atualizar

As pendências (01–10) listadas na home são preenchidas com dados oficiais do
laboratório; cada preenchimento gera uma nova versão (v2, v3…) neste repositório.