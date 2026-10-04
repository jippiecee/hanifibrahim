export const profile = {
  name: "Hanif Ibrahim",
  role: "Hey it's me",
  githubUser: "jippiecee",
  get githubUrl() { return `https://github.com/${this.githubUser}`; },
};
