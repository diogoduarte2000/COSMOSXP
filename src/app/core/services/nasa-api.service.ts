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
        narrative: 'O Sol é o motor de tudo o que conhecemos. Sem ele, a vida na Terra seria impossível. No seu núcleo, a fusão nuclear transforma hidrogénio em hélio, libertando uma energia colossal que viaja pelo espaço na forma de luz e calor. Esta energia sustenta a fotossíntese e regula o clima de todos os planetas.\n\nA sua influência estende-se muito além do calor. O vento solar — um fluxo constante de partículas carregadas — cria a heliosfera, uma bolha protetora que envolve todo o sistema solar e nos protege dos raios cósmicos galácticos mais energéticos. Estudar o Sol é compreender a nossa própria existência e a física fundamental do universo.',
        moreDetails: {
          atmosphere: 'Composta por hidrogénio (73%) e hélio (25%).',
          history: 'Observado desde a antiguidade; missões modernas como a Parker Solar Probe estudam a sua corona.',
          fact: 'O Sol contém 99.8% da massa total de todo o sistema solar.',
          geology: 'Não possui superfície sólida; é uma bola de plasma mantida pela gravidade.',
          climate: 'Dominado por ventos solares e ejeções de massa coronal.',
          potentialForLife: 'Impossível para a vida como a conhecemos devido às temperaturas extremas.'
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
        narrative: 'Mercúrio é um mundo de extremos. Por estar tão perto do Sol, as temperaturas durante o dia podem derreter chumbo, mas à noite, sem uma atmosfera para segurar o calor, descem abaixo dos -180°C. É um deserto rochoso e silencioso, cuja superfície está marcada por milénios de impactos de meteoritos, assemelhando-se muito à nossa Lua.\n\nCuriosamente, apesar da sua proximidade ao Sol, radares detetaram evidências de gelo de água em crateras profundas nos polos, onde a luz solar nunca chega. Mercúrio é também o único planeta rochoso, além da Terra, a possuir um campo magnético global significativo, embora muito mais fraco, sugerindo um núcleo de ferro parcialmente líquido.',
        moreDetails: {
          atmosphere: 'Exosfera extremamente fina de oxigénio, sódio e hidrogénio.',
          history: 'Visitado pela Mariner 10 e Messenger. BepiColombo está a caminho.',
          fact: 'Um dia em Mercúrio dura 59 dias terrestres.',
          geology: 'Superfície rochosa coberta de crateras, semelhante à Lua.',
          climate: 'Temperaturas variam de -180°C à noite a 430°C durante o dia.',
          potentialForLife: 'Muito baixo devido à radiação solar e falta de atmosfera.'
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
        narrative: 'Vénus é um pesadelo geológico. Embora seja quase do mesmo tamanho que a Terra, a sua atmosfera é uma armadilha mortal de dióxido de carbono que retém o calor solar de forma implacável, tornando-o o planeta mais quente do sistema solar. As suas nuvens de ácido sulfúrico são tão densas que impedem a visão direta da superfície, que só foi mapeada por radar.\n\nNa superfície, a pressão é tão esmagadora que seria equivalente a estar a 900 metros de profundidade no oceano terrestre. No entanto, cientistas especulam que, há milhões de anos, Vénus poderá ter tido oceanos de água líquida e um clima temperado, antes de um efeito de estufa catastrófico ter transformado o planeta no inferno que vemos hoje.',
        moreDetails: {
          atmosphere: 'Densa e tóxica, composta principalmente por dióxido de carbono com nuvens de ácido sulfúrico.',
          history: 'Muitas missões soviéticas Venera conseguiram aterrar e transmitir dados por curtos períodos.',
          fact: 'Vénus roda na direção oposta à maioria dos planetas (rotação retrógrada).',
          geology: 'Superfície vulcânica com vastas planícies e montanhas deformadas.',
          climate: 'Efeito de estufa extremo; chove ácido sulfúrico nas camadas superiores.',
          potentialForLife: 'Possibilidade teórica de vida microbiana nas camadas altas e frias da atmosfera.'
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
        narrative: 'A Terra é uma anomalia cósmica vibrante. Localizada na "Zona Habitável" do Sol, possui as condições perfeitas para a existência de água líquida em abundância. A sua atmosfera rica em oxigénio e o seu campo magnético robusto atuam como escudos contra a radiação letal do espaço, permitindo que a vida prospere em milhões de formas diferentes.\n\nDo espaço, o nosso planeta destaca-se como um "Ponto Azul Claro", um mármore frágil e precioso. A tectónica de placas e o ciclo da água reciclam constantemente minerais e nutrientes, mantendo um equilíbrio biológico que persiste há biliões de anos. É o único local no vasto universo onde sabemos com certeza que a consciência despertou.',
        moreDetails: {
          atmosphere: '78% Nitrogénio, 21% Oxigénio - a mistura perfeita para a vida.',
          history: 'O único planeta não nomeado após um deus grego ou romano.',
          fact: 'A Terra é o planeta mais denso do sistema solar.',
          geology: 'Tectónica de placas ativa, crosta rochosa, manto e núcleo de ferro.',
          climate: 'Variado, regulado pelos oceanos e pela atmosfera.',
          potentialForLife: '100% - Lar de milhões de espécies conhecidas.'
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
        narrative: 'Marte fascina a humanidade há séculos como o nosso próximo destino. Este deserto gelado de poeira rica em ferro possui montanhas que tocam o céu e desfiladeiros que rasgam o continente. Embora hoje seja um mundo seco, existem provas geológicas claras de que rios e talvez oceanos fluíram pela sua superfície num passado distante.\n\nA busca por vida em Marte é um dos grandes desafios da ciência moderna. Rovers como o Perseverance estão atualmente a recolher amostras de solo para procurar bioassinaturas de vida microbiana antiga. Com uma atmosfera fina e dias de duração quase igual aos da Terra, Marte é o candidato mais provável para a primeira colónia humana fora do nosso mundo natal.',
        moreDetails: {
          atmosphere: 'Fina, composta por 95% de dióxido de carbono.',
          history: 'Alvo principal para a colonização humana futura. Explorado por rovers desde os anos 90.',
          fact: 'Marte tem a montanha mais alta do sistema solar, o Monte Olimpo.',
          geology: 'Deserto gelado com rochas ricas em óxido de ferro (ferrugem).',
          climate: 'Frio e seco, com tempestades de poeira globais ocasionais.',
          potentialForLife: 'Elevado interesse; busca por fósseis de vida microbiana antiga.'
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
        narrative: 'Júpiter é um sistema solar em miniatura. Com quase uma centena de luas conhecidas, este gigante gasoso domina a gravidade da vizinhança planetária. A sua Grande Mancha Vermelha — uma tempestade maior que a Terra que sopra há mais de 300 anos — é um testemunho da energia turbulenta da sua atmosfera de hidrogénio e hélio.\n\nSob as suas nuvens coloridas, a pressão torna-se tão elevada que o hidrogénio transforma-se num metal líquido condutor, gerando o campo magnético mais poderoso do sistema solar. As suas luas, como Europa, escondem oceanos de água líquida sob crostas de gelo, tornando-as alguns dos locais mais promissores para a busca de vida extraterrestre.',
        moreDetails: {
          atmosphere: 'Principalmente hidrogénio e hélio, com nuvens de amónia.',
          history: 'Explorado pela Pioneer, Voyager, Galileo e atualmente pela sonda Juno.',
          fact: 'Júpiter tem o dia mais curto do sistema solar, completando uma rotação em apenas 10 horas.',
          geology: 'Não tem superfície sólida; provável núcleo rochoso cercado por hidrogénio metálico.',
          climate: 'Tempestades gigantescas e ventos que chegam a 600 km/h.',
          potentialForLife: 'Improvável no planeta, mas promissor nas suas luas (Europa).'
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
        narrative: 'Saturno é a joia do sistema solar. Embora não seja o único planeta com anéis, os seus são, de longe, os mais espetaculares e complexos, compostos por biliões de partículas de gelo e rocha que variam de grãos de poeira a montanhas. A sua beleza esconde um mundo de ventos ferozes e tempestades que podem envolver o planeta inteiro.\n\nAs luas de Saturno são mundos de ficção científica tornados realidade. Titã, a maior delas, possui uma atmosfera densa e lagos de metano líquido, sendo o único local além da Terra onde sabemos existir líquido estável na superfície. Já Encélado expele jatos de água gelada para o espaço, revelando um oceano subterrâneo que contém os ingredientes básicos para a vida.',
        moreDetails: {
          atmosphere: '75% hidrogénio e 25% hélio.',
          history: 'A missão Cassini-Huygens revolucionou o nosso conhecimento sobre Saturno e as suas luas.',
          fact: 'Os anéis de Saturno são compostos principalmente por pedaços de gelo e rocha.',
          geology: 'Gigante gasoso com provável núcleo denso de rocha e gelo.',
          climate: 'Tempestades polares hexagonais únicas e ventos fortíssimos.',
          potentialForLife: 'Possibilidade nas luas como Titã e Encélado (oceanos subterrâneos).'
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
        narrative: 'Urano é o "rebelde" do sistema solar. Em vez de rodar como um pião, ele rola como uma bola, com os seus polos virados quase diretamente para o Sol. Esta inclinação única resulta provavelmente de uma colisão catastrófica com um corpo do tamanho da Terra logo após a sua formação. É um mundo frio, pálido e envolto em mistério, pois foi visitado apenas uma vez pela Voyager 2.\n\nA sua cor azul-ciano vem do metano na atmosfera superior, que absorve a luz vermelha. Sob as nuvens, acredita-se que existam chuvas de diamantes reais, criadas pela pressão extrema que comprime o carbono. Urano também possui anéis finos e escuros e um sistema complexo de 27 luas nomeadas em homenagem a personagens de Shakespeare e Alexander Pope.',
        moreDetails: {
          atmosphere: 'Hidrogénio, hélio e metano (que lhe dá a cor azul).',
          history: 'Apenas a Voyager 2 o visitou de perto em 1986.',
          fact: 'Urano é o planeta mais frio do sistema solar, com temperaturas mínimas de -224°C.',
          geology: 'Manto de gelos fluidos (água, metano e amónia) sobre núcleo rochoso.',
          climate: 'Atmosfera calma comparada com outros gigantes, mas com ventos frios.',
          potentialForLife: 'Muito baixo devido às temperaturas e pressões extremas.'
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
        narrative: 'Netuno é o mundo dos ventos furiosos. Localizado a 4,5 mil milhões de quilómetros do Sol, recebe tão pouca luz solar que o seu calor interno — remanescente da sua formação — é que impulsiona o clima mais selvagem do sistema solar. Os seus ventos podem quebrar a barreira do som, soprando nuvens de metano gelado a velocidades vertiginosas.\n\nA sua lua Tritão é igualmente fascinante; orbita o planeta "ao contrário" e possui criovulcões que cospem nitrogénio líquido. Netuno foi o primeiro planeta a ter a sua existência prevista por cálculos matemáticos antes de ser visto por um telescópio, provando a precisão das leis da física celeste de Newton.',
        moreDetails: {
          atmosphere: 'Similar a Urano, mas com ventos muito mais intensos.',
          history: 'Descoberto através de previsões matemáticas antes de ser observado por telescópio.',
          fact: 'Netuno tem os ventos mais rápidos do sistema solar, atingindo 2.100 km/h.',
          geology: 'Composto principalmente por gelos e rocha no núcleo.',
          climate: 'Clima dinâmico com tempestades em evolução constante.',
          potentialForLife: 'Muito improvável devido às condições extremas.'
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
        narrative: 'Plutão é o pequeno mundo que conquistou o coração da Terra. Após a sua despromoção a planeta anão, a missão New Horizons revelou que Plutão é muito mais complexo do que imaginávamos. Possui montanhas de água gelada tão altas como os Alpes e vastas planícies de nitrogénio congelado que fluem como glaciares terrestres.\n\nO seu icónico "Coração" (Tombaugh Regio) é uma bacia de gelo brilhante que domina a sua face. Plutão e a sua maior lua, Caronte, formam um sistema binário, orbitando um ponto no espaço entre eles. É um mundo de crepúsculo eterno, onde o Sol parece apenas uma estrela muito brilhante no céu gelado da Cintura de Kuiper.',
        moreDetails: {
          atmosphere: 'Fina e sazonal, composta por nitrogénio, metano e monóxido de carbono.',
          history: 'Explorado pela New Horizons em 2015, revelando um mundo geologicamente ativo.',
          fact: 'Plutão é por vezes mais próximo do Sol do que Netuno devido à sua órbita elíptica.',
          geology: 'Superfície de nitrogénio congelado com montanhas de água congelada.',
          climate: 'Extremamente frio, atmosfera congela quando se afasta do Sol.',
          potentialForLife: 'Muito baixo, embora possa ter um oceano líquido subterrâneo.'
        }
      }
    ];
  }
}
