# JL Signature Flooring: o que falta antes de publicar

## 1. Formulário (Web3Forms)
- Criar a chave em https://web3forms.com com o e-mail do José (joseeduardoreger@gmail.com).
- Colar em `index.html`, campo `access_key` (procure `YOUR_WEB3FORMS_ACCESS_KEY`).
- A mesma chave serve aos dois formulários (o do topo da página e o completo, no fim).
- Sem a chave, os formulários mostram erro e pedem para ligar.

## 2. Reviews do Google
- Colar 3 reviews reais (texto, primeiro nome e cidade) na seção `#reviews` do `index.html`.
- Depois de preencher, remover a classe `placeholder` de cada `<figure>`.

## 3. Fotos reais (todas as atuais são do Unsplash, provisórias)
Substituir mantendo o mesmo nome de arquivo em `assets/img/`:

| Arquivo | Onde aparece | Foto ideal do José |
| --- | --- | --- |
| living-hardwood.webp | Fundo do hero | Sala com hardwood instalado (horizontal, bem iluminada) |
| staircase.webp | Serviços, portfólio | Escada pronta |
| empty-room-lvp.webp | Serviços, portfólio, comparativo | Cozinha/ambiente com LVP |
| herringbone-gloss.webp | Serviços, Antes/Depois (depois) | Hardwood restaurado, close brilhante |
| dining-oak.webp | Portfólio | Sala de jantar com piso claro |
| installer.webp | About, fallback do 3D | José instalando (vertical) |
| kitchen-hardwood.webp | Portfólio | Cozinha com hardwood |
| parquet-light.webp | Portfólio | Refinishing pronto |
| modern-room.webp | Portfólio | Ambiente amplo, engineered |
| stairs-close.webp | Portfólio | Close de degraus |
| living-laminate.webp | Serviços, comparativo | Laminate instalado |
| worn-floor.webp | Antes/Depois (antes) | Piso gasto ANTES do refinishing |
| floor-wall.webp | Serviços (Trim) | Rodapé novo |
| herringbone.webp | Comparativo (Hardwood) | Close de hardwood |
| oak-plate.webp | Textura dos fundos claros | Pode manter (textura de carvalho) |

- Antes/Depois: hoje são duas fotos de banco parecidas. Trocar por um antes e depois real do mesmo piso (`worn-floor.webp` e `herringbone-gloss.webp`).

## 4. Confirmar com o José
- Lista final de cidades (mapa e lista em `#estimate`, array `CITIES` em `assets/js/main.js`).
- Licença e seguro: se confirmados, descomentar a linha "Licensed & insured" na seção `#why`.
- "Hands-on flooring work since 2019" (seção Why): confere com o briefing, mas vale confirmar.

## 5. Publicação
- Hospedar a pasta inteira (index.html + assets/) em Netlify, Vercel ou Hostinger e apontar o domínio jlsignatureflooring.com.
- Não subir: `Logos/`, `.impeccable/`, `*.md`.
- Pixel do Meta e Google Ads: o formulário já dispara `fbq('track','Lead')` e `gtag('event','generate_lead')` se os scripts estiverem instalados.
