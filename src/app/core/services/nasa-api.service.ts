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
        details: 'Temperatura do Núcleo: 15.000.000°C | Massa: 1.989 × 10^30 kg | Idade: 4.6 mil milhões de anos.'
      },
      { 
        name: 'Mercury', 
        radius: 0.38, 
        orbitRadius: 20, 
        orbitSpeed: 0.04, 
        texture: 'textures/mars.png', 
        description: 'O planeta mais pequeno e mais próximo do Sol. Não tem atmosfera para reter calor, resultando em temperaturas extremas.',
        details: 'Distância do Sol: 57.9M km | Período Orbital: 88 dias | Gravidade: 3.7 m/s².'
      },
      { 
        name: 'Venus', 
        radius: 0.95, 
        orbitRadius: 30, 
        orbitSpeed: 0.015, 
        texture: 'textures/mars.png', 
        description: 'Frequentemente chamado de gémeo da Terra, mas com uma atmosfera de CO2 densa que cria um efeito de estufa descontrolado.',
        details: 'Temperatura Média: 464°C | Pressão Atmosférica: 92x a da Terra | Rotação: Retrógrada.'
      },
      { 
        name: 'Earth', 
        radius: 1, 
        orbitRadius: 45, 
        orbitSpeed: 0.01, 
        texture: 'textures/earth.png', 
        description: 'O único mundo conhecido com vida. Com 70% da superfície coberta por água, é o oásis azul no vácuo espacial.',
        details: 'População: ~8 mil milhões | Satélites: 1 (Lua) | Atmosfera: Nitrogénio e Oxigénio.',
        moons: [{ name: 'Moon', radius: 0.27, orbitRadius: 2, orbitSpeed: 0.05 }]
      },
      { 
        name: 'Mars', 
        radius: 0.53, 
        orbitRadius: 60, 
        orbitSpeed: 0.008, 
        texture: 'textures/mars.png', 
        description: 'O Planeta Vermelho. Lar do Monte Olimpo, o vulcão mais alto do sistema solar, e de vastos vales como Valles Marineris.',
        details: 'Possibilidade de Água: Gelo nos polos | Missões Ativas: Perseverance, Curiosity | Dia Marciano: 24h 37min.'
      },
      { 
        name: 'Jupiter', 
        radius: 11.2, 
        orbitRadius: 100, 
        orbitSpeed: 0.002, 
        texture: 'textures/jupiter.png', 
        description: 'O rei dos planetas. Um gigante gasoso tão grande que poderia conter todos os outros planetas do sistema solar duas vezes.',
        details: 'Luas Conhecidas: 95 | Grande Mancha Vermelha: Tempestade secular | Campo Magnético: Extremamente forte.'
      },
      { 
        name: 'Saturn', 
        radius: 9.45, 
        orbitRadius: 140, 
        orbitSpeed: 0.0009, 
        texture: 'textures/mars.png', 
        hasRings: true, 
        description: 'Famoso pelos seus anéis de gelo e rocha. É o planeta menos denso; flutuaria se houvesse um oceano grande o suficiente.',
        details: 'Anéis: 7 grupos principais | Distância do Sol: 1.4 mil milhões km | Ventos: Até 1800 km/h.'
      },
      { 
        name: 'Uranus', 
        radius: 4, 
        orbitRadius: 180, 
        orbitSpeed: 0.0004, 
        texture: 'textures/mars.png', 
        description: 'Um gigante de gelo que orbita de lado. A sua inclinação extrema de 98 graus causa estações que duram décadas.',
        details: 'Composição: Gelo, Metano, Amónia | Descoberta: 1781 por William Herschel | Cor: Azul-esverdeado.'
      },
      { 
        name: 'Neptune', 
        radius: 3.88, 
        orbitRadius: 220, 
        orbitSpeed: 0.0001, 
        texture: 'textures/mars.png', 
        description: 'O planeta mais distante e ventoso. Os seus ventos supersónicos são os mais rápidos registados no sistema solar.',
        details: 'Ano Netuniano: 165 anos terrestres | Grande Mancha Escura: Tempestade gigante | Luas: 14 (Tritão é a maior).'
      },
      { 
        name: 'Pluto', 
        radius: 0.18, 
        orbitRadius: 260, 
        orbitSpeed: 0.00005, 
        texture: 'textures/mars.png', 
        description: 'O planeta anão mais famoso. Situado na Cintura de Kuiper, possui montanhas de gelo e planícies de nitrogénio congelado.',
        details: 'Reclassificação: Planeta Anão (2006) | Coração de Plutão: Tombaugh Regio | Luas: 5 (Caronte é a maior).'
      }
    ];
  }
}
