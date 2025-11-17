import 'dotenv/config';

export default {
  expo: {
    name: 'Simra',
    slug: 'Simra',
    version: '1.0.0',
    icon: './assets/simraSlogan.png',
    
    android: {
      package: "com.derson.simra",
    },
    extra: {
      firebase: {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID,
        databaseURL: process.env.FIREBASE_DATABASE_URL,
      },
      eas: {
        projectId: "c130be91-fe9a-4f06-b912-c5b462a8e890"
      }
    }
  }
}
