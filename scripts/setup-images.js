const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');

const IMAGE_URLS = {
  // Menu Items
  'kesar-malai-gola.jpg': 'https://images.unsplash.com/photo-1568901839119-631418a3910d',
  'chocolate-avalanche.jpg': 'https://images.unsplash.com/photo-1563805042-7684c019e1cb',
  'masala-orange.jpg': 'https://images.unsplash.com/photo-1572490122747-3968b75cc699',
  'dragon-boba.jpg': 'https://images.unsplash.com/photo-1558857563-c0c3a62fd0b7',
  'blue-latte.jpg': 'https://images.unsplash.com/photo-1577590835286-1cdd24c08fd5',
  'snow-apple.jpg': 'https://images.unsplash.com/photo-1544025162-c76e5f7f2e4e',
  
  // Offers
  'winter-special.jpg': 'https://images.unsplash.com/photo-1542326237-94b1c5a16024',
  'student-offer.jpg': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
  
  // Hero
  'main-gola.png': 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a',
  
  // Additional Menu Items
  'classic_golas.png': 'https://images.unsplash.com/photo-1558138838-76294be30005',
  'premium_golas.png': 'https://images.unsplash.com/photo-1558139820-65a5b18c3acc',
  'fusion_golas.png': 'https://images.unsplash.com/photo-1558140354-7e0d152c1d31',
  'coffee_boba.png': 'https://images.unsplash.com/photo-1558857563-c0c3a62fd0b7',
  'mango_boba.png': 'https://images.unsplash.com/photo-1558857778-c934ca5a0d3c',
  'strawberry_boba.png': 'https://images.unsplash.com/photo-1558857779-c434ca1f7385'
};

const DIRECTORIES = {
  menu: 'menu',
  offers: 'offers',
  hero: 'hero',
  decorative: 'decorative',
  patterns: 'patterns'
};

async function createDirectories() {
  const baseDir = path.join(process.cwd(), 'public/images');
  
  Object.values(DIRECTORIES).forEach(dir => {
    const fullPath = path.join(baseDir, dir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }
  });
}

async function downloadAndOptimizeImages() {
  await createDirectories();
  
  for (const [filename, url] of Object.entries(IMAGE_URLS)) {
    const directory = Object.entries(DIRECTORIES).find(([key]) => 
      filename.includes(key))?.[1] || 'menu';
    
    const filepath = path.join(process.cwd(), 'public/images', directory, filename);
    console.log(`Downloading: ${filename} to ${filepath}`);
    
    try {
      // Download image
      await new Promise((resolve, reject) => {
        https.get(url, (response) => {
          if (response.statusCode !== 200) {
            reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
            return;
          }
          
          const fileStream = fs.createWriteStream(filepath);
          response.pipe(fileStream);
          fileStream.on('finish', () => {
            fileStream.close();
            resolve();
          });
        }).on('error', reject);
      });

      // Optimize image
      await sharp(filepath)
        .resize(800, 600, {
          fit: 'cover',
          withoutEnlargement: true
        })
        .jpeg({ 
          quality: 80,
          progressive: true 
        })
        .toFile(filepath.replace(/\.(jpg|png)$/, '-optimized.jpg'));
      
      console.log(`Successfully processed: ${filename}`);
    } catch (error) {
      console.error(`Error processing ${filename}:`, error);
    }
  }
}

// Generate placeholder images for development
async function generatePlaceholders() {
  const placeholderDir = path.join(process.cwd(), 'public/images/placeholders');
  if (!fs.existsSync(placeholderDir)) {
    fs.mkdirSync(placeholderDir, { recursive: true });
  }

  const sizes = [
    { width: 800, height: 600, name: 'food-placeholder' },
    { width: 400, height: 400, name: 'square-placeholder' },
    { width: 1920, height: 1080, name: 'hero-placeholder' },
    { width: 600, height: 400, name: 'offer-placeholder' },
    { width: 200, height: 200, name: 'thumbnail-placeholder' }
  ];

  for (const size of sizes) {
    // Create a more visually appealing placeholder
    await sharp({
      create: {
        width: size.width,
        height: size.height,
        channels: 4,
        background: { r: 240, g: 240, b: 240, alpha: 1 }
      }
    })
    .composite([
      {
        input: Buffer.from(`
          <svg width="${size.width}" height="${size.height}">
            <rect width="100%" height="100%" fill="#f0f0f0"/>
            <circle cx="50%" cy="50%" r="30%" fill="#e0e0e0"/>
            <path d="M${size.width/2-20},${size.height/2-20} h40 v40 h-40z" fill="#d0d0d0"/>
          </svg>
        `),
        blend: 'over'
      }
    ])
    .jpeg({ quality: 90 })
    .toFile(path.join(placeholderDir, `${size.name}.jpg`));
  }
}

async function init() {
  try {
    await downloadAndOptimizeImages();
    await generatePlaceholders();
    console.log('Image setup completed successfully!');
  } catch (error) {
    console.error('Failed to set up images:', error);
    process.exit(1);
  }
}

init(); 