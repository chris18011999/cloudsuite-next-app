export function hydrateLangInApiUrl(url: string) {
  return url.replace('[[LANG]]', 'nl_NL')
}