## 🌌 CósmosXP — Interactive Solar System

Angular 18
Three.js
WebGL
TypeScript
3D Interactivo
Descrição

**🔗 Live demo:** https://cosmosxp-tmxp.vercel.app/solar-system

O CósmosXP é uma aplicação web 3D que recria o Sistema Solar de forma visual e interactiva. Usando Three.js sobre WebGL, renderiza os planetas com texturas reais, órbitas animadas e iluminação dinâmica proveniente do Sol. A arquitectura é construída com Angular 18, aproveitando componentes standalone e uma estrutura modular para separar a cena 3D da lógica de dados planetários.

O utilizador pode explorar cada planeta individualmente, visualizando as suas características reais — diâmetro, distância ao Sol, período orbital e composição. A câmara é controlável por rato/touch, permitindo zoom, rotação e pan em toda a cena.

Funcionalidades

8 planetas com texturas e escalas proporcionais
Órbitas animadas em tempo real
Painel de detalhes por planeta
Câmara 3D com OrbitControls
Iluminação dinâmica com PointLight solar
Responsivo para desktop e mobile
Stack de tecnologias

 Angular 18

Framework principal. Componentes standalone, serviços injectáveis e routing SPA.

 Three.js

Engine 3D. Geometrias, materiais, luzes, texturas e animação via requestAnimationFrame.

 WebGL

API de baixo nível para renderização GPU. Utilizado através da abstracção do Three.js.

 TypeScript

Tipagem estática para modelos de dados planetários, serviços e lógica da cena 3D.

 HTML5 Canvas

Elemento canvas como alvo de renderização do WebGL/Three.js.

 Vercel

Deploy automático a partir do repositório GitHub com CI/CD gratuito.

### Tech Stack
- **Angular 18** — SPA framework with standalone components
- **Three.js** — 3D rendering engine (geometries, materials, lighting)
- **WebGL** — GPU-accelerated rendering via Three.js abstraction
- **TypeScript** — typed data models and scene logic
- **Vercel** — CI/CD deployment from GitHub

### Features
- 8 planets with real textures and proportional scales
- Real-time animated orbits
- Dynamic solar lighting (PointLight)
- Orbit camera with zoom, pan & rotate
- Per-planet detail panel
- Responsive for desktop & mobile
