import PhaseTime from "./PhaseTime.js";

export default function PhaseCard( phase, i ) { 
  const headings = ["Now", "Next", "Then"];
  return `
    <div class="card ${i == 0 ? 'card-fancy color-contrast' : 'card-transparent'} stack">
      <p class="annotation">${headings[i]}</p>
      ${ PhaseTime(phase) }
    </div>
  `;
}