import { db } from '@/db';
import { forumReplies } from '@/db/schema';

async function main() {
    const sampleReplies = [
        // Thread 1: 3 replies
        {
            threadId: 1,
            authorName: 'Chris Martinez',
            content: 'I agree! I\'ve been using Next.js for a while now and it\'s amazing. The App Router has really improved the developer experience.',
            createdAt: new Date('2024-01-12').toISOString(),
        },
        {
            threadId: 1,
            authorName: 'Emma Wilson',
            content: 'Thanks for starting this thread! Here\'s my take on Next.js 14 - the server components are a game changer for performance.',
            createdAt: new Date('2024-01-15').toISOString(),
        },
        {
            threadId: 1,
            authorName: 'Jake Thompson',
            content: 'I built something similar last month. Happy to share my experience with the migration process if anyone needs help.',
            createdAt: new Date('2024-01-20').toISOString(),
        },
        // Thread 2: 4 replies
        {
            threadId: 2,
            authorName: 'Ashley Davis',
            content: 'Great question! I\'d recommend checking out the official TypeScript handbook first, then move on to building small projects.',
            createdAt: new Date('2024-01-14').toISOString(),
        },
        {
            threadId: 2,
            authorName: 'Michael Chen',
            content: 'I had the same issue when starting. What worked for me was practicing with leetcode problems using TypeScript.',
            createdAt: new Date('2024-01-16').toISOString(),
        },
        {
            threadId: 2,
            authorName: 'Victoria Lee',
            content: 'Here\'s a link to a great tutorial: https://www.typescriptlang.org/docs/handbook/intro.html',
            createdAt: new Date('2024-01-18').toISOString(),
        },
        {
            threadId: 2,
            authorName: 'Brandon Kim',
            content: 'I\'m currently learning TypeScript and finding it really useful. The type safety catches so many bugs early!',
            createdAt: new Date('2024-01-22').toISOString(),
        },
        // Thread 3: 5 replies
        {
            threadId: 3,
            authorName: 'Jasmine Patel',
            content: 'Interesting perspective! Have you tried using Zustand? It\'s much simpler than Redux for most use cases.',
            createdAt: new Date('2024-01-17').toISOString(),
        },
        {
            threadId: 3,
            authorName: 'Austin Brown',
            content: 'This is a common problem. The key is to understand your application\'s complexity before choosing a state management solution.',
            createdAt: new Date('2024-01-19').toISOString(),
        },
        {
            threadId: 3,
            authorName: 'Kayla Garcia',
            content: 'I\'ve used both Redux and Context API. For smaller apps, Context is perfectly fine. Redux shines in larger applications.',
            createdAt: new Date('2024-01-21').toISOString(),
        },
        {
            threadId: 3,
            authorName: 'Dylan Johnson',
            content: 'Don\'t forget about React Query! It handles server state beautifully and reduces the need for global state.',
            createdAt: new Date('2024-01-24').toISOString(),
        },
        {
            threadId: 3,
            authorName: 'Madison Rodriguez',
            content: 'I built something similar last month using Jotai. The atomic approach is really intuitive.',
            createdAt: new Date('2024-01-28').toISOString(),
        },
        // Thread 4: 2 replies
        {
            threadId: 4,
            authorName: 'Cameron White',
            content: 'Great question! I\'d recommend checking out Tailwind CSS - it pairs perfectly with React.',
            createdAt: new Date('2024-01-20').toISOString(),
        },
        {
            threadId: 4,
            authorName: 'Alexis Moore',
            content: 'I agree! I\'ve been using styled-components for a while now and it\'s amazing for component-scoped styles.',
            createdAt: new Date('2024-01-25').toISOString(),
        },
        // Thread 5: 3 replies
        {
            threadId: 5,
            authorName: 'Jordan Taylor',
            content: 'Thanks for starting this thread! Here\'s my take on GraphQL - it eliminates over-fetching and under-fetching issues.',
            createdAt: new Date('2024-01-23').toISOString(),
        },
        {
            threadId: 5,
            authorName: 'Morgan Anderson',
            content: 'I had the same issue. What worked for me was using Apollo Client with its excellent caching system.',
            createdAt: new Date('2024-01-26').toISOString(),
        },
        {
            threadId: 5,
            authorName: 'Casey Williams',
            content: 'REST is still great for CRUD operations. GraphQL shines when you need flexible queries and real-time data.',
            createdAt: new Date('2024-02-01').toISOString(),
        },
        // Thread 6: 2 replies
        {
            threadId: 6,
            authorName: 'Riley Thomas',
            content: 'Interesting perspective! Have you tried Jest with React Testing Library? It\'s the gold standard.',
            createdAt: new Date('2024-01-24').toISOString(),
        },
        {
            threadId: 6,
            authorName: 'Quinn Harris',
            content: 'I\'m currently learning Vitest and finding it really useful. It\'s much faster than Jest!',
            createdAt: new Date('2024-01-29').toISOString(),
        },
        // Thread 7: 2 replies
        {
            threadId: 7,
            authorName: 'Avery Jackson',
            content: 'This is a common problem. The key is to use lazy loading with React.lazy() and Suspense.',
            createdAt: new Date('2024-01-27').toISOString(),
        },
        {
            threadId: 7,
            authorName: 'Peyton Martin',
            content: 'Great question! I\'d recommend checking out the React DevTools Profiler to identify bottlenecks.',
            createdAt: new Date('2024-02-02').toISOString(),
        },
        // Thread 8: 2 replies
        {
            threadId: 8,
            authorName: 'Skylar Lewis',
            content: 'I had the same issue when starting. What worked for me was following Kent C. Dodds\' blog about React hooks.',
            createdAt: new Date('2024-01-28').toISOString(),
        },
        {
            threadId: 8,
            authorName: 'Drew Walker',
            content: 'Thanks for starting this thread! Here\'s my take on hooks - useEffect cleanup is crucial to prevent memory leaks.',
            createdAt: new Date('2024-02-03').toISOString(),
        },
        // Thread 9: 3 replies
        {
            threadId: 9,
            authorName: 'Parker Hall',
            content: 'I agree! I\'ve been using Vercel for a while now and it\'s amazing. The DX is unmatched.',
            createdAt: new Date('2024-02-01').toISOString(),
        },
        {
            threadId: 9,
            authorName: 'Reagan Allen',
            content: 'Netlify is great for static sites. Vercel excels with Next.js deployments.',
            createdAt: new Date('2024-02-04').toISOString(),
        },
        {
            threadId: 9,
            authorName: 'Chris Martinez',
            content: 'I built something similar last month using Railway. It\'s perfect for full-stack apps with databases.',
            createdAt: new Date('2024-02-08').toISOString(),
        },
        // Thread 10: 2 replies
        {
            threadId: 10,
            authorName: 'Emma Wilson',
            content: 'Interesting perspective! Have you tried using environment variables properly? Never commit secrets!',
            createdAt: new Date('2024-02-03').toISOString(),
        },
        {
            threadId: 10,
            authorName: 'Jake Thompson',
            content: 'This is a common problem. The key is to implement HTTPS, CSP headers, and sanitize all user inputs.',
            createdAt: new Date('2024-02-07').toISOString(),
        },
        // Thread 11: 1 reply
        {
            threadId: 11,
            authorName: 'Ashley Davis',
            content: 'Coffee all the way! ☕ Can\'t start my coding day without it.',
            createdAt: new Date('2024-02-06').toISOString(),
        },
        // Thread 12: 2 replies
        {
            threadId: 12,
            authorName: 'Michael Chen',
            content: 'Welcome to the community! Looking forward to seeing your projects. Don\'t hesitate to ask questions!',
            createdAt: new Date('2024-02-09').toISOString(),
        },
        {
            threadId: 12,
            authorName: 'Victoria Lee',
            content: 'Great to have you here! The community is super helpful and friendly.',
            createdAt: new Date('2024-02-12').toISOString(),
        },
        // Thread 13: 3 replies
        {
            threadId: 13,
            authorName: 'Brandon Kim',
            content: 'Thanks for starting this thread! Here\'s my take on career growth - build in public and network consistently.',
            createdAt: new Date('2024-02-11').toISOString(),
        },
        {
            threadId: 13,
            authorName: 'Jasmine Patel',
            content: 'I had the same issue. What worked for me was contributing to open source projects to build my portfolio.',
            createdAt: new Date('2024-02-14').toISOString(),
        },
        {
            threadId: 13,
            authorName: 'Austin Brown',
            content: 'Great question! I\'d recommend checking out books like "Clean Code" and "The Pragmatic Programmer".',
            createdAt: new Date('2024-02-18').toISOString(),
        },
        // Thread 14: 1 reply
        {
            threadId: 14,
            authorName: 'Kayla Garcia',
            content: 'Tea person here! 🍵 Green tea helps me focus during long coding sessions.',
            createdAt: new Date('2024-02-14').toISOString(),
        },
    ];

    await db.insert(forumReplies).values(sampleReplies);
    
    console.log('✅ Forum replies seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});