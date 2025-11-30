import { db } from '@/db';
import { blogCategories } from '@/db/schema';

async function main() {
    const sampleCategories = [
        {
            name: 'Développement Web',
            slug: 'developpement-web',
            description: 'Articles sur le développement frontend, backend et les frameworks modernes',
            createdAt: new Date().toISOString(),
        },
        {
            name: 'JavaScript & TypeScript',
            slug: 'javascript-typescript',
            description: 'Tutoriels et best practices pour JavaScript et TypeScript',
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Design & UX',
            slug: 'design-ux',
            description: 'Interface utilisateur, expérience utilisateur et design systems',
            createdAt: new Date().toISOString(),
        },
        {
            name: 'DevOps & Cloud',
            slug: 'devops-cloud',
            description: 'Déploiement, infrastructure et technologies cloud',
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Actualités Tech',
            slug: 'actualites-tech',
            description: 'Dernières news et tendances du monde de la tech',
            createdAt: new Date().toISOString(),
        }
    ];

    await db.insert(blogCategories).values(sampleCategories);
    
    console.log('✅ Blog categories seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});