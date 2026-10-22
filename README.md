<div align="center">

<img src="assets/logo/mark.webp" alt="JL Signature Flooring" width="96">

# JL Signature Flooring

**Site institucional one page para uma empresa de pisos em Kansas City (EUA).**
Hardwood, LVP, laminate, refinishing, escadas e rodapés, com foco total em gerar pedidos de orçamento.

[Ambiente de teste](http://jl.escolats.com.br/) · [Site oficial](https://jlsignatureflooring.com/) · [Instagram](https://www.instagram.com/jl_signatureflooring/)

![HTML](https://img.shields.io/badge/HTML-static-0f0c09?style=flat-square&labelColor=c9963a)
![CSS](https://img.shields.io/badge/CSS-vanilla-0f0c09?style=flat-square&labelColor=c9963a)
![JS](https://img.shields.io/badge/JavaScript-vanilla-0f0c09?style=flat-square&labelColor=c9963a)
![Three.js](https://img.shields.io/badge/Three.js-r160-0f0c09?style=flat-square&labelColor=c9963a)

<br>

<img src="docs/preview-hero.jpg" alt="Hero do site com formulário em etapas" width="100%">

</div>

---

## Sobre o projeto

A JL Signature Flooring é uma empresa de instalação de pisos tocada pelo próprio dono, José, com mais de 7 anos de experiência. O site existe para transformar o tráfego de Meta Ads, Google Ads e Google Business Profile em pedidos de orçamento, por formulário, ligação ou mensagem de texto.

A direção visual, chamada **Parquet Grid**, nasce da própria logo: o losango de tábuas douradas vira a linguagem do site inteiro. A base é laca preta quente, as juntas são douradas e os trechos claros usam carvalho branco.

<table>
  <tr>
    <td width="50%"><img src="docs/preview-services.jpg" alt="Cards de serviços"></td>
    <td width="50%"><img src="docs/preview-3d-build.jpg" alt="3D do processo de instalação"></td>
  </tr>
  <tr>
    <td align="center"><sub>Serviços em cards com foto</sub></td>
    <td align="center"><sub>3D do processo, guiado pelo scroll</sub></td>
  </tr>
</table>

## Destaques

| | |
|---|---|
| **3D do processo de instalação** | Na seção *Why Choose Us*, um trecho de piso é instalado em 5 etapas conforme o visitante rola a página: preparo do contrapiso, teste de umidade, manta, tábua por tábua e acabamento. Feito em Three.js, rebobina ao rolar para cima e tem versão estática para quem prefere menos movimento. |
| **Formulários em etapas** | O formulário do topo e o completo, no fim da página, são divididos em 3 passos curtos, com validação em cada etapa e máscara de telefone americano e ZIP. |
| **Feito para o celular** | Barra fixa de *Call / Text / Free Estimate*, carrosséis de deslizar e alvos de toque confortáveis. Revisado a 390px e 360px. |
| **Comparativo de materiais** | Fichas de LVP, laminate e hardwood mostram o ponto forte de cada um, com o pedido de orçamento já preenchido. |
| **Mapa da área atendida** | Leaflet com OpenStreetMap em tons escuros, com marcadores em losango dourado nas cidades atendidas. |
| **Sem framework e sem build** | Um `index.html`, um CSS e dois arquivos de JS. Basta subir os arquivos no servidor. |

<div align="center">
  <img src="docs/preview-mobile.jpg" alt="Versão mobile" width="280">
  <br><sub>Versão mobile</sub>
</div>

## Seções da página

1. **Hero:** foto de fundo, headline e formulário de orçamento em 3 passos
2. **About:** empresa local, conduzida pelo dono
3. **Services:** 6 serviços em cards com foto
4. **Which Floor Fits Your Home?:** comparativo de LVP, laminate e hardwood
5. **Our Work:** mosaico de projetos e slider de antes e depois
6. **Reviews:** avaliações do Google
7. **Why Choose Us:** diferenciais e o 3D do processo
8. **How It Works:** os 3 passos até o piso novo
9. **FAQ:** dúvidas frequentes
10. **Estimate:** formulário completo em etapas e mapa da área atendida

## Identidade visual

| Token | Cor | Uso |
|---|---|---|
| `--lacquer` | `#0f0c09` | Fundo principal (laca preta quente) |
| `--gold` | `#c9963a` | Juntas, marcadores e detalhes |
| `--leaf` | gradiente `#e3c46b` → `#f3e9a0` | Folha de ouro dos botões e destaques, tirada da logo |
| `--oak` | `#dfcdac` | Seções claras, sobre textura de carvalho |
| `--bone` | `#f4ede1` | Texto sobre fundo escuro |
| `--ink` | `#17120d` | Texto sobre fundo claro |

**Tipografia:** [Gloock](https://fonts.google.com/specimen/Gloock) nos títulos (serifa de alto contraste, parente do "Signature" da logo) e [Albert Sans](https://fonts.google.com/specimen/Albert+Sans) nos textos e rótulos.

O sistema completo (cores, tipografia, componentes e movimento) está documentado em [`DESIGN.md`](DESIGN.md).

## Estrutura

```
.
├── index.html            # a página inteira
├── assets/
│   ├── css/style.css     # estilos
│   ├── js/main.js        # formulários, menus, mapa, máscaras, interações
│   ├── js/process3d.js   # 3D do processo (Three.js, carregado sob demanda)
│   ├── img/              # fotos (provisórias, ver PENDENCIAS.md)
│   └── logo/             # versões da logo usadas no site
├── Logos/                # arquivos originais da marca
├── docs/                 # imagens deste README
├── .htaccess             # cache, compressão, segurança e noindex do ambiente de teste
├── robots.txt
├── sitemap.xml
├── DESIGN.md             # sistema visual
├── PRODUCT.md            # contexto do produto e do público
└── PENDENCIAS.md         # o que falta antes de publicar
```

## Rodando localmente

Não precisa instalar nada. Basta servir a pasta com qualquer servidor estático:

```bash
npx http-server -p 5517 -c-1
# ou
python -m http.server 5517
```

Depois acesse `http://127.0.0.1:5517`.

> Abrir o `index.html` direto pelo arquivo (`file://`) não carrega o 3D, porque módulos ES exigem um servidor.

## Publicação

**Ambiente de teste** (`jl.escolats.com.br`): suba `index.html`, `assets/`, `.htaccess`, `robots.txt` e `sitemap.xml`. Nesse ambiente o `.htaccess` e o `robots.txt` bloqueiam a indexação nos buscadores.

**Domínio oficial** (`jlsignatureflooring.com`):

1. No `.htaccess`, remova o bloco *TEST ENVIRONMENT* e ative o bloco de HTTPS.
2. No `robots.txt`, use a versão de produção que está comentada no próprio arquivo.
3. No `sitemap.xml`, troque as URLs para `https://jlsignatureflooring.com/`.

## Antes de ir ao ar

A lista completa está em [`PENDENCIAS.md`](PENDENCIAS.md). Os itens principais:

- [ ] Chave do **Web3Forms** no `index.html` (procure `YOUR_WEB3FORMS_ACCESS_KEY`)
- [ ] **Reviews reais** do Google no lugar dos placeholders
- [ ] **Fotos reais** dos projetos do José no lugar das fotos de banco
- [ ] Confirmar a **lista de cidades** atendidas e o selo de **licença e seguro**

## Créditos

- Fotos provisórias: [Unsplash](https://unsplash.com) (Unsplash License)
- 3D: [Three.js](https://threejs.org) (MIT)
- Mapa: [Leaflet](https://leafletjs.com) (BSD-2) e © [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors
- Fontes: Gloock e Albert Sans, via Google Fonts (SIL Open Font License)

---

<div align="center">
<sub>Desenvolvido por <strong>Eu Sou TS</strong> para a JL Signature Flooring · © 2026 JL Signature Flooring. Todos os direitos reservados.</sub>
</div>
