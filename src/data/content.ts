export const profile = {
  name: "Hanif Ibrahim",
  role: "Hey it's me",
  // TODO: ganti dengan username GitHub kamu
  githubUser: "username",
  get githubUrl() { return `https://github.com/${this.githubUser}`; },
};
