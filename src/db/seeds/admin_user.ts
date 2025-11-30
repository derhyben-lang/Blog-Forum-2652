import { db } from '@/db';
import { user, account } from '@/db/schema';
import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';

async function main() {
    const adminEmail = 'derhyben@gmail.com';
    
    // Check if admin user already exists
    const existingUser = await db.select().from(user).where(eq(user.email, adminEmail));
    
    if (existingUser.length > 0) {
        console.log('⚠️ Admin user already exists, skipping seeder');
        return;
    }
    
    // Generate unique ID for user
    const userId = crypto.randomUUID();
    
    // Create admin user
    const adminUser = {
        id: userId,
        email: adminEmail,
        name: 'Derhy Ben',
        role: 'admin',
        emailVerified: true,
        image: null,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    
    await db.insert(user).values(adminUser);
    
    // Hash password
    const hashedPassword = await bcrypt.hash('Admin2606', 10);
    
    // Create account record
    const adminAccount = {
        id: crypto.randomUUID(),
        accountId: adminEmail,
        providerId: 'credential',
        userId: userId,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
        accessToken: null,
        refreshToken: null,
        idToken: null,
        accessTokenExpiresAt: null,
        refreshTokenExpiresAt: null,
        scope: null,
    };
    
    await db.insert(account).values(adminAccount);
    
    console.log('✅ Admin user seeder completed successfully');
    console.log(`📧 Email: ${adminEmail}`);
    console.log(`🔑 Password: Admin2606`);
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});