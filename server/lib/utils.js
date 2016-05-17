export function errorHandler(err) {
  console.error('APIERROR', new Date().toJSON(), err);
  this.status(err.code || 500);
  this.send();
}

export function calculateHoursPrice(e) {
  const years = (new Date().getUTCFullYear() - new Date(e.created_at).getUTCFullYear()) * 2;
  const publicRepos = (e.public_repos / 5);
  const publicGists = (e.public_gists / 4);
  const followers = (e.followers / 4);
  return Math.floor(years + publicRepos + publicGists + followers);
}
