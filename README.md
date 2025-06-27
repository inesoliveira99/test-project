# Hello World Next.js with Automatic CI/CD

A Next.js app with a color-changing button that automatically deploys to Google Cloud Run when you push to GitHub. Uses OIDC (Workload Identity Federation) for secure authentication without service account keys.

## 🎯 What This Does

Every time you push code to the `main` branch:
- ✅ **Runs tests** automatically in GitHub Actions
- ✅ **Builds Docker image** of your Next.js app
- ✅ **Pushes image** to Google Artifact Registry
- ✅ **Deploys to Cloud Run** with zero downtime
- ✅ **Cleans up old images** to save storage costs

**Secure:** Uses OIDC authentication (no service account keys needed!)

## 🚀 Getting Started

### Prerequisites

1. **Google Cloud account** with billing enabled
2. **GitHub repository** (create one first if needed)
3. **Local tools installed:**
   - `gcloud` CLI
   - `terraform` (v1.0+)
   - `node` and `npm`
   - `git`

### Step 1: Create Project Structure

Create a new folder and add all the files:

```
your-project/
├── app/
│   ├── api/
│   │   ├── hello/route.ts
│   │   └── colors/route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── .github/workflows/deploy.yml
├── main.tf
├── variables.tf
├── outputs.tf
├── terraform.tfvars.example
├── Dockerfile
├── package.json
├── next.config.js
├── tailwind.config.ts
├── postcss.config.js
└── .gitignore
```

### Step 2: Configure Variables

Copy and edit the configuration file:
```bash
cp terraform.tfvars.example terraform.tfvars
```

Edit `terraform.tfvars` with your actual values:
```hcl
project_id         = "your-actual-gcp-project-id"      # ← Change this!
region            = "us-central1"                       # ← Can change region
app_name          = "hello-world-nextjs"                # ← Can change app name
github_repository = "your-username/your-repo-name"     # ← Change this!
environment       = "dev"
```

**Important:** 
- `project_id` must be your actual Google Cloud project ID
- `github_repository` must be in format `owner/repo-name`

### Step 3: Authenticate with Google Cloud

```bash
# Login to Google Cloud
gcloud auth login

# Set your project
gcloud config set project your-actual-gcp-project-id

# Set application default credentials for Terraform
gcloud auth application-default login
```

### Step 4: Deploy Infrastructure

```bash
# Initialize Terraform
terraform init

# Review what will be created
terraform plan

# Create all the infrastructure
terraform apply
```

Type `yes` when prompted. This creates:
- Workload Identity Pool for OIDC
- Service accounts for GitHub Actions and Cloud Run
- Artifact Registry repository
- Cloud Run service
- All necessary IAM permissions

### Step 5: Get Configuration Values

After Terraform completes, get the values you need:

```bash
terraform output workload_identity_provider
terraform output service_account_email
terraform output cloud_run_url
```

### Step 6: Configure GitHub Repository

Go to your GitHub repository settings:
`https://github.com/your-username/your-repo/settings/variables/actions`

Click **"New repository variable"** and add each of these:

| Variable Name | Value |
|---------------|-------|
| `GCP_PROJECT_ID` | Your project ID from terraform.tfvars |
| `GCP_REGION` | Your region (e.g., `us-central1`) |
| `SERVICE_NAME` | Your app name (e.g., `hello-world-nextjs`) |
| `REPOSITORY` | Your app name + `-repo` (e.g., `hello-world-nextjs-repo`) |
| `WORKLOAD_IDENTITY_PROVIDER` | Copy from `terraform output workload_identity_provider` |
| `SERVICE_ACCOUNT_EMAIL` | Copy from `terraform output service_account_email` |

### Step 7: Push Your Code

```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit your code
git commit -m "Initial commit with CI/CD setup"

# Set main branch
git branch -M main

# Add your GitHub repository as remote
git remote add origin https://github.com/your-username/your-repo.git

# Push to GitHub
git push -u origin main
```

### Step 8: Watch It Deploy! 🎉

1. Go to your GitHub repository
2. Click the **"Actions"** tab
3. Watch your workflow run automatically
4. Get your live URL: `terraform output cloud_run_url`

Your app is now live with automatic deployments!

## 🎨 The App

Your deployed app features:
- **Color-changing button** that cycles through 8 colors
- **Click counter** to track interactions
- **API endpoints** at `/api/hello` and `/api/colors`
- **Responsive design** that works on mobile and desktop

## 🔄 Development Workflow

### Making Changes

1. **Create a branch** (optional but recommended):
   ```bash
   git checkout -b feature-name
   ```

2. **Make your changes** to the Next.js app

3. **Test locally**:
   ```bash
   npm install
   npm run dev
   ```

4. **Push changes**:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push origin main  # or your branch name
   ```

5. **Automatic deployment** happens when you push to `main`!

### Monitoring

- **GitHub Actions**: View build/deploy progress at `github.com/your-username/your-repo/actions`
- **Google Cloud Console**: Monitor your Cloud Run service
- **Logs**: Available in Google Cloud Logging

## 🏗️ What Gets Created

### Google Cloud Resources:
- **Cloud Run service** - Hosts your Next.js app
- **Artifact Registry** - Stores Docker images
- **Workload Identity Pool** - Enables OIDC authentication
- **Service accounts** - For secure GitHub Actions access
- **IAM bindings** - Minimal required permissions

### GitHub Workflow:
- **Test job** - Runs on every push and PR
- **Deploy job** - Runs only on main branch pushes
- **Cleanup job** - Removes old Docker images

## 💰 Cost Estimate

Google Cloud Run pricing:
- **Free tier**: 2 million requests/month
- **CPU/Memory**: Only charged when processing requests
- **Cold starts**: Free (serverless benefit)

**Typical cost for personal projects**: $0-5/month

## 🔐 Security Features

### OIDC Benefits:
- ✅ No service account keys to manage
- ✅ Short-lived tokens (more secure)
- ✅ Repository-specific access only
- ✅ Automatic credential rotation

### Permissions:
- GitHub Actions can only access your specific project
- Cloud Run service has minimal required permissions
- Web app is publicly accessible (as intended)

## 🚨 Troubleshooting

### Common Issues:

**GitHub Actions fails with "Workload Identity Federation error"**
- Verify `WORKLOAD_IDENTITY_PROVIDER` variable is correct
- Check `github_repository` in terraform.tfvars matches your repo

**"Permission denied" during deployment**
- Re-run `terraform apply` to ensure all permissions are set
- Verify service account email is correct in GitHub variables

**App not accessible after deployment**
- Check Cloud Run service in Google Cloud Console
- Verify the service allows unauthenticated access

**Docker build fails**
- Check your Dockerfile syntax
- Ensure package.json is valid

### Debug Commands:

```bash
# Check Terraform state
terraform show

# View Cloud Run service
gcloud run services list

# Check recent logs
gcloud logging read "resource.type=cloud_run_revision" --limit=20

# List Docker images
gcloud artifacts docker images list us-central1-docker.pkg.dev/PROJECT_ID/REPOSITORY
```

## 🎯 Customization

### Change App Settings:
Edit variables in `terraform.tfvars` and run `terraform apply`

### Modify Resources:
Edit `main.tf` to change:
- Memory/CPU limits
- Scaling settings  
- Environment variables

### Add Environments:
Create separate `.tfvars` files for dev/staging/prod:
```bash
terraform workspace new staging
terraform apply -var-file="terraform-staging.tfvars"
```

## 📝 File Descriptions

- **`main.tf`** - Infrastructure as code (Google Cloud resources)
- **`variables.tf`** - Configurable parameters
- **`outputs.tf`** - Values needed for GitHub setup
- **`terraform.tfvars`** - Your specific configuration
- **`.github/workflows/deploy.yml`** - CI/CD pipeline
- **`Dockerfile`** - Container definition for your app
- **`app/`** - Your Next.js application code

## 🎉 Next Steps

Once deployed, you can:
- **Add a custom domain** to your Cloud Run service
- **Set up monitoring and alerts** in Google Cloud
- **Create multiple environments** (dev, staging, prod)
- **Add more features** to your Next.js app

## 📞 Getting Help

If something goes wrong:
1. Check **GitHub Actions logs** for build errors
2. Check **Google Cloud Console** for runtime issues
3. Verify all **GitHub repository variables** are set correctly
4. Ensure **terraform.tfvars** has the right values

## 🌟 Features

- **Zero-downtime deployments** - New versions deploy seamlessly
- **Automatic scaling** - Scales from 0 to 10 instances based on traffic
- **Cost-effective** - Only pay when requests are being processed
- **Secure** - Uses modern OIDC authentication
- **Fast** - Deploys typically complete in 2-3 minutes

Your Hello World app is now production-ready with enterprise-grade CI/CD! 🚀