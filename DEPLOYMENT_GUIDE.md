# humbleetrees - Deployment Guide (Hostinger)

## 1. File Upload
1. Log in to Hostinger hPanel.
2. Go to **File Manager** (public_html).
3. Upload all files from this project.
   - Ideally, put `app`, `config`, `sql` folders outside `public_html` if possible for security.
   - If not, put everything in `public_html` and ensure `.htaccess` protects sensitive folders.
   - The contents of `public/` should be the entry point.

## 2. Database Setup
1. Go to **MySQL Databases** in hPanel.
2. Create a new database (e.g., `u123456_humbleetrees`).
3. Create a new user and password.
4. Open **phpMyAdmin**.
5. Import `sql/schema.sql` to create tables.

## 3. Configuration
1. Open `config/database.php`.
2. Update `DB_NAME`, `DB_USER`, `DB_PASS` with your Hostinger database details.
3. Open `config/payment.php` to set your Razorpay keys (Switch to Live mode when ready).
4. Open `config/mail.php` to set SMTP credentials.

## 4. Routing
Ensure an `.htaccess` file exists in the root (where index.php is) to redirect requests to index.php:

```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.php [QSA,L]
```

## 5. Testing
1. Visit `https://humbleetrees.in`
2. Go to `/farmer/dashboard` to test the monitoring system.
3. Check `/shop` for products.

## 6. Razorpay Webhook
1. In Razorpay Dashboard -> Settings -> Webhooks.
2. Add URL: `https://humbleetrees.in/payment/webhook`
3. Secret: `Nk@122005`
4. Select events: `order.paid`, `payment.failed`, etc.
