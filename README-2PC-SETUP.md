# 🌿 Vrukshavalli - 2-PC Setup Guide

This guide explains how to run your Vrukshavalli plant nursery e-commerce site across 2 PCs connected to the same WiFi network.

## Architecture Overview

- **Server PC**: Runs the development server and hosts the application
- **Client PC**: Connects to the server PC to access the application via local network
- **Database**: Hosted on Lovable Cloud (Supabase) - accessible from both PCs

## Quick Start

### On Server PC (Main Development Machine)

1. **Install Dependencies**
```bash
npm install
# or
bun install
```

2. **Start Development Server**
```bash
npm run dev
# or
bun run dev
```

The server will start on `http://0.0.0.0:8080` (accessible from network)

3. **Find Your Server PC's IP Address**

**Windows:**
```bash
ipconfig
```
Look for "IPv4 Address" under your active WiFi adapter (e.g., `192.168.1.100`)

**Mac/Linux:**
```bash
ifconfig
# or
ip addr show
```
Look for `inet` address under your WiFi interface (e.g., `192.168.1.100`)

4. **Share the IP Address**
Once you have your server PC's IP address, share it with the client PC.
Example: `192.168.1.100`

### On Client PC (Another Device on Same WiFi)

1. **Open Your Browser**
Navigate to: `http://SERVER_IP:8080`

Replace `SERVER_IP` with the actual IP address from Step 3 above.

Example: `http://192.168.1.100:8080`

2. **Access Different Pages**
- Home: `http://192.168.1.100:8080/`
- Admin Dashboard: `http://192.168.1.100:8080/admin`
- Cart: `http://192.168.1.100:8080/cart`
- Checkout: `http://192.168.1.100:8080/checkout`

## Testing Real-Time Features

### Test Order Flow:

**On Client PC:**
1. Browse plants at `http://SERVER_IP:8080`
2. Add plants to cart
3. Go to checkout and complete the order
4. Watch the order appear in real-time on admin dashboard!

**On Server PC (or another device):**
1. Open admin dashboard at `http://SERVER_IP:8080/admin`
2. Log in with admin credentials
3. Click "Orders" tab
4. See new orders appear instantly!
5. Update order status (e.g., mark as "shipped")
6. Customer receives email notification automatically!

## Features Working Across Network

✅ **Real-time Order Updates**: Orders appear instantly on admin dashboard
✅ **Email Notifications**: Confirmation emails sent on order placement & status changes
✅ **Cart Synchronization**: Cart persists in database for logged-in users
✅ **Image Management**: Admin can upload and edit plant images
✅ **Authentication**: Secure login/signup with password validation
✅ **Live Inventory**: Stock updates reflect immediately on all devices

## Troubleshooting

### Can't Connect from Client PC?

1. **Check Firewall Settings**
   - Windows: Allow port 8080 in Windows Firewall
   - Mac: System Preferences → Security & Privacy → Firewall → Firewall Options
   - Linux: Check `ufw` or `iptables` rules

2. **Verify Same WiFi Network**
   - Both PCs must be on the same WiFi network
   - Check SSID on both devices

3. **Test Connection**
   ```bash
   # From Client PC, ping the Server PC
   ping SERVER_IP
   ```

4. **Try Different Port**
   If 8080 is blocked, edit `vite.config.ts`:
   ```typescript
   server: {
     host: '0.0.0.0',
     port: 3000, // Change to different port
     strictPort: true,
   }
   ```

### Orders Not Updating in Real-Time?

1. **Check Console Logs** on both PCs
2. **Verify Authentication** - Both users must be logged in
3. **Check Network Tab** in browser DevTools

### Email Not Sending?

1. **Verify Resend API Key** is configured in Lovable Cloud
2. **Check Email Domain** is verified at https://resend.com/domains
3. **View Edge Function Logs** in Lovable Cloud dashboard

## Admin Credentials

For development/testing purposes:
- Create an admin user through the auth page
- Assign admin role in database (via Lovable Cloud dashboard)

## Database Access

Your database is hosted on Lovable Cloud (Supabase):
- View backend: Click "View Backend" button in Lovable
- Monitor orders: Check the `orders` table
- Check emails: Review edge function logs

## Production Deployment

When ready to deploy:
1. Click "Publish" in Lovable
2. Your site will be live at `your-project.lovable.app`
3. Configure custom domain if needed

## Password Requirements

When creating accounts:
- ✅ Minimum 8 characters
- ✅ At least 1 uppercase letter
- ✅ At least 1 number

## Security Notes

- Never share your server PC's IP address publicly
- Only use on trusted WiFi networks
- Production site uses HTTPS and proper security
- Admin dashboard requires authentication

## Support

Need help? Check:
- Lovable Docs: https://docs.lovable.dev
- Discord Community: https://discord.gg/lovable
- Instagram: @Vrukshavalli_Ratnagiri

---

Made with 💚 by Vrukshavalli • Ratnagiri
