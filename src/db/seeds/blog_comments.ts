import { db } from '@/db';
import { blogComments } from '@/db/schema';

async function main() {
    const sampleComments = [
        // Post 1 (Next.js) - 3 comments
        {
            postId: 1,
            authorName: 'Kevin Lee',
            authorEmail: 'kevin.lee@gmail.com',
            content: 'Great article! This really helped me understand the App Router architecture in Next.js 14.',
            createdAt: new Date('2024-02-03').toISOString(),
        },
        {
            postId: 1,
            authorName: 'Amanda White',
            authorEmail: 'amanda.white@outlook.com',
            content: 'Thanks for sharing these insights. I\'ve been struggling with server components vs client components.',
            createdAt: new Date('2024-02-05').toISOString(),
        },
        {
            postId: 1,
            authorName: 'Jordan Smith',
            authorEmail: 'jordan.smith@yahoo.com',
            content: 'One thing I\'d add is the importance of proper loading states when using server components.',
            createdAt: new Date('2024-02-10').toISOString(),
        },
        
        // Post 2 (Design) - 4 comments
        {
            postId: 2,
            authorName: 'Rachel Green',
            authorEmail: 'rachel.green@protonmail.com',
            content: 'Excellent breakdown of modern design principles. Looking forward to more content like this.',
            createdAt: new Date('2024-02-12').toISOString(),
        },
        {
            postId: 2,
            authorName: 'Brian Davis',
            authorEmail: 'brian.davis@icloud.com',
            content: 'This is exactly what I needed. The color theory section was particularly helpful.',
            createdAt: new Date('2024-02-15').toISOString(),
        },
        {
            postId: 2,
            authorName: 'Michelle Chen',
            authorEmail: 'michelle.chen@gmail.com',
            content: 'I have a question about implementing dark mode while maintaining accessibility standards.',
            createdAt: new Date('2024-02-18').toISOString(),
        },
        {
            postId: 2,
            authorName: 'Tyler Brown',
            authorEmail: 'tyler.brown@outlook.com',
            content: 'Nice post! Have you considered covering design systems in a future article?',
            createdAt: new Date('2024-02-20').toISOString(),
        },
        
        // Post 3 (TypeScript) - 2 comments
        {
            postId: 3,
            authorName: 'Hannah Kim',
            authorEmail: 'hannah.kim@yahoo.com',
            content: 'Great article! This really helped me understand TypeScript generics and how to use them effectively.',
            createdAt: new Date('2024-02-22').toISOString(),
        },
        {
            postId: 3,
            authorName: 'Daniel Martinez',
            authorEmail: 'daniel.martinez@gmail.com',
            content: 'Bookmarking this for future reference. The type guards examples were super clear. Thanks!',
            createdAt: new Date('2024-02-25').toISOString(),
        },
        
        // Post 4 (Scalable Apps) - 3 comments
        {
            postId: 4,
            authorName: 'Olivia Wilson',
            authorEmail: 'olivia.wilson@protonmail.com',
            content: 'Thanks for sharing these insights. I\'ve been struggling with state management in large-scale applications.',
            createdAt: new Date('2024-02-28').toISOString(),
        },
        {
            postId: 4,
            authorName: 'Ethan Taylor',
            authorEmail: 'ethan.taylor@icloud.com',
            content: 'One thing I\'d add is the importance of code splitting and lazy loading for better performance.',
            createdAt: new Date('2024-03-02').toISOString(),
        },
        {
            postId: 4,
            authorName: 'Grace Anderson',
            authorEmail: 'grace.anderson@outlook.com',
            content: 'Excellent breakdown of scalable architecture patterns. The microservices section was particularly insightful.',
            createdAt: new Date('2024-03-05').toISOString(),
        },
        
        // Post 5 (Future of Web) - 2 comments
        {
            postId: 5,
            authorName: 'Lucas Johnson',
            authorEmail: 'lucas.johnson@gmail.com',
            content: 'Great article! This really helped me understand where web development is heading in the next few years.',
            createdAt: new Date('2024-03-08').toISOString(),
        },
        {
            postId: 5,
            authorName: 'Sophia Rodriguez',
            authorEmail: 'sophia.rodriguez@yahoo.com',
            content: 'I have a question about WebAssembly adoption - do you think it will become mainstream soon?',
            createdAt: new Date('2024-03-10').toISOString(),
        },
        
        // Post 6 (CSS Grid) - 3 comments
        {
            postId: 6,
            authorName: 'Noah Williams',
            authorEmail: 'noah.williams@protonmail.com',
            content: 'This is exactly what I needed. The responsive grid examples were particularly helpful.',
            createdAt: new Date('2024-03-13').toISOString(),
        },
        {
            postId: 6,
            authorName: 'Ava Garcia',
            authorEmail: 'ava.garcia@icloud.com',
            content: 'Nice post! Have you considered covering CSS Grid vs Flexbox comparisons?',
            createdAt: new Date('2024-03-15').toISOString(),
        },
        {
            postId: 6,
            authorName: 'Mason Moore',
            authorEmail: 'mason.moore@gmail.com',
            content: 'Bookmarking this for future reference. The auto-fit and auto-fill explanation was crystal clear!',
            createdAt: new Date('2024-03-18').toISOString(),
        },
        
        // Post 7 (React Hooks) - 2 comments
        {
            postId: 7,
            authorName: 'Isabella Thomas',
            authorEmail: 'isabella.thomas@outlook.com',
            content: 'Thanks for sharing these insights. I\'ve been struggling with useEffect dependency arrays.',
            createdAt: new Date('2024-03-20').toISOString(),
        },
        {
            postId: 7,
            authorName: 'Logan Harris',
            authorEmail: 'logan.harris@yahoo.com',
            content: 'Excellent breakdown of React Hooks best practices. The custom hooks section was gold!',
            createdAt: new Date('2024-03-22').toISOString(),
        },
        
        // Post 8 (Database) - 1 comment
        {
            postId: 8,
            authorName: 'Mia Jackson',
            authorEmail: 'mia.jackson@protonmail.com',
            content: 'Great article! This really helped me understand database indexing and query optimization strategies.',
            createdAt: new Date('2024-03-25').toISOString(),
        },
    ];

    await db.insert(blogComments).values(sampleComments);
    
    console.log('✅ Blog comments seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});