export const sortByDate = (a, b) => {
  const prev = new Date(a.frontmatter.date);
  const next = new Date(b.frontmatter.date);
  const invalid_prev = prev.toString() === "Invalid Date";
  const invalid_next = next.toString() === "Invalid Date";
  if (invalid_prev && invalid_next) {
    return a.frontmatter.title.localeCompare(b.frontmatter.title)
  }
  if (invalid_prev) return 1;
  if (invalid_next) return -1;
  return next - prev;
}
