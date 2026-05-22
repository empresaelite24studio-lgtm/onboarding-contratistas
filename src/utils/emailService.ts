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

export interface OnboardingResult {
  contractorName: string;
  voiceText: string;
  completedAt: string;
  pillars?: string[];
}

export async function sendOnboardingNotification(data: OnboardingResult): Promise<void> {
  const response = await fetch('/api/send-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Error enviando correo: ${response.statusText}`);
  }
}
