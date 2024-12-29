import Episode from "#models/episode";
import SessionStatusBar from "#views/episodes/parts/statusbar";
import SessionToolbar from "#views/episodes/parts/toolbar";

export const route = "/episodes/:eid/:view?"

export async function get(req, res) {
  const { eid, view } = req.params;
  const episode = Episode.load(eid);

  if(!view)
    res.redirect(`/episodes/${eid}/gm`)
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