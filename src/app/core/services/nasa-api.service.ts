import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NasaApiService {
  private http = inject(HttpClient);
  private readonly API_KEY = 'DEMO_KEY';
  private readonly BASE_URL = 'https://api.nasa.gov';

  constructor() {}

  public getApod(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/planetary/apod?api_key=${this.API_KEY}`);
  }

  /**
   * Mocking planetary data for the 3D scene.
   * Real Horizons API is complex to parse in a single call without specialized mapping.
   */
  public getPlanetsData() {
    return [
      { 
        name: 'Sun', 
        radius: 10, 
        texture: 'textures/sun.png', 
        description: 'A estrela central do Sistema Solar. Uma esfera quase perfeita de plasma quente, com movimento convectivo interno que gera um campo magnético.',
        details: 'Temperatura do Núcleo: 15.000.000°C | Massa: 1.989 × 10^30 kg | Idade: 4.6 mil milhões de anos.',
        moreDetails: {
          atmosphere: 'Composta por hidrogénio (73%) e hélio (25%).',
          history: 'Observado desde a antiguidade; missões modernas como a Parker Solar Probe estudam a sua corona.',
          fact: 'O Sol contém 99.8% da massa total de todo o sistema solar.'
        }
      },
      { 
        name: 'Mercury', 
        radius: 0.38, 
        orbitRadius: 20, 
        orbitSpeed: 0.04, 
        texture: 'textures/mars.png', 
        description: 'O planeta mais pequeno e mais próximo do Sol. Não tem atmosfera para reter calor, resultando em temperaturas extremas.',
        details: 'Distância do Sol: 57.9M km | Período Orbital: 88 dias | Gravidade: 3.7 m/s².',
        moreDetails: {
          atmosphere: 'Exosfera extremamente fina de oxigénio, sódio e hidrogénio.',
          history: 'Visitado pela Mariner 10 e Messenger. BepiColombo está a caminho.',
          fact: 'Um dia em Mercúrio dura 59 dias terrestres.'
        }
      },
      { 
        name: 'Venus', 
        radius: 0.95, 
        orbitRadius: 30, 
        orbitSpeed: 0.015, 
        texture: 'textures/mars.png', 
        description: 'Frequentemente chamado de gémeo da Terra, mas com uma atmosfera de CO2 densa que cria um efeito de estufa descontrolado.',
        details: 'Temperatura Média: 464°C | Pressão Atmosférica: 92x a da Terra | Rotação: Retrógrada.',
        moreDetails: {
          atmosphere: 'Densa e tóxica, composta principalmente por dióxido de carbono com nuvens de ácido sulfúrico.',
          history: 'Muitas missões soviéticas Venera conseguiram aterrar e transmitir dados por curtos períodos.',
          fact: 'Vénus roda na direção oposta à maioria dos planetas (rotação retrógrada).'
        }
      },
      { 
        name: 'Earth', 
        radius: 1, 
        orbitRadius: 45, 
        orbitSpeed: 0.01, 
        texture: 'textures/earth.png', 
        description: 'O único mundo conhecido com vida. Com 70% da superfície coberta por água, é o oásis azul no vácuo espacial.',
        details: 'População: ~8 mil milhões | Satélites: 1 (Lua) | Atmosfera: Nitrogénio e Oxigénio.',
        moons: [{ name: 'Moon', radius: 0.27, orbitRadius: 2, orbitSpeed: 0.05 }],
        moreDetails: {
          atmosphere: '78% Nitrogénio, 21% Oxigénio - a mistura perfeita para a vida.',
          history: 'O único planeta não nomeado após um deus grego ou romano.',
          fact: 'A Terra é o planeta mais denso do sistema solar.'
        }
      },
      { 
        name: 'Mars', 
        radius: 0.53, 
        orbitRadius: 60, 
        orbitSpeed: 0.008, 
        texture: 'textures/mars.png', 
        description: 'O Planeta Vermelho. Lar do Monte Olimpo, o vulcão mais alto do sistema solar, e de vastos vales como Valles Marineris.',
        details: 'Possibilidade de Água: Gelo nos polos | Missões Ativas: Perseverance, Curiosity | Dia Marciano: 24h 37min.',
        moreDetails: {
          atmosphere: 'Fina, composta por 95% de dióxido de carbono.',
          history: 'Alvo principal para a colonização humana futura. Explorado por rovers desde os anos 90.',
          fact: 'Marte tem a montanha mais alta do sistema solar, o Monte Olimpo.'
        }
      },
      { 
        name: 'Jupiter', 
        radius: 11.2, 
        orbitRadius: 100, 
        orbitSpeed: 0.002, 
        texture: 'textures/jupiter.png', 
        description: 'O rei dos planetas. Um gigante gasoso tão grande que poderia conter todos os outros planetas do sistema solar duas vezes.',
        details: 'Luas Conhecidas: 95 | Grande Mancha Vermelha: Tempestade secular | Campo Magnético: Extremamente forte.',
        moreDetails: {
          atmosphere: 'Principalmente hidrogénio e hélio, com nuvens de amónia.',
          history: 'Explorado pela Pioneer, Voyager, Galileo e atualmente pela sonda Juno.',
          fact: 'Júpiter tem o dia mais curto do sistema solar, completando uma rotação em apenas 10 horas.'
        }
      },
      { 
        name: 'Saturn', 
        radius: 9.45, 
        orbitRadius: 140, 
        orbitSpeed: 0.0009, 
        texture: 'textures/mars.png', 
        hasRings: true, 
        description: 'Famoso pelos seus anéis de gelo e rocha. É o planeta menos denso; flutuaria se houvesse um oceano grande o suficiente.',
        details: 'Anéis: 7 grupos principais | Distância do Sol: 1.4 mil milhões km | Ventos: Até 1800 km/h.',
        moreDetails: {
          atmosphere: '75% hidrogénio e 25% hélio.',
          history: 'A missão Cassini-Huygens revolucionou o nosso conhecimento sobre Saturno e as suas luas.',
          fact: 'Os anéis de Saturno são compostos principalmente por pedaços de gelo e rocha.'
        }
      },
      { 
        name: 'Uranus', 
        radius: 4, 
        orbitRadius: 180, 
        orbitSpeed: 0.0004, 
        texture: 'textures/mars.png', 
        description: 'Um gigante de gelo que orbita de lado. A sua inclinação extrema de 98 graus causa estações que duram décadas.',
        details: 'Composição: Gelo, Metano, Amónia | Descoberta: 1781 por William Herschel | Cor: Azul-esverdeado.',
        moreDetails: {
          atmosphere: 'Hidrogénio, hélio e metano (que lhe dá a cor azul).',
          history: 'Apenas a Voyager 2 o visitou de perto em 1986.',
          fact: 'Urano é o planeta mais frio do sistema solar, com temperaturas mínimas de -224°C.'
        }
      },
      { 
        name: 'Neptune', 
        radius: 3.88, 
        orbitRadius: 220, 
        orbitSpeed: 0.0001, 
        texture: 'textures/mars.png', 
        description: 'O planeta mais distante e ventoso. Os seus ventos supersónicos são os mais rápidos registados no sistema solar.',
        details: 'Ano Netuniano: 165 anos terrestres | Grande Mancha Escura: Tempestade gigante | Luas: 14 (Tritão é a maior).',
        moreDetails: {
          atmosphere: 'Similar a Urano, mas com ventos muito mais intensos.',
          history: 'Descoberto através de previsões matemáticas antes de ser observado por telescópio.',
          fact: 'Netuno tem os ventos mais rápidos do sistema solar, atingindo 2.100 km/h.'
        }
      },
      { 
        name: 'Pluto', 
        radius: 0.18, 
        orbitRadius: 260, 
        orbitSpeed: 0.00005, 
        texture: 'textures/mars.png', 
        description: 'O planeta anão mais famoso. Situado na Cintura de Kuiper, possui montanhas de gelo e planícies de nitrogénio congelado.',
        details: 'Reclassificação: Planeta Anão (2006) | Coração de Plutão: Tombaugh Regio | Luas: 5 (Caronte é a maior).',
        moreDetails: {
          atmosphere: 'Fina e sazonal, composta por nitrogénio, metano e monóxido de carbono.',
          history: 'Explorado pela New Horizons em 2015, revelando um mundo geologicamente ativo.',
          fact: 'Plutão é por vezes mais próximo do Sol do que Netuno devido à sua órbita elíptica.'
        }
      }
    ];
  }
}
