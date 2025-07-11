import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface FeaturedEventEmailRequest {
  email: string;
  eventTitle: string;
  organizerName: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, eventTitle, organizerName }: FeaturedEventEmailRequest = await req.json();

    const emailResponse = await resend.emails.send({
      from: "Aayojana <onboarding@resend.dev>",
      to: [email],
      subject: "🎉 Congratulations! Your Event is Now Featured!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; text-align: center;">
            <div style="font-size: 48px; margin-bottom: 20px;">🎉</div>
            
            <h1 style="color: #eab308; margin-bottom: 20px; font-size: 28px;">
              Congratulations, ${organizerName}!
            </h1>
            
            <div style="background: linear-gradient(135deg, #eab308, #f59e0b); color: white; padding: 15px 25px; border-radius: 25px; display: inline-block; margin-bottom: 25px;">
              <strong>✨ YOUR EVENT IS NOW FEATURED! ✨</strong>
            </div>
            
            <h2 style="color: #333; margin-bottom: 15px;">"${eventTitle}"</h2>
            
            <p style="color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
              Your event has been successfully upgraded to our Premium Featured plan! 
              It will now be displayed with priority visibility and a special "Featured" badge.
            </p>
            
            <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
              <h3 style="color: #92400e; margin-bottom: 15px;">🌟 Your Premium Benefits:</h3>
              <ul style="color: #92400e; text-align: left; padding-left: 20px;">
                <li>Premium "Featured" badge on your event card</li>
                <li>Medium listing priority in event listings</li>
                <li>Enhanced visibility to potential attendees</li>
                <li>Commission: 10% + NPR 100 per ticket sold</li>
              </ul>
            </div>
            
            <p style="color: #666; font-size: 14px;">
              Thank you for choosing Aayojana to showcase your event. We're excited to help you reach more attendees!
            </p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e5e5;">
              <p style="color: #999; font-size: 12px;">
                Best regards,<br>
                The Aayojana Team
              </p>
            </div>
          </div>
        </div>
      `,
    });

    console.log("Featured event email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-featured-event-email function:", error);
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