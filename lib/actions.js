'use server'

import { sql } from './db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { put } from '@vercel/blob';
import { cookies } from 'next/headers';

export async function submitClaim(formData) {
    const name = formData.get('fullName');
    const email = formData.get('email');
    const axis = formData.get('axis');
    const receiptFile = formData.get('receipt');

    let receiptUrl = null;

    // 1. Upload the image to Vercel Blob
    if (receiptFile && receiptFile.size > 0) {
        const blob = await put(receiptFile.name, receiptFile, {
            access: 'public',
        });
        receiptUrl = blob.url;
    }

    // 2. Insert the new order into Neon
    const result = await sql`
        INSERT INTO Orders (guest_name, guest_email, axis, status, receipt_url)
        VALUES (${name}, ${email}, ${axis}, 'Pending Verification', ${receiptUrl})
        RETURNING id;
    `;

    const newOrderId = result[0].id;

    // 3. Redirect the guest to tracking page
    redirect(`/track/${newOrderId}`);
}

export async function approveOrder(orderId) {
    // 1. Update the status in the database
    await sql`
        UPDATE Orders 
        SET status = 'Payment Confirmed' 
        WHERE id = ${orderId}
    `;

    // 2. Fetch the guest's details
    const result = await sql`SELECT guest_email, guest_name FROM Orders WHERE id = ${orderId}`;
    const order = result[0];

    // 3. Trigger Email.js
    const emailData = {
        service_id: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        template_id: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_APPROVED,
        user_id: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
        template_params: {
            to_name: order.guest_name,
            to_email: order.guest_email,
            tracking_link: `${process.env.NEXT_PUBLIC_BASE_URL}/track/${orderId}`,
            order_id: orderId
        }
    };

    try {
        await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(emailData)
        });
        console.log("Approval email sent successfully!");
    } catch (error) {
        console.error("Failed to send approval email:", error);
    }

    // 4. Trigger UI refresh
    revalidatePath('/admin');
}

export async function loginAdmin(formData) {
    const password = formData.get('password');
    const AdminCookie = await cookies();

    if (password === 'dispatchr2026') {
        AdminCookie.set('admin_session', 'true', { secure: true, httpOnly: true });
        redirect('/admin');
    } else {
        return { error: 'Invalid password' };
    }
}