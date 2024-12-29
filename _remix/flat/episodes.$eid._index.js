import Episode from "#models/episode";
import SessionStatusBar from "#views/episodes/parts/statusbar";
import SessionToolbar from "#views/episodes/parts/toolbar";

export async function get(req, res) {
  const { id, view } = req.params;
  const episode = Episode.load(id);

  if(!view)
    res.redirect(`/episodes/${id}/gm`)
  else
    res.render(`episodes/${view}`, { episode, layout: "app" });
};

export default function SessionLayout(episode, content) {
  return `
    <section class="layout-toolbar">
      ${SessionToolbar({ episode })}
      <div class="layout-column">
        ${SessionStatusBar({ episode })}
        ${content} //OUTLET
      </div>
    </section>
  `;
}