import fs from 'fs';
import path from 'path';


const structure = {
    src: {
        modules: ['user.js'],
        routes: ['user.js'],
        controllers: ['user.js'],
        'server.js': '',
        'config.js': ''
    },
    '.env': ''
};

function buildStructure(basePath, obj) {
    for (const key in obj) {
        const currentPath = path.join(basePath, key);

        if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
            
            if (!fs.existsSync(currentPath)) {
                fs.mkdirSync(currentPath, { recursive: true });
                console.log(`📁 Papka yaratildi: ${currentPath}`);
            }
            buildStructure(currentPath, obj[key]);
        } else if (Array.isArray(obj[key])) {
            
            if (!fs.existsSync(currentPath)) {
                fs.mkdirSync(currentPath, { recursive: true });
            }
            obj[key].forEach(file => {
                const filePath = path.join(currentPath, file);
                if (!fs.existsSync(filePath)) {
                    fs.writeFileSync(filePath, '');
                    console.log(` Fayl yaratildi: ${filePath}`);
                } else {
                    console.log(` Fayl allaqachon mavjud: ${filePath}`);
                }
            });
        } else {
            
            if (!fs.existsSync(currentPath)) {
                fs.writeFileSync(currentPath, obj[key]);
                console.log(` Fayl yaratildi: ${currentPath}`);
            } else {
                console.log(` Fayl allaqachon mavjud: ${currentPath}`);
            }
        }
    }
}

// Ishga tushirish
buildStructure(process.cwd(), structure);
console.log('✅ Barcha papka va fayllar muvaffaqiyatli tekshirildi/yaratildi!');