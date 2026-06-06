const fs   = require('fs');
const path = require('path');
const matter = require('gray-matter');

const MUEBLES_DIR = path.join(__dirname, '_data', 'muebles');
const OUTPUT_FILE = path.join(__dirname, 'catalog.json');

// Read all .md files
const files = fs.readdirSync(MUEBLES_DIR)
  .filter(f => f.endsWith('.md') || f.endsWith('.yml'));

const catalog = [];

files.forEach(file => {
  const raw = fs.readFileSync(path.join(MUEBLES_DIR, file), 'utf8');
  const { data } = matter(raw);

  // Normalize process_images — can be a string, array of strings, or array of objects
  let process_images = [];
  if (data.process_images) {
    const raw_imgs = Array.isArray(data.process_images)
      ? data.process_images
      : [data.process_images];
    process_images = raw_imgs.map(img =>
      typeof img === 'string' ? img : (img.image || '')
    ).filter(Boolean);
  }

  // Normalize process_videos — can be empty, array of strings, or array of {url, label}
  let process_videos = [];
  if (data.process_videos && data.process_videos.length) {
    process_videos = data.process_videos.map(v =>
      typeof v === 'string' ? { url: v, label: '' } : v
    ).filter(v => v.url);
  }
  // backward-compat: old single video_url field
  if (!process_videos.length && data.video_url) {
    process_videos = [{ url: data.video_url, label: '' }];
  }

  catalog.push({
    id:             data.id             || '',
    name_en:        data.name_en        || '',
    name_es:        data.name_es        || data.name_en || '',
    category:       data.category       || '',
    wood_en:        data.wood_en        || '',
    wood_es:        data.wood_es        || data.wood_en || '',
    desc_en:        data.desc_en        || '',
    desc_es:        data.desc_es        || data.desc_en || '',
    image:          data.image          || '',
    stages:         data.stages         || 6,
    process_images,
    process_videos,
    sold:           data.sold           || false,
    date:           data.date           || '',
  });
});

// Sort by id
catalog.sort((a, b) => a.id.localeCompare(b.id));

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(catalog, null, 2));
console.log(`✓ catalog.json generated — ${catalog.length} piece(s)`);
catalog.forEach(p => console.log(`  · ${p.id}: ${p.name_en}`));
