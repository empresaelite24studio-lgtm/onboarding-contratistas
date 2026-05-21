/**
 * Email Notification Service — EmailJS
 * 
 * SETUP (one-time, 2 minutes):
 * 1. Go to https://emailjs.com → Sign up free
 * 2. Add Email Service (Gmail / Outlook) → copy SERVICE_ID
 * 3. Create Email Template with these variables:
 *    {{contractor_name}}, {{voice_text}}, {{timestamp}}, {{app_url}}
 *    → copy TEMPLATE_ID
 * 4. Go to Account → copy PUBLIC_KEY
 * 5. Paste the three values below.
 * 
 * Free tier: 200 emails/month — plenty for onboarding.
 */

import emailjs from '@emailjs/browser';

const SERVICE_ID  = 'YOUR_SERVICE_ID';   // ← paste here
const TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // ← paste here
const PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';  // ← paste here

const NOTIFY_EMAIL = 'rrhh@elite24studio.com.co'; // destination

export interface OnboardingResult {
  contractorName: string;
  voiceText: string;
  completedAt: string;
}

export async function sendOnboardingNotification(data: OnboardingResult): Promise<void> {
  // Guard: don't crash the app if not configured
  if (
    SERVICE_ID === 'YOUR_SERVICE_ID' ||
    TEMPLATE_ID === 'YOUR_TEMPLATE_ID' ||
    PUBLIC_KEY === 'YOUR_PUBLIC_KEY'
  ) {
    console.info(
      '[ELITE 24 EMAIL] EmailJS not configured yet.\n' +
      'Follow the SETUP instructions in src/utils/emailService.ts'
    );
    return;
  }

  await emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      to_email:        NOTIFY_EMAIL,
      contractor_name: data.contractorName,
      voice_text:      data.voiceText || '(Sin respuesta de voz)',
      timestamp:       data.completedAt,
      app_url:         window.location.href,
      subject:         `🎉 Nuevo Unboxing completado — ${data.contractorName}`,
    },
    { publicKey: PUBLIC_KEY }
  );
}
