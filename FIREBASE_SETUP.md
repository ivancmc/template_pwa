# Firebase Setup Instructions

## Error: auth/configuration-not-found

This error means Firebase Authentication is not enabled in your Firebase project. Here's how to fix it:

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

### Step 2: Set up Firestore (for user profiles)
1. In the left sidebar, click on **Firestore Database**
2. Click **Create database**
3. Choose **Start in test mode** (for development)
4. Select a location (choose the closest to you)
5. Click **Done**

### Step 3: Configure Authorized Domains (if needed)
1. In Authentication > Settings > Authorized domains
2. Add your Replit domain if it's not already there
3. The domain should be something like: `your-repl-name.your-username.repl.co`

## Current Configuration
- Project ID: authflow-pvhn3
- API Key: ✅ Loaded
- App ID: ✅ Loaded

Once you complete these steps, the registration should work properly!