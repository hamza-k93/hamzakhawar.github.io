import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const entries = (await getCollection('writing', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );

  return rss({
    title: 'Hamza Khawar',
    description: 'Notes and essays by Hamza Khawar.',
    site: context.site,
    items: entries.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description ?? '',
      pubDate: entry.data.date,
      link: `/writing/${entry.id}/`,
      categories: entry.data.categories,
    })),
  });
}
