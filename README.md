# ROHMA — Catalog Website

## Folder structure
```
rohma-catalog/
├── index.html              ← Public website
├── netlify.toml            ← Netlify config
├── admin/
│   ├── index.html          ← CMS panel (auto-generated)
│   └── config.yml          ← CMS fields definition
├── images/                 ← Furniture photos (uploaded via admin)
└── _data/
    └── muebles/
        └── ROH-001.yml     ← Each furniture piece = one file
```

## How to deploy (one time setup)

### Step 1 — Create GitHub repo
1. Go to github.com → New repository → name it `rohma-catalog`
2. Set it to **Public**
3. Click "uploading an existing file" → drag this entire folder

### Step 2 — Connect Netlify
1. Go to netlify.com → Sign up with GitHub (free)
2. "Add new site" → "Import from Git" → choose `rohma-catalog`
3. Deploy settings: leave everything default → click **Deploy**
4. Your URL: `rohma-catalog.netlify.app` (you can rename it)

### Step 3 — Enable the admin panel
1. In Netlify: **Site Settings → Identity → Enable Identity**
2. Then: **Identity → Services → Enable Git Gateway**
3. Then: **Identity → Registration → Invite only**
4. Go to **Identity tab → Invite users** → enter the owner's email
5. The owner gets an email → clicks the link → sets their password
6. Admin panel is now at: `your-site.netlify.app/admin`

## How to add a new piece (owner's guide)

1. Go to `your-site.netlify.app/admin`
2. Log in with your email and password
3. Click **"New Mueble"**
4. Fill in the form:
   - ID: ROH-002 (increment the number)
   - Name in English and Spanish
   - Category, wood type
   - Upload the main photo
   - Upload process photos (as many as you want)
   - Paste YouTube video URL
5. Click **Publish**
6. The site updates automatically in ~1 minute

## Generating the QR

Once a piece is published, its URL is:
`your-site.netlify.app/piece/ROH-002`

To generate the QR:
1. Open the piece in the catalog
2. Click **"Generate QR"** → opens qr.io with the link ready
3. Download PNG → print at minimum 3×3 cm
4. Attach to the physical piece

## Cost
- GitHub: Free
- Netlify (hosting + CMS): Free
- Domain (optional): ~$12/year at namecheap.com
