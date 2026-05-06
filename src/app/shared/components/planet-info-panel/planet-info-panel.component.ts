import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-planet-info-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="info-panel" *ngIf="planet()">
      <div class="panel-header">
        <h2>{{ planet().name }}</h2>
        <button class="close-btn" (click)="onClose.emit()">×</button>
      </div>
      <div class="panel-content">
        <p class="description">{{ planet().description }}</p>
        
        <div class="detailed-info" *ngIf="planet().details">
          <h3>DADOS CIENTÍFICOS</h3>
          <p>{{ planet().details }}</p>
        </div>

        <div class="more-details" *ngIf="planet().moreDetails">
          <div class="detail-section">
            <h4>ATMOSFERA</h4>
            <p>{{ planet().moreDetails.atmosphere }}</p>
          </div>
          <div class="detail-section">
            <h4>EXPLORAÇÃO</h4>
            <p>{{ planet().moreDetails.history }}</p>
          </div>
          <div class="detail-section">
            <h4>GEOLOGIA</h4>
            <p>{{ planet().moreDetails.geology }}</p>
          </div>
          <div class="detail-section">
            <h4>CLIMA</h4>
            <p>{{ planet().moreDetails.climate }}</p>
          </div>
          <div class="detail-section">
            <h4>POTENCIAL DE VIDA</h4>
            <p>{{ planet().moreDetails.potentialForLife }}</p>
          </div>
          <div class="detail-section">
            <h4>SABIAS QUE?</h4>
            <p class="fact">{{ planet().moreDetails.fact }}</p>
          </div>
        </div>

        <div class="stats">
          <div class="stat">
            <span class="label">Raio Relativo</span>
            <span class="value">{{ planet().radius }}x</span>
          </div>
          <div class="stat" *ngIf="planet().orbitRadius">
            <span class="label">Distância Orbital</span>
            <span class="value">{{ planet().orbitRadius }} UA</span>
          </div>
        </div>
      </div>
      <div class="panel-footer">
        <button class="view-more">VER MAIS DETALHES</button>
      </div>
    </div>
  `,
  styles: [`
    .info-panel {
      position: fixed;
      right: 2rem;
      top: 50%;
      transform: translateY(-50%);
      width: 400px;
      max-height: 85vh;
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(20px);
      border-left: 3px solid #00ffcc;
      padding: 2.5rem;
      color: #fff;
      z-index: 1000;
      overflow-y: auto;
      animation: slideIn 0.5s cubic-bezier(0.23, 1, 0.32, 1);

      &::-webkit-scrollbar { width: 4px; }
      &::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.05); }
      &::-webkit-scrollbar-thumb { background: #00ffcc; }
    }

    @keyframes slideIn {
      from { transform: translateY(-50%) translateX(100%); opacity: 0; }
      to { transform: translateY(-50%) translateX(0); opacity: 1; }
    }

    .panel-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;

      h2 {
        font-family: 'Outfit', sans-serif;
        font-size: 3rem;
        font-weight: 900;
        margin: 0;
        letter-spacing: 4px;
        text-transform: uppercase;
        background: linear-gradient(to right, #fff, #00ffcc);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .close-btn {
        background: none;
        border: none;
        color: #fff;
        font-size: 2.5rem;
        cursor: pointer;
        opacity: 0.5;
        transition: all 0.3s;
        &:hover { opacity: 1; transform: rotate(90deg); }
      }
    }

    .description {
      font-size: 1.1rem;
      line-height: 1.6;
      color: rgba(255, 255, 255, 0.9);
      margin-bottom: 2.5rem;
      font-style: italic;
    }

    .detailed-info {
      margin-bottom: 2rem;
      padding: 1.2rem;
      background: rgba(0, 255, 204, 0.05);
      border-left: 2px solid #00ffcc;
      border-radius: 0 5px 5px 0;

      h3 {
        font-size: 0.7rem;
        color: #00ffcc;
        margin-bottom: 0.8rem;
        letter-spacing: 2px;
        text-transform: uppercase;
      }

      p {
        font-size: 1rem;
        color: #fff;
        line-height: 1.5;
        font-weight: 500;
      }
    }

    .more-details {
      margin-bottom: 2.5rem;
      display: grid;
      gap: 1.5rem;

      .detail-section {
        h4 {
          font-size: 0.65rem;
          color: rgba(255, 255, 255, 0.4);
          margin-bottom: 0.4rem;
          letter-spacing: 2px;
        }
        p {
          font-size: 0.95rem;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.8);
        }
        .fact {
          color: #00ffcc;
          font-weight: 600;
        }
      }
    }

    .stats {
      display: grid;
      gap: 1rem;
      margin-bottom: 2rem;

      .stat {
        display: flex;
        justify-content: space-between;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);

        .label { color: rgba(255, 255, 255, 0.5); font-size: 0.9rem; text-transform: uppercase; }
        .value { font-weight: 700; color: #fff; }
      }
    }

    .view-more {
      width: 100%;
      padding: 1rem;
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.3);
      color: #fff;
      letter-spacing: 2px;
      cursor: pointer;
      transition: all 0.3s;
      &:hover { background: #fff; color: #000; }
    }
  `]
})
export class PlanetInfoPanelComponent {
  planet = input<any>();
  onClose = output<void>();
}
