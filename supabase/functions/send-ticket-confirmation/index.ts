import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface TicketConfirmationRequest {
  eventTitle: string;
  attendeeName: string;
  attendeeEmail: string;
  ticketType: string;
  totalAmount: number;
  purchaseId: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      eventTitle, 
      attendeeName, 
      attendeeEmail, 
      ticketType, 
      totalAmount, 
      purchaseId 
    }: TicketConfirmationRequest = await req.json();

    const emailResponse = await resend.emails.send({
      from: "Aayojana Events <onboarding@resend.dev>",
      to: [attendeeEmail],
      subject: `Ticket Confirmation - ${eventTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #2563eb; text-align: center;">🎟️ Ticket Confirmation</h1>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #1e293b; margin-top: 0;">Successfully Registered!</h2>
            <p>Dear ${attendeeName},</p>
            <p>You have been successfully registered for the event: <strong>${eventTitle}</strong></p>
          </div>

          <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #065f46; margin-top: 0;">Ticket Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Event:</td>
                <td style="padding: 8px 0;">${eventTitle}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Ticket Type:</td>
                <td style="padding: 8px 0;">${ticketType}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Amount Paid:</td>
                <td style="padding: 8px 0;">NPR ${totalAmount.toLocaleString()}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Purchase ID:</td>
                <td style="padding: 8px 0;">${purchaseId}</td>
              </tr>
            </table>
          </div>

          <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #92400e; margin-top: 0;">Important Information</h3>
            <ul style="color: #92400e;">
              <li>Please save this email as your ticket confirmation</li>
              <li>Present this confirmation at the event entrance</li>
              <li>Contact the event organizer if you have any questions</li>
            </ul>
          </div>

          <p style="text-align: center; color: #64748b; margin-top: 30px;">
            Thank you for choosing Aayojana Events!<br>
            We look forward to seeing you at the event.
          </p>
        </div>
      `,
    });

    console.log("Ticket confirmation email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-ticket-confirmation function:", error);
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