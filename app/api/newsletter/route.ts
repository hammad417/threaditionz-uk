import { NextRequest, NextResponse } from "next/server";

// Subscribes a footer/newsletter signup to a Klaviyo list. Uses the server-side
// private key (never exposed to the browser) and Klaviyo's bulk subscription job
// endpoint, which honours the list's double opt-in setting — if double opt-in is
// on, Klaviyo emails the confirmation; if off, the profile is subscribed directly.
const KLAVIYO_PRIVATE_API_KEY = process.env.KLAVIYO_PRIVATE_API_KEY;
const KLAVIYO_NEWSLETTER_LIST_ID = process.env.KLAVIYO_NEWSLETTER_LIST_ID;
const KLAVIYO_REVISION = "2024-10-15";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest): Promise<NextResponse> {
  if (!KLAVIYO_PRIVATE_API_KEY || !KLAVIYO_NEWSLETTER_LIST_ID) {
    return NextResponse.json(
      { error: "Newsletter is not configured." },
      { status: 503 },
    );
  }

  let email: unknown;
  try {
    ({ email } = await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const res = await fetch(
    "https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/",
    {
      method: "POST",
      headers: {
        Authorization: `Klaviyo-API-Key ${KLAVIYO_PRIVATE_API_KEY}`,
        revision: KLAVIYO_REVISION,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        data: {
          type: "profile-subscription-bulk-create-job",
          attributes: {
            profiles: {
              data: [
                {
                  type: "profile",
                  attributes: {
                    email,
                    subscriptions: {
                      email: { marketing: { consent: "SUBSCRIBED" } },
                    },
                  },
                },
              ],
            },
          },
          relationships: {
            list: {
              data: { type: "list", id: KLAVIYO_NEWSLETTER_LIST_ID },
            },
          },
        },
      }),
    },
  );

  // Klaviyo returns 202 Accepted on success (job queued).
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("Klaviyo subscribe failed", res.status, detail);
    return NextResponse.json(
      { error: "Could not subscribe right now. Please try again later." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
