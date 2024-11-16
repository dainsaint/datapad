export default function SocietyCard (society) {
  return `
    <div class="society-card" data=id="${society._id}">
      <h3>${society.name}</h3>
      <p>${society.archetype}</p>
    </div>
  `;
}
