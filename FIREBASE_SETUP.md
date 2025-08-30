# Firebase Setup Instructions

## Google Sign-In Configuration

To enable Google Sign-In in your Firebase project, follow these steps:

### Step 1: Enable Authentication
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `authflow-pvhn3`
3. In the left sidebar, click on **Authentication**
4. Click on **Get started** if this is the first time
5. Go to the **Sign-in method** tab
6. Enable **Email/Password** authentication:
   - Click on "Email/Password"
   - Toggle "Enable" to ON
   - Click "Save"
7. Enable **Google** authentication:
   - Click on "Google"
   - Toggle "Enable" to ON
   - Enter your project support email
   - Click "Save"

### Step 2: Set up Firestore (for user profiles)
1. In the left sidebar, click on **Firestore Database**
2. Click **Create database**
3. Choose **Start in test mode** (for development)
4. Select a location (choose the closest to you)
5. Click **Done**

### Step 3: Configure Authorized Domains
1. In Authentication > Settings > Authorized domains
2. Add your Replit domain(s):
   - For new Replit: `your-repl-name.your-username.replit.dev`
   - For legacy Replit: `your-repl-name.your-username.repl.co`
   - You may need to add BOTH formats
3. For development, also add: `localhost` and `127.0.0.1`

**Important**: The domain must match EXACTLY. 

For this Replit project, add: `workspace.ivcmc.replit.dev`

Always check your browser URL and copy the domain portion (without https://).

### Step 4: OAuth Consent Screen (Google Cloud Console)
If you encounter OAuth issues:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your Firebase project
3. Go to "APIs & Services" > "OAuth consent screen"
4. Configure the consent screen with your app information
5. Add authorized domains

## Features Implemented
✅ **Email/Password Authentication**
- User registration and login
- Password validation
- Error handling

✅ **Google Sign-In**
- One-click Google authentication
- Automatic user profile creation
- Popup-based sign-in flow

✅ **User Profile Management**
- Firestore integration for user data
- Profile updates (name, phone)
- Password change functionality
- Password reset via email

## Current Configuration
- Project ID: authflow-pvhn3
- API Key: ✅ Loaded
- App ID: ✅ Loaded
- Authentication Methods: Email/Password + Google Sign-In

## Troubleshooting

### Domain Authorization Issues
If you get "unauthorized domain" error:
1. Check your browser URL (copy the domain part)
2. Add the EXACT domain to Firebase Console > Authentication > Settings > Authorized domains
3. Common domain formats:
   - `your-app.your-username.replit.dev` (new format)
   - `your-app.your-username.repl.co` (legacy format)
4. Wait 5-10 minutes after adding the domain

### Other Issues
- **Popup blocked**: Enable popups for your domain in browser settings
- **OAuth error**: Configure OAuth consent screen in Google Cloud Console
- **Login canceled**: This happens when the popup closes - try again and complete the Google sign-in process

Once you complete these steps, both email/password and Google authentication will work properly!