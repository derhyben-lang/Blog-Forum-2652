import { db } from '@/db';
import { blogPosts } from '@/db/schema';

async function main() {
    const samplePosts = [
        {
            title: 'Getting Started with Next.js 15',
            slug: 'getting-started-with-nextjs-15',
            excerpt: 'Learn the fundamentals of Next.js 15 and discover the powerful new features that make building modern web applications easier than ever. This comprehensive guide covers everything from setup to deployment.',
            content: `# Getting Started with Next.js 15

Next.js 15 represents a significant leap forward in React-based web development. With improved performance, enhanced developer experience, and powerful new features, it's the perfect time to dive into this framework.

## Why Next.js 15?

Next.js has become the go-to framework for React developers, and version 15 brings several game-changing improvements:

- **Faster Build Times**: Experience up to 50% faster builds with the new Turbopack compiler
- **Enhanced Server Components**: Better integration with React Server Components
- **Improved Caching**: Smarter caching strategies that reduce unnecessary re-renders
- **Better Type Safety**: Enhanced TypeScript support out of the box

## Setting Up Your First Project

Getting started is incredibly simple. Here's how to create your first Next.js 15 application:

\`\`\`bash
npx create-next-app@latest my-app
cd my-app
npm run dev
\`\`\`

This will scaffold a complete Next.js application with all the modern features enabled by default.

## Key Features to Explore

### App Router
The App Router is now the recommended way to structure your Next.js applications. It provides better code organization and improved performance through automatic code splitting.

### Server Components
Server Components allow you to render components on the server, reducing the JavaScript sent to the client and improving initial page load times.

### API Routes
Built-in API routes make it easy to create backend endpoints without leaving your Next.js project.

## Best Practices

When working with Next.js 15, keep these best practices in mind:

1. Use Server Components by default
2. Implement proper error boundaries
3. Optimize images with the Image component
4. Leverage static generation when possible
5. Use environment variables for configuration

## Conclusion

Next.js 15 is a powerful framework that simplifies modern web development. Whether you're building a simple blog or a complex web application, Next.js provides the tools and performance you need to succeed.`,
            authorName: 'Sarah Chen',
            featuredImageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
            publishedAt: new Date('2024-11-15').toISOString(),
            createdAt: new Date('2024-11-14').toISOString(),
            isFeatured: true,
        },
        {
            title: 'Modern Web Design Principles',
            slug: 'modern-web-design-principles',
            excerpt: 'Explore the essential principles of modern web design that create beautiful, functional, and user-friendly interfaces. Learn how to apply these concepts to your next project.',
            content: `# Modern Web Design Principles

Web design has evolved dramatically over the past decade. Today's users expect interfaces that are not only beautiful but also intuitive, accessible, and performant. Let's explore the core principles that define modern web design.

## The Foundation: User-Centered Design

Modern web design starts with understanding your users. Every design decision should be made with the end user in mind:

- **Simplicity**: Remove unnecessary elements that don't serve a purpose
- **Consistency**: Maintain uniform design patterns throughout your site
- **Accessibility**: Ensure your design works for users of all abilities
- **Responsiveness**: Design for all screen sizes and devices

## Visual Hierarchy

Creating clear visual hierarchy helps users understand content priority and navigate your site effectively:

1. Use size and weight to indicate importance
2. Employ white space to separate content sections
3. Apply color strategically to draw attention
4. Leverage typography to establish hierarchy

## Color Psychology

Colors evoke emotions and influence user behavior. Understanding color psychology is crucial:

- **Blue**: Trust and professionalism
- **Green**: Growth and harmony
- **Red**: Energy and urgency
- **Yellow**: Optimism and attention

## Typography Matters

Typography is more than just choosing a pretty font. It's about creating readable, accessible content:

\`\`\`css
body {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: #333;
}

h1 {
  font-size: 2.5rem;
  line-height: 1.2;
  margin-bottom: 1rem;
}
\`\`\`

## Micro-Interactions

Small animations and transitions enhance user experience by providing feedback and creating delight. These subtle touches make interfaces feel alive and responsive.

## Mobile-First Approach

With mobile traffic surpassing desktop, starting with mobile design ensures a solid foundation. Progressive enhancement then adds features for larger screens.

## Performance is Design

A beautiful site that loads slowly frustrates users. Performance optimization is an integral part of modern design:

- Optimize images and use modern formats
- Minimize JavaScript and CSS
- Implement lazy loading
- Use CDNs for static assets

## Conclusion

Modern web design is a balance of aesthetics, functionality, and performance. By following these principles, you'll create experiences that users love and trust.`,
            authorName: 'Michael Rodriguez',
            featuredImageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
            publishedAt: new Date('2024-11-20').toISOString(),
            createdAt: new Date('2024-11-19').toISOString(),
            isFeatured: true,
        },
        {
            title: 'TypeScript Best Practices',
            slug: 'typescript-best-practices',
            excerpt: 'Master TypeScript with these proven best practices. From type definitions to advanced patterns, learn how to write type-safe, maintainable code.',
            content: `# TypeScript Best Practices

TypeScript has revolutionized JavaScript development by adding static type checking. However, to truly leverage its power, you need to follow best practices that ensure type safety and maintainability.

## Start with Strict Mode

Always enable strict mode in your tsconfig.json:

\`\`\`json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true
  }
}
\`\`\`

## Use Interface Over Type for Objects

While both work, interfaces are generally preferred for object shapes:

\`\`\`typescript
interface User {
  id: string;
  name: string;
  email: string;
}
\`\`\`

## Avoid Any Like the Plague

Using \`any\` defeats the purpose of TypeScript. Instead, use \`unknown\` for truly dynamic types:

\`\`\`typescript
function processData(data: unknown) {
  if (typeof data === 'string') {
    return data.toUpperCase();
  }
}
\`\`\`

## Leverage Union Types

Union types provide flexibility while maintaining type safety:

\`\`\`typescript
type Status = 'idle' | 'loading' | 'success' | 'error';
\`\`\`

## Use Generics for Reusability

Generics make your code more flexible and reusable:

\`\`\`typescript
function getFirstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}
\`\`\`

## Proper Error Handling

Type your errors appropriately:

\`\`\`typescript
try {
  // code
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  }
}
\`\`\`

## Use Utility Types

TypeScript provides powerful utility types:

- \`Partial<T>\`: Makes all properties optional
- \`Required<T>\`: Makes all properties required
- \`Pick<T, K>\`: Selects specific properties
- \`Omit<T, K>\`: Excludes specific properties

## Conclusion

Following these best practices will help you write more maintainable and type-safe TypeScript code. Remember, the goal is to catch errors at compile time, not runtime.`,
            authorName: 'Emily Watson',
            featuredImageUrl: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800',
            publishedAt: new Date('2024-11-25').toISOString(),
            createdAt: new Date('2024-11-24').toISOString(),
            isFeatured: false,
        },
        {
            title: 'Building Scalable Applications',
            slug: 'building-scalable-applications',
            excerpt: 'Discover the architectural patterns and strategies for building applications that scale. Learn how to handle growth while maintaining performance and reliability.',
            content: `# Building Scalable Applications

Scalability is not just about handling more users—it's about building systems that can grow efficiently while maintaining performance, reliability, and maintainability.

## Understanding Scalability

Scalability comes in two forms:

### Vertical Scaling
Adding more power to existing machines. This is simpler but has limits.

### Horizontal Scaling
Adding more machines to your pool. This is more complex but offers unlimited growth potential.

## Architecture Patterns

### Microservices Architecture

Breaking your application into smaller, independent services offers several benefits:

- Independent deployment
- Technology flexibility
- Easier scaling of specific components
- Better fault isolation

\`\`\`typescript
// Service structure example
interface UserService {
  getUser(id: string): Promise<User>;
  updateUser(id: string, data: Partial<User>): Promise<User>;
}

interface PaymentService {
  processPayment(amount: number, userId: string): Promise<Transaction>;
}
\`\`\`

### Event-Driven Architecture

Event-driven systems decouple components and improve scalability:

- Services communicate through events
- Asynchronous processing
- Better handling of traffic spikes
- Improved resilience

## Database Strategies

### Database Sharding
Distribute data across multiple databases to handle more load:

1. Choose appropriate shard key
2. Implement consistent hashing
3. Handle cross-shard queries efficiently

### Caching Layers
Implement strategic caching to reduce database load:

- Redis for session management
- Memcached for frequently accessed data
- CDN for static assets

## Load Balancing

Distribute traffic across multiple servers:

\`\`\`nginx
upstream app_servers {
  server app1.example.com;
  server app2.example.com;
  server app3.example.com;
}
\`\`\`

## Monitoring and Observability

You can't scale what you can't measure:

- Implement comprehensive logging
- Use distributed tracing
- Monitor key metrics (latency, throughput, error rates)
- Set up alerting for critical issues

## Performance Optimization

### Code-Level Optimizations
- Use efficient algorithms and data structures
- Implement pagination for large datasets
- Optimize database queries
- Use connection pooling

### Infrastructure Optimizations
- Use CDNs for static content
- Implement efficient caching strategies
- Optimize network calls
- Use message queues for async processing

## Conclusion

Building scalable applications requires careful planning and the right architectural decisions. Start with good patterns, measure everything, and scale incrementally based on actual needs.`,
            authorName: 'David Kim',
            featuredImageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
            publishedAt: new Date('2024-12-01').toISOString(),
            createdAt: new Date('2024-11-30').toISOString(),
            isFeatured: true,
        },
        {
            title: 'The Future of Web Development',
            slug: 'the-future-of-web-development',
            excerpt: 'Look ahead at the emerging trends and technologies shaping the future of web development. From AI integration to edge computing, the web is evolving rapidly.',
            content: `# The Future of Web Development

Web development is evolving at an unprecedented pace. Let's explore the trends and technologies that will shape how we build for the web in the coming years.

## AI and Machine Learning Integration

AI is no longer just for data scientists. Modern web frameworks are integrating AI capabilities directly:

### Personalization at Scale
- Dynamic content adaptation based on user behavior
- Real-time recommendation systems
- Automated A/B testing and optimization

### Code Generation
Tools like GitHub Copilot are just the beginning. Future IDEs will offer:
- Intelligent code completion
- Automated refactoring suggestions
- Bug prediction and prevention

## Edge Computing

Moving computation closer to users offers significant benefits:

\`\`\`typescript
// Edge function example
export default async function handler(request: Request) {
  const country = request.geo?.country;
  
  return new Response(
    \`Serving content optimized for \${country}\`
  );
}
\`\`\`

Benefits include:
- Reduced latency
- Better privacy compliance
- Improved performance globally
- Cost optimization

## WebAssembly (WASM)

WASM enables near-native performance in the browser:

- Running C/C++ code in browsers
- High-performance gaming
- Video/audio processing
- Scientific computing applications

## Progressive Web Apps Evolution

PWAs continue to blur the line between web and native:

- Offline-first capabilities
- Background sync
- Push notifications
- Installation on all platforms

## Web3 and Decentralization

Blockchain integration is creating new paradigms:

- Decentralized identity management
- Peer-to-peer applications
- Smart contract integration
- Cryptocurrency payments

## Server Components and Islands

Modern architectures like React Server Components and Astro Islands are changing how we think about rendering:

- Reduced JavaScript bundle sizes
- Better initial load times
- Improved SEO
- Simplified data fetching

## Low-Code/No-Code Platforms

These platforms are becoming more sophisticated:

- Visual development environments
- API integration builders
- Automated deployment pipelines
- Component marketplaces

## Conclusion

The future of web development is exciting and full of possibilities. While tools and frameworks will continue to evolve, the fundamental principles of creating great user experiences will remain constant. Stay curious, keep learning, and embrace the changes ahead.`,
            authorName: 'Jessica Thompson',
            featuredImageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
            publishedAt: new Date('2024-12-05').toISOString(),
            createdAt: new Date('2024-12-04').toISOString(),
            isFeatured: false,
        },
        {
            title: 'CSS Grid vs Flexbox: When to Use Each',
            slug: 'css-grid-vs-flexbox-when-to-use-each',
            excerpt: 'Understand the differences between CSS Grid and Flexbox, and learn when to use each layout system for optimal results.',
            content: `# CSS Grid vs Flexbox: When to Use Each

Both CSS Grid and Flexbox are powerful layout systems, but they excel in different scenarios. Understanding when to use each will make you a more effective developer.

## Understanding the Fundamentals

### Flexbox: One-Dimensional Layouts

Flexbox is designed for laying out items in a single direction—either as a row or column:

\`\`\`css
.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
\`\`\`

### Grid: Two-Dimensional Layouts

Grid excels at creating complex layouts with rows and columns simultaneously:

\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
\`\`\`

## When to Use Flexbox

### Navigation Bars
Perfect for horizontal or vertical navigation:

\`\`\`css
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
\`\`\`

### Card Layouts
When you need items to wrap and adjust automatically:

\`\`\`css
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
\`\`\`

### Centering Elements
The classic centering problem solved elegantly:

\`\`\`css
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
\`\`\`

## When to Use Grid

### Page Layouts
Creating overall page structure with header, sidebar, content, and footer:

\`\`\`css
.page-layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar content aside"
    "footer footer footer";
  grid-template-columns: 200px 1fr 200px;
}
\`\`\`

### Image Galleries
Equal-sized items in a grid pattern:

\`\`\`css
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}
\`\`\`

### Complex Forms
When you need precise control over form layout:

\`\`\`css
.form-grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1rem;
  align-items: start;
}
\`\`\`

## Combining Both

Often, the best solution uses both:

\`\`\`css
.card {
  /* Grid for overall layout */
  display: grid;
  grid-template-rows: auto 1fr auto;
}

.card-actions {
  /* Flexbox for buttons */
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
}
\`\`\`

## Decision Framework

Ask yourself:
1. Is the layout one-dimensional? → Use Flexbox
2. Is the layout two-dimensional? → Use Grid
3. Do items need to wrap dynamically? → Use Flexbox
4. Do you need precise control over rows and columns? → Use Grid

## Conclusion

Both CSS Grid and Flexbox are essential tools in modern web development. Master both, understand their strengths, and use them together to create beautiful, responsive layouts.`,
            authorName: 'Alex Morgan',
            featuredImageUrl: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800',
            publishedAt: new Date('2024-12-08').toISOString(),
            createdAt: new Date('2024-12-07').toISOString(),
            isFeatured: false,
        },
        {
            title: 'Mastering React Hooks',
            slug: 'mastering-react-hooks',
            excerpt: 'Deep dive into React Hooks and learn how to use them effectively. From useState to custom hooks, become proficient in modern React development.',
            content: `# Mastering React Hooks

React Hooks revolutionized how we write React components. Let's explore the most important hooks and learn how to use them effectively.

## Understanding useState

The most fundamental hook for managing state:

\`\`\`typescript
const [count, setCount] = useState(0);

// Functional updates
setCount(prevCount => prevCount + 1);
\`\`\`

### Common Patterns

\`\`\`typescript
// Object state
const [user, setUser] = useState({
  name: '',
  email: ''
});

// Updating object state
setUser(prev => ({ ...prev, name: 'John' }));
\`\`\`

## useEffect: Side Effects Management

Handle side effects in functional components:

\`\`\`typescript
useEffect(() => {
  // Run on mount and when dependency changes
  fetchData();
  
  // Cleanup function
  return () => {
    cleanup();
  };
}, [dependency]);
\`\`\`

### Effect Dependencies

- Empty array: Run once on mount
- No array: Run on every render
- With dependencies: Run when dependencies change

## useContext: State Sharing

Share state across components without prop drilling:

\`\`\`typescript
const ThemeContext = createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Component />
    </ThemeContext.Provider>
  );
}

function Component() {
  const theme = useContext(ThemeContext);
  return <div>Theme: {theme}</div>;
}
\`\`\`

## useReducer: Complex State Logic

For complex state logic, useReducer is often better than useState:

\`\`\`typescript
const [state, dispatch] = useReducer(reducer, initialState);

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
}
\`\`\`

## useMemo and useCallback

Optimize performance by memoizing values and callbacks:

\`\`\`typescript
// Memoize expensive calculations
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);

// Memoize callbacks
const handleClick = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
\`\`\`

## useRef: Accessing DOM and Persisting Values

\`\`\`typescript
const inputRef = useRef<HTMLInputElement>(null);

useEffect(() => {
  inputRef.current?.focus();
}, []);
\`\`\`

## Custom Hooks

Create reusable logic with custom hooks:

\`\`\`typescript
function useLocalStorage(key: string, initialValue: string) {
  const [value, setValue] = useState(() => {
    return localStorage.getItem(key) || initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue] as const;
}
\`\`\`

## Best Practices

1. Always follow the Rules of Hooks
2. Use ESLint plugin for hooks
3. Keep effects focused and single-purpose
4. Extract complex logic into custom hooks
5. Use TypeScript for type safety

## Conclusion

React Hooks provide a powerful and flexible way to build React applications. Master these patterns, and you'll write cleaner, more maintainable React code.`,
            authorName: 'Chris Lee',
            featuredImageUrl: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800',
            publishedAt: new Date('2024-12-10').toISOString(),
            createdAt: new Date('2024-12-09').toISOString(),
            isFeatured: false,
        },
        {
            title: 'Database Design Fundamentals',
            slug: 'database-design-fundamentals',
            excerpt: 'Learn the core principles of database design. From normalization to indexing, understand how to create efficient, scalable database schemas.',
            content: `# Database Design Fundamentals

Good database design is the foundation of any successful application. Let's explore the principles and practices that lead to efficient, maintainable databases.

## Normalization

Normalization reduces data redundancy and improves data integrity.

### First Normal Form (1NF)
- Eliminate repeating groups
- Create separate tables for related data
- Identify each record with a primary key

### Second Normal Form (2NF)
- Must be in 1NF
- Remove partial dependencies
- Create separate tables for sets of values that apply to multiple records

### Third Normal Form (3NF)
- Must be in 2NF
- Remove transitive dependencies
- Ensure all columns depend only on the primary key

## Primary Keys

Every table should have a primary key:

\`\`\`sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL
);
\`\`\`

### Choosing Primary Keys
- Auto-incrementing integers for simple cases
- UUIDs for distributed systems
- Natural keys when appropriate

## Foreign Keys

Maintain referential integrity:

\`\`\`sql
CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
\`\`\`

## Indexing Strategy

Indexes speed up queries but slow down writes:

\`\`\`sql
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_orders_user_id ON orders(user_id);
\`\`\`

### When to Index
- Foreign key columns
- Columns used in WHERE clauses
- Columns used in JOIN conditions
- Columns used in ORDER BY

### When Not to Index
- Small tables
- Columns with low selectivity
- Tables with frequent inserts/updates

## Data Types

Choose appropriate data types:

### Integers
- Use for whole numbers, IDs, counters
- Choose size based on expected range

### Text/String
- VARCHAR for variable-length strings
- TEXT for long content
- Consider character encoding

### Dates and Times
- Use DATE for dates only
- TIMESTAMP for date and time
- Consider timezone handling

## Relationships

### One-to-Many
Most common relationship type:

\`\`\`sql
users (1) ----< (N) posts
\`\`\`

### Many-to-Many
Requires junction table:

\`\`\`sql
posts (N) ----< post_tags >---- (N) tags
\`\`\`

### One-to-One
Less common, often indicates denormalization opportunity:

\`\`\`sql
users (1) ---- (1) user_profiles
\`\`\`

## Query Optimization

### Use EXPLAIN
Understand how your queries execute:

\`\`\`sql
EXPLAIN QUERY PLAN
SELECT * FROM users WHERE email = 'test@example.com';
\`\`\`

### Avoid SELECT *
Only select the columns you need:

\`\`\`sql
SELECT id, name, email FROM users;
\`\`\`

### Use Proper JOINs
Choose the right JOIN type for your needs.

## Common Patterns

### Soft Deletes
Keep deleted records for audit trails:

\`\`\`sql
ALTER TABLE users ADD COLUMN deleted_at TEXT;
\`\`\`

### Timestamps
Track record creation and updates:

\`\`\`sql
created_at TEXT NOT NULL,
updated_at TEXT NOT NULL
\`\`\`

### Status Fields
Use enums or constraints for status columns:

\`\`\`sql
status TEXT CHECK(status IN ('draft', 'published', 'archived'))
\`\`\`

## Conclusion

Database design is both an art and a science. Start with solid fundamentals, normalize your data, index strategically, and always consider your application's specific needs. Good design pays dividends in performance, maintainability, and scalability.`,
            authorName: 'Samantha Brown',
            featuredImageUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800',
            publishedAt: new Date('2024-12-12').toISOString(),
            createdAt: new Date('2024-12-11').toISOString(),
            isFeatured: false,
        }
    ];

    await db.insert(blogPosts).values(samplePosts);
    
    console.log('✅ Blog posts seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});