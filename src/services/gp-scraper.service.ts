import axios from 'axios';
import cheerio from 'cheerio';
import GP from '../models/Gp';

/**
 * Scrape les GP d'une saison F1 sur formula1.com et les importe dans la base MongoDB
 * @param year Année de la saison à scraper (ex: 2025)
 * @returns Tableau des GP insérés
 */
export async function scrapeAndImportF1Races(year: number = 2025) {
  const url = `https://www.formula1.com/en/racing/${year}.html`;
  const res = await axios.get(url);
  const $ = cheerio.load(res.data);

  // À adapter selon la structure HTML réelle de la page F1
  const events = $(`a[href^='/en/racing/${year}/']`);
  const races: any[] = [];

  events.each((i, el) => {
    // Exemple de parsing, à adapter selon la page réelle
    const title = $(el).find('.f1-heading__body').text().trim();
    const date = $(el).find('.f1-heading-wide').text().trim();

    if (!title || title.toLowerCase().includes('pre-season')) return;

    races.push({
      name: title,
      dateTime: date || `${year}-04-05T06:00:00+00:00`, // à parser proprement selon la page
      round: i + 1,
      year: year,
      // Ajoute d'autres champs selon ton modèle GP ici
    });
  });

  // Nettoyage et insertion
  await GP.deleteMany({ year });
  const result = await GP.insertMany(races);
  return result;
}
