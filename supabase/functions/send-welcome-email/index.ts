
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface WelcomeEmailRequest {
  email: string;
  name?: string;
  isNewUser: boolean;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, name, isNewUser }: WelcomeEmailRequest = await req.json();

    const subject = isNewUser ? "Welcome to Aayojana!" : "Welcome back to Aayojana!";
    const greeting = name ? `Hello ${name}` : "Hello";
    
    const emailContent = isNewUser ? `
      <h1>${greeting}!</h1>
      <p>Welcome to Aayojana - Nepal's premier event management platform!</p>
      <p>We're excited to have you join our community of event organizers and attendees.</p>
      <p>Here's what you can do with Aayojana:</p>
      <ul>
        <li>Create and manage events</li>
        <li>Sell tickets with ease</li>
        <li>Discover amazing events in Nepal</li>
        <li>Connect with fellow event enthusiasts</li>
      </ul>
      <p>Get started by exploring our platform and creating your first event!</p>
      <p>Best regards,<br>The Aayojana Team</p>
    ` : `
      <h1>${greeting}!</h1>
      <p>Welcome back to Aayojana!</p>
      <p>We're glad to see you again. Continue exploring amazing events and managing your event experiences.</p>
      <p>Best regards,<br>The Aayojana Team</p>
    `;

    const emailResponse = await resend.emails.send({
      from: "Aayojana <onboarding@resend.dev>",
      to: [email],
      subject: subject,
      html: emailContent,
    });

    console.log("Welcome email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending welcome email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
