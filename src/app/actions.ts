"use server";

type ContactField = "firstName" | "lastName" | "email" | "phone" | "message";

export type ContactState = {
  status: "idle" | "success" | "error";
  reason?: "invalid" | "not-configured" | "failed";
  message?: string;
  fieldErrors?: Partial<Record<ContactField, string>>;
  values?: Partial<Record<ContactField, string>>;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendContactRequest(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const read = (key: string) => String(formData.get(key) ?? "").trim();
  const singleLine = (value: string) => value.replace(/\s+/g, " ");

  // Bots fill the hidden "website" field; report success so they move on.
  if (read("website")) return { status: "success" };

  const values = {
    firstName: singleLine(read("firstName")),
    lastName: singleLine(read("lastName")),
    email: read("email"),
    phone: singleLine(read("phone")),
    message: read("message"),
  };

  const fieldErrors: ContactState["fieldErrors"] = {};
  if (!values.firstName || values.firstName.length > 60) {
    fieldErrors.firstName = "Indiquez votre prénom.";
  }
  if (!values.lastName || values.lastName.length > 60) {
    fieldErrors.lastName = "Indiquez votre nom.";
  }
  if (!EMAIL_PATTERN.test(values.email) || values.email.length > 200) {
    fieldErrors.email = "Indiquez une adresse courriel valide.";
  }
  if (values.phone.length > 30) {
    fieldErrors.phone = "Ce numéro est trop long.";
  }
  if (values.message.length < 10 || values.message.length > 5000) {
    fieldErrors.message = "Décrivez votre sinistre en au moins 10 caractères.";
  }
  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      reason: "invalid",
      message: "Veuillez corriger les champs indiqués.",
      fieldErrors,
      values,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !recipient) {
    console.warn(
      "[contact] RESEND_API_KEY ou CONTACT_TO_EMAIL manquant : demande non transmise.",
    );
    return {
      status: "error",
      reason: "not-configured",
      message: "Le formulaire n'est pas encore relié à notre boîte courriel.",
      values,
    };
  }

  const fullName = `${values.firstName} ${values.lastName}`;
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from:
          process.env.CONTACT_FROM_EMAIL ??
          "Site Estimation MXL <onboarding@resend.dev>",
        to: [recipient],
        reply_to: values.email,
        subject: `Demande d'estimation après sinistre : ${fullName}`,
        text: [
          `Nom : ${fullName}`,
          `Courriel : ${values.email}`,
          `Téléphone : ${values.phone || "non fourni"}`,
          "",
          values.message,
        ].join("\n"),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) {
      console.error(
        "[contact] Échec de l'envoi",
        response.status,
        await response.text(),
      );
      throw new Error(`Resend responded with ${response.status}`);
    }
  } catch {
    return {
      status: "error",
      reason: "failed",
      message: "L'envoi a échoué. Réessayez dans quelques instants.",
      values,
    };
  }

  return { status: "success" };
}
