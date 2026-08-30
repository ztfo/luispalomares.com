export default {
  // Every route change lands at the top of the page — including browser
  // back/forward, where the default is to restore the previous offset.
  //
  // The two panels stack on mobile, so a project detail and the home view start
  // a full screen apart in the document. Restoring an offset there drops the
  // reader into the middle of the new page with nothing to signal it changed —
  // the "did my tap register?" bug. The projects column keeps its own scroll
  // container on desktop; the layout resets that separately.
  scrollBehavior() {
    return { top: 0 }
  },
}
