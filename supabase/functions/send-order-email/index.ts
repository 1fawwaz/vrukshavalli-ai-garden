import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface OrderEmailRequest {
  to: string;
  orderId: string;
  type: 'confirmation' | 'shipped' | 'delivered';
  customerName: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  total: number;
  shippingAddress?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, orderId, type, customerName, items, total, shippingAddress }: OrderEmailRequest = await req.json();

    let subject = "";
    let html = "";

    if (type === 'confirmation') {
      subject = `🌱 Yay! Your Vrukshavalli order ${orderId} is confirmed!`;
      html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #2d5016;">Bring home a green friend! 🌿</h1>
          <p>Hi ${customerName},</p>
          <p>Thank you for your order! We're excited to get your plants ready.</p>
          
          <h2 style="color: #2d5016;">Order Details</h2>
          <p><strong>Order ID:</strong> ${orderId}</p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <thead>
              <tr style="background-color: #f0f0f0;">
                <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Plant</th>
                <th style="padding: 10px; text-align: center; border: 1px solid #ddd;">Qty</th>
                <th style="padding: 10px; text-align: right; border: 1px solid #ddd;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${items.map(item => `
                <tr>
                  <td style="padding: 10px; border: 1px solid #ddd;">${item.name}</td>
                  <td style="padding: 10px; text-align: center; border: 1px solid #ddd;">${item.quantity}</td>
                  <td style="padding: 10px; text-align: right; border: 1px solid #ddd;">₹${item.price * item.quantity}</td>
                </tr>
              `).join('')}
            </tbody>
            <tfoot>
              <tr style="font-weight: bold; background-color: #f9f9f9;">
                <td colspan="2" style="padding: 10px; border: 1px solid #ddd;">Total</td>
                <td style="padding: 10px; text-align: right; border: 1px solid #ddd;">₹${total}</td>
              </tr>
            </tfoot>
          </table>
          
          ${shippingAddress ? `<p><strong>Shipping to:</strong><br>${shippingAddress.replace(/\n/g, '<br>')}</p>` : ''}
          
          <p style="color: #666; margin-top: 30px;">
            Follow us on Instagram: <a href="https://instagram.com/Vrukshavalli_Ratnagiri" style="color: #2d5016;">@Vrukshavalli_Ratnagiri</a>
          </p>
          <p style="color: #999; font-size: 12px;">Vrukshavalli • Ratnagiri</p>
        </div>
      `;
    } else if (type === 'shipped') {
      subject = `🚚 Good news — Your plant is on the move!`;
      html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #2d5016;">Your plants are coming! 🌱</h1>
          <p>Hi ${customerName},</p>
          <p>Great news! Your order <strong>${orderId}</strong> has been shipped and is on its way to you.</p>
          
          <p style="background-color: #f0f8f0; padding: 15px; border-radius: 8px; border-left: 4px solid #2d5016;">
            Your green friends will arrive soon. Make sure to have a nice spot ready for them! ☀️💧
          </p>
          
          <p style="color: #666; margin-top: 30px;">
            Follow us on Instagram: <a href="https://instagram.com/Vrukshavalli_Ratnagiri" style="color: #2d5016;">@Vrukshavalli_Ratnagiri</a>
          </p>
          <p style="color: #999; font-size: 12px;">Vrukshavalli • Ratnagiri</p>
        </div>
      `;
    } else if (type === 'delivered') {
      subject = `🎉 Your plants have arrived!`;
      html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #2d5016;">Welcome your new green friends! 🌿</h1>
          <p>Hi ${customerName},</p>
          <p>Your order <strong>${orderId}</strong> has been delivered! We hope your plants bring joy to your space.</p>
          
          <h2 style="color: #2d5016;">Plant Care Tips 🌱</h2>
          <ul style="line-height: 1.8;">
            <li>Give your plants a day to adjust to their new home</li>
            <li>Water them gently and check soil moisture regularly</li>
            <li>Place them in appropriate light conditions</li>
            <li>Show them some love! 💚</li>
          </ul>
          
          <p style="background-color: #f0f8f0; padding: 15px; border-radius: 8px; border-left: 4px solid #2d5016;">
            Share your new plant on Instagram and tag us <strong>@Vrukshavalli_Ratnagiri</strong>!
          </p>
          
          <p style="color: #666; margin-top: 30px;">
            Follow us on Instagram: <a href="https://instagram.com/Vrukshavalli_Ratnagiri" style="color: #2d5016;">@Vrukshavalli_Ratnagiri</a>
          </p>
          <p style="color: #999; font-size: 12px;">Vrukshavalli • Ratnagiri</p>
        </div>
      `;
    }

    const emailResponse = await resend.emails.send({
      from: "Vrukshavalli <onboarding@resend.dev>",
      to: [to],
      subject,
      html,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-order-email function:", error);
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
