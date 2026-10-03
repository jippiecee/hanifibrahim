export interface Project { title: string; tag: string; image: string; url: string }

export const projectsSection = {
  label: "Chapter 03",
  title: "Projects",
  statement: "A few websites I've designed and built. Click any of them to open the live site.",
};

export const projects: Project[] = [
  // TODO: isi `url` dengan link website masing-masing project
  { title: "Destentations", tag: "Company Website", image: "/projects/destentations.jpg", url: "" },
  { title: "D-Event", tag: "Event Management Platform", image: "/projects/d-event.jpg", url: "" },
  { title: "Cretects", tag: "Thrift Shop Marketplace", image: "/projects/cretects.jpg", url: "" },
];