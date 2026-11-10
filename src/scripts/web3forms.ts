// Sends a form's fields to Web3Forms, which emails them to contact@vektide.com.
// Shared by the demo and contact forms. `data.access_key` carries the public key.

export async function submitWeb3Forms(data: Record<string, string>, tag: string) {
  if (!data.access_key) {
    // No access key: in dev, act out a success so the page can be tested without sending.
    if (import.meta.env.DEV) {
      console.warn(`[${tag}] PUBLIC_WEB3FORMS_KEY is not set, so nothing was sent. Simulating success.`);
      await new Promise((r) => setTimeout(r, 800));
      return;
    }
    throw new Error('Missing PUBLIC_WEB3FORMS_KEY');
  }

  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || !json.success) throw new Error(json.message || `HTTP ${res.status}`);
}
