'use server'

import { sql } from './db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { put } from '@vercel/blob';

export async function submitClaim(formData) {
    const name = formData.get('fullName');
    const email = formData.get('email');
    const axis = formData.get('axis');
    const receiptFile = formData.get('receipt');

    let receiptUrl = null;

    // 1. Upload the image to Vercel Blob if the user attached one
    if (receiptFile && receiptFile.size > 0) {
        const blob = await put(receiptFile.name, receiptFile, {
            access: 'public',
        });
        receiptUrl = blob.url;
    }

    // 2. Insert the new order into Neon, including the receipt URL
    const result = await sql`
        INSERT INTO Orders (guest_name, guest_email, axis, status, receipt_url)
        VALUES (${name}, ${email}, ${axis}, 'Pending Verification', ${receiptUrl})
        RETURNING id;
    `;

    const newOrderId = result[0].id;

    // 3. Redirect the guest to their personal tracking page
    redirect(`/track/${newOrderId}`);
}

export async function approveOrder(orderId) {
    await sql`
        UPDATE Orders 
        SET status = 'Payment Confirmed' 
        WHERE id = ${orderId}
    `;

    revalidatePath('/admin');
}