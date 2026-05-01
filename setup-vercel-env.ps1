# Vercelに環境変数をまとめて設定するスクリプト
$envVars = @{
  "NEXT_PUBLIC_FIREBASE_API_KEY"            = "AIzaSyDSG3lOOa3qNVPkevXB8Gm_U9Iig779diY"
  "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"        = "my-todo-app-ec213.firebaseapp.com"
  "NEXT_PUBLIC_FIREBASE_DATABASE_URL"       = "https://my-todo-app-ec213-default-rtdb.asia-southeast1.firebasedatabase.app"
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID"         = "my-todo-app-ec213"
  "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"     = "my-todo-app-ec213.firebasestorage.app"
  "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"= "212332285664"
  "NEXT_PUBLIC_FIREBASE_APP_ID"             = "1:212332285664:web:5bef1e577d1b1c79958a85"
}

foreach ($key in $envVars.Keys) {
  $value = $envVars[$key]
  Write-Host "Setting $key..."
  echo $value | npx vercel env add $key production
}

Write-Host "完了！次はデプロイします..."
npx vercel --prod
