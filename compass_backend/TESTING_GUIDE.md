# دليل تشغيل الاختبارات

## المشكلة الحالية
الاختبارات تحتاج إلى قاعدة بيانات MongoDB لتشغيلها.

## الحلول المتاحة:

### 1. استخدام MongoDB محلي (الأسهل)
تأكد من أن MongoDB يعمل على جهازك:

**Windows:**
```powershell
# التحقق من حالة MongoDB Service
Get-Service -Name "*mongo*"

# إذا لم يكن يعمل، قم بتشغيله:
net start MongoDB
# أو من Services.msc
```

ثم شغل الاختبارات:
```bash
cd compass_backend
npm test
```

### 2. استخدام MongoDB Atlas (سحابي)
إذا كان لديك حساب MongoDB Atlas:

```powershell
cd compass_backend
$env:MONGO_URI="mongodb+srv://username:password@cluster.mongodb.net/compass_test?retryWrites=true&w=majority"
npm test
```

### 3. استخدام MongoDB Memory Server (لتطوير محلي)
لتشغيل MongoDB مؤقت في الذاكرة (لا يحتاج MongoDB محلي):

```bash
cd compass_backend
npm install --save-dev mongodb-memory-server
npm test
```

**ملاحظة:** قد تكون هناك مشكلة في التثبيت على Windows. إذا فشل التثبيت:
- أعد تشغيل PowerShell كمسؤول
- أغلق أي برامج تستخدم MongoDB
- حاول مرة أخرى

### 4. تشغيل MongoDB يدوياً
إذا كان MongoDB مثبتاً ولكن ليس كـ service:

```powershell
# انتقل إلى مجلد MongoDB
cd "C:\Program Files\MongoDB\Server\7.0\bin"
# أو المجلد الذي يحتوي على mongod.exe

# شغل MongoDB
.\mongod.exe --dbpath "D:\data\db"
```

ثم في terminal آخر:
```bash
cd compass_backend
npm test
```

## حالات الاختبار المتاحة:

### ✅ Health Endpoint
- اختبار حالة الصحة الأساسي

### ✅ Auth Endpoints  
- تسجيل الدخول
- التحقق من المستخدم (`/auth/me`)
- تسجيل الخروج

### ✅ Public Endpoints
- الخدمات (services)
- المشاريع (projects)  
- الباقات (packages)
- المراجعات (reviews)
- الطلبات (leads)

**إجمالي: 23 اختبار**

## تشغيل الاختبارات:

```bash
# تشغيل جميع الاختبارات
npm test

# تشغيل الاختبارات مع مراقبة التغييرات
npm run test:watch

# تشغيل واجهة الاختبارات التفاعلية
npm run test:ui

# تشغيل الاختبارات مع تقرير التغطية
npm run test:coverage
```
